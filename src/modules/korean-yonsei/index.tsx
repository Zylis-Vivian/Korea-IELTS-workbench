import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { BookOpen, ChevronLeft, ChevronRight, CircleStop, GraduationCap, Mic2, Play, RotateCcw, Search, Volume2 } from 'lucide-react'
import { PageHeader } from '../../components/Layout'
import { usePronunciation } from '../../hooks/usePronunciation'
import { yonseiSectionLabel, YONSEI_LESSONS, YONSEI_WORDS, type YonseiWord } from '../../data/yonseiVocab'
import { loadYonseiAudioManifest, yonseiAudioFile, yonseiAudioUrl, type YonseiAudioManifest } from '../../utils/yonseiAudio'
import { AudioPlaybackError, playAudioUrl, stopAudioPlayback } from '../../utils/audioPlayback'

const PAGE_SIZE = 50
const SPEEDS = [0.75, 0.9, 1, 1.1, 1.25]
const REPEATS = [1, 2, 3]
const GAPS = [1, 1.5, 2.5, 4]

type UnitPlaybackStatus = 'playing' | 'stopped' | 'completed' | 'error'

interface UnitPlayback {
  key: string
  volume: number
  lesson: number
  unit: number
  words: YonseiWord[]
  currentIndex: number
  status: UnitPlaybackStatus
  error?: string
}

