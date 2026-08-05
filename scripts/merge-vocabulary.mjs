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
function collectFiles(dir) {
  const exts = new Set(['.csv', '.tsv', '.json', '.jsonl', '.txt'])
  const out = []
  const walk = (d) => {
    let entries = []
    try { entries = fs.readdirSync(d, { withFileTypes: true }) } catch { return }
    for (const e of entries) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (exts.has(path.extname(e.name).toLowerCase())) out.push(p)
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

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------
function main() {
  if (!fs.existsSync(INPUT_DIR)) {
    console.warn(`[跳过] 输入目录不存在：${INPUT_DIR}`)
    console.warn('       请先把开源词库文件（CSV/JSON 等）放入 tmp/ 目录后再运行。')
    return
  }

  const files = collectFiles(INPUT_DIR)
  if (!files.length) {
    console.warn(`[跳过] 在 ${INPUT_DIR} 下未找到任何 .csv/.tsv/.json/.jsonl/.txt 文件。`)
    return
  }

  const koreanMap = new Map()
  const ieltsMap = new Map()
  const speakMap = new Map()
  const synMap = new Map()
  const skipped = []
  let total = 0

  for (const file of files) {
    const fileName = path.basename(file)
    let text = ''
    try { text = fs.readFileSync(file, 'utf8') } catch (e) { skipped.push(`${fileName}: 读取失败 ${e.message}`); continue }
    const ext = path.extname(file).toLowerCase()
    let records = []
    if (ext === '.csv') records = parseDelimited(text, ',')
    else if (ext === '.tsv') records = parseDelimited(text, '\t')
    else if (ext === '.jsonl') records = parseJSONL(text)
    else if (ext === '.json') records = parseJSON(text, fileName)
    else records = parseDelimited(text, detectSep(text))

    for (const rec of records) {
      const norm = normalize(rec, fileName)
      if (!norm) { skipped.push(`${fileName}: 无法识别的记录 ${JSON.stringify(rec).slice(0, 60)}`); continue }
      total++
      const { type, item } = norm
      if (type === 'korean') mergeInto(koreanMap, item.korean, item, type)
      else if (type === 'ielts') mergeInto(ieltsMap, item.english, item, type)
      else if (type === 'speaking') mergeInto(speakMap, item.question, item, type)
      else if (type === 'synonym') mergeInto(synMap, item.word + '→' + item.synonym, item, type)
    }
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const korean = finalize(koreanMap, 'ko', (r) => ({
    korean: r.korean, english: r.english, chinese: r.chinese, romanization: r.romanization,
    partOfSpeech: r.partOfSpeech, level: r.level, topic: r.topic, book: r.book,
    phonetic: r.phonetic, exampleSentences: r.exampleSentences || []
  }))
  const ielts = finalize(ieltsMap, 'en', (r) => ({
    english: r.english, chinese: r.chinese, phonetic: r.phonetic, partOfSpeech: r.partOfSpeech,
    level: r.level, topic: r.topic, exampleSentences: r.exampleSentences || []
  }))
  const speaking = finalize(speakMap, 'sp', (r) => ({
    question: r.question, topic: r.topic, answer: r.answer, part: r.part
  }))
  const synonyms = finalize(synMap, 'sy', (r) => ({
    word: r.word, synonym: r.synonym, group: r.group
  }))

  const write = (name, data) => {
    fs.writeFileSync(path.join(OUTPUT_DIR, name), JSON.stringify(data, null, 2))
    console.log(`  ✓ ${name.padEnd(24)} ${String(data.length).padStart(6)} 条`)
  }
  write('korean-vocabulary.json', korean)
  write('ielts-vocabulary.json', ielts)
  write('ielts-speaking.json', speaking)
  write('ielts-synonyms.json', synonyms)

  console.log('\n===== 合并汇总 =====')
  console.log(`扫描文件：${files.length}`)
  console.log(`识别记录：${total}`)
  console.log(`跳过记录：${skipped.length}`)
  if (skipped.length) {
    console.log('—— 跳过样例（前 10 条）——')
    skipped.slice(0, 10).forEach((s) => console.log('   · ' + s))
  }
  console.log('\n提示：若数量未达目标（韩语≥10000 / 雅思≥5000 / 口语≥200 / 同义≥538），')
  console.log('      请确认 tmp/ 下已包含对应开源词库文件，或检查其表头是否被识别。')
}

// 无扩展名/未知扩展名时探测分隔符
function detectSep(text) {
  const firstLine = text.split(/\r?\n/)[0] || ''
  const tabs = (firstLine.match(/\t/g) || []).length
  const commas = (firstLine.match(/,/g) || []).length
  return tabs > commas ? '\t' : ','
}

main()
