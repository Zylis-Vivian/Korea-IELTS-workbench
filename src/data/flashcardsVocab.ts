// Korean Flashcards 词库（niksavis/korean-flashcards）前端接入层。
// 由 scripts/merge-vocabulary.mjs 清洗后输出到 data/korean-flashcards.json，
// 此处将扁平词条转换为工作台既有的 VocabWord 结构，按 topic 分组，
// 供「词汇学习」模块的「词库切换」使用。
//
// 红线：新增模块，绝不修改 src/data/vocab.ts 现有词条；仅 import + 字段映射 + 分组。
import type { VocabWord } from '../types'
import { type KoreanTopic } from './yonseiVocab'
import rawFlash from '../../data/korean-flashcards.json'

interface RawFlash {
  id: string
  korean: string
  english: string
  chinese: string
  romanization: string
  partOfSpeech: string
  level: string
  topic: string
  book: string
  phonetic: string
  exampleSentences: { korean: string; english: string; chinese: string }[]
  source: string
}

const RAW = rawFlash as unknown as RawFlash[]

function toVocabWord(r: RawFlash): VocabWord {
  const ex = (r.exampleSentences || [])[0]
  return {
    korean: r.korean,
    romanization: r.romanization,
    chinese: r.chinese || r.english, // 无中文释义时回落到英文释义
    pos: r.partOfSpeech || undefined,
    level: r.level || undefined,
    topic: r.topic,
    book: 'korean-flashcards',
    category: '韩语日常',
    source: r.source,
    english: r.english || undefined,
    example: ex?.korean || undefined,
    exampleZh: ex?.english || ex?.chinese || undefined,
  }
}

export const FLASH_WORDS: VocabWord[] = RAW.map(toVocabWord)

const groupMap = new Map<string, VocabWord[]>()
for (const w of FLASH_WORDS) {
  if (!groupMap.has(w.topic)) groupMap.set(w.topic, [])
  groupMap.get(w.topic)!.push(w)
}
const orderedTopics: string[] = []
for (const w of FLASH_WORDS) if (!orderedTopics.includes(w.topic)) orderedTopics.push(w.topic)

export const FLASH_TOPICS: KoreanTopic[] = orderedTopics.map((topic) => ({
  topic,
  words: groupMap.get(topic)!,
}))
