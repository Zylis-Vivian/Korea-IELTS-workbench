import { useMemo, useState, type ReactNode } from 'react'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import { DAILY_LESSONS, getTodayLessonIndex, type DailyLesson } from '../../data/daily'
import { ANIMATIONS, KPOP, DRAMAS, getTodayAnimations, type EntItem } from '../../data/entertainment'
import {
  CalendarDays,
  Clapperboard,
  Music2,
  Tv,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  PlayCircle,
  Sparkles,
  GraduationCap,
} from 'lucide-react'

type Tab = 'words' | 'anim' | 'kpop' | 'drama'

const TABS: { key: Tab; label: string; icon: typeof CalendarDays }[] = [
  { key: 'words', label: '每日单词', icon: CalendarDays },
  { key: 'anim', label: '几厘米动画', icon: Clapperboard },
  { key: 'kpop', label: '男团综艺', icon: Music2 },
  { key: 'drama', label: '韩剧切片', icon: Tv },
]

function levelClass(level: number): string {
  const map: Record<number, string> = {
    1: 'bg-emerald-100 text-emerald-700',
    2: 'bg-sky-100 text-sky-700',
    3: 'bg-amber-100 text-amber-700',
    4: 'bg-orange-100 text-orange-700',
    5: 'bg-rose-100 text-rose-700',
    6: 'bg-purple-100 text-purple-700',
  }
  return map[level] || 'bg-gray-100 text-gray-600'
}

