import { useEffect, useMemo, useState } from 'react'
import { Check, ChevronRight, Headphones, RotateCcw, Volume2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/Layout'
import { createPersonalReviewItems, DEFAULT_REVIEW_ITEMS } from '../../data/reviewSeeds'
import { usePronunciation } from '../../hooks/usePronunciation'
import { useStore } from '../../stores/useStore'
import type { ReviewItem } from '../../types'
import { createReviewItem, isDue } from '../../utils/review'

const DICTATION_KINDS = new Set<ReviewItem['kind']>(['word', 'sentence', 'listening'])

function normalizeAnswer(value: string) {
  return value
    .toLocaleLowerCase()
    .replace(/[.,!?;:'"()[\]{}，。！？；：“”‘’、]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function Dictation() {
  const reviewItems = useStore((s) => s.reviewItems)
  const wordbook = useStore((s) => s.wordbook)
  const wrongbook = useStore((s) => s.wrongbook)
  const upsertReviewItems = useStore((s) => s.upsertReviewItems)
  const review = useStore((s) => s.review)
  const { speak } = usePronunciation()
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set())

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
  const current = candidates.find((item) => isDue(item)) || candidates[0]

  useEffect(() => {
    setAnswer('')
    setResult(null)
  }, [current?.id])

  const submit = () => {
    if (!current || !answer.trim()) return
    const expected = current.answer || current.prompt
    const isCorrect = normalizeAnswer(answer) === normalizeAnswer(expected)
    setResult(isCorrect ? 'correct' : 'wrong')
    review(current.id, isCorrect ? 'good' : 'again')
  }

  const next = () => {
    if (!current) return
    setDoneIds((ids) => new Set(ids).add(current.id))
  }

  const resetRound = () => {
    setDoneIds(new Set())
    setAnswer('')
    setResult(null)
  }

  return (
    <div className="fade-in">
      <PageHeader title="听写练习" desc="先听音，再输入你听到的内容；答对后延长间隔，答错会按‘重来’回流到复习队列。" />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
        <span className="inline-flex items-center gap-2"><Headphones size={16} />本轮剩余 {candidates.length} 条</span>
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
                  {result === 'correct' ? '答对了，已按“正常”安排复习。' : '这次先按“重来”安排，记住正确答案：'}
                </div>
                {result === 'wrong' ? <div className="mt-2 font-medium">{current.answer || current.prompt}</div> : null}
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
