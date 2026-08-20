import { useEffect, useMemo, useState } from 'react'
import { RotateCcw, Search } from 'lucide-react'
import { ALL_SYNONYMS } from '../../data/ieltsVocabNew'
import { getSynonymEnrichment } from '../../data/ieltsSynonymEnrichment'
import Pagination from '../../components/Pagination'
import SpeakerButton from '../../components/SpeakerButton'
import AddWordButton from '../../components/AddWordButton'
import useDebouncedValue from '../../hooks/useDebouncedValue'
import useUrlSearchState from '../../hooks/useUrlSearchState'
import { useStore } from '../../stores/useStore'
import type { ReviewRating } from '../../types'
import { createReviewItem } from '../../utils/review'

type SynonymCategory = 'all' | 'verb' | 'noun' | 'adjective' | 'modal' | 'expression'
type SearchScope = 'all' | 'base' | 'replacement' | 'note'

const CATEGORY_OPTIONS: { id: SynonymCategory; label: string }[] = [
  { id: 'all', label: '全部分类' },
  { id: 'verb', label: '动词/动词短语' },
  { id: 'noun', label: '名词' },
  { id: 'adjective', label: '形容词' },
  { id: 'modal', label: '情态表达' },
  { id: 'expression', label: '其他表达' },
]

