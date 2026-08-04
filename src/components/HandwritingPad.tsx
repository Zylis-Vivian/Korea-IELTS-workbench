import { useEffect, useRef, useState } from 'react'
import { Eraser, Check, RotateCcw } from 'lucide-react'

const SIZE = 300
const GRID = 24

// 用目标字符字形作为"标准形状"，离屏渲染后生成占用网格用于相似度打分
function buildIdealGrid(target: string): boolean[][] {
  const c = document.createElement('canvas')
  c.width = SIZE
  c.height = SIZE
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#000'
  ctx.font = `bold ${Math.floor(SIZE * 0.72)}px "Nanum Gothic", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(target, SIZE / 2, SIZE / 2 + SIZE * 0.04)
  const data = ctx.getImageData(0, 0, SIZE, SIZE).data
  const grid: boolean[][] = Array.from({ length: GRID }, () => Array(GRID).fill(false))
  const cell = SIZE / GRID
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (data[(y * SIZE + x) * 4 + 3] > 40) {
        grid[Math.floor(y / cell)][Math.floor(x / cell)] = true
      }
    }
  }
  return grid
}

interface Props {
  target: string
  expectedStrokes?: number
  onScore?: (score: number) => void
}

export default function HandwritingPad({ target, expectedStrokes, onScore }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [strokes, setStrokes] = useState<{ x: number; y: number }[][]>([])
  const [drawing, setDrawing] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const current = useRef<{ x: number; y: number }[]>([])
  const idealRef = useRef<boolean[][]>([])

  useEffect(() => {
    idealRef.current = buildIdealGrid(target)
    setStrokes([])
    setScore(null)
    setFeedback('')
    current.current = []
    redraw([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  function toCanvas(e: React.PointerEvent) {
    const cv = canvasRef.current!
    const r = cv.getBoundingClientRect()
    return {
      x: ((e.clientX - r.left) / r.width) * SIZE,
      y: ((e.clientY - r.top) / r.height) * SIZE,
    }
  }

  function redraw(all: { x: number; y: number }[][]) {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    ctx.clearRect(0, 0, SIZE, SIZE)
    // 背景虚线字形引导
    ctx.save()
    ctx.setLineDash([6, 6])
    ctx.strokeStyle = '#cdbce8'
    ctx.lineWidth = 2
    ctx.font = `bold ${Math.floor(SIZE * 0.72)}px "Nanum Gothic", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.strokeText(target, SIZE / 2, SIZE / 2 + SIZE * 0.04)
    ctx.restore()
    // 用户笔画
    ctx.strokeStyle = '#7B5EA7'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    all.forEach((stroke) => {
      if (stroke.length < 1) return
      ctx.beginPath()
      ctx.moveTo(stroke[0].x, stroke[0].y)
      for (let i = 1; i < stroke.length; i++) ctx.lineTo(stroke[i].x, stroke[i].y)
      if (stroke.length === 1) ctx.lineTo(stroke[0].x + 0.1, stroke[0].y + 0.1)
      ctx.stroke()
    })
  }

  function down(e: React.PointerEvent) {
    e.preventDefault()
    ;(e.target as Element).setPointerCapture(e.pointerId)
    setDrawing(true)
    current.current = [toCanvas(e)]
    redraw([...strokes, current.current])
  }
  function move(e: React.PointerEvent) {
    if (!drawing) return
    e.preventDefault()
    current.current.push(toCanvas(e))
    redraw([...strokes, current.current])
  }
  function up() {
    if (!drawing) return
    setDrawing(false)
    const next = [...strokes, current.current]
    setStrokes(next)
    current.current = []
  }

  function clear() {
    setStrokes([])
    setScore(null)
    setFeedback('')
    redraw([])
  }

  function evaluate() {
    const ideal = idealRef.current
    // 用户占用网格
    const user: boolean[][] = Array.from({ length: GRID }, () => Array(GRID).fill(false))
    const cell = SIZE / GRID
    strokes.flat().forEach((p) => {
      const gx = Math.min(GRID - 1, Math.max(0, Math.floor(p.x / cell)))
      const gy = Math.min(GRID - 1, Math.max(0, Math.floor(p.y / cell)))
      user[gy][gx] = true
    })
    let match = 0
    let idealCount = 0
    let userCount = 0
    for (let i = 0; i < GRID; i++)
      for (let j = 0; j < GRID; j++) {
        if (ideal[i][j]) idealCount++
        if (user[i][j]) userCount++
        if (ideal[i][j] && user[i][j]) match++
      }
    if (userCount === 0) {
      setFeedback('请先在框内描摹书写')
      return
    }
    const precision = match / userCount
    const recall = match / (idealCount || 1)
    const f1 = (2 * precision * recall) / (precision + recall || 1)
    let s = Math.round(f1 * 100)
    if (expectedStrokes && Math.abs(strokes.length - expectedStrokes) >= 2) s -= 12
    s = Math.max(0, Math.min(100, s))
    setScore(s)
    onScore?.(s)
    if (s >= 80) setFeedback('✅ 写得很好，字形标准！')
    else if (s >= 60) setFeedback('👍 不错，再注意笔画位置和粗细会更像。')
    else setFeedback('✏️ 继续练习：对照虚线轮廓，放慢速度一笔一画描摹。')
  }

  const scoreColor = score == null ? '#7B5EA7' : score >= 80 ? '#3aa776' : score >= 60 ? '#b0882f' : '#d9534f'

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        className="touch-none rounded-card border-2 border-lavender-light bg-cream w-[260px] h-[260px]"
        style={{ width: 260, height: 260, touchAction: 'none' }}
      />
      <div className="flex items-center gap-3">
        <button
          onClick={clear}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200"
        >
          <RotateCcw size={14} /> 重写
        </button>
        <button
          onClick={evaluate}
          className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-lavender text-white text-sm hover:bg-lavender-deep"
        >
          <Check size={14} /> 评分
        </button>
        {expectedStrokes && (
          <span className="text-xs text-gray-400">标准笔画数：{expectedStrokes}</span>
        )}
      </div>
      {score != null && (
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: scoreColor }}>
            {score} 分
          </div>
          <div className="text-sm text-gray-500">{feedback}</div>
        </div>
      )}
    </div>
  )
}
