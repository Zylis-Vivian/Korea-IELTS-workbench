import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, CircleStop, Mic, Play, Square, Volume2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../../components/Layout'
import { DIALOGUES } from '../../data/dialogue'
import { LISTENING } from '../../data/ielts'
import { YONSEI_WORDS, yonseiSectionLabel } from '../../data/yonseiVocab'
import { useStore } from '../../stores/useStore'
import type { ReviewItem } from '../../types'
import { createReviewItem } from '../../utils/review'
import { usePronunciation } from '../../hooks/usePronunciation'
import { loadYonseiAudioManifest, yonseiAudioFile, type YonseiAudioManifest } from '../../utils/yonseiAudio'

type ShadowSource = 'dialogue' | 'yonsei' | 'ielts'

interface ShadowItem {
  id: string
  title: string
  text: string
  translation?: string
  romanization?: string
  language: 'ko' | 'en'
  source: string
  sourceType: ShadowSource
  volume?: number
  lesson?: number
  unit?: number
}

const DIALOGUE_ITEMS: ShadowItem[] = DIALOGUES.flatMap((scene) =>
  scene.lines.map((line, index) => ({
    id: `dialogue-${scene.scene}-${index}`,
    title: `${scene.scene} · ${line.speaker === 'B' ? '我的台词' : '对方'}`,
    text: line.ko,
    translation: line.zh,
    romanization: line.roman,
    language: 'ko' as const,
    source: '韩语情景对话',
    sourceType: 'dialogue' as const,
  }))
)

const YONSEI_ITEMS: ShadowItem[] = YONSEI_WORDS.map((word) => ({
  id: `yonsei-${word.entryId}`,
  title: yonseiSectionLabel(word),
  text: word.korean,
  translation: word.chinese,
  romanization: word.romanization,
  language: 'ko' as const,
  source: '延世韩国语词汇',
  sourceType: 'yonsei' as const,
  volume: word.volume,
  lesson: word.lesson,
  unit: word.unit,
}))

const IELTS_ITEMS: ShadowItem[] = LISTENING.flatMap((item) =>
  item.script
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)
    .map((text, index) => ({
      id: `ielts-listening-${item.id}-${index}`,
      title: `${item.title} · 第 ${index + 1} 句`,
      text,
      language: 'en' as const,
      source: '雅思听力示例',
      sourceType: 'ielts' as const,
    }))
)

const ALL_ITEMS = [...DIALOGUE_ITEMS, ...YONSEI_ITEMS, ...IELTS_ITEMS]
const SPEEDS = [0.75, 0.9, 1, 1.1, 1.25]
const REPEATS = [1, 2, 3]
const GAPS = [1, 1.5, 2.5, 4]

function numberParam(value: string | null): number | '' {
  if (!value) return ''
  const number = Number(value)
  return Number.isInteger(number) && number > 0 ? number : ''
}

