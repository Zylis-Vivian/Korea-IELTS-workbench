import { useEffect, useMemo, useState } from 'react'
import { Check, ChevronRight, Headphones, RotateCcw, Volume2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/Layout'
import { createPersonalReviewItems, DEFAULT_REVIEW_ITEMS } from '../../data/reviewSeeds'
import { usePronunciation } from '../../hooks/usePronunciation'
import { useStore } from '../../stores/useStore'
import type { DictationErrorType, ReviewItem } from '../../types'
import { createReviewItem, isDue } from '../../utils/review'

const DICTATION_KINDS = new Set<ReviewItem['kind']>(['word', 'sentence', 'listening'])

function normalizeAnswer(value: string) {
  return value
    .toLocaleLowerCase()
    .replace(/[.,!?;:'"()[\]{}，。！？；：“”‘’、]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const ERROR_LABELS: Record<DictationErrorType, string> = {
  omission: '漏词/少写',
  substitution: '词形替换',
  spacing: '空格或分词',
  punctuation: '标点',
  spelling: '拼写/音节',
  unknown: '其他',
}

function classifyError(answer: string, expected: string): DictationErrorType {
  if (!answer.trim()) return 'omission'
  const normalizedAnswer = normalizeAnswer(answer)
  const normalizedExpected = normalizeAnswer(expected)
  if (normalizedAnswer === normalizedExpected) {
    const withoutPunctuation = (value: string) => value.toLocaleLowerCase().replace(/[.,!?;:'"()[\]{}，。！？；：“”‘’、]/g, '').replace(/\s+/g, ' ').trim()
    if (withoutPunctuation(answer) === withoutPunctuation(expected) && answer !== expected) return 'punctuation'
    return answer.replace(/\s+/g, ' ') === expected.replace(/\s+/g, ' ') ? 'punctuation' : 'spacing'
  }
  const compactAnswer = normalizedAnswer.replace(/\s/g, '')
  const compactExpected = normalizedExpected.replace(/\s/g, '')
  if (compactAnswer === compactExpected) return 'spacing'
  if (compactAnswer.length < compactExpected.length) return 'omission'
  if (compactAnswer.length === compactExpected.length) return 'substitution'
  return 'spelling'
}

export default function Dictation() {
  const reviewItems = useStore((s) => s.reviewItems)
  const wordbook = useStore((s) => s.wordbook)
  const wrongbook = useStore((s) => s.wrongbook)
  const upsertReviewItems = useStore((s) => s.upsertReviewItems)
  const recordDictation = useStore((s) => s.recordDictation)
  const { speak } = usePronunciation()
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [errorType, setErrorType] = useState<DictationErrorType | null>(null)
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set())
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const known = new Set(reviewItems.map((item) => item.id))
    const personal = createPersonalReviewItems(wordbook, wrongbook)
    const missing = [...DEFAULT_REVIEW_ITEMS, ...personal]
      .filter((item) => !known.has(item.id))
      .map((item) => createReviewItem(item))
    if (missing.length) upsertReviewItems(missing)
  }, [reviewItems, wordbook, wrongbook, upsertReviewItems])

  const candidates = useMemo(
    () => reviewItems.filter((item) => DICTATION_KINDS.has(item.kind) && !doneIds.has(item.id)),
    [reviewItems, doneIds]
  )
  const current = candidates.find((item) => item.id === activeId) || candidates.find((item) => isDue(item)) || candidates[0]

  const dictationStats = useMemo(() => {
    const stats = { attempts: 0, correct: 0, wrong: 0, errorTypes: {} as Partial<Record<DictationErrorType, number>> }
    reviewItems.forEach((item) => {
      if (!item.dictation) return
      stats.attempts += item.dictation.attempts
      stats.correct += item.dictation.correct
      stats.wrong += item.dictation.wrong
      Object.entries(item.dictation.errorTypes).forEach(([type, count]) => {
        const key = type as DictationErrorType
        stats.errorTypes[key] = (stats.errorTypes[key] || 0) + (count || 0)
      })
    })
    return stats
  }, [reviewItems])

  useEffect(() => {
    if (!current) {
      setActiveId(null)
    } else if (!activeId || !candidates.some((item) => item.id === activeId)) {
      setActiveId(current.id)
    }
  }, [activeId, candidates, current?.id])

  useEffect(() => {
    setAnswer('')
    setResult(null)
    setErrorType(null)
  }, [current?.id])

  const submit = () => {
    if (!current || !answer.trim()) return
    const expected = current.answer || current.prompt
    const isCorrect = normalizeAnswer(answer) === normalizeAnswer(expected)
    const nextErrorType = isCorrect ? null : classifyError(answer, expected)
    setResult(isCorrect ? 'correct' : 'wrong')
    setErrorType(nextErrorType)
    recordDictation(current.id, { correct: isCorrect, errorType: nextErrorType || undefined })
  }

  const next = () => {
    if (!current) return
    setDoneIds((ids) => new Set(ids).add(current.id))
    setActiveId(null)
  }

  const resetRound = () => {
    setDoneIds(new Set())
    setActiveId(null)
    setAnswer('')
    setResult(null)
    setErrorType(null)
  }

  return (
    <div className="fade-in">
      <PageHeader title="听写练习" desc="先听音，再输入你听到的内容；答对后延长间隔，答错会按‘重来’回流到复习队列。" />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2"><Headphones size={16} />本轮剩余 {candidates.length} 条</span>
          <span className="rounded-full bg-lavender-light/60 px-2.5 py-1 text-xs text-lavender-deep">累计错题回流 {dictationStats.wrong} 条</span>
          {Object.entries(dictationStats.errorTypes).filter(([, count]) => count).slice(0, 3).map(([type, count]) => (
            <span key={type} className="rounded-full bg-cream px-2.5 py-1 text-xs text-gray-500">{ERROR_LABELS[type as DictationErrorType]} {count}</span>
          ))}
        </div>
        <Link to="/review" className="text-lavender-deep hover:underline">查看今日任务</Link>
      </div>

      {current ? (
        <div className="mx-auto max-w-2xl rounded-card bg-white p-5 shadow-card sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-gray-400">{current.source} · {current.language === 'ko' ? '韩语' : '英语'}</div>
              <h2 className="mt-1 text-lg font-bold text-lavender-deep">{current.title}</h2>
            </div>
            <button
              type="button"
              onClick={() => void speak(current.prompt, { lang: current.language === 'ko' ? 'ko-KR' : 'en-US' })}
              className="rounded-full bg-lavender-light p-3 text-lavender-deep hover:bg-lavender hover:text-white"
              title="播放听写音频"
            >
              <Volume2 size={22} />
            </button>
          </div>

          <div className="mt-8 rounded-2xl bg-lavender-light/40 p-5 text-center">
            <div className="text-sm text-gray-500">点击播放，建议先盲听 2 次</div>
            <button type="button" onClick={() => void speak(current.prompt, { lang: current.language === 'ko' ? 'ko-KR' : 'en-US' })} className="mt-3 rounded-full bg-lavender px-5 py-2 text-sm text-white hover:bg-lavender-deep">
              播放音频
            </button>
          </div>

          <form onSubmit={(event) => { event.preventDefault(); submit() }} className="mt-5">
            <label className="text-sm text-gray-600" htmlFor="dictation-answer">听到的内容</label>
            <input
              id="dictation-answer"
              autoFocus
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder={current.language === 'ko' ? '输入韩文（可先不看罗马音）' : 'Type what you hear'}
              className="mt-2 w-full rounded-xl border border-lavender-light px-4 py-3 outline-none focus:border-lavender focus:ring-2 focus:ring-lavender-light"
              disabled={result !== null}
            />
            {result === null ? (
              <button type="submit" disabled={!answer.trim()} className="mt-3 w-full rounded-xl bg-lavender px-4 py-2.5 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-lavender-deep">
                提交答案
              </button>
            ) : (
              <div className={`mt-3 rounded-xl p-4 ${result === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                <div className="flex items-center gap-2 font-medium">
                  {result === 'correct' ? <Check size={18} /> : <X size={18} />}
                  {result === 'correct' ? '答对了，已按“正常”安排复习。' : `这次先按“重来”安排，${ERROR_LABELS[errorType || 'unknown']}会在下一轮优先回流：`}
                </div>
                {result === 'wrong' ? <div className="mt-2 font-medium">{current.answer || current.prompt}</div> : null}
                {result === 'wrong' && errorType ? <div className="mt-1 text-xs opacity-80">错误类型：{ERROR_LABELS[errorType]}</div> : null}
                {current.translation ? <div className="mt-2 text-sm opacity-80">{current.translation}</div> : null}
              </div>
            )}
          </form>

          {result !== null ? (
            <button type="button" onClick={next} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cream px-4 py-2.5 text-sm text-gray-600 hover:bg-lavender-light">
              下一条 <ChevronRight size={16} />
            </button>
          ) : null}
        </div>
      ) : (
        <div className="mx-auto max-w-2xl rounded-card bg-white p-8 text-center shadow-card">
          <Check className="mx-auto mb-3 text-emerald-500" size={32} />
          <h2 className="text-lg font-bold text-lavender-deep">本轮听写完成</h2>
          <p className="mt-2 text-sm text-gray-500">可以回到今日任务继续复习，或重新开始一轮听写。</p>
          <button type="button" onClick={resetRound} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-lavender px-4 py-2 text-sm text-white hover:bg-lavender-deep">
            <RotateCcw size={16} />重新开始
          </button>
        </div>
      )}
    </div>
  )
}
