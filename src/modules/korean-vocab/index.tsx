import { useMemo, useState, useEffect } from 'react'
import { Search, RotateCcw, Check, X } from 'lucide-react'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import AddWordButton from '../../components/AddWordButton'
import WordDeck from '../../components/WordDeck'
import Pagination from '../../components/Pagination'
import { VOCAB } from '../../data/vocab'
import { type KoreanTopic } from '../../data/yonseiVocab'
import { TOPIC_TOPICS, TOPIC_WORDS } from '../../data/topikVocab'
import type { VocabWord } from '../../types'
import { useStore } from '../../stores/useStore'
import { todayStr, getDailyWords, getDailyProgress } from '../../utils/dailyWords'
import useDebouncedValue from '../../hooks/useDebouncedValue'

const LEVELS = ['1', '2', '3', '4', '5', '6']
const DAILY_COUNT = 12
const STUDY_COUNT = 12
type Mode = 'preview' | 'study' | 'daily' | 'all'
type Lib = 'core' | 'flashcards' | 'topik'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 核心词库（VOCAB）的结构与 KoreanTopic 同形，统一按 KoreanTopic 处理
const CORE_TOPICS = VOCAB as unknown as KoreanTopic[]

function mergeDuplicateTopics(topics: KoreanTopic[]): KoreanTopic[] {
  const merged = new Map<string, KoreanTopic>()
  for (const topic of topics) {
    const existing = merged.get(topic.topic)
    if (existing) existing.words.push(...topic.words)
    else merged.set(topic.topic, { ...topic, words: [...topic.words] })
  }
  return [...merged.values()]
}

// 核心词库与 TOPIK 词库保持轻量同步导入；2MB+ 的 Korean Flashcards 在用户选择后再加载。
const CORE_LIBRARY = mergeDuplicateTopics(CORE_TOPICS)
const TOPIK_LIBRARY = mergeDuplicateTopics(TOPIC_TOPICS)
const CORE_WORD_COUNT = CORE_LIBRARY.reduce((sum, topic) => sum + topic.words.length, 0)
const TOPIK_WORD_COUNT = TOPIC_WORDS.length
const FLASHCARD_WORD_COUNT = 4243

function ModeTab({ id, label, active, onSelect }: { id: Mode; label: string; active: boolean; onSelect: (id: Mode) => void }) {
  return (
    <button
      onClick={() => onSelect(id)}
      type="button"
      aria-pressed={active}
      className={`px-3 py-1.5 rounded-full text-sm transition ${
        active ? 'bg-lavender text-white shadow-card' : 'bg-white text-gray-500 hover:bg-lavender-light/60'
      }`}
    >
      {label}
    </button>
  )
}

