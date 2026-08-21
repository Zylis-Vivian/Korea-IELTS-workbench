// scripts/rebuild-manifest.mjs
// 从已生成的 MP3 反推 manifest：文件名即 sha1(文本) 前 24 位，直接重建映射，无需重新合成。
import { build } from 'esbuild'
import { writeFileSync, readdirSync, statSync, rmSync } from 'fs'
import { createHash } from 'crypto'
import { fileURLToPath, pathToFileURL } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const OUT_DIR = join(root, 'public', 'audio', 'ko')
const MANIFEST = join(OUT_DIR, 'manifest.json')

const collector = `
import { ALPHABET } from './src/data/alphabet'
import { PRONUNCIATION } from './src/data/pronunciation'
import { VOCAB } from './src/data/vocab'
import { DIALOGUES } from './src/data/dialogue'
import { GRAMMAR } from './src/data/grammar'
import { YONSEI_WORDS } from './src/data/yonseiVocab'
import { applyPhoneticsIfNeeded } from './src/utils/koreanPhonetics'

const out = new Set()
const add = (s) => {
  if (typeof s !== 'string') return
  const t = s.trim()
  if (!t) return
  if (!/[가-힣]/.test(t)) return
  if (/[a-zA-Z→★·]/.test(t)) return
  out.add(applyPhoneticsIfNeeded(t))
}
const addYonsei = (s) => {
  if (typeof s !== 'string') return
  const t = s.trim().normalize('NFC')
  if (!t) return
  out.add(applyPhoneticsIfNeeded(t))
}
YONSEI_WORDS.forEach((w) => addYonsei(w.korean))
ALPHABET.forEach((s) => { if (s.example && s.example.word) add(s.example.word); add(s.char) })
PRONUNCIATION.forEach((r) => r.examples.forEach((e) => add(e.ko)))
VOCAB.forEach((topic) => topic.words.forEach((w) => add(w.korean)))
DIALOGUES.forEach((d) => { d.lines.forEach((l) => add(l.ko)); ; d.vocabulary.forEach((v) => add(v.word)) })
GRAMMAR.forEach((g) => g.examples.forEach((e) => add(e.ko)))
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

const files = new Set(readdirSync(OUT_DIR).filter((f) => f.endsWith('.mp3') && statSync(join(OUT_DIR, f)).size >= 2048))
const hash = (s) => createHash('sha1').update(s, 'utf8').digest('hex').slice(0, 24)

const manifest = {}
let missed = 0
for (const s of STRINGS) {
  const file = hash(s) + '.mp3'
  if (files.has(file)) manifest[s] = file
  else missed++
}
writeFileSync(MANIFEST, JSON.stringify(manifest))
console.log(`manifest 条目: ${Object.keys(manifest).length} / 待生成 ${STRINGS.length}，缺失 ${missed}`)