function wait(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

interface OriginMeta {
  label: string
  tag: string
  color: string
  bg: string
  border: string
  rowBorder: string
  desc: string
}

const ORIGIN_META: Record<string, OriginMeta> = {
  hanja: {
    label: '汉字词',
    tag: '汉',
    color: 'text-white',
    bg: 'bg-violet-600',
    border: 'border-violet-600',
    rowBorder: 'border-l-violet-500',
    desc: '由汉字词源构成',
  },
  native: {
    label: '固有词',
    tag: '固',
    color: 'text-white',
    bg: 'bg-emerald-600',
    border: 'border-emerald-600',
    rowBorder: 'border-l-emerald-500',
    desc: '韩语固有词',
  },
  loanword: {
    label: '外来词',
    tag: '外',
    color: 'text-white',
    bg: 'bg-amber-600',
    border: 'border-amber-600',
    rowBorder: 'border-l-amber-500',
    desc: '来自外语音译',
  },
  hybrid: {
    label: '混合词',
    tag: '混',
    color: 'text-white',
    bg: 'bg-pink-500',
    border: 'border-pink-500',
    rowBorder: 'border-l-pink-500',
    desc: '由不同来源构成',
  },
  expression: {
    label: '搭配/表达',
    tag: '搭',
    color: 'text-white',
    bg: 'bg-orange-600',
    border: 'border-orange-600',
    rowBorder: 'border-l-orange-500',
    desc: '固定搭配或表达',
  },
  grammar: {
    label: '语法形式',
    tag: '法',
    color: 'text-white',
    bg: 'bg-blue-600',
    border: 'border-blue-600',
    rowBorder: 'border-l-blue-500',
    desc: '助词、词尾等',
  },
  unknown: {
    label: '待核',
    tag: '?',
    color: 'text-white',
    bg: 'bg-gray-500',
    border: 'border-gray-500',
    rowBorder: 'border-l-gray-400',
    desc: '词源待核对',
  },
}

function originInfo(type?: string): OriginMeta {
  return ORIGIN_META[type || ''] || ORIGIN_META.unknown
}

function Speakable({
  text,
  lang,
  className = '',
  children,
}: {
  text: string
  lang: 'ko-KR' | 'en-US'
  className?: string
  children: React.ReactNode
}) {
  const { speak } = usePronunciation()
  return (
    <button
      type="button"
      onClick={() => void speak(text, { lang })}
      className={`group inline-flex items-center gap-1 text-left hover:underline underline-offset-4 decoration-lavender focus:outline-none ${className}`}
      title={`点击朗读 ${text}`}
    >
      {children}
      <Volume2 size={13} className="opacity-0 group-hover:opacity-100 transition text-lavender-deep shrink-0" />
    </button>
  )
}

function unitLabel(word: Pick<YonseiWord, 'volume' | 'lesson' | 'unit' | 'chapterZh'>) {
  return `${yonseiSectionLabel(word)}｜${word.chapterZh}`
}

function unitKey(volume: number, lesson: number, unit: number) {
  return `${volume}-${lesson}-${unit}`
}

export default function KoreanYonsei() {
  const [book, setBook] = useState<number | ''>('')
  const [lesson, setLesson] = useState<number | ''>('')
  const [unit, setUnit] = useState<number | ''>('')
  const [origin, setOrigin] = useState('')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [audioManifest, setAudioManifest] = useState<YonseiAudioManifest | null>(null)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [playbackRepeats, setPlaybackRepeats] = useState(1)
  const [playbackGap, setPlaybackGap] = useState(1.5)
  const [unitPlayback, setUnitPlayback] = useState<UnitPlayback | null>(null)
  const playbackTokenRef = useRef(0)

  useEffect(() => {
    let active = true
    void loadYonseiAudioManifest().then((manifest) => {
      if (active) setAudioManifest(manifest)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => () => {
    playbackTokenRef.current += 1
    stopAudioPlayback()
  }, [])

  const books = useMemo(() => YONSEI_LESSONS.filter((item, index, all) => all.findIndex((x) => x.volume === item.volume) === index), [])
  const lessons = useMemo(
    () => YONSEI_LESSONS.filter((item) => book === '' || item.volume === book),
    [book]
  )
  const units = useMemo(() => {
    const selectedLessons = lessons.filter((item) => lesson === '' || item.lesson === lesson)
    return Array.from(new Set(selectedLessons.flatMap((item) => item.units))).sort((a, b) => a - b)
  }, [lesson, lessons])
  const originTypes = useMemo(
    () => Array.from(new Set(YONSEI_WORDS.map((word) => word.originType).filter(Boolean))).sort() as string[],
    []
  )

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase()
    return YONSEI_WORDS.filter((word) => {
      if (book !== '' && word.volume !== book) return false
      if (lesson !== '' && word.lesson !== lesson) return false
      if (unit !== '' && word.unit !== unit) return false
      if (origin && word.originType !== origin) return false
      if (!keyword) return true
      return [word.korean, word.romanization, word.chinese, word.english || ''].some((value) =>
        value.toLowerCase().includes(keyword)
      )
    })
  }, [book, lesson, origin, q, unit])

  useEffect(() => {
    setPage(1)
  }, [book, lesson, origin, q, unit])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageWords = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage]
  )

  const selectedLesson = lessons.find((item) => item.lesson === lesson && (book === '' || item.volume === book))
  const selectedUnit = unit === '' ? '' : `第${unit}单元`
  const audioCoverage = useMemo(() => {
    const result = new Map<string, { total: number; available: number }>()
    for (const word of YONSEI_WORDS) {
      const key = unitKey(word.volume, word.lesson, word.unit)
      const current = result.get(key) || { total: 0, available: 0 }
      current.total += 1
      if (audioManifest && yonseiAudioFile(word.korean, audioManifest)) current.available += 1
      result.set(key, current)
    }
    return result
  }, [audioManifest])

  const activePlaybackWord = unitPlayback?.words[unitPlayback.currentIndex]

  const stopUnitPlayback = () => {
    playbackTokenRef.current += 1
    stopAudioPlayback()
    setUnitPlayback((current) => current ? { ...current, status: 'stopped' } : current)
  }

  const startUnitPlayback = (volume: number, lessonNumber: number, unitNumber: number) => {
    const key = unitKey(volume, lessonNumber, unitNumber)
    if (unitPlayback?.key === key && unitPlayback.status === 'playing') {
      stopUnitPlayback()
      return
    }

    const words = YONSEI_WORDS.filter((word) =>
      word.volume === volume && word.lesson === lessonNumber && word.unit === unitNumber
    )
    if (!words.length) return

    if (!audioManifest) {
      setUnitPlayback({
        key,
        volume,
        lesson: lessonNumber,
        unit: unitNumber,
        words,
        currentIndex: 0,
        status: 'error',
        error: '音频清单仍在加载，请稍等几秒后重新点击。',
      })
      return
    }

    playbackTokenRef.current += 1
    const token = playbackTokenRef.current
    stopAudioPlayback()
    setUnitPlayback({ key, volume, lesson: lessonNumber, unit: unitNumber, words, currentIndex: 0, status: 'playing' })

    // 不在第一次播放前 await 任何请求：第一词的 audio.play() 保持在用户点击手势中，
    // 后续词复用同一个 HTMLAudioElement，避免 iPhone/iPad 间歇性拦截自动播放。
    const run = async () => {
      for (let wordIndex = 0; wordIndex < words.length; wordIndex += 1) {
        if (playbackTokenRef.current !== token) return
        const word = words[wordIndex]
        const file = yonseiAudioFile(word.korean, audioManifest)
        if (!file) throw new Error(`“${word.korean}”缺少本地音频。`)

        setUnitPlayback((current) => current?.key === key
          ? { ...current, currentIndex: wordIndex, status: 'playing', error: undefined }
          : current)

        for (let repeat = 0; repeat < playbackRepeats; repeat += 1) {
          if (playbackTokenRef.current !== token) return
          await playAudioUrl(yonseiAudioUrl(file), playbackSpeed)
          if (playbackTokenRef.current !== token) return
          await wait(playbackGap * 1000)
        }
      }

      if (playbackTokenRef.current === token) {
        setUnitPlayback((current) => current?.key === key
          ? { ...current, currentIndex: words.length - 1, status: 'completed' }
          : current)
      }
    }

    void run().catch((error: unknown) => {
      if (playbackTokenRef.current !== token) return
      stopAudioPlayback()
      const message = error instanceof AudioPlaybackError || error instanceof Error
        ? error.message
        : '音频播放失败，请重新点击跟读。'
      setUnitPlayback((current) => current?.key === key
        ? { ...current, status: 'error', error: `${message} 播放已暂停，没有静默跳过后续单词。` }
        : current)
    })
  }

  const resetLessonAndUnit = (nextBook: number | '') => {
    setBook(nextBook)
    setLesson('')
    setUnit('')
  }

  const resetUnit = (nextLesson: number | '') => {
    setLesson(nextLesson)
    setUnit('')
  }

  return (
    <div className="fade-in">
      <PageHeader
        title="延世韩国语 1-6"
        desc={`保留教材原始册次、课次、单元和学习顺序，共 ${YONSEI_WORDS.length} 条教材记录；点击韩语或英文即可朗读。`}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(ORIGIN_META).map(([key, meta]) => (
          <div
            key={key}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs ${meta.bg} ${meta.color} border ${meta.border}`}
            title={meta.desc}
          >
            <span className="font-bold">{meta.tag}</span>
            <span>{meta.label}</span>
          </div>
        ))}
      </div>

      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex items-center gap-2">
          <BookOpen size={15} className="shrink-0 text-gray-400" />
          <select
            aria-label="选择册次"
            value={book}
            onChange={(event) => resetLessonAndUnit(event.target.value ? Number(event.target.value) : '')}
            className="inp min-w-0 flex-1 text-sm py-1.5"
          >
            <option value="">全部册次</option>
            {books.map((item) => (
              <option key={item.volume} value={item.volume}>
                第{item.volume}册
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          <GraduationCap size={15} className="shrink-0 text-gray-400" />
          <select
            aria-label="选择课次"
            value={lesson}
            onChange={(event) => resetUnit(event.target.value ? Number(event.target.value) : '')}
            className="inp min-w-0 flex-1 text-sm py-1.5"
          >
            <option value="">全部课次</option>
            {lessons.map((item) => (
              <option key={item.key} value={item.lesson}>
                第{item.lesson}课 · {item.titleZh}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="w-[15px] shrink-0 text-center text-xs text-gray-400">单</span>
          <select
            aria-label="选择单元"
            value={unit}
            onChange={(event) => setUnit(event.target.value ? Number(event.target.value) : '')}
            className="inp min-w-0 flex-1 text-sm py-1.5"
          >
            <option value="">全部单元</option>
            {units.map((value) => (
              <option key={value} value={value}>
                第{value}单元
              </option>
            ))}
          </select>
        </label>

        <select aria-label="选择词源" value={origin} onChange={(event) => setOrigin(event.target.value)} className="inp text-sm py-1.5">
          <option value="">全部词源</option>
          {originTypes.map((value) => {
            const info = originInfo(value)
            return <option key={value} value={value}>{info.tag}·{info.label}</option>
          })}
        </select>
      </div>

      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="搜索韩文 / 罗马音 / 中文 / 英文"
            aria-label="搜索延世词汇"
            className="inp inp-leading-icon w-full"
          />
        </div>
        {selectedLesson && unit !== '' ? (
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="text-xs text-gray-400">
              {audioManifest
                ? (() => {
                    const coverage = audioCoverage.get(unitKey(selectedLesson.volume, selectedLesson.lesson, unit))
                    return `本地音频 ${coverage?.available || 0}/${coverage?.total || 0}`
                  })()
                : '正在检查本地音频'}
            </span>
            <button
              type="button"
              onClick={() => startUnitPlayback(selectedLesson.volume, selectedLesson.lesson, unit)}
              disabled={!audioManifest}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-lavender px-3 py-2 text-sm text-white shadow-soft hover:bg-lavender-deep disabled:cursor-wait disabled:opacity-50"
            >
              {unitPlayback?.key === unitKey(selectedLesson.volume, selectedLesson.lesson, unit) && unitPlayback.status === 'playing'
                ? <CircleStop size={16} />
                : <Mic2 size={16} />}
              {unitPlayback?.key === unitKey(selectedLesson.volume, selectedLesson.lesson, unit) && unitPlayback.status === 'playing'
                ? '停止跟读'
                : '页内跟读本单元'}
            </button>
          </div>
        ) : null}
      </div>

      {unitPlayback ? (
        <section className="mb-4 rounded-card border border-lavender-light bg-white p-4 shadow-card" aria-label="延世单元页内跟读">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0" aria-live="polite">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-lavender-deep">
                  第{unitPlayback.volume}册—第{unitPlayback.lesson}课—第{unitPlayback.unit}单元
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${
                  unitPlayback.status === 'playing'
                    ? 'bg-emerald-100 text-emerald-700'
                    : unitPlayback.status === 'completed'
                      ? 'bg-lavender-light text-lavender-deep'
                      : unitPlayback.status === 'error'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-gray-100 text-gray-500'
                }`}>
                  {unitPlayback.status === 'playing'
                    ? '正在页内跟读'
                    : unitPlayback.status === 'completed'
                      ? '本单元已播完'
                      : unitPlayback.status === 'error'
                        ? '播放已暂停'
                        : '已停止'}
                </span>
              </div>
              {activePlaybackWord ? (
                <div className="mt-2">
                  <span className="korean-font text-xl font-bold text-slate-800">{activePlaybackWord.korean}</span>
                  <span className="ml-2 text-xs text-gray-400">{activePlaybackWord.romanization}</span>
                  <div className="mt-1 text-sm text-gray-600">{activePlaybackWord.chinese}</div>
                </div>
              ) : null}
              <div className="mt-2 text-xs text-gray-400">
                第 {unitPlayback.currentIndex + 1} / {unitPlayback.words.length} 词 · 每词 {playbackRepeats} 次 · 停顿 {playbackGap} 秒
              </div>
            </div>

            <button
              type="button"
              onClick={() => unitPlayback.status === 'playing'
                ? stopUnitPlayback()
                : startUnitPlayback(unitPlayback.volume, unitPlayback.lesson, unitPlayback.unit)}
              className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm text-white ${unitPlayback.status === 'playing' ? 'bg-coral' : 'bg-lavender hover:bg-lavender-deep'}`}
            >
              {unitPlayback.status === 'playing'
                ? <><CircleStop size={16} />立即停止</>
                : unitPlayback.status === 'completed'
                  ? <><RotateCcw size={16} />重新跟读</>
                  : <><Play size={16} />从头播放</>}
            </button>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-lavender-light/70" aria-hidden="true">
            <div
              className="h-full rounded-full bg-lavender transition-[width] duration-300"
              style={{ width: `${unitPlayback.status === 'completed' ? 100 : ((unitPlayback.currentIndex + 1) / unitPlayback.words.length) * 100}%` }}
            />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 sm:max-w-xl">
            <label className="text-xs text-gray-500">
              语速
              <select value={playbackSpeed} disabled={unitPlayback.status === 'playing'} onChange={(event) => setPlaybackSpeed(Number(event.target.value))} className="inp mt-1 w-full py-1 text-xs disabled:opacity-60">
                {SPEEDS.map((value) => <option key={value} value={value}>{value}x</option>)}
              </select>
            </label>
            <label className="text-xs text-gray-500">
              每词次数
              <select value={playbackRepeats} disabled={unitPlayback.status === 'playing'} onChange={(event) => setPlaybackRepeats(Number(event.target.value))} className="inp mt-1 w-full py-1 text-xs disabled:opacity-60">
                {REPEATS.map((value) => <option key={value} value={value}>{value} 次</option>)}
              </select>
            </label>
            <label className="text-xs text-gray-500">
              跟读停顿
              <select value={playbackGap} disabled={unitPlayback.status === 'playing'} onChange={(event) => setPlaybackGap(Number(event.target.value))} className="inp mt-1 w-full py-1 text-xs disabled:opacity-60">
                {GAPS.map((value) => <option key={value} value={value}>{value} 秒</option>)}
              </select>
            </label>
          </div>

          {unitPlayback.error ? (
            <div className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-700" role="alert">
              {unitPlayback.error}
            </div>
          ) : (
            <div className="mt-3 text-xs text-gray-400">音频播完后会停顿，停顿期间跟读；全程留在当前延世词汇页面。</div>
          )}
        </section>
      ) : null}

      <div className="mb-2 flex flex-col gap-1 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
        <span>
          共 {filtered.length} 条
          {book !== '' && ` · 第${book}册`}
          {selectedLesson && ` · 第${selectedLesson.lesson}课 ${selectedLesson.titleZh}`}
          {selectedUnit && ` · ${selectedUnit}`}
          {origin && ` · ${originInfo(origin).label}`}
          {q.trim() && ` · 搜索「${q.trim()}」`}
        </span>
        <span>第 {safePage}/{totalPages} 页</span>
      </div>

      <div className="overflow-x-auto rounded-card bg-white shadow-card">
        <table className="w-full table-fixed text-sm sm:min-w-[760px]">
          <thead>
            <tr className="bg-slate-800 text-left text-white">
              <th className="w-[28%] px-4 py-3 font-semibold">한국어</th>
              <th className="w-[22%] px-4 py-3 font-semibold">中文</th>
              <th className="w-[24%] px-4 py-3 font-semibold">English</th>
              <th className="w-[26%] px-4 py-3 font-semibold">词源 / 发音</th>
            </tr>
          </thead>
          <tbody>
            {pageWords.map((word, index) => {
              const info = originInfo(word.originType)
              const previous = pageWords[index - 1]
              const showSection = !previous ||
                previous.volume !== word.volume ||
                previous.lesson !== word.lesson ||
                previous.unit !== word.unit
              return (
                <Fragment key={word.entryId}>
                  {showSection ? (
                    <tr key={`${word.entryId}-section`} className="border-y border-lavender-light bg-lavender-light/35">
                      <td colSpan={4} className="px-4 py-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="font-semibold text-lavender-deep">{unitLabel(word)}</div>
                            <div className="mt-0.5 text-xs text-gray-500">{word.chapterKo} · {word.chapterEn}</div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] text-gray-400">
                              {audioManifest
                                ? (() => {
                                    const coverage = audioCoverage.get(unitKey(word.volume, word.lesson, word.unit))
                                    return `音频 ${coverage?.available || 0}/${coverage?.total || 0}`
                                  })()
                                : '音频检查中'}
                            </span>
                            <button
                              type="button"
                              onClick={() => startUnitPlayback(word.volume, word.lesson, word.unit)}
                              disabled={!audioManifest}
                              className="inline-flex min-h-9 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs text-lavender-deep shadow-sm hover:bg-lavender hover:text-white disabled:cursor-wait disabled:opacity-50"
                            >
                              {unitPlayback?.key === unitKey(word.volume, word.lesson, word.unit) && unitPlayback.status === 'playing'
                                ? <><CircleStop size={13} />停止</>
                                : <><Mic2 size={13} />页内跟读</>}
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                  <tr
                    key={word.entryId}
                    aria-current={activePlaybackWord?.entryId === word.entryId ? 'true' : undefined}
                    className={`border-b border-gray-100 transition hover:bg-lavender-light/30 border-l-4 ${info.rowBorder} ${activePlaybackWord?.entryId === word.entryId ? 'bg-lavender-light/60 ring-1 ring-inset ring-lavender' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-start gap-2">
                        <Speakable text={word.korean} lang="ko-KR" className="korean-font text-lg font-bold text-slate-800">
                          {word.korean}
                        </Speakable>
                        <span className="mt-1 whitespace-nowrap text-xs text-gray-500">[{word.posZh || word.pos || '-'}]</span>
                      </div>
                      <div className="mt-0.5 text-xs text-gray-400">{word.romanization}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{word.chinese || '-'}</td>
                    <td className="px-4 py-3">
                      {word.english ? (
                        <Speakable text={word.english.split(';')[0].trim()} lang="en-US" className="text-slate-600">
                          {word.english}
                        </Speakable>
                      ) : <span className="text-gray-300">-</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className={`mb-1 inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs ${info.bg} ${info.color} ${info.border}`}>
                        <span className="font-bold">{info.tag}</span>
                        <span>{info.label}</span>
                      </div>
                      {word.originDetail && <div className="text-xs text-gray-500">{word.originDetail}</div>}
                      {word.pronunciation && <div className="mt-0.5 text-xs text-gray-400">发音 [{word.pronunciation}]</div>}
                    </td>
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </table>
        {pageWords.length === 0 && <div className="py-12 text-center text-gray-400">没有匹配的单词，换个条件试试～</div>}
      </div>

      {filtered.length > PAGE_SIZE ? (
        <div className="relative z-10 mt-4 flex items-center justify-center gap-2 pb-4" aria-label="延世词汇分页">
          <button
            type="button"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={safePage === 1}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-white px-2 py-1.5 text-gray-600 shadow-card transition hover:bg-lavender-light/60 disabled:opacity-40"
            aria-label="上一页"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="min-w-[5rem] text-center text-sm text-gray-500">第 {safePage} / {totalPages} 页</span>
          <button
            type="button"
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            disabled={safePage === totalPages}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-white px-2 py-1.5 text-gray-600 shadow-card transition hover:bg-lavender-light/60 disabled:opacity-40"
            aria-label="下一页"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      ) : null}
    </div>
  )
}
