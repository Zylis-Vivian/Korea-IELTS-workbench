import { useState } from 'react'
import { BookMarked, Check } from 'lucide-react'
import { bookVocab } from '../../data/book-vocabulary'
import { getBook } from '../../data/books'
import { useStore } from '../../stores/useStore'
import SpeakerButton from '../../components/SpeakerButton'

// 教材词书：按教材 + 课号分组，一键加入对应单词本
export default function BookVocab() {
  const [bookFilter, setBookFilter] = useState<string>('all')
  const addWord = useStore((s) => s.addWord)
  const wordbook = useStore((s) => s.wordbook)

  const books = Array.from(new Set(bookVocab.map((v) => v.bookId)))
  const list = bookFilter === 'all' ? bookVocab : bookVocab.filter((v) => v.bookId === bookFilter)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setBookFilter('all')}
          className={`px-3 py-1.5 rounded-full text-sm ${bookFilter === 'all' ? 'bg-lavender text-white' : 'bg-cream text-gray-500'}`}
        >
          全部教材
        </button>
        {books.map((bid) => (
          <button
            key={bid}
            onClick={() => setBookFilter(bid)}
            className={`px-3 py-1.5 rounded-full text-sm ${bookFilter === bid ? 'bg-lavender text-white' : 'bg-cream text-gray-500'}`}
          >
            {getBook(bid)?.title || bid}
          </button>
        ))}
      </div>

      {list.map((lesson) => {
        const book = getBook(lesson.bookId)
        const cat = book?.language === 'english' ? 'ielts' : 'korean'
        return (
          <div key={lesson.bookId + lesson.lesson} className="bg-white rounded-card shadow-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium text-gray-700">
                {book?.coverEmoji} {book?.title} · {lesson.lessonTitle}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${cat === 'ielts' ? 'bg-blue-100 text-blue-600' : 'bg-lavender-light text-lavender-deep'}`}>
                {cat === 'ielts' ? '雅思单词本' : '韩语单词本'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lesson.words.map((w, i) => {
                const identifier = w.korean || w.english || ''
                const already =
                  !!identifier &&
                  wordbook.some(
                    (x) =>
                      x.category === cat &&
                      (x.korean === w.korean || (x.english && x.english === w.english))
                  )
                return (
                  <div key={i} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-cream/50">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-800">{identifier}</span>
                        <SpeakerButton text={identifier} category={cat} size={14} />
                        {w.phonetic && <span className="text-xs text-gray-400">{w.phonetic}</span>}
                      </div>
                      <div className="text-sm text-gray-500">{w.chinese}</div>
                      {w.example && <div className="text-xs text-gray-400 truncate">{w.example}</div>}
                    </div>
                    <button
                      disabled={!!already}
                      onClick={() =>
                        addWord({
                          source: book?.title || '教材词书',
                          category: cat,
                          korean: w.korean || '',
                          romanization: w.phonetic || '',
                          chinese: w.chinese,
                          english: w.english,
                          phonetic: w.phonetic,
                          pos: '',
                          example: w.example,
                          exampleZh: w.exampleCn,
                        })
                      }
                      className={`shrink-0 px-2 py-1 rounded-lg text-xs flex items-center gap-1 ${
                        already ? 'bg-emerald-50 text-emerald-500' : 'bg-lavender text-white'
                      }`}
                    >
                      {already ? <Check size={13} /> : <BookMarked size={13} />}
                      {already ? '已加' : '加入'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
