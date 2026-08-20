import { useEffect, useMemo, useState } from 'react'
import { Search, BookOpen, GraduationCap, Volume2, ChevronLeft, ChevronRight } from 'lucide-react'
import { PageHeader } from '../../components/Layout'
import { usePronunciation } from '../../hooks/usePronunciation'
import type { KoreanTopic } from '../../data/yonseiVocab'
import type { VocabWord } from '../../types'

const PAGE_SIZE = 50
const EMPTY_WORDS: VocabWord[] = []
const EMPTY_TOPICS: KoreanTopic[] = []

interface OriginMeta {
  label: string
  tag: string
  color: string
  bg: string
  border: string
  rowBorder: string
  desc: string
}

const ORIGIN_META: Record<string, OriginMeta> = {
  hanja: {
    label: '汉字词',
    tag: '汉',
    color: 'text-white',
    bg: 'bg-violet-600',
    border: 'border-violet-600',
    rowBorder: 'border-l-violet-500',
    desc: '由汉字词源构成',
  },
  native: {
    label: '固有词',
    tag: '固',
    color: 'text-white',
    bg: 'bg-emerald-600',
    border: 'border-emerald-600',
    rowBorder: 'border-l-emerald-500',
    desc: '韩语固有词',
  },
  loanword: {
    label: '外来词',
    tag: '外',
    color: 'text-white',
    bg: 'bg-amber-600',
    border: 'border-amber-600',
    rowBorder: 'border-l-amber-500',
    desc: '来自外语音译',
  },
  hybrid: {
    label: '混合词',
    tag: '混',
    color: 'text-white',
    bg: 'bg-pink-500',
    border: 'border-pink-500',
    rowBorder: 'border-l-pink-500',
    desc: '由不同来源构成',
  },
  expression: {
    label: '搭配/表达',
    tag: '搭',
    color: 'text-white',
    bg: 'bg-orange-600',
    border: 'border-orange-600',
    rowBorder: 'border-l-orange-500',
    desc: '固定搭配或表达',
  },
  grammar: {
    label: '语法形式',
    tag: '法',
    color: 'text-white',
    bg: 'bg-blue-600',
    border: 'border-blue-600',
    rowBorder: 'border-l-blue-500',
    desc: '助词、词尾等',
  },
  unknown: {
    label: '待核',
    tag: '?',
    color: 'text-white',
    bg: 'bg-gray-500',
    border: 'border-gray-500',
    rowBorder: 'border-l-gray-400',
    desc: '词源待核对',
  },
}

function originInfo(type?: string): OriginMeta {
  return ORIGIN_META[type || ''] || ORIGIN_META.unknown
}

function Speakable({
  text,
  lang,
  className = '',
  children,
}: {
  text: string
  lang: 'ko-KR' | 'en-US'
  className?: string
  children: React.ReactNode
}) {
  const { speak } = usePronunciation()
  return (
    <button
      onClick={() => void speak(text, { lang })}
      className={`group inline-flex items-center gap-1 text-left hover:underline underline-offset-4 decoration-lavender focus:outline-none ${className}`}
      title={`点击朗读 ${text}`}
    >
      {children}
      <Volume2 size={13} className="opacity-0 group-hover:opacity-100 transition text-lavender-deep shrink-0" />
    </button>
  )
}

