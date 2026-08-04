import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import AddWordButton from '../../components/AddWordButton'
import { DIALOGUES } from '../../data/dialogue'

export default function KoreanDialogue() {
  const [sel, setSel] = useState(DIALOGUES[0])

  return (
    <div className="fade-in">
      <PageHeader title="情景对话" desc="选择场景后下方对话完全切换为该场景专属内容。点击 🔊 听发音，生词可一键收藏。" />

      <div className="flex flex-wrap gap-2 mb-4">
        {DIALOGUES.map((d) => (
          <button
            key={d.scene}
            onClick={() => setSel(d)}
            className={`px-3 py-1.5 rounded-full text-xs ${
              sel.scene === d.scene ? 'bg-lavender text-white' : 'bg-white text-gray-500 hover:bg-lavender-light/60'
            }`}
          >
            {d.icon} {d.scene}
          </button>
        ))}
      </div>

      <motion.div key={sel.scene} className="bg-white rounded-card shadow-card p-5 fade-in">
        <div className="text-lg font-bold text-lavender-deep mb-3">{sel.icon} {sel.scene}</div>

        <div className="space-y-3">
          {sel.lines.map((l, i) => (
            <div key={i} className={`flex gap-2 ${l.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  l.speaker === 'B' ? 'bg-lavender text-white' : 'bg-lavender-light text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs ${l.speaker === 'B' ? 'text-white/70' : 'text-lavender-deep'}`}>
                    {l.speaker === 'B' ? '我' : '对方'}
                  </span>
                  <SpeakerButton text={l.ko} size={14} className={l.speaker === 'B' ? 'bg-white/30 text-white' : ''} />
                </div>
                <div className="korean-font font-semibold">{l.ko}</div>
                <div className="text-[11px] opacity-80">{l.roman}</div>
                <div className="text-sm">{l.zh}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-lavender-light pt-3">
          <div className="text-sm font-medium text-lavender-deep">📝 重点词汇</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {sel.vocabulary.map((v, i) => (
              <span key={i} className="text-xs bg-cream rounded-lg px-2 py-1">
                {v.word} · {v.zh}
              </span>
            ))}
          </div>
          <div className="text-sm font-medium text-lavender-deep mt-3">🔗 语法点</div>
          <div className="flex flex-wrap gap-2 mt-1">
            {sel.grammar.map((g, i) => (
              <span key={i} className="text-xs bg-lavender-light text-lavender-deep rounded-lg px-2 py-1">
                {g}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
