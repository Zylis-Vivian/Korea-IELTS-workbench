import { useState } from 'react'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import AddWordButton from '../../components/AddWordButton'
import { VOCAB } from '../../data/vocab'

export default function KoreanVocab() {
  const [topic, setTopic] = useState(VOCAB[0].topic)
  const data = VOCAB.find((t) => t.topic === topic)!

  return (
    <div className="fade-in">
      <PageHeader title="词汇学习" desc={`按主题分类，共 ${VOCAB.length} 个主题。点击 🔊 听发音，可一键收藏到单词本。`} />

      <div className="flex flex-wrap gap-2 mb-4">
        {VOCAB.map((t) => (
          <button
            key={t.topic}
            onClick={() => setTopic(t.topic)}
            className={`px-3 py-1.5 rounded-full text-xs transition ${
              topic === t.topic
                ? 'bg-lavender text-white'
                : 'bg-white text-gray-500 hover:bg-lavender-light/60'
            }`}
          >
            {t.topic}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.words.map((w, i) => (
          <div key={i} className="bg-white rounded-card shadow-card p-4 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-2xl korean-font font-bold text-lavender-deep">{w.korean}</span>
              <SpeakerButton text={w.korean} />
            </div>
            <div className="text-xs text-gray-400">{w.romanization}</div>
            <div className="text-sm">{w.chinese}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] bg-lavender-light text-lavender-deep rounded px-2 py-0.5">
                TOPIK {w.level || '-'}
              </span>
              <AddWordButton
                korean={w.korean}
                romanization={w.romanization}
                chinese={w.chinese}
                source="词汇"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
