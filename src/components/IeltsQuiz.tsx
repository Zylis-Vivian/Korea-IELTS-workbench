import { useState } from 'react'
import { CheckCircle2, XCircle, Send } from 'lucide-react'
import { useStore } from '../stores/useStore'

export interface QuizQ {
  q: string
  options: string[]
  answer: number
  explain: string
}

// 雅思通用自测：提交后自动判分，错题归档进「雅思错题本」
export default function IeltsQuiz({ title, source, questions }: { title: string; source: string; questions: QuizQ[] }) {
  const addWrong = useStore((s) => s.addWrong)
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null))
  const [submitted, setSubmitted] = useState(false)
  const correct = picked.filter((p, i) => p === questions[i].answer).length

  const submit = () => {
    setSubmitted(true)
    questions.forEach((qq, i) => {
      if (picked[i] !== qq.answer) {
        addWrong({
          source,
          question: qq.q,
          yourAnswer: picked[i] !== null ? qq.options[picked[i] as number] : '（未作答）',
          correct: qq.options[qq.answer],
          category: 'ielts',
        })
      }
    })
  }

  return (
    <div className="bg-white rounded-card shadow-card p-5 mt-4">
      <div className="font-medium text-lavender-deep mb-3">📝 {title}（{questions.length} 题）</div>
      <div className="space-y-4">
        {questions.map((qq, i) => (
          <div key={i}>
            <div className="text-sm text-gray-700 mb-2">{i + 1}. {qq.q}</div>
            <div className="space-y-1">
              {qq.options.map((o, oi) => {
                const chosen = picked[i] === oi
                const isAnswer = oi === qq.answer
                let cls = 'border-lavender-light hover:bg-cream text-gray-600'
                if (submitted) {
                  if (isAnswer) cls = 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  else if (chosen) cls = 'bg-coral/10 text-coral border-coral/30'
                  else cls = 'text-gray-400 border-lavender-light'
                } else if (chosen) cls = 'bg-lavender-light text-lavender-deep border-lavender'
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setPicked((s) => s.map((v, idx) => (idx === i ? oi : v)))}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm border ${cls}`}
                  >
                    {o}
                    {submitted && isAnswer && <CheckCircle2 size={14} className="inline ml-1 text-emerald-500" />}
                    {submitted && chosen && !isAnswer && <XCircle size={14} className="inline ml-1 text-coral" />}
                  </button>
                )
              })}
            </div>
            {submitted && <div className={`text-xs mt-1 ${picked[i] === qq.answer ? 'text-emerald-600' : 'text-coral'}`}>{qq.explain}</div>}
          </div>
        ))}
      </div>
      {!submitted ? (
        <button onClick={submit} className="mt-3 flex items-center gap-1 px-4 py-2 rounded-xl bg-lavender text-white text-sm"><Send size={14} /> 提交并判分</button>
      ) : (
        <div className="mt-3 text-sm text-gray-600">答对 {correct}/{questions.length}。答错的题已自动归档到「雅思错题本」。</div>
      )}
    </div>
  )
}
