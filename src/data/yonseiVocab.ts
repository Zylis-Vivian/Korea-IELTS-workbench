// 延世韩国语 1-6 词库（open-yonsei-korean-vocabulary）的前端接入层。
// 由 scripts/merge-vocabulary.mjs 清洗后输出到 data/yonsei-korean.json，
// 此处将其扁平词条转换为工作台既有的 VocabWord 结构，并按 topic 分组，
// 供「词汇学习」模块的「词库切换」使用。
//
// 红线：本文件为新增模块，绝不修改 src/data/vocab.ts 的现有词条；
// 仅做 import + 字段映射 + 分组，属于对黄金代码的「追加接入」。
import type { VocabWord } from '../types'
import rawYonsei from '../../data/yonsei-korean.json'

// data/yonsei-korean.json 的真实字段（与 merge-vocabulary.mjs 的 korean shape 对齐）
interface RawYonsei {
  id: string
  korean: string
  english: string
  chinese: string
  romanization: string
  partOfSpeech: string
  level: string
  topic: string
  book: string
  grammar: string
  source: string
}

const RAW = rawYonsei as unknown as RawYonsei[]

// 由教材名（延世韩国语N）推导册数，作为 TOPIK 等级近似，
// 使「词汇预览」的 TOPIK 等级筛选在延世词库上同样可用。
function levelFromBook(book: string): string {
  const m = /(\d+)/.exec(book || '')
  return m ? m[1] : ''
}

function toVocabWord(r: RawYonsei): VocabWord {
  return {
    korean: r.korean,
    romanization: r.romanization,
    chinese: r.chinese || r.english,
    pos: r.partOfSpeech || undefined,
    grammar: r.grammar || undefined,
    level: levelFromBook(r.book),
    topic: r.topic,
    book: r.book || undefined,
    category: '延世韩国语',
    source: r.source || undefined,
    english: r.english || undefined,
  }
}

// 扁平词表（已按原序映射）
export const YONSEI_WORDS: VocabWord[] = RAW.map(toVocabWord)

// 按 topic 分组（与 VOCAB 的 Topic 结构同形：{ topic, words }）
export interface KoreanTopic {
  topic: string
  words: VocabWord[]
}

const groupMap = new Map<string, VocabWord[]>()
for (const w of YONSEI_WORDS) {
  if (!groupMap.has(w.topic)) groupMap.set(w.topic, [])
  groupMap.get(w.topic)!.push(w)
}
// 保持数据文件中的 topic 出现顺序
const orderedTopics: string[] = []
for (const w of YONSEI_WORDS) if (!orderedTopics.includes(w.topic)) orderedTopics.push(w.topic)

export const YONSEI_TOPICS: KoreanTopic[] = orderedTopics.map((topic) => ({
  topic,
  words: groupMap.get(topic)!,
}))

// 词库清单（供 DictionarySwitcher 使用）
export interface DictMeta {
  id: string
  name: string
  category: string
  length: number
  language: 'ko' | 'en'
}

export const DICTIONARIES: DictMeta[] = [
  { id: 'core', name: '核心词库', category: '韩语', length: 0, language: 'ko' },
  { id: 'yonsei', name: '延世韩国语 1-6', category: '韩语教材', length: YONSEI_WORDS.length, language: 'ko' },
]
