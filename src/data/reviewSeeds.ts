import { DIALOGUES } from './dialogue'
import { LISTENING } from './ielts'
import type { ReviewItem, WordbookItem, WrongItem } from '../types'

export type ReviewSeed = Omit<ReviewItem, 'card' | 'createdAt' | 'updatedAt'>

/**
 * 首次打开复习功能时使用的公开示例内容。
 * 个人单词本/错题本通过 createPersonalReviewItems() 追加，不会覆盖已有 FSRS 状态。
 */
export const DEFAULT_REVIEW_ITEMS: ReviewSeed[] = [
  ...DIALOGUES.flatMap((scene) =>
    scene.lines.map((line, index) => ({
      id: `dialogue-${scene.scene}-${index}`,
      language: 'ko' as const,
      kind: 'sentence' as const,
      title: `${scene.scene} · ${line.speaker === 'B' ? '我的台词' : '对方'}`,
      prompt: line.ko,
      answer: line.ko,
      translation: line.zh,
      source: '韩语情景对话',
      href: '/korean/dialogue',
    }))
  ),
  ...LISTENING.flatMap((item) =>
    item.script
      .split(/(?<=[.!?])\s+/)
      .filter(Boolean)
      .map((sentence, index) => ({
        id: `ielts-listening-${item.id}-${index}`,
        language: 'en' as const,
        kind: 'listening' as const,
        title: `${item.title} · 第 ${index + 1} 句`,
        prompt: sentence,
        answer: sentence,
        source: '雅思听力示例',
        href: '/ielts/listening',
      }))
  ),
]

/** 把单词本和错题本映射为稳定 ID 的复习卡，兼容功能上线前已有的本地数据。 */
export function createPersonalReviewItems(wordbook: WordbookItem[], wrongbook: WrongItem[]): ReviewSeed[] {
  return [
    ...wordbook.map((item) => {
      const prompt = item.korean || item.english || item.chinese
      return {
        id: `wordbook-${item.id}`,
        language: item.category === 'ielts' ? ('en' as const) : ('ko' as const),
        kind: 'word' as const,
        title: `${item.source} · ${prompt}`,
        prompt,
        answer: prompt,
        translation: item.chinese,
        source: `${item.source} · 单词本`,
        href: `/${item.category}/wordbook`,
      }
    }),
    ...wrongbook.map((item) => ({
      id: `wrong-${item.id}`,
      language: item.category === 'ielts' ? ('en' as const) : ('ko' as const),
      kind: 'grammar' as const,
      title: `${item.source} · 错题回流`,
      prompt: item.question,
      answer: item.correct,
      translation: `你的答案：${item.yourAnswer}`,
      source: `${item.source} · 错题本`,
      href: `/${item.category}/wrong`,
    })),
  ]
}
