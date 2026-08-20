import { createEmptyCard, fsrs, Rating } from 'ts-fsrs'
import type { Card, Grade } from 'ts-fsrs'
import type { ReviewItem, ReviewRating, SerializedCard } from '../types/review'

const scheduler = fsrs()

const ratingMap: Record<ReviewRating, Grade> = {
  again: Rating.Again as Grade,
  hard: Rating.Hard as Grade,
  good: Rating.Good as Grade,
  easy: Rating.Easy as Grade,
}

export function serializeCard(card: Card): SerializedCard {
  const { due, last_review, ...rest } = card
  return {
    ...rest,
    due: due.toISOString(),
    ...(last_review ? { last_review: last_review.toISOString() } : {}),
  }
}

export function deserializeCard(card: SerializedCard): Card {
  const { due, last_review, ...rest } = card
  return {
    ...rest,
    due: new Date(due),
    ...(last_review ? { last_review: new Date(last_review) } : {}),
  }
}

export function createReviewItem(
  item: Omit<ReviewItem, 'card' | 'createdAt' | 'updatedAt'> & { card?: SerializedCard },
  now = new Date()
): ReviewItem {
  const card = item.card ? deserializeCard(item.card) : createEmptyCard(now)
  return {
    ...item,
    card: serializeCard(card),
    createdAt: now.getTime(),
    updatedAt: now.getTime(),
  }
}

export function reviewItem(item: ReviewItem, rating: ReviewRating, now = new Date()): ReviewItem {
  const result = scheduler.next(deserializeCard(item.card), now, ratingMap[rating])
  return {
    ...item,
    card: serializeCard(result.card),
    updatedAt: now.getTime(),
  }
}

export function isDue(item: ReviewItem, now = new Date()): boolean {
  return new Date(item.card.due).getTime() <= now.getTime()
}

export function dueDateLabel(item: ReviewItem, now = new Date()): string {
  const due = new Date(item.card.due)
  if (isDue(item, now)) return '现在'
  const diff = due.getTime() - now.getTime()
  const minutes = Math.max(1, Math.round(diff / 60_000))
  if (minutes < 60) return `${minutes} 分钟后`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} 小时后`
  return `${Math.round(hours / 24)} 天后`
}