const SEARCH_SCOPE_OPTIONS: { id: SearchScope; label: string }[] = [
  { id: 'all', label: '全部字段' },
  { id: 'base', label: '基础词' },
  { id: 'replacement', label: '替换词' },
  { id: 'note', label: '中文说明' },
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

function scopeLabel(scope: SearchScope) {
  return SEARCH_SCOPE_OPTIONS.find((option) => option.id === scope)?.label || '全部字段'
}

function synonymReviewId(group: { base: string; replaces: string[] }) {
  const slug = `${group.base}-${group.replaces[0] || ''}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return `synonym-${slug || 'practice'}`
}

function SynonymDetail({ group, compact = false }: { group: { base: string; replaces: string[]; note: string }; compact?: boolean }) {
  const detail = getSynonymEnrichment(group)
  if (!detail) return null
  return (
    <div className={`mt-2 rounded-lg bg-lavender-light/35 text-xs text-gray-600 ${compact ? 'p-2' : 'p-3'}`}>
      <div><span className="font-medium text-lavender-deep">语境：</span>{detail.context}</div>
      <div className="mt-1"><span className="font-medium text-lavender-deep">搭配：</span>{detail.collocations.join(' · ')}</div>
      {!compact && (
        <>
          <div className="mt-2 text-sm text-gray-700">{detail.example}</div>
          <div className="mt-1 text-gray-400">{detail.exampleCn}</div>
          {detail.caution ? <div className="mt-2 text-amber-700">边界提醒：{detail.caution}</div> : null}
        </>
      )}
    </div>
  )
}

export default function Synonym() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [q, setQ] = useUrlSearchState('syn_q')
  const debouncedQ = useDebouncedValue(q)
  const [category, setCategory] = useState<SynonymCategory>('all')
  const [searchScope, setSearchScope] = useState<SearchScope>('all')
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [practiceRevealed, setPracticeRevealed] = useState(false)
  const [practiceFeedback, setPracticeFeedback] = useState('')
  const upsertReviewItem = useStore((s) => s.upsertReviewItem)
  const review = useStore((s) => s.review)

  const filtered = useMemo(() => {
    const keyword = debouncedQ.trim().toLowerCase()
    return ALL_SYNONYMS.filter((item) => {
      if (category !== 'all' && getCategory(item.note) !== category) return false
      if (!keyword) return true
      const fields: Record<SearchScope, string> = {
        all: `${item.base} ${item.replaces.join(' ')} ${item.note}`,
        base: item.base,
        replacement: item.replaces.join(' '),
        note: item.note,
      }
      return fields[searchScope].toLowerCase().includes(keyword)
    })
  }, [category, debouncedQ, searchScope])
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
  }, [category, debouncedQ, pageSize, searchScope])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  useEffect(() => {
    setPracticeIndex(0)
    setPracticeRevealed(false)
    setPracticeFeedback('')
  }, [category, debouncedQ, searchScope])

  const clearSearch = () => {
    setQ('')
    setPage(1)
  }

  const nextPractice = () => {
    setPracticeIndex((index) => (index + 1) % practicePool.length)
    setPracticeRevealed(false)
    setPracticeFeedback('')
  }

  const practiceReviewItem = useMemo(
    () => createReviewItem({
      id: synonymReviewId(practice),
      language: 'en',
      kind: 'word',
      title: `雅思同义替换 · ${practice.base}`,
      prompt: practice.base,
      answer: practice.replaces.join(' / '),
      translation: `${practice.note}${getSynonymEnrichment(practice) ? `；语境：${getSynonymEnrichment(practice)!.context}` : ''}`,
      source: '雅思同义替换自测',
      href: `/ielts/vocab?tab=synonym&syn_q=${encodeURIComponent(practice.base)}`,
    }),
    [practice],
  )

  const savePracticeToReview = () => {
    upsertReviewItem(practiceReviewItem)
    setPracticeFeedback('已加入统一复习队列；可在“今日学习任务”继续复习。')
  }

  const ratePractice = (rating: ReviewRating) => {
    upsertReviewItem(practiceReviewItem)
    review(practiceReviewItem.id, rating)
    if (rating !== 'again') {
      nextPractice()
      setPracticeFeedback('已记录本次掌握度，并安排下一次复习。')
    } else {
      setPracticeRevealed(false)
      setPracticeFeedback('已安排近期再练，会优先回到队列。')
    }
  }

  return (
    <div className="space-y-4">
      <section className="rounded-card bg-white/80 p-3 shadow-card sm:p-4" aria-label="同义替换搜索与筛选">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_150px_190px_auto] md:items-end">
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
              placeholder={`搜索${scopeLabel(searchScope)}`}
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
            <span className="whitespace-nowrap">范围</span>
            <select
              aria-label="同义替换搜索范围"
              value={searchScope}
              onChange={(event) => setSearchScope(event.target.value as SearchScope)}
              className="inp min-w-0 flex-1 py-1.5"
            >
              {SEARCH_SCOPE_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
            </select>
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
          {(q || category !== 'all' || searchScope !== 'all') ? (
            <button
              type="button"
              onClick={() => {
                clearSearch()
                setCategory('all')
                setSearchScope('all')
              }}
              className="inline-flex items-center justify-center gap-1 rounded-full bg-lavender-light/60 px-3 py-2 text-xs text-lavender-deep hover:bg-lavender-light"
            >
              <RotateCcw size={12} /> 清除筛选
            </button>
          ) : null}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400" aria-live="polite">
          <span>{isFiltering ? '正在筛选…' : `匹配 ${filtered.length} 组`}</span>
          <span>搜索范围：{scopeLabel(searchScope)}</span>
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
            <button type="button" onClick={savePracticeToReview} className="rounded-full bg-white px-2.5 py-1 text-xs text-lavender-deep shadow-card hover:bg-cream">
              加入复习
            </button>
          </div>
          {practiceRevealed ? (
            <div aria-live="polite">
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {practice.replaces.map((replacement) => (
                  <span key={replacement} className="rounded-full bg-cream px-2 py-1 text-sm text-gray-700">{replacement}</span>
                ))}
                <span className="ml-1 text-xs text-gray-400">{practice.note}</span>
              </div>
              <SynonymDetail group={practice} />
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={() => ratePractice('again')} className="rounded-full bg-coral px-3 py-1.5 text-xs text-white hover:opacity-90">
                  需要再练
                </button>
                <button type="button" onClick={() => ratePractice('good')} className="rounded-full bg-emerald-500 px-3 py-1.5 text-xs text-white hover:bg-emerald-600">
                  记住了
                </button>
                <button type="button" onClick={() => ratePractice('easy')} className="rounded-full bg-lavender px-3 py-1.5 text-xs text-white hover:bg-lavender-deep">
                  很熟悉
                </button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => setPracticeRevealed(true)} className="mt-2 rounded-lg bg-lavender px-3 py-1.5 text-xs text-white hover:bg-lavender-deep">
              显示可用替换
            </button>
          )}
          {practiceFeedback ? <div className="mt-2 text-xs text-emerald-700" role="status">{practiceFeedback}</div> : null}
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
                <SynonymDetail group={item} compact />
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
