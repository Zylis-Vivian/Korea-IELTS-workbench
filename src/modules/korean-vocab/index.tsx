import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import AddWordButton from '../../components/AddWordButton'
import { VOCAB } from '../../data/vocab'

const LEVELS = ['1', '2', '3', '4', '5', '6']

export default function KoreanVocab() {
  const [topic, setTopic] = useState(VOCAB[0].topic)
  const [level, setLevel] = useState<string>('all')
  const [q, setQ] = useState('')

  const data = VOCAB.find((t) => t.topic === topic)!

  const totalWords = useMemo(() => VOCAB.reduce((s, t) => s + t.words.length, 0), [])
  const topicWords = useMemo(() => {
    let list = data.words
    if (level !== 'all') list = list.filter((w) => w.level === level)
    if (q.trim()) {
      const kw = q.trim().toLowerCase()
      list = list.filter(
        (w) =>
          w.korean.toLowerCase().includes(kw) ||
          w.romanization.toLowerCase().includes(kw) ||
          w.chinese.toLowerCase().includes(kw)
      )
    }
    return list
  }, [data, level, q])

  return (
    <div className="fade-in">
      <PageHeader
        title="词汇学习"
        desc={`按主题 + TOPIK 等级分类，共 ${VOCAB.length} 个主题 / ${totalWords} 词。点击 🔊 听发音，可一键收藏到单词本；支持等级筛选与搜索。`}
      />

      {/* 搜索 + 等级筛选 */}
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索韩文 / 罗马音 / 中文"
            className="inp w-full pl-9"
          />
        </div>
        <div className="inline-flex rounded-full bg-white shadow-card p-1 overflow-x-auto">
          <button
            onClick={() => setLevel('all')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${level === 'all' ? 'bg-lavender text-white' : 'text-gray-500'}`}
          >
            全部
          </button>
          {LEVELS.map((lv) => (
            <button
              key={lv}
              onClick={() => setLevel(lv)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${level === lv ? 'bg-lavender text-white' : 'text-gray-500'}`}
            >
              TOPIK {lv}
            </button>
          ))}
        </div>
      </div>

      {/* 主题 tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {VOCAB.map((t) => (
          <button
            key={t.topic}
            onClick={() => {
              setTopic(t.topic)
              setQ('')
            }}
            className={`px-3 py-1.5 rounded-full text-xs transition ${
              topic === t.topic ? 'bg-lavender text-white' : 'bg-white text-gray-500 hover:bg-lavender-light/60'
            }`}
          >
            {t.topic}
          </button>
        ))}
      </div>

      <div className="text-xs text-gray-400 mb-2">
        {topic} · {topicWords.length} 词
        {level !== 'all' && ` · TOPIK ${level}`}
        {q.trim() && ` · 搜索「${q.trim()}」`}
      </div>

      {topicWords.length === 0 ? (
        <div className="text-center text-gray-400 py-12">没有匹配的单词，换个条件试试～</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topicWords.map((w, i) => (
            <div key={i} className="bg-white rounded-card shadow-card p-4 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl korean-font font-bold text-lavender-deep">{w.korean}</span>
                <SpeakerButton text={w.korean} />
              </div>
              <div className="text-xs text-gray-400">{w.romanization}</div>
              <div className="text-sm">{w.chinese}</div>
              {w.example && <div className="text-xs text-gray-400 mt-1">💡 {w.example}</div>}
              {w.exampleZh && <div className="text-xs text-gray-300">　{w.exampleZh}</div>}
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] bg-lavender-light text-lavender-deep rounded px-2 py-0.5">
                  TOPIK {w.level || '-'}
                </span>
                <AddWordButton korean={w.korean} romanization={w.romanization} chinese={w.chinese} source="词汇" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
