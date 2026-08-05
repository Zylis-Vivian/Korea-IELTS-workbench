import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import type { VocabWord } from '../types'
import SpeakerButton from './SpeakerButton'
import AddWordButton from './AddWordButton'

interface Props {
  word: VocabWord
  flipped: boolean
  onFlip: () => void
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
  onMark?: (status: 'known' | 'unknown') => void
  status?: 'known' | 'unknown' | undefined
  showMarkButtons?: boolean
}

// 可滑动单词卡（刷词核心交互）：
// - 轻点卡片翻面（韩文 <-> 释义）
// - 左右拖拽：右滑=认识，左滑=不认识，松手超过阈值即标记并自动进入下一张
// - 复用 SpeakerButton 发音（沿现有黄金标准发音管线，不做任何改动）
export default function FlashCard({
  word,
  flipped,
  onFlip,
  index,
  total,
  onPrev,
  onNext,
  onMark,
  status,
  showMarkButtons = true,
}: Props) {
  const [dx, setDx] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const moved = useRef(0)

  const onPointerDown = (e: ReactPointerEvent) => {
    startX.current = e.clientX
    moved.current = 0
    setDragging(true)
  }
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging) return
    const d = e.clientX - startX.current
    moved.current = Math.abs(d)
    setDx(d)
  }
  const endDrag = () => {
    if (!dragging) return
    setDragging(false)
    const threshold = 90
    if (dx > threshold) {
      onMark?.('known')
      goNext()
    } else if (dx < -threshold) {
      onMark?.('unknown')
      goNext()
    } else {
      if (moved.current < 8) onFlip() // 几乎没移动 = 轻点翻面
      setDx(0)
    }
  }
  const goNext = () => {
    setDx(0)
    onNext()
  }
  const goPrev = () => {
    setDx(0)
    onPrev()
  }

  const rotate = dx / 18
  const opacity = Math.min(1, Math.abs(dx) / 220)
  const markHint = dx > 30 ? 'known' : dx < -30 ? 'unknown' : ''

  const ring =
    status === 'known'
      ? 'ring-2 ring-emerald-300'
      : status === 'unknown'
        ? 'ring-2 ring-rose-300'
        : ''

  const footer: ReactNode = flipped ? (
    <>
      <span className="text-2xl font-semibold text-gray-800">{word.chinese}</span>
      {word.pos && <span className="text-xs text-gray-400">{word.pos}</span>}
      <SpeakerButton text={word.korean} />
      {word.example && <div className="text-xs text-gray-500 mt-1 text-center">💡 {word.example}</div>}
      {word.exampleZh && <div className="text-xs text-gray-400 text-center">　{word.exampleZh}</div>}
      {word.grammar && (
        <div className="text-xs text-lavender-deep/80 text-center">📝 语法：{word.grammar}</div>
      )}
      <span className="text-[10px] bg-lavender-light text-lavender-deep rounded px-2 py-0.5 mt-1">
        TOPIK {word.level || '-'}
      </span>
    </>
  ) : (
    <>
      <span className="korean-font text-4xl font-bold text-lavender-deep">{word.korean}</span>
      <span className="text-sm text-gray-400">{word.romanization}</span>
      <SpeakerButton text={word.korean} />
      <span className="text-[11px] text-gray-300 mt-1">轻点翻面看释义 · 左右滑动标记</span>
    </>
  )

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-xs text-gray-400 mb-2">
        {index + 1} / {total}
      </div>

      <div
        className="relative w-full max-w-md select-none touch-none cursor-pointer"
        style={{ perspective: 1200 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={() => {
          setDragging(false)
          setDx(0)
        }}
        onPointerLeave={() => {
          if (dragging) {
            setDragging(false)
            setDx(0)
          }
        }}
      >
        {markHint && (
          <div
            className={`pointer-events-none absolute top-3 z-10 text-lg font-bold ${
              markHint === 'known' ? 'right-4 text-emerald-500' : 'left-4 text-rose-500'
            }`}
          >
            {markHint === 'known' ? '✓ 认识' : '✗ 不认识'}
          </div>
        )}

        <div
          className={`bg-white rounded-card shadow-card p-6 min-h-[240px] flex flex-col items-center justify-center gap-3 ${ring}`}
          style={{
            transform: `translateX(${dx}px) rotate(${rotate}deg)`,
            opacity: 0.55 + opacity * 0.45,
            transition: dragging ? 'none' : 'transform .25s ease, opacity .25s ease',
          }}
        >
          {footer}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
        <button
          onClick={goPrev}
          className="px-3 py-1.5 rounded-lg bg-cream text-gray-600 text-sm hover:bg-lavender-light"
        >
          ← 上一个
        </button>
        {showMarkButtons && (
          <>
            <button
              onClick={() => {
                onMark?.('unknown')
                goNext()
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-500 text-sm hover:bg-rose-100"
            >
              ✗ 不认识
            </button>
            <button
              onClick={() => {
                onMark?.('known')
                goNext()
              }}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-sm hover:bg-emerald-100"
            >
              ✓ 认识
            </button>
          </>
        )}
        <button
          onClick={goNext}
          className="px-3 py-1.5 rounded-lg bg-cream text-gray-600 text-sm hover:bg-lavender-light"
        >
          下一个 →
        </button>
      </div>

      <AddWordButton
        korean={word.korean}
        romanization={word.romanization}
        chinese={word.chinese}
        source="刷词"
        className="mt-3"
      />
    </div>
  )
}
