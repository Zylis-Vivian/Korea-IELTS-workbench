// scripts/gen-audio.mjs
// 把工作台内所有韩语发音按钮用到的字符串，用 Edge TTS 预合成为 MP3 打包进站点，
// 浏览器直接播放本地文件，彻底摆脱"运行时无后端 / 无系统韩文语音 / 网络被挡"导致的静默失败。
import { build } from 'esbuild'
import { EdgeTTS } from 'edge-tts-universal'
import { writeFileSync, mkdirSync, existsSync, readFileSync, readdirSync, statSync, rmSync } from 'fs'
import { createHash } from 'crypto'
import { fileURLToPath, pathToFileURL } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const OUT_DIR = join(root, 'public', 'audio', 'ko')
const MANIFEST = join(OUT_DIR, 'manifest.json')
const VOICE = 'ko-KR-SunHiNeural' // 标准首尔音（女声）；男声 ko-KR-InJoonNeural 可作扩展
const CONCURRENCY = Number(process.env.AUDIO_CONCURRENCY || 6)
const MIN_AUDIO_BYTES = 2048 // 低于此值通常不足 0.35 秒，可能只有静音或被截断的单音节。

// 1) 用 esbuild 把数据 + 音变函数打成可运行模块，提取字符串集合
const collector = `
import { ALPHABET } from './src/data/alphabet'
import { PRONUNCIATION } from './src/data/pronunciation'
import { VOCAB } from './src/data/vocab'
import { DIALOGUES } from './src/data/dialogue'
import { GRAMMAR } from './src/data/grammar'
import { DAILY_LESSONS } from './src/data/daily'
import { YONSEI_WORDS } from './src/data/yonseiVocab'
import { ANIMATIONS, KPOP, DRAMAS } from './src/data/entertainment'
import { applyPhoneticsIfNeeded } from './src/utils/koreanPhonetics'

const out = new Set()

// 韩文音节组成：用 Unicode 规范 Jamo 码点(U+1100/U+1161/U+11A8 区间)直接计算，
// 不依赖手写顺序，彻底避免终声顺序错误。
const INITIAL_CODE = { 'ㄱ':0x1100,'ㄲ':0x1101,'ㄴ':0x1102,'ㄷ':0x1103,'ㄸ':0x1104,'ㄹ':0x1105,'ㅁ':0x1106,'ㅂ':0x1107,'ㅃ':0x1108,'ㅅ':0x1109,'ㅆ':0x110A,'ㅇ':0x110B,'ㅈ':0x110C,'ㅉ':0x110D,'ㅊ':0x110E,'ㅋ':0x110F,'ㅌ':0x1110,'ㅍ':0x1111,'ㅎ':0x1112 }
const MEDIAL_CODE = { 'ㅏ':0x1161,'ㅐ':0x1162,'ㅑ':0x1163,'ㅒ':0x1164,'ㅓ':0x1165,'ㅔ':0x1166,'ㅕ':0x1167,'ㅖ':0x1168,'ㅗ':0x1169,'ㅘ':0x116A,'ㅙ':0x116B,'ㅚ':0x116C,'ㅛ':0x116D,'ㅜ':0x116E,'ㅝ':0x116F,'ㅞ':0x1170,'ㅟ':0x1171,'ㅠ':0x1172,'ㅡ':0x1173,'ㅢ':0x1174,'ㅣ':0x1175 }
const FINAL_CODE = { 'ㄱ':0x11A8,'ㄲ':0x11A9,'ㄳ':0x11AA,'ㄴ':0x11AB,'ㄵ':0x11AC,'ㄶ':0x11AD,'ㄷ':0x11AE,'ㄹ':0x11AF,'ㄺ':0x11B0,'ㄻ':0x11B1,'ㄼ':0x11B2,'ㄽ':0x11B3,'ㄾ':0x11B4,'ㄿ':0x11B5,'ㅀ':0x11B6,'ㅁ':0x11B7,'ㅂ':0x11B8,'ㅄ':0x11B9,'ㅅ':0x11BA,'ㅆ':0x11BB,'ㅇ':0x11BC,'ㅈ':0x11BD,'ㅊ':0x11BE,'ㅋ':0x11BF,'ㅌ':0x11C0,'ㅍ':0x11C1,'ㅎ':0x11C2 }
function composeSyllable(initial, medial, final = '') {
  const i = INITIAL_CODE[initial]
  const v = MEDIAL_CODE[medial]
  if (i === undefined || v === undefined) return initial + medial + final
  let f = 0
  if (final) {
    const fc = FINAL_CODE[final]
    if (fc === undefined) return initial + medial + final
    f = fc - 0x11A8 + 1
  }
  return String.fromCodePoint(0xAC00 + (i - 0x1100) * 588 + (v - 0x1161) * 28 + f)
}

const add = (s) => {
  if (typeof s !== 'string') return
  const t = s.trim().normalize('NFC')
  if (!t) return
  // 仅保留含至少一个韩文音节、且不含混入的拉丁字母/箭头/括号的"干净"韩文串
  if (!/[가-힣]/.test(t)) return
  if (/[a-zA-Z→★·]/.test(t)) return
  out.add(applyPhoneticsIfNeeded(t))
}
const addYonsei = (s) => {
  if (typeof s !== 'string') return
  const t = s.trim().normalize('NFC')
  if (!t) return
  // 延世词条可能包含 MP3、KTX、WTO 等教材原文的一部分，不能按通用噪声规则丢弃。
  out.add(applyPhoneticsIfNeeded(t))
}
// 优先生成延世教材词汇，确保长批处理在被中断时先完成用户当前需求。
YONSEI_WORDS.forEach((w) => addYonsei(w.korean))
ALPHABET.forEach((s) => { if (s.example && s.example.word) add(s.example.word); add(s.char); if (s.name) add(s.name); if (s.category === 'consonant') add(composeSyllable(s.char, 'ㅏ')); if (s.category === 'batchim') add(composeSyllable('ㅇ', 'ㅏ', s.char)) })
PRONUNCIATION.forEach((r) => r.examples.forEach((e) => add(e.ko)))
VOCAB.forEach((topic) => topic.words.forEach((w) => add(w.korean)))
DIALOGUES.forEach((d) => { d.lines.forEach((l) => add(l.ko)); ; d.vocabulary.forEach((v) => add(v.word)) })
GRAMMAR.forEach((g) => g.examples.forEach((e) => add(e.ko)))
// 每日学习：单词 / 句子 / 语法例句
DAILY_LESSONS.forEach((d) => {
  d.words.forEach((w) => add(w.korean))
  d.sentences.forEach((s) => add(s.korean))
  d.grammar.forEach((g) => add(g.example))
})
// 娱乐学习：动画 / 男团 / 韩剧 的中韩对照 + 生词 + 语法例句
;[...ANIMATIONS, ...KPOP, ...DRAMAS].forEach((it) => {
  ;(it.dialogue || []).forEach((d) => add(d.kr))
  ;(it.vocab || []).forEach((v) => add(v.korean))
  ;(it.grammar || []).forEach((g) => add(g.example))
})
export const STRINGS = [...out]
`
const res = await build({
  stdin: { contents: collector, resolveDir: root, loader: 'ts', sourcefile: 'collect.ts' },
  bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent',
})
const collectPath = join(__dirname, '_collect.mjs')
writeFileSync(collectPath, res.outputFiles[0].text)
const { STRINGS } = await import(pathToFileURL(collectPath).href)
rmSync(collectPath, { force: true })
console.log(`收集到 ${STRINGS.length} 个待生成韩文串`)

