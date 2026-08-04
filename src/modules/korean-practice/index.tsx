import { useState, useMemo } from 'react'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import { useStore } from '../../stores/useStore'
import { VOCAB } from '../../data/vocab'
import type { VocabWord } from '../../types'

const ALL: VocabWord[] = VOCAB.flatMap((t) => t.words)

type Mode = 'ko2zh' | 'zh2ko'
interface Q {
  q: string
  answer: string
  options: string[]
  audio?: string
}

function buildQuiz(mode: Mode, n: number): Q[] {
  const pick = [...ALL].sort(() => Math.random() - 0.5).slice(0, n)
  return pick.map((w) => {
    if (mode === 'ko2zh') {
      const wrong = [...ALL]
        .filter((x) => x.chinese !== w.chinese)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((x) => x.chinese)
      const options = [w.chinese, ...wrong].sort(() => Math.random() - 0.5)
      return { q: w.korean, answer: w.chinese, options, audio: w.korean }
    } else {
      const wrong = [...ALL]
        .filter((x) => x.korean !== w.korean)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((x) => x.korean)
      const options = [w.korean, ...wrong].sort(() => Math.random() - 0.5)
      return { q: w.chinese, answer: w.korean, options }
    }
  })
}

export default function KoreanPractice() {
  const [mode, setMode] = useState<Mode>('ko2zh')
  const [started, setStarted] = useState(false)
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const addWrong = useStore((s) => s.addWrong)
  const quiz = useMemo(() => (started ? buildQuiz(mode, 10) : []), [started, mode])

  const cur = quiz[idx]
  const done = idx >= quiz.length

  const choose = (opt: string) => {
    if (chosen) return
    setChosen(opt)
    if (opt === cur.answer) setScore((s) => s + 1)
    else
      addWrong({
        source: '综合练习',
        category: 'korean',
        question: `${mode === 'ko2zh' ? cur.q : cur.answer} → ?`,
        yourAnswer: opt,
        correct: cur.answer,
      })
  }

  const next = () => {
    setChosen(null)
    setIdx((i) => i + 1)
  }

  const restart = () => {
    setStarted(false)
    setIdx(0)
    setScore(0)
    setChosen(null)
  }

  return (
    <div className="fade-in">
      <PageHeader title="综合练习" desc="词汇抽查小测验（10 题），答错的自动进入错题本。" />

      {!started ? (
        <div className="bg-white rounded-card shadow-card p-6 flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setMode('ko2zh')}
              className={`px-4 py-2 rounded-full text-sm ${mode === 'ko2zh' ? 'bg-lavender text-white' : 'bg-cream text-gray-500'}`}
            >
              韩 → 中
            </button>
            <button
              onClick={() => setMode('zh2ko')}
              className={`px-4 py-2 rounded-full text-sm ${mode === 'zh2ko' ? 'bg-lavender text-white' : 'bg-cream text-gray-500'}`}
            >
              中 → 韩
            </button>
          </div>
          <button
            onClick={() => setStarted(true)}
            className="px-6 py-2.5 rounded-full bg-lavender text-white font-medium hover:bg-lavender-deep"
          >
            开始练习
          </button>
        </div>
      ) : done ? (
        <div className="bg-white rounded-card shadow-card p-6 text-center">
          <div className="text-4xl font-bold text-lavender-deep">{score} / 10</div>
          <p className="text-sm text-gray-500 mt-2">完成！错题已保存到「韩语错题本」。</p>
          <button onClick={restart} className="mt-4 px-5 py-2 rounded-full bg-lavender text-white">
            再来一组
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-card shadow-card p-5">
          <div className="text-xs text-gray-400 mb-2">第 {idx + 1} / {quiz.length} 题</div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl korean-font font-bold text-lavender-deep">{cur.q}</span>
            {cur.audio && <SpeakerButton text={cur.audio} />}
          </div>
          <div className="space-y-2">
            {cur.options.map((opt) => {
              const isAns = opt === cur.answer
              const isChosen = opt === chosen
              const color = !chosen
                ? 'bg-cream hover:bg-lavender-light'
                : isAns
                ? 'bg-mint text-emerald-800'
                : isChosen
                ? 'bg-coral text-white'
                : 'bg-cream text-gray-400'
              return (
                <button
                  key={opt}
                  onClick={() => choose(opt)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition ${color}`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
          {chosen && (
            <button onClick={next} className="mt-4 w-full py-2.5 rounded-full bg-lavender text-white">
              {idx + 1 === quiz.length ? '查看结果' : '下一题'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
