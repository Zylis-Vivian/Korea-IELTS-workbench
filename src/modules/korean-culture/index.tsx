import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '../../components/Layout'
import { CULTURE } from '../../data/culture'

export default function KoreanCulture() {
  const [sel, setSel] = useState(CULTURE[0])

  return (
    <div className="fade-in">
      <PageHeader title="韩国文化风俗" desc="从传统节日、饮食、礼仪到韩服与流行文化，深度图文讲解 + 小测验。" />

      <div className="flex flex-wrap gap-2 mb-4">
        {CULTURE.map((c) => (
          <button
            key={c.id}
            onClick={() => setSel(c)}
            className={`px-3 py-1.5 rounded-full text-xs ${
              sel.id === c.id ? 'bg-lavender text-white' : 'bg-white text-gray-500 hover:bg-lavender-light/60'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      <motion.div key={sel.id} className="bg-white rounded-card shadow-card p-5 rich fade-in">
        <div className="text-xs text-lavender-deep mb-1">{sel.category}</div>
        <h2>{sel.title}</h2>
        <p>{sel.body}</p>

        <h3>📚 关联词汇</h3>
        <div className="flex flex-wrap gap-2">
          {sel.words.map((w, i) => (
            <span key={i} className="text-xs bg-cream rounded-lg px-2 py-1">
              {w.word} · {w.zh}
            </span>
          ))}
        </div>

        <h3>🎯 文化小测验</h3>
        <div className="space-y-2">
          {sel.quiz.map((q, i) => (
            <details key={i} className="p-2 rounded-lg bg-cream">
              <summary className="cursor-pointer text-sm font-medium">{q.q}</summary>
              <div className="text-sm text-lavender-deep mt-1">答：{q.a}</div>
            </details>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
