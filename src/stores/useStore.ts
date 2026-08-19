import { create } from 'zustand'
import type { Mastery, WordbookItem, WrongItem, BoardCategory, WordMastery, NewWordbookItem, ReviewItem, ReviewRating } from '../types'
import type { TtsEngine, TtsGender } from '../hooks/usePronunciation'
import type { TestReport } from '../utils/pronunciationTest'
import { localDateKey } from '../utils/localDate'
import { createReviewItem, reviewItem } from '../utils/review'

export type PronLevel = 'unknown' | 'green' | 'yellow' | 'red'

interface CheckinDay {
  date: string // YYYY-MM-DD
  count: number
  durationMin: number
}

interface State {
  // 四十音掌握状态  char -> mastery
  mastery: Record<string, Mastery>
  // 手写练习统计 char -> { count, totalScore }
  handwriting: Record<string, { count: number; totalScore: number }>
  // 学习时长（分钟）按日期
  studyMinutes: Record<string, number>
  // 连续打卡
  checkin: Record<string, CheckinDay>
  // 单词本 / 错题本
  wordbook: WordbookItem[]
  wrongbook: WrongItem[]
  // 设置
  settings: {
    fontSize: number // px
    showVideo: boolean
    ttsSpeed: number
    ttsEngine: TtsEngine // 发音引擎：auto / azure / google / web
    ttsGender: TtsGender // 声线：female / male（主要影响 Azure）
  }
  // 发音引擎状态（供右下角指示器与设置面板展示）
  pronStatus: {
    level: PronLevel
    activeEngine?: string
    webVoices: string[]
    report?: TestReport
    lastTest?: number
  }
  // 刷词（单词总汇）掌握标记：词key(korean) -> 状态
  flashState: Record<string, 'known' | 'unknown'>
  // 每日刷词进度：日期(YYYY-MM-DD) -> 词key -> 状态（每日自动更新词表）
  dailyState: Record<string, Record<string, 'known' | 'unknown'>>
  // 统一复习队列：词汇、句子、听力和语法共用 FSRS 调度
  reviewItems: ReviewItem[]

  setMastery: (char: string, m: Mastery) => void
  recordHandwriting: (char: string, score: number) => void
  addStudyMinutes: (min: number) => void
  addCheckin: () => void
  addWord: (w: NewWordbookItem) => void
  removeWord: (id: string) => void
  setWordMastery: (id: string, m: WordMastery) => void
  clearWordbook: (category: BoardCategory) => void
  addWrong: (w: Omit<WrongItem, 'id' | 'createdAt'>) => void
  removeWrong: (id: string) => void
  clearWrongbook: (category: BoardCategory) => void
  updateSettings: (s: Partial<State['settings']>) => void
  setPronStatus: (s: Partial<State['pronStatus']>) => void
  markFlash: (korean: string, status: 'known' | 'unknown') => void
  markDaily: (date: string, korean: string, status: 'known' | 'unknown') => void
  upsertReviewItem: (item: ReviewItem) => void
  upsertReviewItems: (items: ReviewItem[]) => void
  review: (id: string, rating: ReviewRating) => void
}

const KEY = 'lavender-study-v1'