function wait(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

export default function Shadowing() {
  const [params, setParams] = useSearchParams()
  const { speak, stop } = usePronunciation()
  const upsertReviewItem = useStore((state) => state.upsertReviewItem)
  const review = useStore((state) => state.review)
  const source = (params.get('source') || 'all') as ShadowSource | 'all'
  const volume = numberParam(params.get('volume'))
  const lesson = numberParam(params.get('lesson'))
  const unit = numberParam(params.get('unit'))
  const itemId = params.get('item')
  const [index, setIndex] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [repeatCount, setRepeatCount] = useState(1)
  const [gap, setGap] = useState(1.5)
  const [showTranslation, setShowTranslation] = useState(true)
  const [showRomanization, setShowRomanization] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isSequencePlaying, setIsSequencePlaying] = useState(false)
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null)
  const [recordError, setRecordError] = useState('')
  const [audioManifest, setAudioManifest] = useState<YonseiAudioManifest | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recordedUrlRef = useRef<string | null>(null)
  const sequenceTokenRef = useRef(0)

  useEffect(() => {
    let active = true
    void loadYonseiAudioManifest().then((manifest) => {
      if (active) setAudioManifest(manifest)
    })
    return () => {
      active = false
    }
  }, [])

  const sourceItems = useMemo(() => {
    if (source === 'yonsei') return YONSEI_ITEMS
    if (source === 'dialogue') return DIALOGUE_ITEMS
    if (source === 'ielts') return IELTS_ITEMS
    return ALL_ITEMS
  }, [source])

  const yonseiVolumes = useMemo(
    () => Array.from(new Set(YONSEI_WORDS.map((word) => word.volume))).sort((a, b) => a - b),
    []
  )
  const yonseiLessons = useMemo(
    () => Array.from(new Set(YONSEI_WORDS.filter((word) => volume === '' || word.volume === volume).map((word) => word.lesson))).sort((a, b) => a - b),
    [volume]
  )
  const yonseiUnits = useMemo(
    () => Array.from(new Set(YONSEI_WORDS.filter((word) => (volume === '' || word.volume === volume) && (lesson === '' || word.lesson === lesson)).map((word) => word.unit))).sort((a, b) => a - b),
    [lesson, volume]
  )

  const items = useMemo(() => {
    if (source !== 'yonsei') return sourceItems
    return sourceItems.filter((item) =>
      (volume === '' || item.volume === volume) &&
      (lesson === '' || item.lesson === lesson) &&
      (unit === '' || item.unit === unit)
    )
  }, [lesson, source, sourceItems, unit, volume])

  const initialIndex = Math.max(0, items.findIndex((item) => item.id === itemId))
  const current = items[index] || items[0]

  useEffect(() => {
    setIndex(initialIndex)
    setRecordedUrl(null)
    setRecordError('')
    sequenceTokenRef.current += 1
    stop()
    setIsSequencePlaying(false)
  }, [initialIndex, source, volume, lesson, unit, itemId, stop])

  useEffect(() => {
    return () => {
      sequenceTokenRef.current += 1
      stop()
      recorderRef.current?.stop()
      streamRef.current?.getTracks().forEach((track) => track.stop())
      if (recordedUrlRef.current) URL.revokeObjectURL(recordedUrlRef.current)
    }
  }, [stop])

  const setFilter = (name: 'source' | 'volume' | 'lesson' | 'unit', value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(name, value)
    else next.delete(name)
    next.delete('item')
    if (name === 'source') {
      next.delete('volume')
      next.delete('lesson')
      next.delete('unit')
    }
    if (name === 'volume') {
      next.delete('lesson')
      next.delete('unit')
    }
    if (name === 'lesson') next.delete('unit')
    setParams(next)
  }

  const reviewItem = useMemo<ReviewItem | null>(() => {
    if (!current) return null
    return createReviewItem({
      id: current.id,
      language: current.language,
      kind: current.language === 'en' ? 'listening' : 'sentence',
      title: current.title,
      prompt: current.text,
      answer: current.text,
      translation: current.translation,
      source: current.source,
      href: current.sourceType === 'yonsei' ? '/korean/yonsei' : current.language === 'en' ? '/ielts/listening' : '/korean/dialogue',
    })
  }, [current])

  const playReference = () => {
    if (!current) return
    void speak(current.text, { lang: current.language === 'en' ? 'en-US' : 'ko-KR', speed })
  }

  const stopSequence = () => {
    sequenceTokenRef.current += 1
    stop()
    setIsSequencePlaying(false)
  }

  const playSequence = async (startIndex = index) => {
    if (!items.length) return
    if (isSequencePlaying) {
      stopSequence()
      return
    }
    const token = sequenceTokenRef.current + 1
    sequenceTokenRef.current = token
    setIsSequencePlaying(true)
    for (let itemIndex = startIndex; itemIndex < items.length; itemIndex += 1) {
      if (sequenceTokenRef.current !== token) break
      setIndex(itemIndex)
      for (let repeat = 0; repeat < repeatCount; repeat += 1) {
        if (sequenceTokenRef.current !== token) break
        const result = await speak(items[itemIndex].text, { lang: items[itemIndex].language === 'en' ? 'en-US' : 'ko-KR', speed })
        if (result === 'failed') {
          sequenceTokenRef.current += 1
          stop()
          setRecordError(`“${items[itemIndex].text}”播放失败，队列已暂停，没有静默跳过。请重新点击后继续。`)
          setIsSequencePlaying(false)
          return
        }
        await wait(gap * 1000)
      }
    }
    if (sequenceTokenRef.current === token) setIsSequencePlaying(false)
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
    if (!current || !reviewItem) return
    upsertReviewItem(reviewItem)
    review(current.id, 'good')
    if (index < items.length - 1) {
      setIndex((value) => value + 1)
      setRecordedUrl(null)
      setRecordError('')
    }
  }

  if (!current) {
    return <div className="fade-in"><PageHeader title="影子跟读" desc="没有匹配的跟读内容，请调整筛选条件。" /></div>
  }

  const sourceLabel = source === 'yonsei' ? '延世韩国语词汇' : source === 'dialogue' ? '韩语情景对话' : source === 'ielts' ? '雅思听力示例' : '全部跟读内容'
  const localAudioCount = source === 'yonsei' && audioManifest
    ? items.filter((item) => Boolean(yonseiAudioFile(item.text, audioManifest))).length
    : null

  return (
    <div className="fade-in">
      <PageHeader title="影子跟读" desc="先听参考音，再按教材顺序跟读；延世词汇支持按册、课、单元建立连续跟读队列。录音只保存在当前浏览器，不会自动上传。" />

      <div className="mb-4 rounded-card bg-white p-3 shadow-card">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <span className="shrink-0 text-xs text-gray-400">来源</span>
            <select aria-label="影子跟读来源" value={source} onChange={(event) => setFilter('source', event.target.value)} className="inp min-w-0 flex-1 py-1.5 text-sm">
              <option value="all">全部</option>
              <option value="yonsei">延世韩国语词汇</option>
              <option value="dialogue">韩语情景对话</option>
              <option value="ielts">雅思听力示例</option>
            </select>
          </label>
          {source === 'yonsei' ? (
            <>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <span className="shrink-0 text-xs text-gray-400">册次</span>
                <select aria-label="影子跟读册次" value={volume} onChange={(event) => setFilter('volume', event.target.value)} className="inp min-w-0 flex-1 py-1.5 text-sm">
                  <option value="">全部册次</option>
                  {yonseiVolumes.map((value) => <option key={value} value={value}>第{value}册</option>)}
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <span className="shrink-0 text-xs text-gray-400">课次</span>
                <select aria-label="影子跟读课次" value={lesson} onChange={(event) => setFilter('lesson', event.target.value)} className="inp min-w-0 flex-1 py-1.5 text-sm">
                  <option value="">全部课次</option>
                  {yonseiLessons.map((value) => <option key={value} value={value}>第{value}课</option>)}
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <span className="shrink-0 text-xs text-gray-400">单元</span>
                <select aria-label="影子跟读单元" value={unit} onChange={(event) => setFilter('unit', event.target.value)} className="inp min-w-0 flex-1 py-1.5 text-sm">
                  <option value="">全部单元</option>
                  {yonseiUnits.map((value) => <option key={value} value={value}>第{value}单元</option>)}
                </select>
              </label>
            </>
          ) : null}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
        <span>第 {index + 1} / {items.length} 条 · {sourceLabel}</span>
        {source === 'yonsei' ? (
          <span className="text-xs text-gray-400">
            {localAudioCount === null ? '正在检查本地音频' : `本地音频 ${localAudioCount}/${items.length}`}
          </span>
        ) : null}
        {source === 'yonsei' && current.volume && current.lesson && current.unit ? <span>{current.title}</span> : null}
      </div>

      <div className="rounded-card bg-white p-4 shadow-card sm:p-5">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="text-xs text-gray-400">{current.title}</div>
            <h2 className="mt-1 break-words text-xl font-bold text-lavender-deep sm:text-2xl">{current.text}</h2>
            {showRomanization && current.romanization ? <div className="mt-2 break-words text-sm text-gray-400">{current.romanization}</div> : null}
            {showTranslation && current.translation ? <div className="mt-3 rounded-xl bg-cream p-3 text-sm text-gray-600">{current.translation}</div> : null}
          </div>
          <button type="button" onClick={playReference} className="shrink-0 rounded-full bg-lavender-light p-3 text-lavender-deep hover:bg-lavender hover:text-white" title="播放参考音频" aria-label="播放参考音频">
            <Volume2 size={22} />
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-lavender-light/40 p-3 sm:p-4">
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

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
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

          {source === 'yonsei' ? (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <label className="text-xs text-gray-500">每词次数<select value={repeatCount} onChange={(event) => setRepeatCount(Number(event.target.value))} className="inp mt-1 w-full py-1 text-xs"><option value={1}>1 次</option><option value={2}>2 次</option><option value={3}>3 次</option></select></label>
              <label className="text-xs text-gray-500">词间停顿<select value={gap} onChange={(event) => setGap(Number(event.target.value))} className="inp mt-1 w-full py-1 text-xs">{GAPS.map((value) => <option key={value} value={value}>{value} 秒</option>)}</select></label>
              <button type="button" onClick={() => void playSequence(0)} className="self-end rounded-xl bg-white px-3 py-2 text-sm text-lavender-deep hover:bg-cream">
                {unit === '' ? '从当前队列第1词开始' : '从本单元第1词开始'}
              </button>
              <button type="button" onClick={() => void playSequence()} className={`self-end rounded-xl px-3 py-2 text-sm text-white ${isSequencePlaying ? 'bg-coral' : 'bg-lavender'}`}>
                {isSequencePlaying ? '停止连续跟读' : '从当前词连续跟读'}
              </button>
            </div>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
            <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={showTranslation} onChange={(event) => setShowTranslation(event.target.checked)} />显示中文</label>
            {current.romanization ? <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={showRomanization} onChange={(event) => setShowRomanization(event.target.checked)} />显示罗马音</label> : null}
          </div>
          {recordError ? <div className="mt-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-700">{recordError}</div> : null}
          {recordedUrl ? (
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-white p-3 text-sm text-gray-600">
              <Square size={15} className="text-lavender-deep" />
              <span className="flex-1">你的录音已生成，可以回听比较</span>
              <audio controls src={recordedUrl} className="h-8 max-w-full" />
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0} className="inline-flex min-h-11 items-center gap-1 rounded-full bg-cream px-3 py-2 text-sm text-gray-600 disabled:opacity-40">
            <ChevronLeft size={16} />上一条
          </button>
          <button type="button" onClick={complete} className="rounded-full bg-emerald-500 px-4 py-2 text-sm text-white hover:bg-emerald-600">
            完成本条并安排复习
          </button>
          <button type="button" onClick={() => setIndex((value) => Math.min(items.length - 1, value + 1))} disabled={index === items.length - 1} className="inline-flex min-h-11 items-center gap-1 rounded-full bg-cream px-3 py-2 text-sm text-gray-600 disabled:opacity-40">
            下一条<ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
