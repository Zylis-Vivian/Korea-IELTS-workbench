import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import { PRONUNCIATION } from '../../data/pronunciation'

const PRIORITY_RULE_IDS = new Set(['link', 'final', 'nasal', 'liquid', 'tense', 'aspiration'])

export default function KoreanPronunciation() {
  const [sel, setSel] = useState(PRONUNCIATION[0])
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [practiceRevealed, setPracticeRevealed] = useState(false)
  const [practiceScore, setPracticeScore] = useState({ known: 0, total: 0 })
  const practiceExample = sel.examples[practiceIndex % sel.examples.length]

  const selectRule = (rule: typeof PRONUNCIATION[number]) => {
    setSel(rule)
    setPracticeIndex(0)
    setPracticeRevealed(false)
  }

  const markPractice = (known: boolean) => {
    setPracticeScore((score) => ({ known: score.known + (known ? 1 : 0), total: score.total + 1 }))
    setPracticeIndex((index) => index + 1)
    setPracticeRevealed(false)
  }

  return (
    <div className="fade-in">
      <PageHeader title="发音拼写法则" desc="重点训练连音、终声、鼻音化、流音化、紧音化与送气音化；每条规则都配有例词和即时自测。" />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
        <div className="bg-white rounded-card shadow-card p-3 space-y-1 max-h-[70vh] overflow-y-auto">
          {PRONUNCIATION.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => selectRule(r)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                sel.id === r.id ? 'bg-lavender-light text-lavender-deep' : 'hover:bg-cream'
              }`}
            >
              <span>{r.category}</span>
              {PRIORITY_RULE_IDS.has(r.id) && <span className="float-right rounded-full bg-lavender px-1.5 py-0.5 text-[10px] text-white">重点</span>}
            </button>
          ))}
        </div>

        <motion.div key={sel.id} className="bg-white rounded-card shadow-card p-5 rich fade-in">
          <h2>{sel.category}</h2>
          <p>{sel.rule}</p>

          <h3>📐 公式化表达</h3>
          <p>
            <code>{sel.formula}</code>
          </p>

          <h3>✅ 例词对比（正确读音）</h3>
          <div className="space-y-2">
            {sel.examples.map((e, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-lavender-light/40">
                <SpeakerButton text={e.ko} />
                <div className="flex-1">
                  <div className="korean-font font-semibold">{e.ko}</div>
                  <div className="text-xs text-gray-400">{e.roman} · {e.zh}</div>
                </div>
                <span className="text-sm text-lavender-deep font-mono">{e.ipa}</span>
              </div>
            ))}
          </div>

          <section className="mt-5 rounded-2xl border border-lavender-light bg-cream/45 p-4" aria-label="音变快速练习">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="!mt-0">🎧 音变快速练习</h3>
                <p className="text-xs text-gray-400">先朗读韩文，再点击显示答案；答题结果只保存在本机本次练习中。</p>
              </div>
              <span className="rounded-full bg-white px-2.5 py-1 text-xs text-lavender-deep">答对 {practiceScore.known}/{practiceScore.total}</span>
            </div>
            <div className="mt-3 rounded-xl bg-white p-4 text-center shadow-card">
              <div className="flex items-center justify-center gap-2">
                <SpeakerButton text={practiceExample.ko} />
                <span className="korean-font text-2xl font-bold text-lavender-deep">{practiceExample.ko}</span>
              </div>
              <div className="mt-1 text-xs text-gray-400">{practiceExample.zh}</div>
              {practiceRevealed ? (
                <div className="mt-3 rounded-lg bg-lavender-light/45 px-3 py-2 text-sm text-gray-700">
                  <span className="font-mono">{practiceExample.roman}</span>
                  {practiceExample.ipa && <span className="ml-2 text-lavender-deep">{practiceExample.ipa}</span>}
                </div>
              ) : (
                <button type="button" onClick={() => setPracticeRevealed(true)} className="mt-3 rounded-lg bg-lavender px-4 py-2 text-sm text-white">显示答案</button>
              )}
            </div>
            {practiceRevealed && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => markPractice(false)} className="rounded-xl bg-white py-2 text-sm text-coral shadow-card">需要再练</button>
                <button type="button" onClick={() => markPractice(true)} className="rounded-xl bg-emerald-500 py-2 text-sm text-white">我读对了 ✓</button>
              </div>
            )}
          </section>

          <h3>⚠️ 对比练习 / 常见错误</h3>
          <ul>
            {sel.common_errors.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
