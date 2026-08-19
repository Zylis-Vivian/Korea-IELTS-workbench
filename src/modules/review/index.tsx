import { useEffect, useMemo, useState } from 'react'
import { Check, Clock3, Headphones, RotateCcw, Sparkles, Volume2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import { DIALOGUES } from '../../data/dialogue'
import { LISTENING } from '../../data/ielts'
import { useStore } from '../../stores/useStore'
import type { ReviewItem, ReviewRating } from '../../types'
import { createReviewItem, dueDateLabel, isDue } from '../../utils/review'

const SEED_ITEMS: Array<Omit<ReviewItem, 'card' | 'createdAt' | 'updatedAt'>> = [
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

const RATINGS: Array<{ value: ReviewRating; label: string; hint: string; color: string }> = [
  { value: 'again', label: '重来', hint: '现在再来一次', color: 'bg-coral text-white' },
  { value: 'hard', label: '困难', hint: '短时间后复习', color: 'bg-amber-400 text-white' },
  { value: 'good', label: '正常', hint: '按计划复习', color: 'bg-emerald-500 text-white' },
  { value: 'easy', label: '简单', hint: '拉长复习间隔', color: 'bg-lavender text-white' },
]

export default function Review() {
  const reviewItems = useStore((s) => s.reviewItems)
  const upsertReviewItems = useStore((s) => s.upsertReviewItems)
  const review = useStore((s) => s.review)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const known = new Set(reviewItems.map((item) => item.id))
    const missing = SEED_ITEMS.filter((item) => !known.has(item.id)).map((item) => createReviewItem(item))
    if (missing.length) upsertReviewItems(missing)
  }, [reviewItems, upsertReviewItems])

  const now = new Date()
  const dueItems = useMemo(() => reviewItems.filter((item) => isDue(item, now)), [reviewItems, now])
  const current = reviewItems.find((item) => item.id === selectedId) || dueItems[0] || reviewItems[0]

  useEffect(() => {
    if (!selectedId && current) setSelectedId(current.id)
  }, [current, selectedId])

  const chooseRating = (rating: ReviewRating) => {
    if (!current) return
    review(current.id, rating)
    setRevealed(false)
    const next = reviewItems.find((item) => item.id !== current.id && isDue(item, new Date()))
    setSelectedId(next?.id || null)
  }

  return (
    <div className="fade-in">
      <PageHeader title="今日学习任务" desc="把单词、句子和听力放进同一条复习队列，按记忆强度安排下一次出现时间。" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <SummaryCard icon={<Clock3 size={18} />} label="现在到期" value={`${dueItems.length}`} />
        <SummaryCard icon={<Headphones size={18} />} label="队列总数" value={`${reviewItems.length}`} />
        <SummaryCard icon={<RotateCcw size={18} />} label="已完成复习" value={`${reviewItems.filter((item) => item.card.reps > 0).length}`} />
        <SummaryCard icon={<Sparkles size={18} />} label="跟读入口" value="可用" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
        <div className="bg-white rounded-card shadow-card p-3">
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="font-medium text-lavender-deep">待复习内容</div>
            <span className="text-xs text-gray-400">{dueItems.length} 条到期</span>
          </div>
          <div className="space-y-1 max-h-[480px] overflow-y-auto">
            {reviewItems.slice(0, 80).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedId(item.id)
                  setRevealed(false)
                }}
                className={`w-full text-left rounded-xl px-3 py-2.5 transition ${current?.id === item.id ? 'bg-lavender-light text-lavender-deep' : 'hover:bg-cream text-gray-600'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm">{item.title}</span>
                  {isDue(item, now) ? <span className="h-2 w-2 shrink-0 rounded-full bg-coral" title="现在到期" /> : null}
                </div>
                <div className="mt-1 truncate text-xs text-gray-400">{item.prompt}</div>
              </button>
            ))}
          </div>
        </div>

        {current ? (
          <div className="bg-white rounded-card shadow-card p-5 min-h-[480px] flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-gray-400">{current.source} · {current.language === 'ko' ? '韩语' : '英语'}</div>
                <h2 className="text-xl font-bold text-lavender-deep mt-1">{current.title}</h2>
              </div>
              <SpeakerButton text={current.prompt} category={current.language === 'en' ? 'ielts' : 'korean'} />
            </div>

            <div className="flex-1 flex flex-col justify-center py-8">
              <div className="text-center text-2xl leading-relaxed text-gray-700">{current.prompt}</div>
              {revealed ? (
                <div className="mt-5 rounded-xl bg-cream p-4 text-center text-lavender-deep">
                  {current.translation || current.answer || '已掌握后继续保持。'}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  className="mx-auto mt-5 rounded-full bg-lavender px-4 py-2 text-sm text-white hover:bg-lavender-deep"
                >
                  显示释义 / 答案
                </button>
              )}
            </div>

            <div className="border-t border-lavender-light pt-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                <span>下次：{dueDateLabel(current)}</span>
                <Link to={`/shadowing?item=${encodeURIComponent(current.id)}`} className="text-lavender-deep hover:underline">
                  <span className="inline-flex items-center gap-1"><Volume2 size={13} />进入影子跟读</span>
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {RATINGS.map((rating) => (
                  <button
                    key={rating.value}
                    type="button"
                    onClick={() => chooseRating(rating.value)}
                    className={`rounded-xl px-2 py-2 text-sm transition hover:opacity-90 ${rating.color}`}
                    title={rating.hint}
                  >
                    {rating.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-card shadow-card p-8 text-center text-gray-500">
            <Check className="mx-auto mb-3 text-emerald-500" size={30} />
            今天的队列已经完成。可以去影子跟读复习薄弱句，或返回课程库学习新内容。
          </div>
        )}
      </div>
    </div>
  )
}

function SummaryCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <div className="text-lavender-deep">{icon}</div>
      <div className="mt-2 text-xl font-bold text-gray-700">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  )
}

