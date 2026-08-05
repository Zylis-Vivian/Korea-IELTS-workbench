// 单词本 / 错题本 导入工具：解析 CSV / JSON，归一化表头，校验并拆分为可写入 Store 的记录。
import type { BoardCategory, WordMastery } from '../types'

export type ImportWordItem = {
  type: 'word'
  source: string
  category: BoardCategory
  korean?: string
  romanization?: string
  english?: string
  phonetic?: string
  pos?: string
  chinese: string
  mastery: WordMastery
}
export type ImportWrongItem = {
  type: 'wrong'
  source: string
  category: BoardCategory
  question: string
  yourAnswer: string
  correct: string
}
export type ImportItem = ImportWordItem | ImportWrongItem
export interface ImportResult {
  items: ImportItem[]
  errors: string[] // 解析/校验跳过的行说明
}

// 表头归一化：同时支持中文表头与英文 camelCase 表头
const HEADER_MAP: Record<string, string> = {
  来源: 'source',
  source: 'source',
  分类: 'category',
  category: 'category',
  韩文: 'korean',
  korean: 'korean',
  罗马音: 'romanization',
  romanization: 'romanization',
  英文: 'english',
  english: 'english',
  音标: 'phonetic',
  phonetic: 'phonetic',
  词性: 'pos',
  pos: 'pos',
  中文: 'chinese',
  释义: 'chinese',
  意思: 'chinese',
  翻译: 'chinese',
  掌握度: 'mastery',
  mastery: 'mastery',
  题目: 'question',
  题干: 'question',
  question: 'question',
  问题: 'question',
  你的答案: 'yourAnswer',
  youanswer: 'yourAnswer',
  myanswer: 'yourAnswer',
  正确答案: 'correct',
  correct: 'correct',
  答案: 'correct',
  添加时间: 'createdAtStr',
  时间: 'createdAtStr',
  date: 'createdAtStr',
}

const MASTERY_MAP: Record<string, WordMastery> = {
  未学: 'unlearned',
  unlearned: 'unlearned',
  未学习: 'unlearned',
  学习中: 'learning',
  learning: 'learning',
  学习: 'learning',
  已掌握: 'mastered',
  mastered: 'mastered',
  掌握: 'mastered',
}

function mapCategory(v?: string): BoardCategory | null {
  if (!v) return null
  const s = v.trim().toLowerCase()
  if (['韩语', 'korean', 'ko', '한국어'].includes(s)) return 'korean'
  if (['雅思', 'ielts', 'en', '英语', '英文'].includes(s)) return 'ielts'
  return null
}
function mapMastery(v?: string): WordMastery {
  if (!v) return 'unlearned'
  return MASTERY_MAP[v.trim()] || 'unlearned'
}
const clean = (v?: string) => (v == null ? undefined : v.trim())

// 解析 CSV 文本（支持引号包裹、双引号转义、字段内逗号、BOM、\r\n）
function parseCSV(text: string): string[][] {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else inQuotes = false
      } else field += c
    } else {
      if (c === '"') inQuotes = true
      else if (c === ',') {
        row.push(field)
        field = ''
      } else if (c === '\n') {
        row.push(field)
        rows.push(row)
        row = []
        field = ''
      } else if (c !== '\r') field += c
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  // 丢弃完全空白的行
  return rows.filter((r) => !(r.length === 1 && r[0].trim() === ''))
}

type RawRow = Record<string, string>

function csvToRawRows(text: string): RawRow[] {
  const rows = parseCSV(text)
  if (rows.length === 0) return []
  const headers = rows[0].map((h) => HEADER_MAP[h.trim()] || h.trim().toLowerCase())
  const out: RawRow[] = []
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i]
    const obj: RawRow = {}
    let hasAny = false
    headers.forEach((key, idx) => {
      const val = (cells[idx] ?? '').trim()
      if (val) hasAny = true
      obj[key] = val
    })
    if (hasAny) out.push(obj)
  }
  return out
}

// JSON 对象 → 归一化 RawRow（兼容英文/camelCase 键与中文键）
function objToRawRow(obj: Record<string, any>): RawRow {
  const out: RawRow = {}
  for (const [k, v] of Object.entries(obj)) {
    const key = HEADER_MAP[k.trim()] || k.trim().toLowerCase()
    out[key] = v == null ? '' : String(v)
  }
  return out
}

function normalizeRows(rows: RawRow[], kind: 'word' | 'wrong', fallback: BoardCategory): ImportResult {
  const items: ImportItem[] = []
  const errors: string[] = []
  rows.forEach((r, i) => {
    const lineNo = i + 2 // CSV 数据从第 2 行起（含表头）
    const category = mapCategory(r.category) || fallback
    if (kind === 'word') {
      const korean = clean(r.korean)
      const english = clean(r.english)
      const chinese = clean(r.chinese)
      if (!chinese) {
        errors.push(`第 ${lineNo} 行：缺少「中文释义」，已跳过`)
        return
      }
      if (!korean && !english) {
        errors.push(`第 ${lineNo} 行：缺少「韩文」或「英文」，已跳过`)
        return
      }
      items.push({
        type: 'word',
        source: clean(r.source) || '导入',
        category,
        korean,
        romanization: clean(r.romanization),
        english,
        phonetic: clean(r.phonetic),
        pos: clean(r.pos),
        chinese,
        mastery: mapMastery(r.mastery),
      })
    } else {
      const question = clean(r.question)
      const correct = clean(r.correct)
      if (!question) {
        errors.push(`第 ${lineNo} 行：缺少「题目」，已跳过`)
        return
      }
      if (!correct) {
        errors.push(`第 ${lineNo} 行：缺少「正确答案」，已跳过`)
        return
      }
      items.push({
        type: 'wrong',
        source: clean(r.source) || '导入',
        category,
        question,
        yourAnswer: clean(r.yourAnswer) || '（未作答）',
        correct,
      })
    }
  })
  return { items, errors }
}

// 入口：根据文件名/内容自动判断 CSV 或 JSON
export function parseImportText(
  text: string,
  filename: string,
  kind: 'word' | 'wrong',
  fallback: BoardCategory
): ImportResult {
  const isJson = filename.toLowerCase().endsWith('.json') || /^\s*[[{]/.test(text)
  let rows: RawRow[]
  if (isJson) {
    const data = JSON.parse(text)
    const arr = Array.isArray(data)
      ? data
      : data?.wordbook || data?.wrongbook || data?.items || []
    if (!Array.isArray(arr)) throw new Error('JSON 需为对象数组，或含 wordbook/wrongbook/items 数组')
    rows = arr.map(objToRawRow)
  } else {
    rows = csvToRawRows(text)
  }
  if (rows.length === 0) throw new Error('未解析到任何有效数据行')
  return normalizeRows(rows, kind, fallback)
}
