// 全局数据类型定义

export type SoundCategory = 'vowel' | 'consonant' | 'batchim'
export type Mastery = 'unlearned' | 'learning' | 'mastered'

export interface Sound {
  char: string
  romanization: string
  name: string
  category: SoundCategory
  // 分组（元音细分为单元音/双元音；辅音细分为松/紧/送气/鼻流/摩擦；收音细分为代表音）
  group: string
  description: string // 口型/部位图解说明
  example?: { word: string; roman: string; zh: string }
  // 手写笔顺：每笔用一组坐标点（相对 0~1 网格）表示，用于虚线引导
  strokes?: number[][][]
  represents?: string // 收音代表音说明
}

export interface VocabWord {
  korean: string
  romanization: string
  chinese: string
  pos?: string // 词性
  example?: string
  exampleZh?: string
  level?: string // TOPIK 等级
  topic: string
}

export interface GrammarPoint {
  id: string
  level: string // 初级/中级/高级
  pattern: string
  name: string
  explanation: string // >=300 字
  conjugation: string
  examples: { ko: string; roman: string; zh: string }[]
  notes: string
  mnemonic: string
  common_errors: { wrong: string; reason: string }[]
  quiz: { q: string; a: string }[]
}

export interface DialogueLine {
  speaker: string
  ko: string
  roman: string
  zh: string
}
export interface DialogueScene {
  scene: string
  icon: string
  lines: DialogueLine[]
  vocabulary: { word: string; zh: string }[]
  grammar: string[]
}

export interface PronunciationRule {
  id: string
  category: string
  rule: string
  formula: string
  examples: { ko: string; roman: string; zh: string; ipa?: string }[]
  common_errors: string[]
}

export interface CultureTopic {
  id: string
  category: string
  title: string
  body: string
  words: { word: string; zh: string }[]
  quiz: { q: string; a: string }[]
}

// 雅思
export interface IeltsListeningItem {
  id: string
  title: string
  accent: string
  script: string // 文本（无真实音频时用文本+发音）
  questions: { q: string; a: string }[]
}
export interface IeltsReadingArticle {
  id: string
  title: string
  topic: string
  level: string
  body: string
  questions: { q: string; a: string }[]
}
export interface IeltsSpeakingTopic {
  id: string
  part: string
  category: string
  question: string
  sample: { score: string; text: string }[]
  keywords: string[]
}
export interface IeltsWritingTask {
  id: string
  type: string
  topic: string
  prompt: string
  outline: string
}

// 单词本/错题本归属分类
export type BoardCategory = 'korean' | 'ielts'
// 单词掌握度
export type WordMastery = 'unlearned' | 'learning' | 'mastered'

export interface WordbookItem {
  id: string
  source: string // 模块来源
  category: BoardCategory // 韩语 / 雅思
  korean?: string // 韩文（韩语单词）
  romanization?: string // 罗马音
  english?: string // 英文（雅思单词）
  phonetic?: string // 音标
  pos?: string // 词性
  chinese: string
  createdAt: number
  mastery: WordMastery // 掌握度：未学/学习中/已掌握
}
export interface WrongItem {
  id: string
  source: string
  category: BoardCategory
  question: string
  yourAnswer: string
  correct: string
  createdAt: number
}