// 2) 逐个合成（支持增量：已存在则跳过）
mkdirSync(OUT_DIR, { recursive: true })
let manifest = {}
if (existsSync(MANIFEST)) {
  try { manifest = JSON.parse(readFileSync(MANIFEST, 'utf8')) } catch { manifest = {} }
}
const existing = new Set(readdirSync(OUT_DIR).filter((f) => f.endsWith('.mp3')))

function hash(s) {
  return createHash('sha1').update(s, 'utf8').digest('hex').slice(0, 24)
}

let done = 0, skipped = 0, failed = 0
function persistManifest() {
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 0))
}

async function synthOne(text) {
  const file = hash(text) + '.mp3'
  const outputPath = join(OUT_DIR, file)
  const usableExisting = manifest[text] && existing.has(file) && statSync(outputPath).size >= MIN_AUDIO_BYTES
  if (usableExisting) { skipped++; return }
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      // Edge 偶尔会把极短单音节合成为近乎静音的 0.1~0.2 秒空壳；
      // 重试时补句号只增加自然收尾停顿，不改变词本身的读音。
      const synthText = attempt === 0 ? text : `${text}.`
      const tts = new EdgeTTS(synthText, VOICE)
      const r = await tts.synthesize()
      const buf = Buffer.from(await r.audio.arrayBuffer())
      if (buf.length < MIN_AUDIO_BYTES) throw new Error(`audio too short (${buf.length} bytes)`)
      writeFileSync(outputPath, buf)
      manifest[text] = file
      done++
      // 增量持久化：长批处理被网络或执行会话中断时，可以安全断点续跑。
      if (done % 20 === 0) {
        persistManifest()
        console.log(`进度：新增 ${done}，失败 ${failed}`)
      }
      return
    } catch (e) {
      if (attempt === 2) { failed++; console.error('FAIL:', text, e.message) }
      else await new Promise((r) => setTimeout(r, 500 * (attempt + 1)))
    }
  }
}

// 并发执行
let idx = 0
async function worker() {
  while (idx < STRINGS.length) {
    const text = STRINGS[idx++]
    await synthOne(text)
  }
}
;(async () => {
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
  persistManifest()
  console.log(`完成：新增 ${done} / 跳过已存在 ${skipped} / 失败 ${failed}`)
  console.log(`manifest 共 ${Object.keys(manifest).length} 条`)
})().catch((e) => { console.error('FATAL:', e.message); process.exit(1) })
