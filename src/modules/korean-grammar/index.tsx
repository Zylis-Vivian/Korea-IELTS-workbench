import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import AddWordButton from '../../components/AddWordButton'
import { GRAMMAR } from '../../data/grammar'

const LEVELS = ['全部', '初级', '中级', '高级']

export default function KoreanGrammar() {
  const [lv, setLv] = useState('全部')
  const [sel, setSel] = useState(GRAMMAR[0])
  const list = lv === '全部' ? GRAMMAR : GRAMMAR.filter((g) => g.level === lv)

  return (
    <div className="fade-in">
      <PageHeader title="语法大全" desc="每条语法含含义、接续公式、例句、易错点、记忆口诀与小测验。例句中可点击 🔊 听发音。" />

      <div className="flex gap-2 mb-4">
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => {
              setLv(l)
              const f = l === '全部' ? GRAMMAR : GRAMMAR.filter((g) => g.level === l)
              setSel(f[0])
            }}
            className={`px-3 py-1.5 rounded-full text-xs ${
              lv === l ? 'bg-lavender text-white' : 'bg-white text-gray-500'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
        <div className="bg-white rounded-card shadow-card p-3 space-y-1 max-h-[70vh] overflow-y-auto">
          {list.map((g) => (
            <button
              key={g.id}
              onClick={() => setSel(g)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                sel.id === g.id ? 'bg-lavender-light text-lavender-deep' : 'hover:bg-cream'
              }`}
            >
              <span className="font-semibold">{g.pattern}</span>{' '}
              <span className="text-xs text-gray-400">{g.name}</span>
            </button>
          ))}
        </div>

        <motion.div key={sel.id} className="bg-white rounded-card shadow-card p-5 rich fade-in">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-lavender-deep">{sel.pattern}</span>
            <span className="text-xs bg-lavender-light text-lavender-deep rounded px-2 py-0.5">
              {sel.level}
            </span>
            <span className="text-sm text-gray-500">{sel.name}</span>
          </div>

          <h3>📖 含义说明</h3>
          <p>{sel.explanation}</p>

          <h3>📐 接续公式</h3>
          <p>
            <code>{sel.conjugation}</code>
          </p>

          <h3>✅ 正确例句</h3>
          <div className="space-y-2">
            {sel.examples.map((e, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-lavender-light/40">
                <SpeakerButton text={e.ko} />
                <div className="flex-1">
                  <div className="korean-font font-semibold">{e.ko}</div>
                  <div className="text-xs text-gray-400">{e.roman}</div>
                  <div className="text-sm">{e.zh}</div>
                </div>
                <AddWordButton korean={e.ko.split(' ')[0]} romanization={e.roman.split(' ')[0]} chinese={e.zh} source="语法例句" size={14} />
              </div>
            ))}
          </div>

          <h3>❌ 常见错误</h3>
          <ul>
            {sel.common_errors.map((c, i) => (
              <li key={i}>
                <span className="text-coral font-medium">{c.wrong}</span> — {c.reason}
              </li>
            ))}
          </ul>

          <h3>📌 记忆口诀</h3>
          <blockquote>{sel.mnemonic}</blockquote>

          <h3>🎯 小测验</h3>
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
    </div>
  )
}
