import { BookmarkPlus, Check } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../stores/useStore'
import type { BoardCategory } from '../types'

interface Props {
  // 韩语单词
  korean?: string
  romanization?: string
  // 雅思单词
  english?: string
  phonetic?: string
  pos?: string
  // 公共
  chinese: string
  source: string
  category?: BoardCategory
  size?: number
}

// 一键加入单词本（自动按 category 归入对应语言单词本）
export default function AddWordButton({
  korean,
  romanization,
  english,
  phonetic,
  pos,
  chinese,
  source,
  category = 'korean',
  size = 16,
}: Props) {
  const addWord = useStore((s) => s.addWord)
  const wordbook = useStore((s) => s.wordbook)
  const key = category === 'korean' ? korean : english
  const [added, setAdded] = useState(
    wordbook.some((w) => (category === 'korean' ? w.korean === korean : w.english === english) && w.category === category)
  )

  const onClick = () => {
    if (added) return
    addWord({ korean, romanization, english, phonetic, pos, chinese, source, category })
    setAdded(true)
  }

  return (
    <button
      onClick={onClick}
      title="加入单词本"
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs transition ${
        added
          ? 'bg-mint/40 text-emerald-700'
          : 'bg-lavender-light text-lavender-deep hover:bg-lavender hover:text-white'
      }`}
    >
      {added ? <Check size={size} /> : <BookmarkPlus size={size} />}
      {added ? '已收藏' : '收藏'}
    </button>
  )
}
