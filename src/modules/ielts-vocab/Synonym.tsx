import { useEffect, useMemo, useState } from 'react'
import { RotateCcw, Search } from 'lucide-react'
import { ALL_SYNONYMS } from '../../data/ieltsVocabNew'
import Pagination from '../../components/Pagination'
import SpeakerButton from '../../components/SpeakerButton'
import AddWordButton from '../../components/AddWordButton'
import useDebouncedValue from '../../hooks/useDebouncedValue'

type SynonymCategory = 'all' | 'verb' | 'noun' | 'adjective' | 'modal' | 'expression'

const CATEGORY_OPTIONS: { id: SynonymCategory; label: string }[] = [
  { id: 'all', label: '全部分类' },
  { id: 'verb', label: '动词/动词短语' },
  { id: 'noun', label: '名词' },
  { id: 'adjective', label: '形容词' },
  { id: 'modal', label: '情态表达' },
  { id: 'expression', label: '其他表达' },
]

function getCategory(note: string): SynonymCategory {
  if (note.startsWith('动词')) return 'verb'
  if (note.startsWith('名词')) return 'noun'
  if (note.startsWith('形容词')) return 'adjective'
  if (note.startsWith('情态')) return 'modal'
  return 'expression'
}

function categoryLabel(category: SynonymCategory) {
  return CATEGORY_OPTIONS.find((option) => option.id === category)?.label || '其他表达'
}

export default function Synonym() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [q, setQ] = useState('')
  const debouncedQ = useDebouncedValue(q)
  const [category, setCategory] = useState<SynonymCategory>('all')
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [practiceRevealed, setPracticeRevealed] = useState(false)

  const filtered = useMemo(() => {
    const keyword = debouncedQ.trim().toLowerCase()
    return ALL_SYNONYMS.filter((item) => {
      if (category !== 'all' && getCategory(item.note) !== category) return false
      if (!keyword) return true
      return [item.base, item.replaces.join(' '), item.note].some((value) => value.toLowerCase().includes(keyword))
    })
  }, [category, debouncedQ])
  const isFiltering = q !== debouncedQ
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageItems = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize],
  )
  const practicePool = filtered.length ? filtered : ALL_SYNONYMS
  const practice = practicePool[practiceIndex % practicePool.length]

  useEffect(() => {
    setPage(1)
  }, [category, debouncedQ, pageSize])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  useEffect(() => {
    setPracticeIndex(0)
    setPracticeRevealed(false)
  }, [category, debouncedQ])

  const clearSearch = () => {
    setQ('')
    setPage(1)
  }

  const nextPractice = () => {
    setPracticeIndex((index) => (index + 1) % practicePool.length)
    setPracticeRevealed(false)
  }

  return (
    <div className="space-y-4">
      <section className="rounded-card bg-white/80 p-3 shadow-card sm:p-4" aria-label="同义替换搜索与筛选">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_190px_auto] md:items-end">
          <label className="relative block">
            <span className="sr-only">搜索基础词、替换词或说明</span>
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              aria-label="搜索基础词、替换词或说明"
              inputMode="search"
              enterKeyHint="search"
              value={q}
              onChange={(event) => {
                setQ(event.target.value)
                setPage(1)
              }}
              placeholder="搜索基础词 / 同义替换 / 说明"
              className="inp inp-leading-icon inp-trailing-icon w-full"
            />
            {q ? (
              <button
                type="button"
                aria-label="清空同义替换搜索"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-lavender-light"
              >
                <span aria-hidden>×</span>
              </button>
            ) : null}
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-500">
            <span className="whitespace-nowrap">分类</span>
            <select
              aria-label="同义替换分类"
              value={category}
              onChange={(event) => setCategory(event.target.value as SynonymCategory)}
              className="inp min-w-0 flex-1 py-1.5"
            >
              {CATEGORY_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
            </select>
          </label>
          {(q || category !== 'all') ? (
            <button
              type="button"
              onClick={() => {
                clearSearch()
                setCategory('all')
              }}
              className="inline-flex items-center justify-center gap-1 rounded-full bg-lavender-light/60 px-3 py-2 text-xs text-lavender-deep hover:bg-lavender-light"
            >
              <RotateCcw size={12} /> 清除筛选
            </button>
          ) : null}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400" aria-live="polite">
          <span>{isFiltering ? '正在筛选…' : `匹配 ${filtered.length} 组`}</span>
          <span>当前分类：{categoryLabel(category)}</span>
          <span>每页 {pageSize} 组</span>
        </div>
      </section>

      <section className="rounded-card bg-lavender-light/35 p-3 shadow-card sm:p-4" aria-label="同义替换自测">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <h2 className="font-semibold text-lavender-deep">替换自测</h2>
            <p className="text-xs text-gray-500">先想一个更准确的替换，再显示答案；可直接收藏基础词。</p>
          </div>
          <button type="button" onClick={nextPractice} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs text-lavender-deep shadow-card hover:bg-lavender-light">
            <RotateCcw size={12} /> 换一题
          </button>
        </div>
        <div className="rounded-xl bg-white p-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-semibold text-gray-800">{practice.base}</span>
            <SpeakerButton text={practice.base} category="ielts" size={13} />
            <AddWordButton english={practice.base} chinese={practice.note} source="雅思同义替换" category="ielts" />
          </div>
          {practiceRevealed ? (
            <div className="mt-2 flex flex-wrap items-center gap-1.5" aria-live="polite">
              {practice.replaces.map((replacement) => (
                <span key={replacement} className="rounded-full bg-cream px-2 py-1 text-sm text-gray-700">{replacement}</span>
              ))}
              <span className="ml-1 text-xs text-gray-400">{practice.note}</span>
            </div>
          ) : (
            <button type="button" onClick={() => setPracticeRevealed(true)} className="mt-2 rounded-lg bg-lavender px-3 py-1.5 text-xs text-white hover:bg-lavender-deep">
              显示可用替换
            </button>
          )}
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-card bg-white py-12 text-center text-sm text-gray-400">没有匹配的同义替换，换个关键词或分类试试～</div>
      ) : (
        <>
          <div className="space-y-2">
            {pageItems.map((item, index) => (
              <div key={`${item.base}-${index}`} className="rounded-card bg-white p-3 shadow-card">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-lavender-deep">{item.base}</span>
                  <SpeakerButton text={item.base} category="ielts" size={12} />
                  <span className="text-gray-300">→</span>
                  <span className="text-[10px] text-gray-400">{categoryLabel(getCategory(item.note))}</span>
                  <AddWordButton english={item.base} chinese={item.note} source="雅思同义替换" category="ielts" className="ml-auto" />
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {item.replaces.map((replacement) => (
                    <span key={replacement} className="rounded-full bg-cream px-2 py-0.5 text-sm text-gray-700">{replacement}</span>
                  ))}
                </div>
                <div className="mt-1 text-xs text-gray-400">{item.note}</div>
              </div>
            ))}
          </div>
          <Pagination
            page={page}
            total={filtered.length}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size)
              setPage(1)
            }}
          />
        </>
      )}
    </div>
  )
}
