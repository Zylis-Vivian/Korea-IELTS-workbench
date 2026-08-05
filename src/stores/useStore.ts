import { create } from 'zustand'
import type { Mastery, WordbookItem, WrongItem, BoardCategory, WordMastery } from '../types'
import type { TtsEngine, TtsGender } from '../hooks/usePronunciation'
import type { TestReport } from '../utils/pronunciationTest'

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
    audioConfig: {
      ximalayaKey: string
      qingtingId: string
      qingtingSecret: string
    }
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

  setMastery: (char: string, m: Mastery) => void
  recordHandwriting: (char: string, score: number) => void
  addStudyMinutes: (min: number) => void
  addCheckin: () => void
  addWord: (w: Omit<WordbookItem, 'id' | 'createdAt'>) => void
  removeWord: (id: string) => void
  setWordMastery: (id: string, m: WordMastery) => void
  clearWordbook: (category: BoardCategory) => void
  addWrong: (w: Omit<WrongItem, 'id' | 'createdAt'>) => void
  removeWrong: (id: string) => void
  clearWrongbook: (category: BoardCategory) => void
  updateSettings: (s: Partial<State['settings']>) => void
  setPronStatus: (s: Partial<State['pronStatus']>) => void
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
    // 旧数据兼容：设置补 audioConfig
    if (data.settings && !data.settings.audioConfig) {
      data.settings.audioConfig = { ximalayaKey: '', qingtingId: '', qingtingSecret: '' }
    }
    return data
  } catch {
    return {}
  }
}
function save(s: State) {
  const { mastery, handwriting, studyMinutes, checkin, wordbook, wrongbook, settings, flashState, dailyState } = s
  localStorage.setItem(
    KEY,
    JSON.stringify({ mastery, handwriting, studyMinutes, checkin, wordbook, wrongbook, settings, flashState, dailyState })
  )
}

const today = () => new Date().toISOString().slice(0, 10)

const init = load()

export const useStore = create<State>((set, get) => ({
  mastery: init.mastery || {},
  handwriting: init.handwriting || {},
  studyMinutes: init.studyMinutes || {},
  checkin: init.checkin || {},
  wordbook: init.wordbook || [],
  wrongbook: init.wrongbook || [],
  settings: init.settings || { fontSize: 16, showVideo: true, ttsSpeed: 1, ttsEngine: 'auto', ttsGender: 'female', audioConfig: { ximalayaKey: '', qingtingId: '', qingtingSecret: '' } },
  pronStatus: init.pronStatus || { level: 'unknown', webVoices: [] },
  flashState: init.flashState || {},
  dailyState: init.dailyState || {},

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
      const ns = { ...s, wordbook: [item, ...s.wordbook] }
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
      const ns = { ...s, wrongbook: [item, ...s.wrongbook] }
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
}))

// 辅助：连续打卡天数
export function currentStreak(checkin: Record<string, CheckinDay>): number {
  let streak = 0
  const d = new Date()
  for (;;) {
    const key = d.toISOString().slice(0, 10)
    if (checkin[key]) {
      streak++
      d.setDate(d.getDate() - 1)
    } else break
  }
  return streak
}
