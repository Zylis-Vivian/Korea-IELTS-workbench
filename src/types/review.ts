import type { Card } from 'ts-fsrs'

export type ReviewLanguage = 'ko' | 'en'
export type ReviewKind = 'sentence' | 'listening' | 'word' | 'grammar'
export type ReviewRating = 'again' | 'hard' | 'good' | 'easy'
export type DictationErrorType = 'omission' | 'substitution' | 'spacing' | 'punctuation' | 'spelling' | 'unknown'

export interface DictationStats {
  attempts: number
  correct: number
  wrong: number
  errorTypes: Partial<Record<DictationErrorType, number>>
  lastErrorType?: DictationErrorType
}

/**
 * FSRS 的 Card 使用 Date，不能直接安全地序列化到 localStorage。
 * 用字符串保存时间，读取时再恢复成 Date，避免刷新后复习状态失效。
 */
export interface SerializedCard extends Omit<Card, 'due' | 'last_review'> {
  due: string
  last_review?: string
}

export interface ReviewItem {
  id: string
  language: ReviewLanguage
  kind: ReviewKind
  title: string
  prompt: string
  answer?: string
  translation?: string
  source?: string
  href?: string
  /** 听写专用统计；可选以兼容已有本地复习卡。 */
  dictation?: DictationStats
  card: SerializedCard
  createdAt: number
  updatedAt: number
}
