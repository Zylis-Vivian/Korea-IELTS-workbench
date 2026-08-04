import { useState } from 'react'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import IeltsQuiz from '../../components/IeltsQuiz'
import { LISTENING } from '../../data/ielts'
import { listeningQuiz } from '../../data/ieltsQuizData'

export default function IeltsListening() {
  const [sel, setSel] = useState(LISTENING[0])
  const [reveal, setReveal] = useState<boolean[]>([])

  return (
    <div className="fade-in">
      <PageHeader title="雅思听力训练" desc="提供音频文本（无真实音频时用文本+发音替代），配套理解题。点击 🔊 听英文。语速可在设置中调节。" />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
        <div className="bg-white rounded-card shadow-card p-3 space-y-1">
          {LISTENING.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setSel(l)
                setReveal([])
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${sel.id === l.id ? 'bg-lavender-light text-lavender-deep' : 'hover:bg-cream'}`}
            >
              {l.title} <span className="text-xs text-gray-400">· {l.accent}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-card shadow-card p-5 fade-in">
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-lavender-deep">{sel.title}</div>
            <SpeakerButton text={sel.script} lang="en-US" />
          </div>
          <div className="text-sm leading-relaxed bg-cream rounded-xl p-3 text-gray-700">{sel.script}</div>

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

      <IeltsQuiz title="听力自测" source="雅思听力" questions={listeningQuiz} />
    </div>
  )
}
