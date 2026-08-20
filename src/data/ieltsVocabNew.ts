// 雅思新数据源（hefengxian/my-ielts + 1599570912/IELTS-Speaking-AI）前端接入层。
// 由 scripts/merge-vocabulary.mjs 清洗后输出到 data/ielts-*.json，
// 此处将扁平词条转换为工作台既有的 SceneWord / SynonymGroup 结构，
// 并与 ieltsVocabData 内置数据合并，供「雅思词汇学习」模块使用。
//
// 红线：新增模块，绝不修改 src/data/ieltsVocabData.ts 现有词条；
// 仅 import + 字段映射 + 合并（新增数据并行接入）。
import { synonyms as builtinSynonyms, type SynonymGroup } from './ieltsVocabData'
import rawSyn from '../../data/ielts-synonyms.json'
import rawSpeak from '../../data/ielts-speaking.json'

// ---------------------------------------------------------------------------
// 1) 同义替换（内置 + my-ielts 538/376）→ SynonymGroup
// ---------------------------------------------------------------------------
interface RawSyn {
  id: string
  word: string
  synonym: string
  group: string
  source: string
}

const RAW_S = rawSyn as unknown as RawSyn[]
const NEW_SYNONYMS: SynonymGroup[] = RAW_S.map((r) => ({
  base: r.word,
  replaces: String(r.synonym)
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean),
  note: r.group || '',
}))
export const ALL_SYNONYMS: SynonymGroup[] = [...builtinSynonyms, ...NEW_SYNONYMS]

// ---------------------------------------------------------------------------
// 2) 口语题库（按 Part 分组）
// ---------------------------------------------------------------------------
export interface SpeakItem {
  question: string
  topic: string
  part: string
}

const RAW_P = rawSpeak as unknown as SpeakItem[]
const speakMap = new Map<string, SpeakItem[]>()
for (const it of RAW_P) {
  if (!speakMap.has(it.part)) speakMap.set(it.part, [])
  speakMap.get(it.part)!.push(it)
}
export const SPEAKING_GROUPS: { part: string; items: SpeakItem[] }[] = Array.from(speakMap.entries()).map(
  ([part, items]) => ({ part, items })
)
