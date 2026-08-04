import { useState } from 'react'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import IeltsQuiz from '../../components/IeltsQuiz'
import { SPEAKING } from '../../data/ielts'
import { speakingQuiz } from '../../data/ieltsQuizData'

export default function IeltsSpeaking() {
  const [sel, setSel] = useState(SPEAKING[0])
  const [showSample, setShowSample] = useState(false)

  return (
    <div className="fade-in">
      <PageHeader title="雅思口语训练" desc="当季题库（Part 1/2/3）+ 高分参考答案（5.5/6.5/7.5）+ 关键词提示。点击 🔊 听题目英文。" />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
        <div className="bg-white rounded-card shadow-card p-3 space-y-1">
          {SPEAKING.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSel(s)
                setShowSample(false)
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${sel.id === s.id ? 'bg-lavender-light text-lavender-deep' : 'hover:bg-cream'}`}
            >
              <span className="text-xs bg-lavender-light rounded px-1.5">{s.part}</span> {s.question.slice(0, 16)}…
            </button>
          ))}
        </div>

        <div className="bg-white rounded-card shadow-card p-5 fade-in">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs bg-lavender-light text-lavender-deep rounded px-2 py-0.5">{sel.part}</span>{' '}
              <span className="text-xs text-gray-400">{sel.category}</span>
            </div>
            <SpeakerButton text={sel.question} lang="en-US" />
          </div>
          <div className="font-bold text-lavender-deep mt-2">{sel.question}</div>

          <div className="mt-3">
            <div className="text-sm font-medium text-lavender-deep">🔑 关键词提示</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {sel.keywords.map((k, i) => (
                <span key={i} className="text-xs bg-cream rounded-lg px-2 py-1">{k}</span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowSample((v) => !v)}
            className="mt-4 text-sm px-4 py-2 rounded-full bg-lavender text-white"
          >
            {showSample ? '隐藏参考答案' : '查看高分参考答案'}
          </button>

          {showSample && (
            <div className="mt-3 space-y-2">
              {sel.sample.map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-lavender-light/40">
                  <div className="text-xs text-lavender-deep font-semibold">Band {s.score}</div>
                  <div className="text-sm mt-1">{s.text}</div>
                </div>
              ))}
              <div className="text-xs text-gray-400">
                💡 AI 实时口语评分（流利度/发音/语法/词汇）需接入语音识别与评分服务，当前为静态参考。
              </div>
            </div>
          )}
        </div>
      </div>

      <IeltsQuiz title="口语自测" source="雅思口语" questions={speakingQuiz} />
    </div>
  )
}
