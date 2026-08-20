import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { BookMarked, Check, RotateCcw, Search } from 'lucide-react'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import Pagination from '../../components/Pagination'
import { useStore } from '../../stores/useStore'
import { sceneVocab, roots, topicVocab, type SceneWord, type SceneGroup, type TopicGroup } from '../../data/ieltsVocabData'

type Tab = 'browse' | 'study' | 'synonym' | 'root' | 'speaking'
const EMPTY_SCENE_GROUPS: SceneGroup[] = []
const EMPTY_TOPIC_GROUPS: TopicGroup[] = []
const Synonym = lazy(() => import('./Synonym'))
const Speaking = lazy(() => import('./Speaking'))
const topicFallback = (
  <div className="rounded-card bg-white p-8 text-center text-sm text-gray-400" role="status" aria-live="polite">
    正在准备专题词库…
  </div>
)
const allWords: SceneWord[] = [
  ...sceneVocab.flatMap((g) => g.words.map((w) => ({ ...w, group: g.scene }))),
  ...topicVocab.flatMap((g) => g.words.map((w) => ({ ...w, group: g.topic }))),
]

export default function IeltsVocab() {
  const [tab, setTab] = useState<Tab>('browse')
  return (
    <div className="fade-in">
      <PageHeader title="📚 雅思词汇学习" desc="场景词库 + 同义替换 + 词根词缀 + 口语题库 + 多种练习模式，一键存入雅思单词本。" />
      <div className="flex gap-1 mb-4 bg-white rounded-full p-1 shadow-card overflow-x-auto">
        {([
          ['browse', '词库浏览'],
          ['study', '学习模式'],
          ['synonym', '同义替换'],
          ['root', '词根词缀'],
          ['speaking', '口语题库'],
        ] as [Tab, string][]).map(([k, l]) => (
          <button
            key={k}
            type="button"
            aria-pressed={tab === k}
            onClick={() => setTab(k)}
            className={`flex-1 px-3 py-2 rounded-full text-sm whitespace-nowrap ${
              tab === k ? 'bg-lavender text-white shadow-soft' : 'text-gray-500'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      {tab === 'browse' && <Browse />}
      {tab === 'study' && <Study />}
      {tab === 'synonym' && <Suspense fallback={topicFallback}><Synonym /></Suspense>}
      {tab === 'root' && <Root />}
      {tab === 'speaking' && <Suspense fallback={topicFallback}><Speaking /></Suspense>}
    </div>
  )
}

function AddBtn({ w }: { w: SceneWord }) {
  const addWord = useStore((s) => s.addWord)
  const wordbook = useStore((s) => s.wordbook)
  const inBook = wordbook.some((x) => x.category === 'ielts' && x.english?.toLowerCase() === w.word.toLowerCase())
  return (
    <button
      disabled={inBook}
      onClick={() =>
        addWord({ source: '雅思词汇', category: 'ielts', korean: '', romanization: '', chinese: w.chinese, english: w.word, phonetic: w.phonetic, pos: w.pos, example: w.example, exampleZh: w.exampleCn })
      }
      className={`shrink-0 px-2 py-1 rounded-lg text-xs flex items-center gap-1 ${
        inBook ? 'bg-emerald-50 text-emerald-500' : 'bg-lavender text-white'
      }`}
    >
      {inBook ? <Check size={13} /> : <BookMarked size={13} />}
      {inBook ? '已存' : '存入'}
    </button>
  )
}

function Browse() {
  const [scene, setScene] = useState(sceneVocab[0].scene)
  const [topic, setTopic] = useState(topicVocab[0]?.topic ?? '')
  const [view, setView] = useState<'scene' | 'topic'>('scene')
  const [src, setSrc] = useState<'builtin' | 'zhenting'>('builtin')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [fullData, setFullData] = useState<{ sceneGroups: SceneGroup[]; topicGroups: TopicGroup[] } | null>(null)
  const [fullError, setFullError] = useState(false)

  // 词汇真经全量包含 1.5MB JSON，只在用户首次选择时下载，首屏保留内置精选。
  useEffect(() => {
    if (src !== 'zhenting' || fullData) return
    let cancelled = false
    setFullError(false)
    import('../../data/ieltsVocabFull')
      .then((module) => {
        if (!cancelled) setFullData({ sceneGroups: module.FULL_SCENE_GROUPS, topicGroups: module.FULL_TOPIC_GROUPS })
      })
      .catch(() => {
        if (!cancelled) setFullError(true)
      })
    return () => {
      cancelled = true
    }
  }, [fullData, src])

  // 词库源：内置精选（sceneVocab / topicVocab） vs 词汇真经全量（路由级动态模块）。
  const sceneGroups = src === 'zhenting' ? fullData?.sceneGroups ?? EMPTY_SCENE_GROUPS : sceneVocab
  const topicGroups = src === 'zhenting' ? fullData?.topicGroups ?? EMPTY_TOPIC_GROUPS : topicVocab
  // 切换词库源 / 视图后，当前选中项可能不在新数据集里，做安全兜底避免 find() 崩溃
  const safeScene = sceneGroups.some((g) => g.scene === scene) ? scene : sceneGroups[0]?.scene ?? scene
  const safeTopic = topicGroups.some((g) => g.topic === topic) ? topic : topicGroups[0]?.topic ?? topic
  const list =
    view === 'scene'
      ? (sceneGroups.find((g) => g.scene === safeScene)?.words ?? [])
      : (topicGroups.find((g) => g.topic === safeTopic)?.words ?? [])
  const filtered = useMemo(() => {
    if (!q.trim()) return list
    const kw = q.trim().toLowerCase()
    return list.filter(
      (w) => w.word.toLowerCase().includes(kw) || w.chinese.includes(q.trim()) || w.phonetic.toLowerCase().includes(kw)
    )
  }, [list, q])
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageItems = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize])
  useEffect(() => {
    setPage(1)
  }, [safeScene, safeTopic, view, src, q, pageSize])
  useEffect(() => {
    if (page > pageCount) setPage(pageCount)
  }, [page, pageCount])
  const loadingFull = src === 'zhenting' && !fullData && !fullError

  const resetFilters = () => {
    setQ('')
    setPage(1)
  }

  return (
    <div>
      <section className="mb-4 rounded-card bg-white/80 shadow-card p-3 sm:p-4" aria-label="雅思词汇筛选">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[auto_auto_minmax(180px,260px)_minmax(220px,1fr)] lg:items-end">
          <div>
            <div className="mb-1 text-[11px] text-gray-400">浏览维度</div>
            <div className="inline-flex rounded-full bg-lavender-light/40 p-1">
          <button
            type="button"
            aria-pressed={view === 'scene'}
            onClick={() => setView('scene')}
            className={`px-3 py-1 rounded-full text-sm ${view === 'scene' ? 'bg-lavender text-white' : 'text-gray-500'}`}
          >
            场景词
          </button>
          <button
            type="button"
            aria-pressed={view === 'topic'}
            onClick={() => setView('topic')}
            className={`px-3 py-1 rounded-full text-sm ${view === 'topic' ? 'bg-lavender text-white' : 'text-gray-500'}`}
          >
            话题词
          </button>
        </div>
          </div>
          <div>
            <div className="mb-1 text-[11px] text-gray-400">词库来源</div>
            <div className="inline-flex rounded-full bg-lavender-light/40 p-1">
          <button
            type="button"
            aria-pressed={src === 'builtin'}
            onClick={() => setSrc('builtin')}
            className={`px-3 py-1 rounded-full text-sm ${src === 'builtin' ? 'bg-lavender text-white' : 'text-gray-500'}`}
          >
            内置精选
          </button>
          <button
            type="button"
            aria-pressed={src === 'zhenting'}
            onClick={() => setSrc('zhenting')}
            className={`px-3 py-1 rounded-full text-sm ${src === 'zhenting' ? 'bg-lavender text-white' : 'text-gray-500'}`}
          >
            词汇真经全量
          </button>
        </div>
          </div>
          <label className="block">
            <span className="mb-1 block text-[11px] text-gray-400">{view === 'scene' ? '场景' : '话题'}</span>
            <select
              aria-label={view === 'scene' ? '选择场景' : '选择话题'}
              className="inp w-full"
              value={view === 'scene' ? safeScene : safeTopic}
              onChange={(e) => { if (view === 'scene') setScene(e.target.value); else setTopic(e.target.value); setPage(1) }}
              disabled={loadingFull}
            >
              {(view === 'scene' ? sceneGroups : topicGroups).map((g) => (
                <option key={g.scene || g.topic} value={g.scene || g.topic}>
                  {g.scene || g.topic}（{(g.words || []).length}）
                </option>
              ))}
            </select>
          </label>
          <label className="relative block">
            <span className="sr-only">搜索英文、中文或音标</span>
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1) }}
              placeholder="搜索英文 / 中文 / 音标"
              className="inp w-full pl-9 pr-9"
            />
            {q && <button type="button" aria-label="清空搜索" onClick={resetFilters} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-lavender-light"><span aria-hidden>×</span></button>}
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          {loadingFull && <span className="rounded-full bg-lavender-light/60 px-2.5 py-1 text-lavender-deep">正在加载全量词库…</span>}
          {fullError && <span className="rounded-full bg-red-50 px-2.5 py-1 text-red-600">全量词库加载失败，请切换后重试</span>}
          <span>{filtered.length} 词</span>
          <span>每页 {pageSize} 词</span>
          {(q || page > 1) && <button type="button" onClick={resetFilters} className="rounded-full bg-lavender-light/60 px-2.5 py-1 text-lavender-deep hover:bg-lavender-light">清除搜索</button>}
        </div>
      </section>
      {!loadingFull && filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-12">没有匹配的单词，换个关键词试试～</div>
      ) : !loadingFull ? (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pageItems.map((w, i) => (
            <div key={i} className="bg-white rounded-card shadow-card p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-gray-800">{w.word}</span>
                  <SpeakerButton text={w.word} category="ielts" size={13} />
                  <span className="text-xs text-gray-400">{w.phonetic}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cream text-gray-500">{w.pos}</span>
                </div>
                <div className="text-sm text-gray-600">{w.chinese}</div>
                <div className="text-xs text-gray-400 truncate">{w.example}</div>
              </div>
              <AddBtn w={w} />
            </div>
          ))}
        </div>
        <Pagination page={page} total={filtered.length} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(1) }} />
        </>
      ) : null}
    </div>
  )
}

function Study() {
  const [list, setList] = useState<SceneWord[]>(() => shuffle(allWords).slice(0, 10))
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const cur = list[idx]
  const restart = () => {
    setList(shuffle(allWords).slice(0, 10))
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
  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>进度 {idx + 1}/{list.length}</span>
        <span>已掌握 {known}</span>
        <button onClick={restart} className="flex items-center gap-1 text-lavender-deep">
          <RotateCcw size={12} /> 换一批
        </button>
      </div>
      <div
        onClick={() => setFlipped((f) => !f)}
        className="bg-white rounded-card shadow-card p-8 text-center cursor-pointer min-h-[180px] flex flex-col items-center justify-center select-none"
      >
        <SpeakerButton text={cur.word} category="ielts" size={20} className="mb-3" />
        {!flipped ? (
          <div className="text-2xl font-bold text-gray-800">{cur.word}</div>
        ) : (
          <div>
            <div className="text-lg text-lavender-deep">{cur.chinese}</div>
            <div className="text-sm text-gray-400 mt-1">{cur.phonetic} · {cur.pos}</div>
            <div className="text-sm text-gray-500 mt-2">{cur.example}</div>
          </div>
        )}
        <div className="text-xs text-gray-300 mt-4">点击卡片翻面</div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => {
            setKnown(known + 1)
            next()
          }}
          className="flex-1 py-2 rounded-xl bg-emerald-500 text-white text-sm"
        >
          认识 ✓
        </button>
        <button onClick={next} className="flex-1 py-2 rounded-xl bg-cream text-gray-600 text-sm">
          不认识，跳过
        </button>
      </div>
    </div>
  )
}

function Root() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {roots.map((r, i) => (
        <div key={i} className="bg-white rounded-card shadow-card p-3">
          <div className="font-medium text-lavender-deep">
            -{r.root}- <span className="text-sm text-gray-500">({r.meaning})</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {r.words.map((w) => (
              <span key={w.word} className="text-xs bg-cream rounded-lg px-2 py-1 text-gray-700">
                {w.word} <span className="text-gray-400">{w.chinese}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
