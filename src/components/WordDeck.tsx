import { useEffect, useState } from 'react'
import type { VocabWord } from '../types'
import FlashCard from './FlashCard'

interface Props {
  words: VocabWord[]
  onMark?: (word: VocabWord, status: 'known' | 'unknown') => void
  getStatus?: (word: VocabWord) => 'known' | 'unknown' | undefined
  showMarkButtons?: boolean
}

// 词卡组：管理当前索引与翻面状态，提供键盘操作（← → 切换，空格翻面，K 认识，J 不认识）
export default function WordDeck({ words, onMark, getStatus, showMarkButtons = true }: Props) {
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [finished, setFinished] = useState(false)

  // 词表变化（切换模式/过滤）时重置进度
  useEffect(() => {
    setIdx(0)
    setFlipped(false)
    setFinished(false)
  }, [words])

  const total = words.length
  if (total === 0) {
    return <div className="text-center text-gray-400 py-12">没有可刷的单词，换个条件试试～</div>
  }

  const word = words[idx]

  const go = (delta: number) => {
    setFlipped(false)
    setIdx((i) => {
      const ni = i + delta
      if (ni >= total) {
        setFinished(true)
        return total - 1
      }
      if (ni < 0) return 0
      return ni
    })
  }
  const flip = () => setFlipped((f) => !f)
  const mark = (status: 'known' | 'unknown') => onMark?.(word, status)

  // 键盘交互
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === ' ') {
        e.preventDefault()
        flip()
      } else if (e.key === 'k' || e.key === 'K') {
        mark('known')
        go(1)
      } else if (e.key === 'j' || e.key === 'J') {
        mark('unknown')
        go(1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word, idx, total])

  return (
    <div className="flex flex-col items-center">
      <FlashCard
        word={word}
        flipped={flipped}
        onFlip={flip}
        index={idx}
        total={total}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
        onMark={mark}
        status={getStatus?.(word)}
        showMarkButtons={showMarkButtons}
      />
      {finished && (
        <div className="mt-4 text-center text-lavender-deep font-semibold">
          🎉 本轮刷词完成！共 {total} 词
        </div>
      )}
    </div>
  )
}
