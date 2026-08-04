import { useState } from 'react'
import { PageHeader } from '../../components/Layout'
import IeltsQuiz from '../../components/IeltsQuiz'
import { READING } from '../../data/ielts'
import { readingQuiz } from '../../data/ieltsQuizData'

export default function IeltsReading() {
  const [sel, setSel] = useState(READING[0])
  const [reveal, setReveal] = useState<boolean[]>([])

  return (
    <div className="fade-in">
      <PageHeader title="雅思阅读训练" desc="真题风格文章 + 理解题。阅读时遇到生词可点击收藏（演示：选中后点「收藏」）。" />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
        <div className="bg-white rounded-card shadow-card p-3 space-y-1">
          {READING.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                setSel(a)
                setReveal([])
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${sel.id === a.id ? 'bg-lavender-light text-lavender-deep' : 'hover:bg-cream'}`}
            >
              {a.title} <span className="text-xs text-gray-400">· {a.level}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-card shadow-card p-5 fade-in">
          <div className="text-xs text-lavender-deep mb-1">{sel.topic}</div>
          <div className="font-bold text-lavender-deep text-lg">{sel.title}</div>
          <p className="text-sm leading-relaxed mt-2 text-gray-700">{sel.body}</p>

          <div className="mt-4 space-y-3">
            {sel.questions.map((q, i) => (
              <div key={i} className="p-3 rounded-xl bg-lavender-light/40">
                <div className="text-sm font-medium">{i + 1}. {q.q}</div>
                {reveal[i] ? (
                  <div className="text-sm text-lavender-deep mt-1">答：{q.a}</div>
                ) : (
                  <button
                    onClick={() => setReveal((r) => r.map((x, j) => (j === i ? true : x)))}
                    className="mt-2 text-xs px-3 py-1 rounded-full bg-lavender text-white"
                  >
                    显示答案
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <IeltsQuiz title="阅读自测" source="雅思阅读" questions={readingQuiz} />
    </div>
  )
}
