import { useEffect, useRef, useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, Repeat, Volume2 } from 'lucide-react'
import type { AudioTrack } from '../data/audio-tracks'
import { useStore } from '../stores/useStore'
import { usePronunciation } from '../hooks/usePronunciation'

// 轻量音频播放器：播放 / 暂停 / 上一曲 / 下一曲 / 进度拖拽 / 倍速 / A-B 循环 / 后台播放
// 本地 MP3 缺失时降级提示，不报错。
export default function AudioPlayer({ tracks }: { tracks: AudioTrack[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [cur, setCur] = useState(0)
  const [dur, setDur] = useState(tracks[idx]?.duration || 0)
  const [rate, setRate] = useState(1)
  const [ab, setAb] = useState<{ a: number; b: number } | null>(null)
  const [abOn, setAbOn] = useState(false)
  const tts = useStore((s) => s.settings.ttsSpeed)
  const pron = usePronunciation()

  const curTrack = tracks[idx]

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.playbackRate = rate
  }, [rate])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  const seek = (v: number) => {
    const a = audioRef.current
    if (!a) return
    a.currentTime = v
    setCur(v)
  }

  const next = () => {
    if (idx < tracks.length - 1) {
      setIdx(idx + 1)
      setCur(0)
    }
  }
  const prev = () => {
    if (idx > 0) setIdx(idx - 1)
    setCur(0)
  }

  // A-B 循环监听
  useEffect(() => {
    const a = audioRef.current
    if (!a || !abOn || !ab) return
    const handler = () => {
      if (a.currentTime >= ab.b) {
        a.currentTime = ab.a
      }
    }
    a.addEventListener('timeupdate', handler)
    return () => a.removeEventListener('timeupdate', handler)
  }, [abOn, ab])

  const exist = curTrack && typeof window !== 'undefined'

  return (
    <div className="bg-white rounded-card shadow-card p-4">
      {!curTrack ? (
        <div className="text-sm text-gray-400 py-8 text-center">
          暂无音频曲目。把 MP3 放入对应 <code className="bg-cream px-1 rounded">public/audio/...</code> 目录后即可自动出现。
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-lavender-light flex items-center justify-center text-lavender-deep text-xl">
              🎵
            </div>
            <div className="min-w-0">
              <div className="font-medium text-gray-700 truncate">{curTrack.title}</div>
              <div className="text-xs text-gray-400">
                {curTrack.filePath.split('/').pop()} · {Math.round(dur / 60)}分{dur % 60}秒
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-400 w-10 text-right">{fmt(cur)}</span>
            <input
              type="range"
              min={0}
              max={dur || 1}
              value={Math.min(cur, dur || 1)}
              onChange={(e) => seek(Number(e.target.value))}
              className="flex-1 accent-lavender"
            />
            <span className="text-xs text-gray-400 w-10">{fmt(dur)}</span>
          </div>

          <div className="flex items-center justify-center gap-3 my-3">
            <button onClick={prev} className="p-2 rounded-full hover:bg-cream text-gray-500" aria-label="上一曲">
              <SkipBack size={20} />
            </button>
            <button
              onClick={toggle}
              className="p-3 rounded-full bg-lavender text-white shadow-soft"
              aria-label={playing ? '暂停' : '播放'}
            >
              {playing ? <Pause size={22} /> : <Play size={22} />}
            </button>
            <button onClick={next} className="p-2 rounded-full hover:bg-cream text-gray-500" aria-label="下一曲">
              <SkipForward size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-gray-400 flex items-center gap-1">
              <Volume2 size={13} /> 倍速
            </span>
            {[0.75, 1, 1.25, 1.5, 2].map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`px-2 py-1 rounded-full ${rate === r ? 'bg-lavender text-white' : 'bg-cream text-gray-500'}`}
              >
                {r}x
              </button>
            ))}
            <button
              onClick={() => {
                const a = audioRef.current
                if (!a) return
                if (abOn) {
                  setAbOn(false)
                  setAb(null)
                } else {
                  setAb({ a: a.currentTime, b: Math.min(a.currentTime + 15, dur) })
                  setAbOn(true)
                }
              }}
              className={`px-2 py-1 rounded-full flex items-center gap-1 ${abOn ? 'bg-lavender text-white' : 'bg-cream text-gray-500'}`}
            >
              <Repeat size={13} /> A-B 循环{abOn && ab ? ` (${fmt(ab.a)}–${fmt(ab.b)})` : ''}
            </button>
          </div>

          {/* 本地 MP3 加载（缺失时浏览器原生给出 404，这里用 onError 兜底提示） */}
          {exist && (
            <audio
              ref={audioRef}
              src={curTrack.filePath}
              preload="metadata"
              onLoadedMetadata={(e) => setDur(e.currentTarget.duration || curTrack.duration)}
              onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
              onEnded={next}
              onError={() => {
                setPlaying(false)
              }}
              style={{ display: 'none' }}
            />
          )}

          <div className="mt-3 text-xs text-amber-500">
            ⚠️ 若音频未播放，说明该 MP3 尚未放入 <code className="bg-cream px-1 rounded">{curTrack.filePath}</code>。
            放入后刷新即可；或将文本朗读交给 TTS：
            <button
              className="ml-1 underline text-lavender-deep"
              onClick={() => pron.speak(curTrack.title)}
            >
              用 TTS 试听曲名
            </button>
          </div>

          <div className="mt-3 border-t border-lavender-light pt-2">
            <div className="text-xs text-gray-400 mb-1">播放列表（{tracks.length} 首）</div>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {tracks.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setIdx(i)
                    setCur(0)
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-sm ${i === idx ? 'bg-lavender-light text-lavender-deep' : 'hover:bg-cream text-gray-600'}`}
                >
                  {i + 1}. {t.title}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function fmt(s: number): string {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}