export default function KoreanYonsei() {
  const [data, setData] = useState<{ words: VocabWord[]; topics: KoreanTopic[] } | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [book, setBook] = useState<string>('')
  const [topic, setTopic] = useState<string>('')
  const [origin, setOrigin] = useState<string>('')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)

  // 延世教材数据约 2MB，仅在进入教材路由时下载，避免首屏把教材 JSON 打进主包。
  useEffect(() => {
    let cancelled = false
    import('../../data/yonseiVocab')
      .then((module) => {
        if (!cancelled) setData({ words: module.YONSEI_WORDS, topics: module.YONSEI_TOPICS })
      })
      .catch(() => {
        if (!cancelled) setLoadError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const YONSEI_WORDS = data?.words ?? EMPTY_WORDS
  const YONSEI_TOPICS = data?.topics ?? EMPTY_TOPICS

  const books = useMemo(
    () => Array.from(new Set(YONSEI_WORDS.map((w) => w.book).filter(Boolean))).sort() as string[],
    [YONSEI_WORDS]
  )

  const topics = useMemo(() => {
    let list = YONSEI_TOPICS.map((t) => t.topic)
    if (book) {
      list = Array.from(new Set(YONSEI_WORDS.filter((w) => w.book === book).map((w) => w.topic)))
    }
    return list.sort()
  }, [book, YONSEI_TOPICS, YONSEI_WORDS])

  const originTypes = useMemo(
    () => Array.from(new Set(YONSEI_WORDS.map((w) => w.originType).filter(Boolean))).sort() as string[],
    [YONSEI_WORDS]
  )

  const filtered = useMemo(() => {
    let list = [...YONSEI_WORDS]
    if (book) list = list.filter((w) => w.book === book)
    if (topic) list = list.filter((w) => w.topic === topic)
    if (origin) list = list.filter((w) => w.originType === origin)
    if (q.trim()) {
      const kw = q.trim().toLowerCase()
      list = list.filter(
        (w) =>
          w.korean.toLowerCase().includes(kw) ||
          w.romanization.toLowerCase().includes(kw) ||
          w.chinese.toLowerCase().includes(kw) ||
          (w.english || '').toLowerCase().includes(kw)
      )
    }
    return list
  }, [YONSEI_WORDS, book, topic, origin, q])

  // 筛选条件变化时回到第一页（避免在 useMemo 里 setState）
  useEffect(() => {
    setPage(1)
  }, [book, topic, origin, q])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageWords = useMemo(() => {
    const safePage = Math.min(page, totalPages)
    return filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  }, [filtered, page, totalPages])

  if (!data) {
    return (
      <div className="fade-in">
        <PageHeader title="延世韩国语 1-6" desc="按教材册次、课次顺序学习；教材数据按需加载，不影响首屏速度。" />
        <div className={`rounded-card p-8 text-center text-sm shadow-card ${loadError ? 'bg-red-50 text-red-600' : 'bg-white text-gray-400'}`}>
          {loadError ? '教材数据加载失败，请刷新页面重试。' : '正在加载延世韩国语词库…'}
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <PageHeader
        title="延世韩国语 1-6"
        desc={`按教材册次、课次顺序学习，共 ${YONSEI_WORDS.length} 词。表格左侧为韩语词与词性，中间为中文与英文释义，右侧标注词源与发音提示；点击韩语或英文即可朗读。`}
      />

      {/* 图例 */}
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(ORIGIN_META).map(([key, meta]) => (
          <div
            key={key}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs ${meta.bg} ${meta.color} border ${meta.border}`}
            title={meta.desc}
          >
            <span className="font-bold">{meta.tag}</span>
            <span>{meta.label}</span>
          </div>
        ))}
      </div>

      {/* 筛选器 */}
      <div className="mb-3 flex flex-col sm:flex-row flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <BookOpen size={15} className="text-gray-400" />
          <select
            value={book}
            onChange={(e) => {
              setBook(e.target.value)
              setTopic('')
            }}
            className="inp text-sm py-1.5"
          >
            <option value="">全部册次</option>
            {books.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <GraduationCap size={15} className="text-gray-400" />
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="inp text-sm py-1.5">
            <option value="">全部主题</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="inp text-sm py-1.5">
          <option value="">全部词源</option>
          {originTypes.map((o) => {
            const info = originInfo(o)
            return (
              <option key={o} value={o}>
                {info.tag}·{info.label}
              </option>
            )
          })}
        </select>

        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索韩文 / 罗马音 / 中文 / 英文"
            className="inp inp-leading-icon w-full"
          />
        </div>
      </div>

      <div className="text-xs text-gray-400 mb-2 flex items-center justify-between">
        <span>
          共 {filtered.length} 词
          {book && ` · ${book}`}
          {topic && ` · ${topic}`}
          {origin && ` · ${originInfo(origin).label}`}
          {q.trim() && ` · 搜索「${q.trim()}」`}
        </span>
        <span>
          第 {page}/{totalPages} 页
        </span>
      </div>

      {/* 表格 */}
      <div className="overflow-x-auto rounded-card shadow-card bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 text-white text-left">
              <th className="px-4 py-3 font-semibold w-[28%]">한국어</th>
              <th className="px-4 py-3 font-semibold w-[22%]">中文</th>
              <th className="px-4 py-3 font-semibold w-[24%]">English</th>
              <th className="px-4 py-3 font-semibold w-[26%]">词源 / 发音</th>
            </tr>
          </thead>
          <tbody>
            {pageWords.map((w, i) => {
              const info = originInfo(w.originType)
              return (
                <tr
                  key={w.id || i}
                  className={`border-b border-gray-100 hover:bg-lavender-light/30 transition border-l-4 ${info.rowBorder}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2 flex-wrap">
                      <Speakable text={w.korean} lang="ko-KR" className="text-lg font-bold korean-font text-slate-800">
                        {w.korean}
                      </Speakable>
                      <span className="text-xs text-gray-500 mt-1 whitespace-nowrap">[{w.posZh || w.pos || '-'}]</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{w.romanization}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{w.chinese}</td>
                  <td className="px-4 py-3">
                    {w.english ? (
                      <Speakable text={w.english.split(';')[0].trim()} lang="en-US" className="text-slate-600">
                        {w.english}
                      </Speakable>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs ${info.bg} ${info.color} border ${info.border} mb-1`}
                    >
                      <span className="font-bold">{info.tag}</span>
                      <span>{info.label}</span>
                    </div>
                    {w.originDetail && <div className="text-xs text-gray-500">{w.originDetail}</div>}
                    {w.pronunciation && (
                      <div className="text-xs text-gray-400 mt-0.5">发音 [{w.pronunciation}]</div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {pageWords.length === 0 && (
          <div className="text-center text-gray-400 py-12">没有匹配的单词，换个条件试试～</div>
        )}
      </div>

      {/* 分页 */}
      {filtered.length > PAGE_SIZE && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2 py-1.5 rounded-lg bg-white shadow-card text-gray-600 disabled:opacity-40 hover:bg-lavender-light/60 transition"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-gray-500">
            第 {page} / {totalPages} 页
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-2 py-1.5 rounded-lg bg-white shadow-card text-gray-600 disabled:opacity-40 hover:bg-lavender-light/60 transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
