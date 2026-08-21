// 延世韩国语 1-6 的教材明细接入层。
//
// 这里使用 curriculum-preserving 数据，而不是通用词库的去重结果：同一个
// 韩语词如果在不同课次/单元出现，必须保留为不同教材记录，才能支持打印、
// 按教材顺序学习和影子跟读。
import type { VocabWord } from '../types'
import rawYonsei from '../../data/yonsei-curriculum.json'

export interface YonseiVolumeMeta {
  volume: number
  book: string
  unitsPerChapter: number
  accent: string
  chapters: {
    chapter: number
    ko: string
    zh: string
    en: string
  }[]
}

export interface YonseiWord extends VocabWord {
  id: string
  entryId: string
  volume: number
  book: string
  chapter: number
  lesson: number
  unit: number
  sequence: number
  sourceOrder: number
  chapterKo: string
  chapterZh: string
  chapterEn: string
  entryKind?: string
  reviewStatus?: string
  matchConfidence?: number
  dictionarySource?: string
  revisionNote?: string
}

interface CurriculumPayload {
  schemaVersion: number
  projectVersion: string
  sourceRepository: string
  rowCount: number
  uniqueKoreanCount: number
  volumes: YonseiVolumeMeta[]
  rows: YonseiWord[]
}

const PAYLOAD = rawYonsei as unknown as CurriculumPayload

export const YONSEI_META = PAYLOAD
export const YONSEI_VOLUMES = PAYLOAD.volumes
export const YONSEI_WORDS: YonseiWord[] = PAYLOAD.rows

export interface YonseiLesson {
  key: string
  volume: number
  book: string
  lesson: number
  titleKo: string
  titleZh: string
  titleEn: string
  units: number[]
  rowCount: number
  accent: string
}

const volumeByNumber = new Map(YONSEI_VOLUMES.map((volume) => [volume.volume, volume]))
const lessonMap = new Map<string, YonseiLesson>()

for (const word of YONSEI_WORDS) {
  const key = `${word.volume}-${word.lesson}`
  if (lessonMap.has(key)) {
    const lesson = lessonMap.get(key)!
    lesson.units = Array.from(new Set([...lesson.units, word.unit])).sort((a, b) => a - b)
    lesson.rowCount += 1
    continue
  }
  const volume = volumeByNumber.get(word.volume)
  lessonMap.set(key, {
    key,
    volume: word.volume,
    book: word.book,
    lesson: word.lesson,
    titleKo: word.chapterKo,
    titleZh: word.chapterZh,
    titleEn: word.chapterEn,
    units: [word.unit],
    rowCount: 1,
    accent: volume?.accent || '#7B5EA7',
  })
}

export const YONSEI_LESSONS = Array.from(lessonMap.values()).sort(
  (a, b) => a.volume - b.volume || a.lesson - b.lesson
)

export function yonseiSectionLabel(word: Pick<YonseiWord, 'volume' | 'lesson' | 'unit'>) {
  return `第${word.volume}册—第${word.lesson}课—第${word.unit}单元`
}

// 兼容旧的主题型词库接口；主题对应教材课次，供其他组件或旧链接继续使用。
export interface KoreanTopic {
  topic: string
  words: VocabWord[]
}

const topicMap = new Map<string, VocabWord[]>()
for (const word of YONSEI_WORDS) {
  const words = topicMap.get(word.topic) || []
  words.push(word)
  topicMap.set(word.topic, words)
}

export const YONSEI_TOPICS: KoreanTopic[] = Array.from(topicMap, ([topic, words]) => ({ topic, words }))

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
