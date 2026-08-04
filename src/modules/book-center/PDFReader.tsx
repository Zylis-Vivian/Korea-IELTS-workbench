import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, FileWarning } from 'lucide-react'
import { getBook } from '../../data/books'
import { tracksByBook } from '../../data/audio-tracks'
import AudioPlayer from '../../components/AudioPlayer'
import { useStore } from '../../stores/useStore'

// PDF 阅读器（PDF.js）。pdfPath 为空时显示上传引导；存在时渲染并可翻页/缩放/记录进度。
export default function PDFReader() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const book = getBook(id)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [page, setPage] = useState(1)
  const [numPages, setNumPages] = useState(0)
  const [scale, setScale] = useState(1)
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty' | 'error'>('loading')
  const [err, setErr] = useState('')

  // 从 localStorage 恢复阅读进度
  useEffect(() => {
    if (!book) return
    const saved = Number(localStorage.getItem(`reader-page-${book.id}`) || '1')
    setPage(saved)
  }, [book])

  useEffect(() => {
    if (!book) {
      setStatus('error')
      setErr('未找到该教材')
      return
    }
    if (!book.pdfPath) {
      setStatus('empty')
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        setStatus('loading')
        const pdfjsLib = await import('pdfjs-dist')
        const workerUrl = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default
        pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl
        const doc = await pdfjsLib.getDocument(book.pdfPath).promise
        if (cancelled) return
        setNumPages(doc.numPages)
        const realPage = Math.min(page, doc.numPages)
        const p = await doc.getPage(realPage)
        const viewport = p.getViewport({ scale })
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!
        const dpr = window.devicePixelRatio || 1
        canvas.width = viewport.width * dpr
        canvas.height = viewport.height * dpr
        canvas.style.width = `${viewport.width}px`
        canvas.style.height = `${viewport.height}px`
        await p.render({ canvasContext: ctx, viewport, transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined } as any).promise
        setStatus('ready')
      } catch (e: any) {
        if (!cancelled) {
          setStatus('error')
          setErr(e?.message || 'PDF 加载失败')
        }
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book, page, scale])

  const goPage = (p: number) => {
    if (!numPages) return
    const np = Math.max(1, Math.min(p, numPages))
    setPage(np)
    if (book) localStorage.setItem(`reader-page-${book.id}`, String(np))
  }

  const tracks = book ? tracksByBook(book.id) : []

  return (
    <div className="fade-in">
      {/* 顶部工具栏 */}
      <div className="flex items-center gap-2 mb-3 bg-white rounded-card shadow-card p-2 flex-wrap">
        <button onClick={() => navigate('/books')} className="p-2 rounded-lg hover:bg-cream text-gray-500" aria-label="返回书架">
          <ArrowLeft size={18} />
        </button>
        <div className="font-medium text-gray-700 min-w-0 flex-1 truncate">
          {book?.coverEmoji} {book?.title}
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <button onClick={() => goPage(page - 1)} disabled={page <= 1} className="p-1.5 rounded-lg hover:bg-cream disabled:opacity-30"><ChevronLeft size={18} /></button>
          <span className="px-2">{numPages ? `${page}/${numPages}` : '—'}</span>
          <button onClick={() => goPage(page + 1)} disabled={!numPages || page >= numPages} className="p-1.5 rounded-lg hover:bg-cream disabled:opacity-30"><ChevronRight size={18} /></button>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <button onClick={() => setScale((s) => Math.max(0.5, s - 0.2))} className="p-1.5 rounded-lg hover:bg-cream"><ZoomOut size={18} /></button>
          <span className="px-1">{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale((s) => Math.min(3, s + 0.2))} className="p-1.5 rounded-lg hover:bg-cream"><ZoomIn size={18} /></button>
        </div>
      </div>

      {status === 'empty' && (
        <div className="bg-white rounded-card shadow-card p-8 text-center">
          <FileWarning size={40} className="mx-auto text-amber-400 mb-3" />
          <div className="font-medium text-gray-700 mb-1">《{book?.title}》的 PDF 尚未放入</div>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            把你下载好的 PDF 重命名为 <code className="bg-cream px-1 rounded">{book?.id}.pdf</code>，
            放入项目 <code className="bg-cream px-1 rounded">public/books/{book?.language === 'english' ? 'ielts' : 'korean'}/</code> 目录，
            刷新本页即可在网页内阅读。
          </p>
          <div className="text-xs text-gray-400 mt-3">
            配套音频（如有）会出现在下方播放器；当前已索引 {tracks.length} 条曲目。
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-white rounded-card shadow-card p-8 text-center text-sm text-coral">
          加载失败：{err}
        </div>
      )}

      {status === 'loading' && book?.pdfPath && (
        <div className="bg-white rounded-card shadow-card p-16 text-center text-gray-400">正在加载 PDF…</div>
      )}

      {status === 'ready' && (
        <div className="bg-white rounded-card shadow-card p-4 flex justify-center overflow-auto">
          <canvas ref={canvasRef} className="shadow-soft" />
        </div>
      )}

      {/* 配套音频联动 */}
      {book && tracks.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-medium text-lavender-deep mb-2">🎧 配套音频（读这一课，听这一课）</div>
          <AudioPlayer tracks={tracks} />
        </div>
      )}
    </div>
  )
}
