import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, CircleStop, Mic, Play, Square, Volume2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../../components/Layout'
import { DIALOGUES } from '../../data/dialogue'
import { LISTENING } from '../../data/ielts'
import { useStore } from '../../stores/useStore'
import type { ReviewItem } from '../../types'
import { createReviewItem } from '../../utils/review'
import { usePronunciation } from '../../hooks/usePronunciation'

interface ShadowItem {
  id: string
  title: string
  text: string
  translation?: string
  romanization?: string
  language: 'ko' | 'en'
  source: string
}

const SHADOW_ITEMS: ShadowItem[] = [
  ...DIALOGUES.flatMap((scene) =>
    scene.lines.map((line, index) => ({
      id: `dialogue-${scene.scene}-${index}`,
      title: `${scene.scene} · ${line.speaker === 'B' ? '我的台词' : '对方'}`,
      text: line.ko,
      translation: line.zh,
      romanization: line.roman,
      language: 'ko' as const,
      source: '韩语情景对话',
    }))
  ),
  ...LISTENING.flatMap((item) =>
    item.script
      .split(/(?<=[.!?])\s+/)
      .filter(Boolean)
      .map((text, index) => ({
        id: `ielts-listening-${item.id}-${index}`,
        title: `${item.title} · 第 ${index + 1} 句`,
        text,
        language: 'en' as const,
        source: '雅思听力示例',
      }))
  ),
]

const SPEEDS = [0.75, 0.9, 1, 1.1, 1.25]

