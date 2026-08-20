import { useEffect, useMemo, useState } from 'react'
import { ALL_SYNONYMS } from '../../data/ieltsVocabNew'
import Pagination from '../../components/Pagination'

export default function Synonym() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const totalPages = Math.max(1, Math.ceil(ALL_SYNONYMS.length / pageSize))
  const pageItems = useMemo(
    () => ALL_SYNONYMS.slice((page - 1) * pageSize, page * pageSize),
    [page, pageSize],
  )

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  return (
    <div className="space-y-2">
      <div className="text-xs text-gray-400 mb-1" aria-live="polite">
        共 {ALL_SYNONYMS.length} 组高频替换（写作/阅读核心，含内置 + 词汇真经 538），当前显示第 {page} 页
      </div>
      {pageItems.map((s, i) => (
        <div key={`${s.base}-${i}`} className="bg-white rounded-card shadow-card p-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-lavender-deep">{s.base}</span>
            <span className="text-gray-300">→</span>
            {s.replaces.map((r) => (
              <span key={r} className="text-sm text-gray-700 bg-cream rounded-full px-2 py-0.5">
                {r}
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-1">{s.note}</div>
        </div>
      ))}
      <Pagination
        page={page}
        total={ALL_SYNONYMS.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
      />
    </div>
  )
}