export default function KoreanDaily() {
  const [tab, setTab] = useState<Tab>('words')
  const todayIdx = useMemo(() => getTodayLessonIndex(), [])
  const [dayIdx, setDayIdx] = useState(todayIdx)
  const lesson = DAILY_LESSONS[dayIdx]

  return (
    <div className="fade-in">
      <PageHeader
        title="每日学习"
        desc="纯小白友好路线：每天 15-20 个单词 + 5 句常用语 + 5 个语法 + 小测验，难度按 TOPIK 1~6 标注。再看 2 个动画、男团综艺、韩剧切片边看边学。"
      />

      {/* 标签页：手机可横向滑动 */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {TABS.map((t) => {
          const Icon = t.icon
          const active = tab === t.key
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                active ? 'bg-lavender text-white shadow-soft' : 'bg-white text-gray-600 hover:bg-lavender-light/60'
              }`}
            >
              <Icon size={16} />
              {t.label}
            </button>
          )
        })}
      </div>

      <div className="mt-4">
        {tab === 'words' && <DailyTab lesson={lesson} dayIdx={dayIdx} todayIdx={todayIdx} onNav={setDayIdx} />}
        {tab === 'anim' && <AnimTab />}
        {tab === 'kpop' && <EntGrid items={KPOP} />}
        {tab === 'drama' && <EntGrid items={DRAMAS} />}
      </div>
    </div>
  )
}

// ───────────────────────── 每日单词 ─────────────────────────
function DailyTab({
  lesson,
  dayIdx,
  todayIdx,
  onNav,
}: {
  lesson: DailyLesson
  dayIdx: number
  todayIdx: number
  onNav: (i: number) => void
}) {
  const total = DAILY_LESSONS.length
  const go = (dir: number) => onNav((((dayIdx + dir) % total) + total) % total)
  const isToday = dayIdx === todayIdx

  return (
    <div className="space-y-8">
      {/* 日期 / 天数导航 */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button onClick={() => go(-1)} className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-lavender-deep hover:bg-lavender-light">
            <ChevronLeft size={18} />
          </button>
          <div className="text-center">
            <div className="text-lg font-bold text-lavender-deep">
              第 {lesson.day} 天 {isToday && <span className="ml-1 text-xs bg-lavender text-white px-2 py-0.5 rounded-full align-middle">今日</span>}
            </div>
            <div className="text-xs text-gray-400">{lesson.theme}</div>
          </div>
          <button onClick={() => go(1)} className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-lavender-deep hover:bg-lavender-light">
            <ChevronRight size={18} />
          </button>
        </div>
        <button
          onClick={() => onNav(todayIdx)}
          className="text-xs px-3 py-1.5 rounded-full bg-lavender-light text-lavender-deep hover:bg-lavender hover:text-white transition"
        >
          回到今日
        </button>
      </div>

      {/* 单词 */}
      <Section title="📘 今日单词" hint={`${lesson.words.length} 个 · 标注 TOPIK 等级`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {lesson.words.map((w, i) => (
            <div key={i} className="bg-white rounded-card shadow-card p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xl korean-font font-bold text-lavender-deep">{w.korean}</span>
                <SpeakerButton text={w.korean} size={15} />
              </div>
              <div className="text-[11px] text-gray-400">{w.romanization}</div>
              <div className="text-sm">{w.chinese}</div>
              <span className={`self-start mt-0.5 text-[10px] px-2 py-0.5 rounded ${levelClass(w.level)}`}>TOPIK {w.level}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 常用句 */}
      <Section title="💬 常用句子" hint={`${lesson.sentences.length} 句`}>
        <div className="space-y-2">
          {lesson.sentences.map((s, i) => (
            <div key={i} className="bg-white rounded-card shadow-card p-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="korean-font font-semibold text-lavender-deep">{s.korean}</div>
                <div className="text-[11px] text-gray-400">{s.romanization}</div>
                <div className="text-sm text-gray-700">{s.chinese}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] px-2 py-0.5 rounded ${levelClass(s.level)}`}>T{s.level}</span>
                <SpeakerButton text={s.korean} size={15} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 语法 */}
      <Section title="🧩 语法点" hint={`${lesson.grammar.length} 个`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {lesson.grammar.map((g, i) => (
            <div key={i} className="bg-white rounded-card shadow-card p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="font-semibold text-lavender-deep">{g.title}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded ${levelClass(g.level)}`}>T{g.level}</span>
              </div>
              <div className="text-xs text-gray-500 mb-1">格式：{g.pattern}</div>
              <div className="text-sm text-gray-700 mb-2">{g.explanation}</div>
              <div className="text-sm bg-lavender-light/50 rounded-lg px-3 py-2 korean-font">
                {g.example} <span className="text-gray-400 text-xs">— {g.exampleCn}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 小测验 */}
      <QuizBox lesson={lesson} />
    </div>
  )
}

function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-base font-bold text-lavender-deep">{title}</h3>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      {children}
    </section>
  )
}

// ───────────────────────── 小测验 ─────────────────────────
function QuizBox({ lesson }: { lesson: DailyLesson }) {
  const [picked, setPicked] = useState<number[]>(Array(lesson.quiz.length).fill(-1))
  const [done, setDone] = useState(false)
  const score = useMemo(() => picked.filter((p, i) => p === lesson.quiz[i].answer).length, [picked, lesson])

  const choose = (qi: number, oi: number) => {
    if (done) return
    setPicked((prev) => {
      const next = [...prev]
      next[qi] = oi
      return next
    })
  }

  return (
    <section className="bg-white rounded-card shadow-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-lavender-deep flex items-center gap-1.5">
          <GraduationCap size={18} /> 今日小测验
        </h3>
        {done && (
          <span className="text-sm font-semibold text-lavender-deep">
            得分 {score} / {lesson.quiz.length}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {lesson.quiz.map((q, qi) => (
          <div key={qi}>
            <div className="text-sm font-medium mb-2">
              {qi + 1}. {q.q}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, oi) => {
                const chosen = picked[qi] === oi
                const isAnswer = q.answer === oi
                let cls = 'border-lavender-light hover:border-lavender text-gray-700'
                if (done) {
                  if (isAnswer) cls = 'border-emerald-400 bg-emerald-50 text-emerald-700'
                  else if (chosen) cls = 'border-rose-400 bg-rose-50 text-rose-700'
                  else cls = 'border-gray-200 text-gray-400'
                } else if (chosen) {
                  cls = 'border-lavender bg-lavender-light/50 text-lavender-deep'
                }
                return (
                  <button
                    key={oi}
                    onClick={() => choose(qi, oi)}
                    className={`text-left text-sm px-3 py-2 rounded-xl border transition flex items-center gap-2 ${cls}`}
                  >
                    {done && isAnswer && <Check size={14} className="shrink-0" />}
                    {done && chosen && !isAnswer && <X size={14} className="shrink-0" />}
                    <span>{opt}</span>
                  </button>
                )
              })}
            </div>
            {done && (
              <div className="mt-1.5 text-xs text-gray-500">
                {picked[qi] === q.answer ? '✅ ' : '💡 '}
                {q.explain}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        {!done ? (
          <button
            onClick={() => setDone(true)}
            disabled={picked.some((p) => p < 0)}
            className="px-5 py-2 rounded-full bg-lavender text-white text-sm font-medium shadow-soft disabled:opacity-40 disabled:cursor-not-allowed hover:bg-lavender-deep transition"
          >
            交卷看答案
          </button>
        ) : (
          <button
            onClick={() => {
              setPicked(Array(lesson.quiz.length).fill(-1))
              setDone(false)
            }}
            className="px-5 py-2 rounded-full bg-lavender-light text-lavender-deep text-sm font-medium hover:bg-lavender hover:text-white transition"
          >
            再做一次
          </button>
        )}
      </div>
    </section>
  )
}

// ───────────────────────── 几厘米动画（每日 2 个） ─────────────────────────
function AnimTab() {
  const items = useMemo(() => getTodayAnimations(), [])
  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-400">今天为你准备 {items.length} 个动画 · 看完点开「学习分析」看生词和语法</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((it) => (
          <EntCard key={it.id} item={it} />
        ))}
      </div>
    </div>
  )
}

// ───────────────────────── 娱乐卡片通用 ─────────────────────────
function EntGrid({ items }: { items: EntItem[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {items.map((it) => (
        <EntCard key={it.id} item={it} />
      ))}
    </div>
  )
}

function EntCard({ item }: { item: EntItem }) {
  const [open, setOpen] = useState(false)
  const biliHref = `https://search.bilibili.com/all?keyword=${encodeURIComponent(item.searchQuery)}`

  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden flex flex-col">
      {/* 头部 */}
      <div className="p-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-lavender-light text-lavender-deep px-2 py-0.5 rounded-full">{item.group}</span>
            <span className="text-[10px] text-gray-400">{item.kind === 'animation' ? '动画' : item.kind === 'kpop' ? '综艺' : '韩剧'}</span>
          </div>
          <div className="font-bold text-lavender-deep">{item.title}</div>
          <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
        </div>
      </div>

      {/* 视频区 */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-lavender/30 to-lavender-deep/20 flex items-center justify-center">
        {item.bvid ? (
          <iframe
            className="w-full h-full"
            src={`https://player.bilibili.com/player.html?bvid=${item.bvid}&page=1&high_quality=1&danmaku=0`}
            allowFullScreen
            title={item.title}
          />
        ) : (
          <div className="text-center px-4">
            <PlayCircle size={40} className="mx-auto text-lavender-deep/70 mb-2" />
            <div className="text-xs text-gray-500 mb-2">在 B站 观看「{item.searchQuery}」</div>
            <a
              href={biliHref}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-1.5 rounded-full bg-lavender text-white text-xs font-medium hover:bg-lavender-deep transition"
            >
              去 B站观看
            </a>
          </div>
        )}
      </div>

      {/* 中韩对照 */}
      {item.dialogue && item.dialogue.length > 0 && (
        <div className="px-4 pt-3">
          <div className="text-xs font-semibold text-gray-500 mb-1">中韩对照</div>
          <div className="space-y-1">
            {item.dialogue.map((d, i) => (
              <div key={i} className="text-sm bg-lavender-light/40 rounded-lg px-3 py-1.5 flex items-center justify-between gap-2">
                <span className="korean-font text-lavender-deep">{d.kr}</span>
                <SpeakerButton text={d.kr} size={13} />
                <span className="text-gray-500 text-xs">{d.cn}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 分析展开 */}
      <div className="p-4 pt-3 mt-auto">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-center gap-1.5 text-sm text-lavender-deep font-medium py-2 rounded-xl bg-lavender-light/50 hover:bg-lavender-light transition"
        >
          <Sparkles size={15} /> {open ? '收起学习分析' : '展开学习分析'}
        </button>

        {open && (
          <div className="mt-3 space-y-4">
            {/* 生词 */}
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-1.5">📘 生词</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {item.vocab.map((v, i) => (
                  <div key={i} className="bg-lavender-light/40 rounded-lg p-2 flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="korean-font font-semibold text-lavender-deep truncate">{v.korean}</div>
                      <div className="text-[10px] text-gray-400 truncate">{v.romanization}</div>
                      <div className="text-xs text-gray-600 truncate">{v.chinese}</div>
                    </div>
                    <SpeakerButton text={v.korean} size={13} />
                  </div>
                ))}
              </div>
            </div>
            {/* 语法 */}
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-1.5">🧩 语法</div>
              <div className="space-y-2">
                {item.grammar.map((g, i) => (
                  <div key={i} className="text-sm bg-white border border-lavender-light rounded-lg p-2.5">
                    <div className="font-medium text-lavender-deep">{g.pattern}</div>
                    <div className="text-gray-600 text-xs mt-0.5">{g.explanation}</div>
                    <div className="korean-font text-gray-500 text-xs mt-1">예) {g.example}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* 小知识 */}
            {item.culture && (
              <div className="text-xs bg-amber-50 text-amber-800 rounded-lg p-3 leading-relaxed">
                💡 <span className="font-semibold">韩国小知识：</span>
                {item.culture}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
