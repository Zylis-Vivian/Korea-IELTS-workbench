import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  sizes?: number[]
}

export default function Pagination({
  page,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange,
  sizes = [20, 40],
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  if (total === 0) return null

  const start = (safePage - 1) * pageSize + 1
  const end = Math.min(total, safePage * pageSize)
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
    if (totalPages <= 5) return index + 1
    const first = Math.min(Math.max(safePage - 2, 1), totalPages - 4)
    return first + index
  })

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500" aria-label="分页">
      <span className="mr-1">显示 {start}–{end} / {total}</span>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, safePage - 1))}
        disabled={safePage === 1}
        className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg bg-white px-2 shadow-card transition hover:bg-lavender-light/60 disabled:opacity-40"
        aria-label="上一页"
      >
        <ChevronLeft size={16} />
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          aria-current={pageNumber === safePage ? 'page' : undefined}
          className={`min-h-9 min-w-9 rounded-lg px-2 transition ${pageNumber === safePage ? 'bg-lavender text-white shadow-soft' : 'bg-white hover:bg-lavender-light/60'}`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
        disabled={safePage === totalPages}
        className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg bg-white px-2 shadow-card transition hover:bg-lavender-light/60 disabled:opacity-40"
        aria-label="下一页"
      >
        <ChevronRight size={16} />
      </button>
      {onPageSizeChange ? (
        <label className="ml-1 inline-flex items-center gap-1">
          每页
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="rounded-lg border border-lavender-light bg-white px-2 py-1.5"
            aria-label="每页数量"
          >
            {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>
      ) : null}
    </div>
  )
}