function load(): Partial<State> {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const data = JSON.parse(raw) as Partial<State>
    // 旧数据兼容：单词本/错题本补全 category、mastery 字段，默认归韩语
    if (Array.isArray(data.wordbook)) {
      data.wordbook = data.wordbook.map((w) => ({
        ...w,
        category: w.category || 'korean',
        mastery: w.mastery || 'unlearned',
      }))
    }
    if (Array.isArray(data.wrongbook)) {
      data.wrongbook = data.wrongbook.map((w) => ({
        ...w,
        category: w.category || 'korean',
      }))
    }
    // V2 安全迁移：旧版本曾把第三方 client_secret 放进 settings.audioConfig。
    // 立即从持久化数据中移除，同时保留其他学习进度。
    const legacySettings = data.settings as (State['settings'] & { audioConfig?: unknown }) | undefined
    if (legacySettings?.audioConfig) {
      const { audioConfig: _removed, ...safeSettings } = legacySettings
      data.settings = safeSettings
      localStorage.setItem(KEY, JSON.stringify(data))
    }
    return data
  } catch {
    return {}
  }
}
function save(s: State) {
  const { mastery, handwriting, studyMinutes, checkin, wordbook, wrongbook, settings, flashState, dailyState, reviewItems } = s
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({ mastery, handwriting, studyMinutes, checkin, wordbook, wrongbook, settings, flashState, dailyState, reviewItems })
    )
  } catch {
    // Private browsing, disabled storage, or quota exhaustion must not break study actions.
  }
}

const today = () => localDateKey()

const DEFAULT_SETTINGS: State['settings'] = {
  fontSize: 16,
  showVideo: true,
  ttsSpeed: 1,
  ttsEngine: 'auto',
  ttsGender: 'female',
}

const init = load()

