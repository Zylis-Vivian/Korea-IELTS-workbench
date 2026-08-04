// src/components/PronunciationStatus.tsx
// 右下角发音引擎状态指示器：绿=优质方案，黄=降级方案，红=仅 Web Speech
import { useState } from 'react'
import { useStore } from '../stores/useStore'
import { Wifi, WifiOff, AlertTriangle, Loader2, ChevronUp } from 'lucide-react'

const MAP = {
  unknown: { color: '#9ca3af', label: '发音检测中', Icon: Loader2 },
  green: { color: '#22c55e', label: '优质发音', Icon: Wifi },
  yellow: { color: '#eab308', label: '降级发音', Icon: AlertTriangle },
  red: { color: '#ef4444', label: '仅浏览器发音', Icon: WifiOff },
} as const

export default function PronunciationStatus() {
  const status = useStore((s) => s.pronStatus)
  const [open, setOpen] = useState(false)
  const m = MAP[status.level]
  const Icon = m.Icon
  const spinning = status.level === 'unknown'

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none">
      {open && (
        <div className="mb-2 w-72 bg-white rounded-card shadow-card p-4 text-sm animate-fade">
          <div className="font-medium text-lavender-deep mb-2">发音引擎状态</div>
          <Row k="当前方案" v={status.activeEngine || (status.level === 'unknown' ? '检测中' : '—')} />
          <Row k="Azure TTS" v={status.report ? (status.report.azure.ok ? `可用 (${status.report.azure.timeMs ?? ''}ms)` : '不可用') : '未检测'} />
          <Row k="Google TTS" v={status.report ? (status.report.google.ok ? `可用 (${status.report.google.timeMs ?? ''}ms)` : '不可用') : '未检测'} />
          <Row k="Web Speech" v={status.report ? (status.report.web.koVoice ? '有韩文语音' : '无韩文语音') : '未检测'} />
          <Row k="可用语音数" v={String(status.webVoices.length)} />
          {status.webVoices.length > 0 && (
            <div className="mt-2 max-h-32 overflow-auto text-xs text-gray-500">
              {status.webVoices.map((v) => (
                <div key={v}>• {v}</div>
              ))}
            </div>
          )}
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-white rounded-full shadow-card pl-3 pr-3 py-2 hover:bg-lavender-light transition"
        title="发音引擎状态"
      >
        <span
          className="inline-flex items-center justify-center rounded-full text-white"
          style={{ width: 22, height: 22, background: m.color }}
        >
          <Icon size={13} className={spinning ? 'animate-spin' : ''} />
        </span>
        <span className="text-xs text-gray-600">{m.label}</span>
        <ChevronUp size={14} className={`text-gray-400 transition ${open ? '' : 'rotate-180'}`} />
      </button>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between py-0.5">
      <span className="text-gray-500">{k}</span>
      <span className="text-gray-800 font-medium">{v}</span>
    </div>
  )
}
