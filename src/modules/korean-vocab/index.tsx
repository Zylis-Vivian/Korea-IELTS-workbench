import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import AddWordButton from '../../components/AddWordButton'
import WordDeck from '../../components/WordDeck'
import { VOCAB } from '../../data/vocab'
import { useStore } from '../../stores/useStore'
import { todayStr, getDailyWords, getDailyProgress } from '../../utils/dailyWords'

const LEVELS = ['1', '2', '3', '4', '5', '6']
const DAILY_COUNT = 12
type Mode = 'topic' | 'daily' | 'all'

export default function KoreanVocab() {
  const [mode, setMode] = useState<Mode>('topic')

  // —— 主题学习（原有）——
  const [topic, setTopic] = useState(VOCAB[0].topic)
  const [level, setLevel] = useState<string>('all')
  const [q, setQ] = useState('')

  // —— 刷词状态 ——
  const dailyState = useStore((s) => s.dailyState)
  const flashState = useStore((s) => s.flashState)
  const markDaily = useStore((s) => s.markDaily)
  const markFlash = useStore((s) => s.markFlash)

  const allFlat = useMemo(() => VOCAB.flatMap((t) => t.words), [])
  const totalWords = useMemo(() => allFlat.length, [allFlat])

  // 每日刷新：基于日期确定性选词（换天自动更新）
  const dateStr = todayStr()
  const dailyWords = useMemo(() => getDailyWords(allFlat, dateStr, DAILY_COUNT), [allFlat, dateStr])
  const dailyProg = getDailyProgress(dailyState, dateStr, dailyWords)

  // 单词总汇：全量词卡，可只看未掌握
  const [flashFilter, setFlashFilter] = useState<'all' | 'unknown'>('all')
  const allDeck = useMemo(
    () =>
      flashFilter === 'unknown'
        ? allFlat.filter((w) => flashState[w.korean] !== 'known')
        : allFlat,
    [allFlat, flashFilter, flashState]
  )

  const data = VOCAB.find((t) => t.topic === topic)!
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

  const Tab = ({ id, label }: { id: Mode; label: string }) => (
    <button
      onClick={() => setMode(id)}
      className={`px-3 py-1.5 rounded-full text-sm transition ${
        mode === id
          ? 'bg-lavender text-white shadow-card'
          : 'bg-white text-gray-500 hover:bg-lavender-light/60'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="fade-in">
      <PageHeader
        title="词汇学习"
        desc={`按主题 + TOPIK 等级分类，共 ${VOCAB.length} 个主题 / ${totalWords} 词。支持「每日刷新」每日自动更新词表、「单词总汇」滑卡刷词；点击 🔊 听发音，可一键收藏到单词本。`}
      />

      {/* 三栏切换 */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Tab id="topic" label="主题学习" />
        <Tab id="daily" label="每日刷新" />
        <Tab id="all" label="单词总汇" />
      </div>

      {/* —— 主题学习 —— */}
      {mode === 'topic' && (
        <>
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
                  {w.grammar && <div className="text-xs text-lavender-deep/80 mt-1">📝 语法：{w.grammar}</div>}
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
        </>
      )}

      {/* —— 每日刷新 —— */}
      {mode === 'daily' && (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md mb-4 rounded-card bg-white shadow-card p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">📅 每日词表 · {dateStr}</span>
              <span className="text-lavender-deep font-semibold">
                {dailyProg.done}/{dailyProg.total} 完成
              </span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-lavender-light overflow-hidden">
              <div
                className="h-full bg-lavender transition-all"
                style={{ width: `${dailyProg.total ? (dailyProg.done / dailyProg.total) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>✓ 认识 {dailyProg.known}</span>
              <span>✗ 不认识 {dailyProg.unknown}</span>
              <span>每天 0 点自动更换新词</span>
            </div>
          </div>

          <WordDeck
            words={dailyWords}
            onMark={(w, st) => markDaily(dateStr, w.korean, st)}
            getStatus={(w) => dailyState[dateStr]?.[w.korean]}
          />
        </div>
      )}

      {/* —— 单词总汇 —— */}
      {mode === 'all' && (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md mb-4 flex items-center justify-between">
            <span className="text-xs text-gray-400">全量 {allFlat.length} 词 · 滑卡刷词</span>
            <div className="inline-flex rounded-full bg-white shadow-card p-1">
              <button
                onClick={() => setFlashFilter('all')}
                className={`px-3 py-1 rounded-full text-xs ${flashFilter === 'all' ? 'bg-lavender text-white' : 'text-gray-500'}`}
              >
                全部
              </button>
              <button
                onClick={() => setFlashFilter('unknown')}
                className={`px-3 py-1 rounded-full text-xs ${flashFilter === 'unknown' ? 'bg-lavender text-white' : 'text-gray-500'}`}
              >
                只看未掌握
              </button>
            </div>
          </div>

          <WordDeck
            words={allDeck}
            onMark={(w, st) => markFlash(w.korean, st)}
            getStatus={(w) => flashState[w.korean]}
          />
        </div>
      )}
    </div>
  )
}