export default function Shadowing() {
  const [params] = useSearchParams()
  const { speak } = usePronunciation()
  const upsertReviewItem = useStore((s) => s.upsertReviewItem)
  const review = useStore((s) => s.review)
  const initialIndex = Math.max(0, SHADOW_ITEMS.findIndex((item) => item.id === params.get('item')))
  const [index, setIndex] = useState(initialIndex)
  const [speed, setSpeed] = useState(1)
  const [showTranslation, setShowTranslation] = useState(true)
  const [showRomanization, setShowRomanization] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null)
  const [recordError, setRecordError] = useState('')
  const recorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recordedUrlRef = useRef<string | null>(null)

  const current = SHADOW_ITEMS[index]
  const reviewItem = useMemo<ReviewItem>(() => createReviewItem({
    id: current.id,
    language: current.language,
    kind: current.language === 'en' ? 'listening' : 'sentence',
    title: current.title,
    prompt: current.text,
    answer: current.text,
    translation: current.translation,
    source: current.source,
    href: current.language === 'en' ? '/ielts/listening' : '/korean/dialogue',
  }), [current])

  useEffect(() => {
    return () => {
      recorderRef.current?.stop()
      streamRef.current?.getTracks().forEach((track) => track.stop())
      if (recordedUrlRef.current) URL.revokeObjectURL(recordedUrlRef.current)
    }
  }, [])

  const playReference = () => {
    void speak(current.text, { lang: current.language === 'en' ? 'en-US' : 'ko-KR', speed })
  }

  const startRecording = async () => {
    setRecordError('')
    setRecordedUrl(null)
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setRecordError('当前浏览器不支持麦克风录音，请使用最新版 Chrome、Edge 或 Safari。')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: Blob[] = []
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })
        if (recordedUrlRef.current) URL.revokeObjectURL(recordedUrlRef.current)
        const url = URL.createObjectURL(blob)
        recordedUrlRef.current = url
        setRecordedUrl(url)
        stream.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
      recorderRef.current = recorder
      streamRef.current = stream
      recorder.start()
      setIsRecording(true)
    } catch {
      setRecordError('没有取得麦克风权限。你仍然可以播放原音并进行无录音跟读。')
    }
  }

  const stopRecording = () => {
    recorderRef.current?.stop()
    recorderRef.current = null
    setIsRecording(false)
  }

  const complete = () => {
    upsertReviewItem(reviewItem)
    review(current.id, 'good')
    if (index < SHADOW_ITEMS.length - 1) {
      setIndex((value) => value + 1)
      setRecordedUrl(null)
      setRecordError('')
    }
  }

  return (
    <div className="fade-in">
      <PageHeader title="影子跟读" desc="先听清，再同步跟读，最后录音回听。录音只保存在当前浏览器，不会自动上传。" />

      <div className="mb-4 flex items-center justify-between gap-3 text-sm text-gray-500">
        <span>第 {index + 1} / {SHADOW_ITEMS.length} 句</span>
        <span>{current.language === 'ko' ? '韩语' : '英语'} · {current.source}</span>
      </div>

      <div className="bg-white rounded-card shadow-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-gray-400">{current.title}</div>
            <h2 className="mt-1 text-xl font-bold text-lavender-deep">{current.text}</h2>
            {showRomanization && current.romanization ? <div className="mt-2 text-sm text-gray-400">{current.romanization}</div> : null}
            {showTranslation && current.translation ? <div className="mt-3 rounded-xl bg-cream p-3 text-sm text-gray-600">{current.translation}</div> : null}
          </div>
          <button type="button" onClick={playReference} className="shrink-0 rounded-full bg-lavender-light p-3 text-lavender-deep hover:bg-lavender hover:text-white" title="播放参考音频">
            <Volume2 size={22} />
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-lavender-light/40 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="font-medium text-lavender-deep">跟读控制</div>
            <div className="flex flex-wrap gap-1">
              {SPEEDS.map((value) => (
                <button key={value} type="button" onClick={() => setSpeed(value)} className={`rounded-full px-2.5 py-1 text-xs ${speed === value ? 'bg-lavender text-white' : 'bg-white text-gray-500'}`}>
                  {value}x
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button type="button" onClick={playReference} className="rounded-xl bg-white px-3 py-2 text-sm text-gray-600 hover:bg-cream">
              <span className="inline-flex items-center gap-2"><Play size={16} />听参考音</span>
            </button>
            <button type="button" onClick={() => void speak(current.text, { lang: current.language === 'en' ? 'en-US' : 'ko-KR', speed })} className="rounded-xl bg-white px-3 py-2 text-sm text-gray-600 hover:bg-cream">
              <span className="inline-flex items-center gap-2"><Mic size={16} />现在跟读</span>
            </button>
            {isRecording ? (
              <button type="button" onClick={stopRecording} className="rounded-xl bg-coral px-3 py-2 text-sm text-white hover:opacity-90">
                <span className="inline-flex items-center gap-2"><CircleStop size={16} />停止录音</span>
              </button>
            ) : (
              <button type="button" onClick={() => void startRecording()} className="rounded-xl bg-lavender px-3 py-2 text-sm text-white hover:bg-lavender-deep">
                <span className="inline-flex items-center gap-2"><Mic size={16} />开始录音</span>
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
            <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={showTranslation} onChange={(event) => setShowTranslation(event.target.checked)} />显示中文</label>
            {current.romanization ? <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={showRomanization} onChange={(event) => setShowRomanization(event.target.checked)} />显示罗马音</label> : null}
          </div>
          {recordError ? <div className="mt-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-700">{recordError}</div> : null}
          {recordedUrl ? (
            <div className="mt-3 flex items-center gap-3 rounded-xl bg-white p-3 text-sm text-gray-600">
              <Square size={15} className="text-lavender-deep" />
              <span className="flex-1">你的录音已生成，可以回听比较</span>
              <audio controls src={recordedUrl} className="h-8 max-w-[190px]" />
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0} className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-2 text-sm text-gray-600 disabled:opacity-40">
            <ChevronLeft size={16} />上一句
          </button>
          <button type="button" onClick={complete} className="rounded-full bg-emerald-500 px-4 py-2 text-sm text-white hover:bg-emerald-600">
            完成本句并安排复习
          </button>
          <button type="button" onClick={() => setIndex((value) => Math.min(SHADOW_ITEMS.length - 1, value + 1))} disabled={index === SHADOW_ITEMS.length - 1} className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-2 text-sm text-gray-600 disabled:opacity-40">
            下一句<ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}