export default function KoreanVocab() {
  const [mode, setMode] = useState<Mode>('preview')
  const [lib, setLib] = useState<Lib>('core')
  const [topic, setTopic] = useState(VOCAB[0].topic)
  const [level, setLevel] = useState<string>('all')
  const [q, setQ] = useState('')
  const debouncedQ = useDebouncedValue(q)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [flashTopics, setFlashTopics] = useState<KoreanTopic[] | null>(null)
  const [flashLoading, setFlashLoading] = useState(false)
  const [flashError, setFlashError] = useState(false)

  // 当前词库数据源（不修改 VOCAB 现有词条，仅切换数据源）。Flashcards 只在需要时下载。
  const activeVocab: KoreanTopic[] = useMemo(
    () => (lib === 'core' ? CORE_LIBRARY : lib === 'topik' ? TOPIK_LIBRARY : flashTopics || []),
    [flashTopics, lib]
  )

  useEffect(() => {
    if (lib !== 'flashcards' || flashTopics || flashLoading) return
    let cancelled = false
    setFlashLoading(true)
    setFlashError(false)
    import('../../data/flashcardsVocab')
      .then((module) => {
        if (!cancelled) setFlashTopics(mergeDuplicateTopics(module.FLASH_TOPICS))
      })
      .catch(() => {
        if (!cancelled) setFlashError(true)
      })
      .finally(() => {
        if (!cancelled) setFlashLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [flashLoading, flashTopics, lib])

  // 切换词库时重置主题与筛选条件，避免把旧词库的主题带到新词库。
  useEffect(() => {
    setTopic('')
    setQ('')
    setLevel('all')
    setPage(1)
  }, [lib])

  useEffect(() => {
    if (activeVocab.length && !activeVocab.some((item) => item.topic === topic)) setTopic(activeVocab[0].topic)
  }, [activeVocab, topic])

  // —— 词汇预览（主题学习） ——

  // —— 刷词状态 ——
  const dailyState = useStore((s) => s.dailyState)
  const flashState = useStore((s) => s.flashState)
  const markDaily = useStore((s) => s.markDaily)
  const markFlash = useStore((s) => s.markFlash)

  // 全量词表
  const allWords = useMemo(() => activeVocab.flatMap((t) => t.words), [activeVocab])
  const TOTAL_WORDS = allWords.length
  const TOPICS = activeVocab.map((t) => t.topic)

  // 每日刷新：基于日期确定性选词（换天自动更新）
  const dateStr = todayStr()
  const dailyWords = useMemo(() => getDailyWords(allWords, dateStr, DAILY_COUNT), [allWords, dateStr])
  const dailyProg = getDailyProgress(dailyState, dateStr, dailyWords)

  // 单词总汇：全量词卡，可只看未掌握
  const [flashFilter, setFlashFilter] = useState<'all' | 'unknown'>('all')
  const allDeck = useMemo(
    () =>
      flashFilter === 'unknown' ? allWords.filter((w) => flashState[w.korean] !== 'known') : allWords,
    [flashFilter, flashState, allWords]
  )

  const data = activeVocab.find((t) => t.topic === topic) || activeVocab[0]
  const topicWords = useMemo(() => {
    let list = data?.words || []
    if (level !== 'all') list = list.filter((w) => w.level === level)
    if (debouncedQ.trim()) {
      const kw = debouncedQ.trim().toLowerCase()
      list = list.filter(
        (w) =>
          w.korean.toLowerCase().includes(kw) ||
          w.romanization.toLowerCase().includes(kw) ||
          w.chinese.toLowerCase().includes(kw)
      )
    }
    return list
  }, [data, debouncedQ, level])
  const isFiltering = q !== debouncedQ

  const pageCount = Math.max(1, Math.ceil(topicWords.length / pageSize))
  const pageItems = useMemo(
    () => topicWords.slice((page - 1) * pageSize, page * pageSize),
    [page, pageSize, topicWords]
  )
  useEffect(() => {
    if (page > pageCount) setPage(pageCount)
  }, [page, pageCount])

  const libName = lib === 'flashcards' ? 'Korean Flashcards' : lib === 'topik' ? 'TOPIK 词库' : '核心词库'
  const isLoading = lib === 'flashcards' && flashLoading && !flashTopics

  return (
    <div className="fade-in">
      <PageHeader
        title="词汇学习"
        desc={`按主题 + TOPIK 等级分类，当前词库「${libName}」共 ${activeVocab.length} 个主题 / ${TOTAL_WORDS} 词。支持「词汇预览」浏览、「学习模式」翻卡自测、「每日刷新」每日自动更新、「单词总汇」滑卡刷词；点击 🔊 听发音，可一键收藏到单词本。延世韩国语教材学习请使用侧边栏「延世韩国语」。`}
      />

      {/* 先选词库，再选学习模式；把原来混在一起的多排按钮收敛为两个清晰层级。 */}
      <section className="mb-4 rounded-card bg-white/80 shadow-card p-3 sm:p-4" aria-label="词汇学习筛选">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="词库来源">
            {([
              ['core', '核心词库', CORE_WORD_COUNT],
              ['flashcards', 'Korean Flashcards', FLASHCARD_WORD_COUNT],
              ['topik', 'TOPIK 词库', TOPIK_WORD_COUNT],
            ] as const).map(([id, label, count]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={lib === id}
                onClick={() => setLib(id)}
                className={`rounded-full px-3 py-1.5 text-xs transition ${lib === id ? 'bg-lavender text-white shadow-card' : 'bg-lavender-light/40 text-gray-600 hover:bg-lavender-light'}`}
              >
                {label} <span className="opacity-75">{count.toLocaleString()}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="学习模式">
            <ModeTab id="preview" label="词汇预览" active={mode === 'preview'} onSelect={setMode} />
            <ModeTab id="study" label="学习模式" active={mode === 'study'} onSelect={setMode} />
            <ModeTab id="daily" label="每日刷新" active={mode === 'daily'} onSelect={setMode} />
            <ModeTab id="all" label="单词总汇" active={mode === 'all'} onSelect={setMode} />
          </div>
        </div>
      </section>

      {/* 延世韩国语已独立为 /korean/yonsei，此处不再混入，避免面板混乱 */}

      {/* —— 词汇预览 —— */}
      {mode === 'preview' && (
        <>
          <div className="mb-4 rounded-card bg-white/70 shadow-card p-3 sm:p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(180px,260px)]">
              <label className="relative block">
                <span className="sr-only">搜索韩文、罗马音或中文</span>
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  aria-label="搜索韩文、罗马音或中文"
                  inputMode="search"
                  enterKeyHint="search"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value)
                    setPage(1)
                  }}
                  placeholder="搜索韩文 / 罗马音 / 中文"
                  className="inp inp-leading-icon inp-trailing-icon w-full"
                />
                {q && (
                  <button type="button" aria-label="清空搜索" onClick={() => setQ('')} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-lavender-light">
                    <X size={14} />
                  </button>
                )}
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-500">
                <span className="whitespace-nowrap">主题</span>
                <select value={topic} onChange={(e) => { setTopic(e.target.value); setQ(''); setPage(1) }} className="inp min-w-0 flex-1">
                  {activeVocab.map((item) => <option key={item.topic} value={item.topic}>{item.topic}</option>)}
                </select>
              </label>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-gray-500">
                <span>TOPIK 等级</span>
                <select value={level} onChange={(e) => { setLevel(e.target.value); setPage(1) }} className="inp py-1.5">
                  <option value="all">全部</option>
                  {LEVELS.map((lv) => <option key={lv} value={lv}>TOPIK {lv}</option>)}
                </select>
              </label>
              <span className="text-xs text-gray-400">{activeVocab.length} 个主题 · {TOTAL_WORDS.toLocaleString()} 词</span>
              {(q || level !== 'all') && <button type="button" onClick={() => { setQ(''); setLevel('all'); setPage(1) }} className="inline-flex items-center gap-1 rounded-full bg-lavender-light/60 px-2.5 py-1 text-xs text-lavender-deep hover:bg-lavender-light"><RotateCcw size={12} />清除筛选</button>}
            </div>
          </div>

          {isLoading && <div className="rounded-card bg-white p-8 text-center text-sm text-gray-400 shadow-card">正在加载 Korean Flashcards…</div>}
          {flashError && <div className="rounded-card bg-red-50 p-4 text-center text-sm text-red-600">词库加载失败，请稍后重试或切换其他词库。</div>}

          {!isLoading && !flashError && (
            <div className="text-xs text-gray-400 mb-2" aria-live="polite">
              {isFiltering ? '正在筛选…' : (
                <>
                  {topic} · {topicWords.length} 词
                  {level !== 'all' && ` · TOPIK ${level}`}
                  {debouncedQ.trim() && ` · 搜索「${debouncedQ.trim()}」`}
                </>
              )}
            </div>
          )}

          {!isLoading && !flashError && topicWords.length === 0 ? (
            <div className="text-center text-gray-400 py-12">没有匹配的单词，换个条件试试～</div>
          ) : !isLoading && !flashError ? (
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pageItems.map((w, i) => (
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
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] bg-lavender-light text-lavender-deep rounded px-2 py-0.5">
                        TOPIK {w.level || '-'}
                      </span>
                      {w.book && (
                        <span className="text-[10px] bg-gray-100 text-gray-500 rounded px-2 py-0.5">
                          {w.book.replace('延世韩国语', '延世')}
                        </span>
                      )}
                    </div>
                    <AddWordButton korean={w.korean} romanization={w.romanization} chinese={w.chinese} source="词汇" />
                  </div>
                </div>
              ))}
            </div>
            <Pagination page={page} total={topicWords.length} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(1) }} />
            </>
          ) : null}
        </>
      )}

      {/* —— 学习模式（翻卡自测） —— */}
      {mode === 'study' && <Study allWords={allWords} topics={TOPICS} markFlash={markFlash} flashState={flashState} />}

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
            <span className="text-xs text-gray-400">全量 {allWords.length} 词 · 滑卡刷词</span>
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

// ── 学习模式：随机选词 + 翻卡自测（认识标记联动「单词总汇」未掌握） ──
function Study({
  allWords,
  topics,
  markFlash,
  flashState,
}: {
  allWords: VocabWord[]
  topics: string[]
  markFlash: (k: string, s: 'known' | 'unknown') => void
  flashState: Record<string, 'known' | 'unknown'>
}) {
  const [topic, setTopic] = useState('全部')
  const [list, setList] = useState<VocabWord[]>([])
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)

  function pick(t: string) {
    const pool = t === '全部' ? allWords : allWords.filter((w) => w.topic === t)
    return shuffle(pool).slice(0, Math.min(STUDY_COUNT, pool.length))
  }
  // 数据源变化（词库/册次/首次挂载）时重置选词
  useEffect(() => {
    const l = pick('全部')
    setList(l)
    setIdx(0)
    setFlipped(false)
    setKnown(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allWords])
  const restart = (t = topic) => {
    setList(pick(t))
    setIdx(0)
    setFlipped(false)
    setKnown(0)
  }
  const next = () => {
    if (idx < list.length - 1) {
      setIdx(idx + 1)
      setFlipped(false)
    } else restart()
  }
  const cur = list[idx]

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex rounded-full bg-white shadow-card p-1 overflow-x-auto">
          <button
            onClick={() => {
              setTopic('全部')
              restart('全部')
            }}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${topic === '全部' ? 'bg-lavender text-white' : 'text-gray-500'}`}
          >
            全部主题
          </button>
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTopic(t)
                restart(t)
              }}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${topic === t ? 'bg-lavender text-white' : 'text-gray-500'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>进度 {idx + 1}/{list.length}</span>
        <span>已掌握 {known}</span>
        <button onClick={() => restart()} className="flex items-center gap-1 text-lavender-deep">
          <RotateCcw size={12} /> 换一批
        </button>
      </div>

      {cur && (
        <div
          onClick={() => setFlipped((f) => !f)}
          className="bg-white rounded-card shadow-card p-8 text-center cursor-pointer min-h-[200px] flex flex-col items-center justify-center select-none"
        >
          <div className="flex items-center gap-2 mb-3">
            <SpeakerButton text={cur.korean} category="korean" size={20} />
            <span className="text-[10px] bg-lavender-light text-lavender-deep rounded px-2 py-0.5">
              TOPIK {cur.level || '-'}
            </span>
            {cur.book && (
              <span className="text-[10px] bg-gray-100 text-gray-500 rounded px-2 py-0.5">
                {cur.book.replace('延世韩国语', '延世')}
              </span>
            )}
          </div>
          {!flipped ? (
            <div className="text-3xl font-bold korean-font text-lavender-deep">{cur.korean}</div>
          ) : (
            <div>
              <div className="text-sm text-gray-400">{cur.romanization}</div>
              <div className="text-xl text-lavender-deep mt-1">{cur.chinese}</div>
              {cur.example && <div className="text-xs text-gray-400 mt-2">💡 {cur.example}</div>}
              {cur.exampleZh && <div className="text-xs text-gray-300">　{cur.exampleZh}</div>}
              {cur.grammar && <div className="text-xs text-lavender-deep/80 mt-2">📝 语法：{cur.grammar}</div>}
            </div>
          )}
          <div className="text-xs text-gray-300 mt-4">点击卡片翻面</div>
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => {
            markFlash(cur.korean, 'known')
            setKnown(known + 1)
            next()
          }}
          className="flex-1 py-2 rounded-xl bg-emerald-500 text-white text-sm flex items-center justify-center gap-1"
        >
          <Check size={15} /> 认识
        </button>
        <button
          onClick={next}
          className="flex-1 py-2 rounded-xl bg-cream text-gray-600 text-sm flex items-center justify-center gap-1"
        >
          <X size={15} /> 不认识，跳过
        </button>
      </div>
      <p className="text-[11px] text-gray-400 text-center mt-2">
        点「认识」会把该词标记为已掌握，可在「单词总汇 · 只看未掌握」中隐藏。
      </p>
    </div>
  )
}