export const useStore = create<State>((set, get) => ({
  mastery: init.mastery || {},
  handwriting: init.handwriting || {},
  studyMinutes: init.studyMinutes || {},
  checkin: init.checkin || {},
  wordbook: init.wordbook || [],
  wrongbook: init.wrongbook || [],
  settings: {
    fontSize: init.settings?.fontSize ?? DEFAULT_SETTINGS.fontSize,
    showVideo: init.settings?.showVideo ?? DEFAULT_SETTINGS.showVideo,
    ttsSpeed: init.settings?.ttsSpeed ?? DEFAULT_SETTINGS.ttsSpeed,
    ttsEngine: init.settings?.ttsEngine ?? DEFAULT_SETTINGS.ttsEngine,
    ttsGender: init.settings?.ttsGender ?? DEFAULT_SETTINGS.ttsGender,
  },
  pronStatus: init.pronStatus || { level: 'unknown', webVoices: [] },
  flashState: init.flashState || {},
  dailyState: init.dailyState || {},
  reviewItems: init.reviewItems || [],

  setMastery: (char, m) =>
    set((s) => {
      const ns = { ...s, mastery: { ...s.mastery, [char]: m } }
      save(ns)
      return ns
    }),
  recordHandwriting: (char, score) =>
    set((s) => {
      const prev = s.handwriting[char] || { count: 0, totalScore: 0 }
      const ns = {
        ...s,
        handwriting: {
          ...s.handwriting,
          [char]: { count: prev.count + 1, totalScore: prev.totalScore + score },
        },
      }
      save(ns)
      return ns
    }),
  addStudyMinutes: (min) =>
    set((s) => {
      const d = today()
      const ns = {
        ...s,
        studyMinutes: { ...s.studyMinutes, [d]: (s.studyMinutes[d] || 0) + min },
      }
      save(ns)
      return ns
    }),
  addCheckin: () =>
    set((s) => {
      const d = today()
      const day = s.checkin[d] || { date: d, count: 0, durationMin: 0 }
      const ns = {
        ...s,
        checkin: { ...s.checkin, [d]: { ...day, count: day.count + 1 } },
      }
      save(ns)
      return ns
    }),
  addWord: (w) =>
    set((s) => {
      const item: WordbookItem = {
        ...w,
        id: Date.now() + '_' + Math.random(),
        createdAt: Date.now(),
        category: w.category || 'korean',
        mastery: w.mastery || 'unlearned',
      }
      const prompt = item.korean || item.english || item.chinese
      const review = createReviewItem({
        id: `wordbook-${item.id}`,
        language: item.category === 'ielts' ? 'en' : 'ko',
        kind: 'word',
        title: `${item.source} · ${prompt}`,
        prompt,
        answer: prompt,
        translation: item.chinese,
        source: `${item.source} · 单词本`,
        href: `/${item.category}/wordbook`,
      })
      const ns = { ...s, wordbook: [item, ...s.wordbook], reviewItems: [...s.reviewItems, review] }
      save(ns)
      return ns
    }),
  removeWord: (id) =>
    set((s) => {
      const ns = { ...s, wordbook: s.wordbook.filter((x) => x.id !== id) }
      save(ns)
      return ns
    }),
  setWordMastery: (id, m) =>
    set((s) => {
      const ns = { ...s, wordbook: s.wordbook.map((x) => (x.id === id ? { ...x, mastery: m } : x)) }
      save(ns)
      return ns
    }),
  clearWordbook: (category) =>
    set((s) => {
      const ns = { ...s, wordbook: s.wordbook.filter((x) => x.category !== category) }
      save(ns)
      return ns
    }),
  addWrong: (w) =>
    set((s) => {
      const item: WrongItem = {
        ...w,
        id: Date.now() + '_' + Math.random(),
        createdAt: Date.now(),
        category: w.category || 'korean',
      }
      const review = createReviewItem({
        id: `wrong-${item.id}`,
        language: item.category === 'ielts' ? 'en' : 'ko',
        kind: 'grammar',
        title: `${item.source} · 错题回流`,
        prompt: item.question,
        answer: item.correct,
        translation: `你的答案：${item.yourAnswer}`,
        source: `${item.source} · 错题本`,
        href: `/${item.category}/wrong`,
      })
      const ns = { ...s, wrongbook: [item, ...s.wrongbook], reviewItems: [...s.reviewItems, review] }
      save(ns)
      return ns
    }),
  removeWrong: (id) =>
    set((s) => {
      const ns = { ...s, wrongbook: s.wrongbook.filter((x) => x.id !== id) }
      save(ns)
      return ns
    }),
  clearWrongbook: (category) =>
    set((s) => {
      const ns = { ...s, wrongbook: s.wrongbook.filter((x) => x.category !== category) }
      save(ns)
      return ns
    }),
  updateSettings: (s2) =>
    set((s) => {
      const ns = { ...s, settings: { ...s.settings, ...s2 } }
      save(ns)
      return ns
    }),
  setPronStatus: (s2) =>
    set((s) => ({ ...s, pronStatus: { ...s.pronStatus, ...s2 } })),
  markFlash: (korean, status) =>
    set((s) => {
      const ns = { ...s, flashState: { ...s.flashState, [korean]: status } }
      save(ns)
      return ns
    }),
  markDaily: (date, korean, status) =>
    set((s) => {
      const dayMap = { ...(s.dailyState[date] || {}), [korean]: status }
      const ns = { ...s, dailyState: { ...s.dailyState, [date]: dayMap } }
      save(ns)
      return ns
    }),
  upsertReviewItem: (item) =>
    set((s) => {
      const exists = s.reviewItems.some((x) => x.id === item.id)
      const reviewItems = exists ? s.reviewItems.map((x) => (x.id === item.id ? item : x)) : [...s.reviewItems, item]
      const ns = { ...s, reviewItems }
      save(ns)
      return ns
    }),
  upsertReviewItems: (items) =>
    set((s) => {
      if (!items.length) return s
      const next = new Map(s.reviewItems.map((item) => [item.id, item]))
      items.forEach((item) => next.set(item.id, item))
      const ns = { ...s, reviewItems: Array.from(next.values()) }
      save(ns)
      return ns
    }),
  review: (id, rating) =>
    set((s) => {
      const reviewItems = s.reviewItems.map((item) => (item.id === id ? reviewItem(item, rating) : item))
      const ns = { ...s, reviewItems }
      save(ns)
      return ns
    }),
}))

// 辅助：连续打卡天数
export function currentStreak(checkin: Record<string, CheckinDay>): number {
  let streak = 0
  const d = new Date()
  for (;;) {
    const key = localDateKey(d)
    if (checkin[key]) {
      streak++
      d.setDate(d.getDate() - 1)
    } else break
  }
  return streak
}
