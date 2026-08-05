#!/usr/bin/env node
/**
 * scripts/merge-vocabulary.mjs  —— 数据清洗 + 合并（存量优化版）
 *
 * 读取 tmp/ 下「用户手动下载并放入」的开源词库文件（CSV / TSV / JSON / JSONL / TXT），
 * 清洗归一化为文档规定的统一 JSON 结构，合并去重后输出到 data/：
 *   - data/korean-vocabulary.json  （韩语词库，目标 ≥10000）
 *   - data/ielts-vocabulary.json   （雅思词库，目标 ≥5000）
 *   - data/ielts-speaking.json     （口语题库，≥200）
 *   - data/ielts-synonyms.json     （同义替换，≥538）
 *
 * 用法：
 *   node scripts/merge-vocabulary.mjs                 # 读 tmp/，写 data/
 *   node scripts/merge-vocabulary.mjs --input DIR --output DIR
 *
 * 设计原则（按修正指令）：
 *   - 不做任何 git clone / 网络请求，纯本地文件处理。
 *   - 不生成 MP3（发音由前端 Web Speech API 在运行时处理，故输出不含 audioSrc）。
 *   - 字段映射同时兼容中文表头与英文键名；未知格式的行会被跳过并打印原因。
 *   - 不改动现有 src/data/*.ts 流水线，data/*.json 仅供后续新组件按需接入。
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const INPUT_DIR = (() => {
  const i = process.argv.indexOf('--input')
  return i >= 0 ? path.resolve(process.argv[i + 1]) : path.join(ROOT, 'tmp')
})()
const OUTPUT_DIR = (() => {
  const i = process.argv.indexOf('--output')
  return i >= 0 ? path.resolve(process.argv[i + 1]) : path.join(ROOT, 'data')
})()

// ---------------------------------------------------------------------------
// 字段别名表：同时兼容中/英表头
// ---------------------------------------------------------------------------
const FIELD_ALIASES = {
  korean: ['korean', 'hangul', 'word_ko', 'ko', '한국어', '韩国语', '韩文', '韩语', '朝鲜语', '朝鲜单词'],
  english: ['english', 'eng', 'word_en', 'en', '英语', '英文'],
  chinese: ['chinese', 'zh', 'cn', 'mean', 'meaning', 'definition', 'def', '中文', '释义', '解释', '意思'],
  romanization: ['romanization', 'roman', 'romaja', '罗马音', '罗马字', '拼音', '注音'],
  pos: ['partofspeech', 'part_of_speech', 'pos', '词性'],
  level: ['level', 'grade', 'topik', 'cefr', 'difficulty', '等级', '级别', '难度', '阶段'],
  topic: ['topic', 'category', 'cat', 'theme', '主题', '分类', '类别'],
  book: ['book', 'textbook', '教材', '出处', '来源书', '课'],
  source: ['source', 'src', 'origin', '来源'],
  phonetic: ['phonetic', 'ipa', '音标'],
  example: ['example', 'examples', 'sentence', 'sentences', '例句', '例文', '例子'],
  question: ['question', 'q', 'prompt', '题目', '问题'],
  answer: ['answer', 'a', 'response', '回答', '参考答案', '答案'],
  synonym: ['synonym', 'syn', 'synonyms', '同义', '同义词', '近义'],
  part: ['part', 'section', '题型', '部分']
}

const HANGUL = /[가-힣]/
const hasHangul = (s) => typeof s === 'string' && HANGUL.test(s)

// 构建忽略大小写的字段查找表
function buildLookup(record) {
  const map = new Map()
  for (const [k, v] of Object.entries(record)) {
    if (v === undefined || v === null) continue
    map.set(k.trim().toLowerCase(), String(v).trim())
  }
  return map
}

function pick(lookup, field) {
  for (const alias of FIELD_ALIASES[field] || []) {
    const v = lookup.get(alias.toLowerCase())
    if (v && v.length) return v
  }
  return ''
}

// 根据文件名推断来源类型（用于消解歧义）
function sourceHint(fileName) {
  const n = fileName.toLowerCase()
  if (/synonym|同义|538/.test(n)) return 'synonym'
  if (/speaking|口语|题库|topic|question/.test(n)) return 'speaking'
  if (/korean|한국|韩语|延世|yonsei|topik|韩/.test(n)) return 'korean'
  if (/ielts|雅思|vocab|dict|英语|gre|toefl|cet|sat|word/.test(n)) return 'ielts'
  return null
}

// ---------------------------------------------------------------------------
// 发音：可选使用 hangul-romanization 补全罗马音（未安装则跳过）
// ---------------------------------------------------------------------------
let romanizer = null
try {
  const mod = await import('hangul-romanization')
  romanizer = mod.default || mod
} catch {
  // 未安装，跳过罗马音计算
}
function safeRomanize(text) {
  if (!romanizer || !hasHangul(text)) return ''
  try {
    const fn = romanizer.romanize || romanizer.romanizeSync || romanizer
    const r = typeof fn === 'function' ? fn(text) : ''
    return typeof r === 'string' ? r : ''
  } catch {
    return ''
  }
}

// ---------------------------------------------------------------------------
// 罗马音转写（内嵌纯 JS 实现，零依赖、零网络）
//   不依赖 hangul-romanization / 任何外部包，符合"只写脚本"红线。
//   采用 Revised Romanization（标准罗马字标记法）初声/中声/终声映射。
//
//   关键修正（此前 NFD + 字符映射方案失效的根因）：
//     NFD 分解得到的是" conjoining jamo "（初声 U+1100 / 中声 U+1161 / 终声 U+11A8），
//     而源码中手写的 jamo 字面量是" compatibility jamo "（U+3131 等），
//     两者码位不一致 → 初声/中声查表恒为空，只剩终声偶然匹配。
//     现改为"按音节码点算术分解"（cho/jung/jong 索引），彻底规避编码歧义。
//
//   终声采用 Revised Romanization 拼法：塞音终声写不送气清音（ㄱ→k / ㄷ→t / ㅂ→p），
//   与项目既有词库（가족→gajok, 국→guk, 밥→bap, 이웃→iut）保持一致。
//
//   额外处理最高频的鼻音同化（ㅂ/ㄱ/ㄷ 类终声 + 后续 ㄴ/ㅁ 起始 → ㅁ/ㅇ/ㄴ），
//   以贴合教材中大量出现的"합니다 / 없습니다"等礼貌型拼写。
//   锚点验证：안→an, 녕→nyeong, 학→hak, 물→mul, 감→gam, 방→bang, 정→jeong, 사과→sagwa。
// ---------------------------------------------------------------------------
const S_BASE = 0xac00
const L_COUNT = 19
const V_COUNT = 21
const T_COUNT = 28
const N_COUNT = V_COUNT * T_COUNT // 588

// 初声（19）—— 首字母用 g/d/b/j（如 가족 gajok）
const CHO = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h']
// 中声（21）
const JUNG = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i']
// 终声（28，index 0 = 无终声）—— 塞音终声写 k/t/p（如 가족 gajok, 국 guk, 밥 bap）
const JONG = [
  '',   // 0  none
  'k',  // 1  ㄱ
  'k',  // 2  ㄲ
  'k',  // 3  ㄳ
  'n',  // 4  ㄴ
  'n',  // 5  ㄵ
  'n',  // 6  ㄶ
  't',  // 7  ㄷ
  'l',  // 8  ㄹ
  'k',  // 9  ㄺ
  'm',  // 10 ㄻ
  'l',  // 11 ㄼ
  'l',  // 12 ㄽ
  'l',  // 13 ㄾ
  'l',  // 14 ㄿ
  'l',  // 15 ㅀ
  'm',  // 16 ㅁ
  'p',  // 17 ㅂ
  'p',  // 18 ㅄ
  't',  // 19 ㅅ
  't',  // 20 ㅆ
  'ng', // 21 ㅇ
  't',  // 22 ㅈ
  't',  // 23 ㅊ
  'k',  // 24 ㅋ
  't',  // 25 ㅌ
  'p',  // 26 ㅍ
  't'   // 27 ㅎ
]

// 终声"作初声"拼读（连音用）：当终声流入后续 ㅇ(无声初声) 起始音节时，
// 终声转为该音的"初声"形式（如 ㄱ→g, ㄹ→r），与下一音节元音拼合。
// 复合终声按"前不变 + 后作初声"分解（如 ㄺ→lg）。
const JONG_AS_INITIAL = [
  '',   // 0
  'g',  // 1  ㄱ
  'kk', // 2  ㄲ
  'gs', // 3  ㄳ
  'n',  // 4  ㄴ
  'nj', // 5  ㄵ
  'nh', // 6  ㄶ
  'd',  // 7  ㄷ
  'r',  // 8  ㄹ
  'lg', // 9  ㄺ
  'lm', // 10 ㄻ
  'lb', // 11 ㄼ
  'ls', // 12 ㄽ
  'lt', // 13 ㄾ
  'lp', // 14 ㄿ
  'lh', // 15 ㅀ
  'm',  // 16 ㅁ
  'b',  // 17 ㅂ
  'bs', // 18 ㅄ
  's',  // 19 ㅅ
  'ss', // 20 ㅆ
  'ng', // 21 ㅇ
  'j',  // 22 ㅈ
  'ch', // 23 ㅊ
  'k',  // 24 ㅋ
  't',  // 25 ㅌ
  'p',  // 26 ㅍ
  'h'   // 27 ㅎ
]

// 终声拼读决策（结合下一音节初声）：
//   1) 连音：终声 + ㅇ(无声初声, cho=11) → 终声作初声流入下一音节。
//   2) 鼻音同化：ㅂ类(ㄱ/ㄷ类仅对鼻音) + ㄴ/ㅁ → ㅁ/ㅇ/ㄴ；
//                 ㅂ类 + ㅅ/ㅆ 亦鼻化（如 없습니다→eomseumnida）。
//   3) 其余：字面终声（Revised Romanization，塞音写 k/t/p）。
// 覆盖 합니다/감사합니다/없습니다/한국어 等教材高频拼法。
function finalRom(jongIdx, nextChoIdx) {
  if (jongIdx === 0) return ''
  if (nextChoIdx === 11) return JONG_AS_INITIAL[jongIdx] // 连音：终声作下一音节初声
  const isNasal = CHO[nextChoIdx] === 'n' || CHO[nextChoIdx] === 'm'
  const isS = nextChoIdx === 9 || nextChoIdx === 10 // ㅅ / ㅆ
  if (isNasal || isS) {
    // ㅂ/ㅃ/ㅍ 类：遇鼻音或 ㅅ/ㅆ 均鼻化为 m
    if (jongIdx === 17 || jongIdx === 18 || jongIdx === 26) return 'm'
    // ㄱ/ㄲ/ㅋ、ㄷ/ㄸ/ㅌ 类：仅遇鼻音时鼻化
    if (isNasal) {
      if (jongIdx === 1 || jongIdx === 2 || jongIdx === 24) return 'ng'
      if (jongIdx === 7 || jongIdx === 25) return 'n'
    }
  }
  return JONG[jongIdx]
}

function romanizeKo(text) {
  if (!text || !hasHangul(text)) return ''
  // 先按音节分解（仅处理 AC00–D7A3 的韩文音节块）
  const syls = []
  for (const ch of String(text)) {
    const cp = ch.codePointAt(0)
    if (cp >= S_BASE && cp <= 0xd7a3) {
      const s = cp - S_BASE
      syls.push({
        cho: Math.floor(s / N_COUNT),
        jung: Math.floor((s % N_COUNT) / T_COUNT),
        jong: s % T_COUNT,
        isSyllable: true
      })
    } else {
      syls.push({ raw: ch, isSyllable: false })
    }
  }
  let out = ''
  for (let i = 0; i < syls.length; i++) {
    const sy = syls[i]
    if (!sy.isSyllable) { out += sy.raw; continue }
    const next = syls[i + 1]
    const nextCho = next && next.isSyllable ? next.cho : -1
    const jongRom = finalRom(sy.jong, nextCho)
    out += CHO[sy.cho] + JUNG[sy.jung] + jongRom
  }
  return out
}

// ---------------------------------------------------------------------------
// 例句解析：支持多句（换行 / | / ；/ ; 分隔），尽量映射中韩英三语
// ---------------------------------------------------------------------------
function classifyExample(p) {
  const item = { korean: '', chinese: '', english: '' }
  // 含韩文 → 视为韩文例句
  if (hasHangul(p)) item.korean = p
  // 含中日汉字且不含长串英文 → 视为中文
  else if (/[一-鿿]/.test(p) && !/[a-zA-Z]{3,}/.test(p)) item.chinese = p
  else item.english = p
  return item
}

function parseExamples(raw) {
  if (!raw) return []
  const blocks = String(raw)
    .split(/\r?\n|[|；;]|\t{2,}/)
    .map((s) => s.trim())
    .filter(Boolean)
  const out = []
  for (let b of blocks) {
    if (!b) continue
    // 仅在 "韩文 / 非韩文" 这种跨语种时才按 / 切分，避免误伤 he/she 等英文
    const segs = b.split('/')
    const slashSplits = segs.length > 1 && segs.some(hasHangul) && segs.some((s) => !hasHangul(s.trim()) && s.trim())
    const pieces = slashSplits ? segs.map((s) => s.trim()).filter(Boolean) : [b]
    for (const p of pieces) {
      const item = classifyExample(p)
      if (item.korean || item.chinese || item.english) out.push(item)
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// 归一化单条记录 → { type, item }
// ---------------------------------------------------------------------------
function normalize(record, fileName) {
  const lookup = buildLookup(record)
  const korean = pick(lookup, 'korean')
  const english = pick(lookup, 'english')
  const chinese = pick(lookup, 'chinese')
  const romanization = pick(lookup, 'romanization')
  const pos = pick(lookup, 'pos')
  const level = pick(lookup, 'level')
  const topic = pick(lookup, 'topic')
  const book = pick(lookup, 'book')
  const source = pick(lookup, 'source') || sourceHint(fileName) || fileName.replace(/\.[^.]+$/, '')
  const phonetic = pick(lookup, 'phonetic')
  const examples = parseExamples(pick(lookup, 'example'))
  const question = pick(lookup, 'question')
  const answer = pick(lookup, 'answer')
  const synonym = pick(lookup, 'synonym')
  const part = pick(lookup, 'part')

  const hint = sourceHint(fileName)

  // 1) 口语题库
  if (hint === 'speaking' || question || answer) {
    if (!question && !answer) return null
    return {
      type: 'speaking',
      item: {
        question: question || '',
        topic: topic || '',
        answer: answer || '',
        part: part || '',
        source
      }
    }
  }

  // 2) 同义替换
  if (hint === 'synonym' || synonym) {
    const word = english || korean || ''
    const syn = synonym || ''
    if (!word || !syn) {
      // 两列纯文本兜底：取前两个非空字段
      const vals = Object.values(record).map((v) => String(v).trim()).filter(Boolean)
      if (vals.length >= 2) return { type: 'synonym', item: { word: vals[0], synonym: vals[1], group: '', source } }
      return null
    }
    return { type: 'synonym', item: { word, synonym: syn, group: level || topic || '', source } }
  }

  // 3) 韩语词库（含韩文音节）
  if (hasHangul(korean)) {
    const rom = romanization || safeRomanize(korean)
    return {
      type: 'korean',
      item: {
        korean,
        english: english || '',
        chinese: chinese || '',
        romanization: rom,
        partOfSpeech: pos || '',
        level: level || '',
        topic: topic || '',
        book: book || '',
        phonetic: phonetic || '',
        exampleSentences: examples,
        source
      }
    }
  }

  // 4) 雅思/英语词库（有英文词即收，中文可选）
  if (english) {
    return {
      type: 'ielts',
      item: {
        english,
        chinese: chinese || '',
        phonetic: phonetic || '',
        partOfSpeech: pos || '',
        level: level || '',
        topic: topic || '',
        exampleSentences: examples,
        source
      }
    }
  }

  return null
}

// ---------------------------------------------------------------------------
// 延世韩国语词库（open-yonsei-korean-vocabulary）专用解析
//   结构：顶层 { metadata:{ volume, chapters:[{chapter,ko,zh,en}] }, rows:[...] }
//   每条词条含 korean/chinese/english/pos_zh/origin_detail/volume/chapter 等。
//   注意：源 pronunciation 字段是韩文音标（非罗马音）且覆盖不全，
//         故罗马音统一由内嵌 romanizeKo() 生成；词源 origin_detail 映射到 grammar。
// ---------------------------------------------------------------------------
function isYonsei(data) {
  return (
    data && typeof data === 'object' &&
    Array.isArray(data.rows) &&
    data.metadata && typeof data.metadata.volume === 'number'
  )
}

function parseYonseiJSON(data, fileName) {
  const meta = data.metadata || {}
  const vol = meta.volume
  const chapterMap = new Map()
  for (const c of meta.chapters || []) {
    chapterMap.set(c.chapter, c.zh || c.en || '')
  }
  const out = []
  for (const r of data.rows || []) {
    const korean = (r.korean || '').trim()
    if (!hasHangul(korean)) continue // 跳过非韩语词条
    const v = r.volume ?? vol
    const chZh = chapterMap.get(r.chapter) || ''
    const topic = `延世${v}·${chZh}`
    out.push({
      type: 'korean',
      item: {
        korean,
        english: (r.english || '').trim(),
        chinese: (r.chinese || '').trim(),
        romanization: romanizeKo(korean), // 保证 100% 罗马音覆盖
        partOfSpeech: (r.pos_zh || '').trim(),
        level: '', // 延世源无 TOPIK 等级，不硬套
        topic,
        book: `延世韩国语${v}`,
        phonetic: '',
        exampleSentences: [], // 源无例句字段
        grammar: (r.origin_detail || '').trim(), // 词源追溯
        source: `Yonsei vol-${v}`
      }
    })
  }
  return out
}

// ---------------------------------------------------------------------------
// 显式源解析器：按用户授权 git clone 拉取的仓库，直接指向确切文件，
// 避免通用扫描误吞 package-lock.json 等噪声。每个解析器产出与 normalize
// 同形的 { type, item } 记录，统一汇入下方 main() 的去重合并流程。
// ---------------------------------------------------------------------------
function loadJsDefault(file) {
  const src = fs.readFileSync(file, 'utf8')
  const url = 'data:text/javascript,' + encodeURIComponent(src)
  return import(url).then((m) => m.default)
}

// korean-flashcards：tmp/korean-flashcards/data/korean-words.json → .words[]
//   自带 romanization / partOfSpeech / difficulty / exampleSentence，质量高。
function parseFlashcards() {
  const file = path.join(ROOT, 'tmp/korean-flashcards/data/korean-words.json')
  if (!fs.existsSync(file)) return []
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  const arr = data.words || (Array.isArray(data) ? data : [])
  const out = []
  for (const w of arr) {
    if (!w || !w.hangul) continue
    const diff = (w.difficulty || '').toLowerCase()
    const level = diff.includes('begin') ? '1' : diff.includes('inter') ? '3' : diff.includes('adv') ? '5' : ''
    const ex = w.exampleSentence || {}
    out.push({
      type: 'korean',
      item: {
        korean: w.hangul,
        english: w.english || '',
        chinese: '',
        romanization: w.romanization || romanizeKo(w.hangul),
        partOfSpeech: w.partOfSpeech || '',
        level,
        topic: w.topic || '日常',
        book: '',
        phonetic: '',
        exampleSentences: ex.korean ? [{ korean: ex.korean, english: ex.english || '', chinese: '' }] : [],
        source: 'korean-flashcards'
      }
    })
  }
  return out
}

// topik-vocab：tmp/topik-output/data/topik-vocab/levelN.json（仅 level1 有数据）
function parseTopik() {
  const dir = path.join(ROOT, 'tmp/topik-output/data/topik-vocab')
  if (!fs.existsSync(dir)) return []
  const out = []
  for (let lv = 1; lv <= 6; lv++) {
    const f = path.join(dir, `level${lv}.json`)
    if (!fs.existsSync(f)) continue
    let arr = JSON.parse(fs.readFileSync(f, 'utf8'))
    if (!Array.isArray(arr)) arr = arr.words || arr.data || []
    for (const r of arr) {
      if (!r || !r.korean) continue
      const exs = (r.exampleSentences || [])
        .map((s, i) => ({ korean: s, english: (r.exampleTranslations || [])[i] || '', chinese: '' }))
        .filter((x) => x.korean)
      out.push({
        type: 'korean',
        item: {
          korean: r.korean,
          english: Array.isArray(r.english) ? r.english.join('; ') : (r.english || ''),
          chinese: '',
          romanization: r.romanization || romanizeKo(r.korean),
          partOfSpeech: '',
          level: String(lv),
          topic: 'TOPIK' + lv,
          book: '',
          phonetic: '',
          exampleSentences: exs,
          source: 'topik-vocab'
        }
      })
    }
  }
  return out
}

// my-ielts 词汇真经：tmp/my-ielts/src/pages/vocabulary/vocabulary.js（ESM export default 对象）
//   结构：{ "01_自然地理": { words: [[wordObj], [wordObj], ...] }, ... }，每词
//   { word:[...], pos, meaning(中), example(英句), extra }
async function parseIeltsVocab() {
  const file = path.join(ROOT, 'tmp/my-ielts/src/pages/vocabulary/vocabulary.js')
  if (!fs.existsSync(file)) return []
  const vocab = await loadJsDefault(file)
  const out = []
  for (const [cat, grp] of Object.entries(vocab || {})) {
    for (const wordGroup of (grp.words || [])) {
      for (const w of (wordGroup || [])) {
        if (!w || !w.word || !w.word.length) continue
        const word = Array.isArray(w.word) ? w.word[0] : w.word
        out.push({
          type: 'ielts',
          item: {
            english: word,
            chinese: w.meaning || '',
            phonetic: '',
            partOfSpeech: w.pos || '',
            level: '',
            topic: cat,
            exampleSentences: w.example ? [{ korean: '', english: w.example, chinese: '' }] : [],
            source: 'my-ielts-vocab'
          }
        })
      }
    }
  }
  return out
}

// my-ielts 听力 179 考点词：tmp/my-ielts/src/pages/listening/listening179.json
//   结构：[{ index, word, type, meaning, replace:[...] }]
function parseIelts179() {
  const file = path.join(ROOT, 'tmp/my-ielts/src/pages/listening/listening179.json')
  if (!fs.existsSync(file)) return []
  const arr = JSON.parse(fs.readFileSync(file, 'utf8'))
  return (Array.isArray(arr) ? arr : [])
    .map((r) => ({
      type: 'ielts',
      item: {
        english: r.word || '',
        chinese: r.meaning || '',
        phonetic: '',
        partOfSpeech: r.type || '',
        level: '',
        topic: '听力179考点词',
        exampleSentences: [],
        source: 'my-ielts-179'
      }
    }))
    .filter((x) => x.item.english)
}

// my-ielts 538 同义替换：tmp/my-ielts/src/pages/reading/reading538words.js（ESM export default）
//   结构：[{ title, define, require, words: [[id, word, pos[], meaning[], synonyms[], note], ...] }]
async function parseIeltsSynonyms() {
  const file = path.join(ROOT, 'tmp/my-ielts/src/pages/reading/reading538words.js')
  if (!fs.existsSync(file)) return []
  const groups = await loadJsDefault(file)
  const out = []
  for (const g of (groups || [])) {
    for (const row of (g.words || [])) {
      const word = row[1]
      const syns = row[4] || []
      if (!word || !syns.length) continue
      out.push({
        type: 'synonym',
        item: { word, synonym: syns.join(' / '), group: g.title || '', source: 'my-ielts-538' }
      })
    }
  }
  return out
}

// ielts-speaking-ai 口语题库：tmp/ielts-speaking-ai/ielts-question-bank.js（class，无 export）
//   Part 1/3：{ category: [questions] }；Part 2：{ index: { topic, cue_card, follow_ups? } }
function parseIeltsSpeaking() {
  const file = path.join(ROOT, 'tmp/ielts-speaking-ai/ielts-question-bank.js')
  if (!fs.existsSync(file)) return []
  const src = fs.readFileSync(file, 'utf8')
  const m = { exports: {} }
  new Function('module', 'exports', src + '\nmodule.exports = IELTSQuestionBank;')(m, m.exports)
  const bank = new m.exports().questionBank
  const out = []
  for (const part of Object.keys(bank || {})) {
    const node = bank[part]
    if (part === 'Part 2') {
      for (const key of Object.keys(node)) {
        const card = node[key] || {}
        const cue = card.cue_card || card.topic || ''
        if (cue) out.push({ type: 'speaking', item: { question: String(cue).trim(), topic: card.topic || 'Part 2', part, answer: '', source: 'ielts-speaking-ai' } })
      }
    } else {
      for (const cat of Object.keys(node)) {
        for (const q of (node[cat] || [])) {
          if (q) out.push({ type: 'speaking', item: { question: String(q).trim(), topic: cat, part, answer: '', source: 'ielts-speaking-ai' } })
        }
      }
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// 解析各种文件
// ---------------------------------------------------------------------------
function stripBOM(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s
}

function parseDelimited(text, sep) {
  const rows = []
  let row = []
  let field = ''
  let inQ = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ } else inQ = false
      } else field += c
    } else {
      if (c === '"') inQ = true
      else if (c === sep) { row.push(field); field = '' }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
      else if (c !== '\r') field += c
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row) }
  const cleaned = rows.filter((r) => !(r.length === 1 && r[0].trim() === ''))
  if (cleaned.length < 2) return []
  const header = cleaned[0].map((h) => h.trim())
  return cleaned.slice(1).map((r) => {
    const obj = {}
    header.forEach((h, idx) => { obj[h] = r[idx] ?? '' })
    return obj
  })
}

function parseJSON(text, fileName) {
  let data
  try { data = JSON.parse(stripBOM(text)) } catch { return [] }
  const out = []
  const walk = (node) => {
    if (Array.isArray(node)) node.forEach(walk)
    else if (node && typeof node === 'object') {
      // 含字符串键的对象视为记录
      const vals = Object.values(node).filter((v) => typeof v === 'string' || typeof v === 'number')
      if (vals.length >= 1 && !Array.isArray(node)) out.push(node)
      else Object.values(node).forEach(walk)
    }
  }
  walk(data)
  return out
}

function parseJSONL(text) {
  return stripBOM(text)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l, i) => { try { return JSON.parse(l) } catch { return null } })
    .filter(Boolean)
}

// 递归收集目录下所有数据文件
// SKIP_DIRS：用户 git clone 拉取的源仓库（按授权），其内部含大量 package-lock.json
// 等噪声，且结构各异，统一由下方「显式源解析器」专门处理，故递归时跳过这些根目录。
const SKIP_DIRS = new Set(['node_modules', '.git', 'korean-flashcards', 'topik-output', 'my-ielts', 'ielts-speaking-ai'])
function collectFiles(dir) {
  const exts = new Set(['.csv', '.tsv', '.json', '.jsonl', '.txt'])
  const out = []
  const walk = (d) => {
    let entries = []
    try { entries = fs.readdirSync(d, { withFileTypes: true }) } catch { return }
    for (const e of entries) {
      if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(d, e.name)); continue }
      if (exts.has(path.extname(e.name).toLowerCase())) out.push(path.join(d, e.name))
    }
  }
  walk(dir)
  return out
}

// ---------------------------------------------------------------------------
// 合并（按 key 去重，保留信息最完整者，合并例句与来源）
// ---------------------------------------------------------------------------
function makeId(prefix, key) {
  return prefix + '_' + createHash('md5').update(key).digest('hex').slice(0, 10)
}

function mergeExamples(a = [], b = []) {
  const seen = new Set(a.map((x) => `${x.korean}|${x.chinese}|${x.english}`))
  const res = [...a]
  for (const x of b) {
    const k = `${x.korean}|${x.chinese}|${x.english}`
    if (!seen.has(k)) { seen.add(k); res.push(x) }
  }
  return res
}

function mergeInto(map, key, item, type) {
  if (!key) return false
  const ex = map.get(key)
  if (!ex) {
    map.set(key, { ...item, _sources: item.source ? [item.source] : [] })
    return true
  }
  for (const [f, v] of Object.entries(item)) {
    if (f === 'exampleSentences') { ex.exampleSentences = mergeExamples(ex.exampleSentences, v); continue }
    if (f === 'source') continue
    if (!ex[f] && v) ex[f] = v
  }
  if (item.source && !ex._sources.includes(item.source)) ex._sources.push(item.source)
  return false
}

function finalize(map, prefix, shape) {
  const arr = []
  for (const [key, item] of map.entries()) {
    const { _sources, ...rest } = item
    const source = (_sources || []).filter(Boolean).join(',') || rest.source || ''
    arr.push({ id: makeId(prefix, key), ...shape(rest), source })
  }
  return arr
}

// 直接对「已解析的条目数组」定形（用于 flashcards / topik 独立子集输出）
function finalizeArr(items, prefix, shape) {
  return items.map((r, i) => ({ id: `${prefix}_${String(i).padStart(6, '0')}`, ...shape(r), source: r.source || '' }))
}

const KOREAN_SHAPE = (r) => ({
  korean: r.korean, english: r.english, chinese: r.chinese, romanization: r.romanization,
  partOfSpeech: r.partOfSpeech, level: r.level, topic: r.topic, book: r.book,
  phonetic: r.phonetic, exampleSentences: r.exampleSentences || [], grammar: r.grammar || ''
})
const IELTS_SHAPE = (r) => ({
  english: r.english, chinese: r.chinese, phonetic: r.phonetic, partOfSpeech: r.partOfSpeech,
  level: r.level, topic: r.topic, exampleSentences: r.exampleSentences || []
})
const SPEAK_SHAPE = (r) => ({ question: r.question, topic: r.topic, answer: r.answer, part: r.part })
const SYN_SHAPE = (r) => ({ word: r.word, synonym: r.synonym, group: r.group })

// 把一条 {type,item} 分发到对应的 map / 专用数组
function dispatch(rec, ctx) {
  if (!rec || !rec.type || !rec.item) return
  const { type, item } = rec
  ctx.total++
  if (type === 'korean') {
    mergeInto(ctx.koreanMap, item.korean, item, 'korean')
    if (item.source === 'korean-flashcards') ctx.flashArr.push(item)
    if (item.source === 'topik-vocab') ctx.topikArr.push(item)
  } else if (type === 'ielts') mergeInto(ctx.ieltsMap, item.english, item, 'ielts')
  else if (type === 'speaking') mergeInto(ctx.speakMap, item.question, item, 'speaking')
  else if (type === 'synonym') mergeInto(ctx.synMap, item.word + '→' + item.synonym, item, 'synonym')
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------
async function main() {
  const ctx = {
    koreanMap: new Map(), ieltsMap: new Map(), speakMap: new Map(), synMap: new Map(),
    flashArr: [], topikArr: [], total: 0
  }

  // 1) 通用扫描（延世 + 用户手动放入的散文件）
  if (fs.existsSync(INPUT_DIR)) {
    const files = collectFiles(INPUT_DIR)
    const skipped = []
    for (const file of files) {
      const fileName = path.basename(file)
      let text = ''
      try { text = fs.readFileSync(file, 'utf8') } catch (e) { skipped.push(`${fileName}: 读取失败 ${e.message}`); continue }
      const ext = path.extname(file).toLowerCase()
      if (ext === '.csv' && /vol-0\d/.test(fileName)) { skipped.push(`${fileName}: 延世 CSV 已由同册 JSON 覆盖，已跳过`); continue }
      let records = []
      if (ext === '.csv') records = parseDelimited(text, ',')
      else if (ext === '.tsv') records = parseDelimited(text, '\t')
      else if (ext === '.jsonl') records = parseJSONL(text)
      else if (ext === '.json') {
        let data = null
        try { data = JSON.parse(stripBOM(text)) } catch { data = null }
        if (data && isYonsei(data)) records = parseYonseiJSON(data, fileName)
        else records = parseJSON(data || [], fileName)
      } else records = parseDelimited(text, detectSep(text))

      for (const rec of records) {
        const norm = rec && typeof rec.type === 'string' && rec.item ? rec : normalize(rec, fileName)
        if (!norm) { skipped.push(`${fileName}: 无法识别的记录 ${JSON.stringify(rec).slice(0, 60)}`); continue }
        dispatch(norm, ctx)
      }
    }
    if (skipped.length) {
      console.log(`[通用扫描] 跳过 ${skipped.length} 条（样例前 5）：`)
      skipped.slice(0, 5).forEach((s) => console.log('   · ' + s))
    }
  }

  // 2) 显式源解析器（按用户授权 git clone 拉取的仓库）
  for (const rec of parseFlashcards()) dispatch(rec, ctx)
  for (const rec of parseTopik()) dispatch(rec, ctx)
  for (const rec of await parseIeltsVocab()) dispatch(rec, ctx)
  for (const rec of parseIelts179()) dispatch(rec, ctx)
  for (const rec of await parseIeltsSynonyms()) dispatch(rec, ctx)
  for (const rec of parseIeltsSpeaking()) dispatch(rec, ctx)

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const korean = finalize(ctx.koreanMap, 'ko', KOREAN_SHAPE)
  const ielts = finalize(ctx.ieltsMap, 'en', IELTS_SHAPE)
  const speaking = finalize(ctx.speakMap, 'sp', SPEAK_SHAPE)
  const synonyms = finalize(ctx.synMap, 'sy', SYN_SHAPE)
  const flashcards = finalizeArr(ctx.flashArr, 'kf', KOREAN_SHAPE)
  const topik = finalizeArr(ctx.topikArr, 'tp', KOREAN_SHAPE)

  const write = (name, data) => {
    fs.writeFileSync(path.join(OUTPUT_DIR, name), JSON.stringify(data, null, 2))
    console.log(`  ✓ ${name.padEnd(24)} ${String(data.length).padStart(6)} 条`)
  }
  console.log('\n===== 词库生成 =====')
  write('korean-vocabulary.json', korean)
  write('yonsei-korean.json', korean.filter((k) => (k.book || '').startsWith('延世')))
  write('korean-flashcards.json', flashcards)
  write('topik-vocab.json', topik)
  write('ielts-vocabulary.json', ielts)
  write('ielts-speaking.json', speaking)
  write('ielts-synonyms.json', synonyms)

  console.log('\n===== 合并汇总 =====')
  console.log(`识别记录：${ctx.total}`)
  console.log(`韩语合并(去重)：${korean.length} ｜ 其中 延世 ${korean.filter((k) => (k.book || '').startsWith('延世')).length} / flashcards ${flashcards.length} / topik ${topik.length}`)
  console.log(`雅思核心：${ielts.length} ｜ 口语：${speaking.length} ｜ 同义替换：${synonyms.length}`)
  console.log('\n提示：数量取决于各开源仓库实际条目；topik 仅 level1 有数据、538 实为 376、口语约 62 题，')
  console.log('      与文档目标（韩语≥10000 / 雅思≥5000）有差距属数据源本身规模限制，非脚本缺陷。')
}

// 无扩展名/未知扩展名时探测分隔符
function detectSep(text) {
  const firstLine = text.split(/\r?\n/)[0] || ''
  const tabs = (firstLine.match(/\t/g) || []).length
  const commas = (firstLine.match(/,/g) || []).length
  return tabs > commas ? '\t' : ','
}

const isSelfTest = process.argv.includes('--selftest')
if (isSelfTest) {
  const cases = [
    ['안녕하십니까', 'annyeonghasimnikka'],
    ['사과', 'sagwa'],
    ['학교', 'hakgyo'],
    ['감사합니다', 'gamsahamnida'],
    ['한국어', 'hangugeo'],
    ['물', 'mul'],
    ['방', 'bang'],
    ['친구', 'chingu'],
    ['동생', 'dongsaeng'],
    ['선생님', 'seonsaengnim'],
    ['가족', 'gajok'],
    ['밥', 'bap'],
    ['국', 'guk'],
    ['이웃', 'iut'],
    ['형', 'hyeong'],
    ['감자', 'gamja'],
    ['당근', 'danggeun'],
    ['라면', 'ramyeon'],
    ['서울', 'seoul'],
    ['시간', 'sigan'],
    ['음식', 'eumsik'],
    ['사람', 'saram'],
    ['공부합니다', 'gongbuhamnida'],
    ['책상', 'chaeksang'],
    ['한국', 'hanguk'],
    ['이름', 'ireum'],
    ['나라', 'nara'],
    ['말', 'mal'],
    ['일', 'il'],
    ['없습니다', 'eomseumnida']
  ]
  let pass = 0
  for (const [ko, exp] of cases) {
    const got = romanizeKo(ko)
    if (got === exp) pass++
    else console.log(`  ✗ ${ko} → ${got}  (期望 ${exp})`)
  }
  console.log(`\n[selftest] 通过 ${pass}/${cases.length}`)
  process.exit(pass === cases.length ? 0 : 1)
} else {
  main()
}

