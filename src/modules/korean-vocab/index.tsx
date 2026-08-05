import { useMemo, useState, useEffect } from 'react'
import { Search, RotateCcw, Check, X, BookOpen } from 'lucide-react'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import AddWordButton from '../../components/AddWordButton'
import WordDeck from '../../components/WordDeck'
import DictionarySwitcher from '../../components/DictionarySwitcher'
import { VOCAB } from '../../data/vocab'
import { YONSEI_TOPICS, YONSEI_WORDS, type KoreanTopic, type DictMeta } from '../../data/yonseiVocab'
import { FLASH_TOPICS, FLASH_WORDS } from '../../data/flashcardsVocab'
import { TOPIC_TOPICS, TOPIC_WORDS } from '../../data/topikVocab'
import type { VocabWord } from '../../types'
import { useStore } from '../../stores/useStore'
import { todayStr, getDailyWords, getDailyProgress } from '../../utils/dailyWords'

const LEVELS = ['1', '2', '3', '4', '5', '6']
const DAILY_COUNT = 12
const STUDY_COUNT = 12
type Mode = 'preview' | 'study' | 'daily' | 'all'
type Lib = 'core' | 'yonsei' | 'flashcards' | 'topik'

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

// 四套韩语词库数据源（核心 / 延世 / flashcards / TOPIK），不修改 VOCAB 现有词条，仅切换。
const LIB_MAP: Record<Lib, KoreanTopic[]> = {
  core: CORE_TOPICS,
  yonsei: YONSEI_TOPICS,
  flashcards: FLASH_TOPICS,
  topik: TOPIC_TOPICS,
}

export default function KoreanVocab() {
  const [mode, setMode] = useState<Mode>('preview')
  const [lib, setLib] = useState<Lib>('core')

  // 当前词库数据源（不修改 VOCAB 现有词条，仅切换数据源）
  const activeVocab: KoreanTopic[] = LIB_MAP[lib]

  // 册次筛选（仅延世词库可用）
  const [bookFilter, setBookFilter] = useState('')
  const books = useMemo(() => {
    if (lib !== 'yonsei') return []
    const set = new Set<string>()
    for (const t of YONSEI_TOPICS) for (const w of t.words) if (w.book) set.add(w.book)
    return Array.from(set).sort()
  }, [lib])

  // 切换词库时重置主题与册次
  useEffect(() => {
    setTopic(activeVocab[0]?.topic || '')
    setBookFilter('')
    setQ('')
  }, [lib]) // eslint-disable-line react-hooks/exhaustive-deps

  // —— 词汇预览（主题学习） ——
  const [topic, setTopic] = useState(VOCAB[0].topic)
  const [level, setLevel] = useState<string>('all')
  const [q, setQ] = useState('')

  // —— 刷词状态 ——
  const dailyState = useStore((s) => s.dailyState)
  const flashState = useStore((s) => s.flashState)
  const markDaily = useStore((s) => s.markDaily)
  const markFlash = useStore((s) => s.markFlash)

  // 全量词表（受词库 + 册次筛选影响）
  const allWords = useMemo(() => {
    const base = activeVocab.flatMap((t) => t.words)
    return bookFilter ? base.filter((w) => w.book === bookFilter) : base
  }, [activeVocab, bookFilter])
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

  // 词库清单（按四套数据源动态填数量）
  const dictionaries: DictMeta[] = useMemo(
    () => [
      { id: 'core', name: '核心词库', category: '韩语', length: CORE_TOPICS.flatMap((t) => t.words).length, language: 'ko' },
      { id: 'yonsei', name: '延世韩国语 1-6', category: '韩语教材', length: YONSEI_WORDS.length, language: 'ko' },
      { id: 'flashcards', name: 'Korean Flashcards', category: '韩语日常', length: FLASH_WORDS.length, language: 'ko' },
      { id: 'topik', name: 'TOPIK 词库', category: '韩语考试', length: TOPIC_WORDS.length, language: 'ko' },
    ],
    []
  )

  const Tab = ({ id, label }: { id: Mode; label: string }) => (
    <button
      onClick={() => setMode(id)}
      className={`px-3 py-1.5 rounded-full text-sm transition ${
        mode === id ? 'bg-lavender text-white shadow-card' : 'bg-white text-gray-500 hover:bg-lavender-light/60'
      }`}
    >
      {label}
    </button>
  )

  const libName =
    lib === 'yonsei' ? '延世韩国语 1-6' : lib === 'flashcards' ? 'Korean Flashcards' : lib === 'topik' ? 'TOPIK 词库' : '核心词库'

  return (
    <div className="fade-in">
      <PageHeader
        title="词汇学习"
        desc={`按主题 + TOPIK 等级分类，当前词库「${libName}」共 ${activeVocab.length} 个主题 / ${TOTAL_WORDS} 词。支持「词汇预览」浏览、「学习模式」翻卡自测、「每日刷新」每日自动更新、「单词总汇」滑卡刷词；点击 🔊 听发音，可一键收藏到单词本。`}
      />

      {/* 词库切换器 */}
      <div className="mb-4">
        <DictionarySwitcher dictionaries={dictionaries} activeId={lib} onSelect={(id) => setLib(id as Lib)} />
      </div>

      {/* 四栏切换（预览 + 学习模式 + 每日 + 总汇） */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Tab id="preview" label="词汇预览" />
        <Tab id="study" label="学习模式" />
        <Tab id="daily" label="每日刷新" />
        <Tab id="all" label="单词总汇" />
      </div>

      {/* 册次筛选（仅延世词库） */}
      {lib === 'yonsei' && books.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={15} className="text-gray-400" />
          <select
            value={bookFilter}
            onChange={(e) => setBookFilter(e.target.value)}
            className="inp text-sm py-1.5"
          >
            <option value="">全部教材</option>
            {books.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* —— 词汇预览 —— */}
      {mode === 'preview' && (
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
            {activeVocab.map((t) => (
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
            {bookFilter && ` · ${bookFilter}`}
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
          )}
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
