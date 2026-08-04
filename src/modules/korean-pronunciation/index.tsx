import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import { PRONUNCIATION } from '../../data/pronunciation'

export default function KoreanPronunciation() {
  const [sel, setSel] = useState(PRONUNCIATION[0])

  return (
    <div className="fade-in">
      <PageHeader title="发音拼写法则" desc="完整收录连音、送气化、紧音化、腭化、同化、脱落、添加与不规则音变等全部规则。" />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
        <div className="bg-white rounded-card shadow-card p-3 space-y-1 max-h-[70vh] overflow-y-auto">
          {PRONUNCIATION.map((r) => (
            <button
              key={r.id}
              onClick={() => setSel(r)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                sel.id === r.id ? 'bg-lavender-light text-lavender-deep' : 'hover:bg-cream'
              }`}
            >
              {r.category}
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
