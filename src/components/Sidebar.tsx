import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
    Grid3x3,
    BookOpen,
    ScrollText,
    MessagesSquare,
    AudioLines,
    Sparkles,
    PenLine,
    PlayCircle,
    Headphones,
    Newspaper,
    Mic,
    PenTool,
    LayoutDashboard,
    BookMarked,
    AlertOctagon,
    CalendarDays,
    CalendarCheck,
    Settings as SettingsIcon,
    Flower2,
    Award,
    GraduationCap,
    Mic2,
    MoreHorizontal,
} from 'lucide-react'
import { useStore } from '../stores/useStore'
import { localDateKey } from '../utils/localDate'

interface NavItem {
  to: string
  label: string
  icon: typeof Grid3x3
  dot?: boolean
}

const korean: NavItem[] = [
  { to: '/korean/alphabet', label: '韩文字母', icon: Grid3x3 },
  { to: '/korean/daily', label: '每日学习', icon: CalendarDays },
  { to: '/korean/vocab', label: '词汇学习', icon: BookOpen },
  { to: '/korean/yonsei', label: '延世韩国语', icon: GraduationCap },
  { to: '/korean/grammar', label: '语法大全', icon: ScrollText },
  { to: '/korean/dialogue', label: '情景对话', icon: MessagesSquare },
  { to: '/korean/pronunciation', label: '发音拼写法则', icon: AudioLines },
  { to: '/korean/culture', label: '韩国文化风俗', icon: Sparkles },
  { to: '/korean/practice', label: '综合练习', icon: PenLine },
  { to: '/korean/video', label: 'B站视频学习', icon: PlayCircle },
  { to: '/korean/wordbook', label: '韩语单词本', icon: BookMarked },
  { to: '/korean/wrong', label: '韩语错题本', icon: AlertOctagon },
]

const ielts: NavItem[] = [
  { to: '/ielts/vocab', label: '词汇学习', icon: BookOpen },
  { to: '/ielts/grammar', label: '语法大全', icon: ScrollText },
  { to: '/ielts/listening', label: '听力训练', icon: Headphones },
  { to: '/ielts/reading', label: '阅读训练', icon: Newspaper },
  { to: '/ielts/speaking', label: '口语训练', icon: Mic },
  { to: '/ielts/writing', label: '写作训练', icon: PenTool },
  { to: '/ielts/scoring', label: '评分标准', icon: Award },
  { to: '/ielts/wordbook', label: '雅思单词本', icon: BookMarked },
  { to: '/ielts/wrong', label: '雅思错题本', icon: AlertOctagon },
]

const center: NavItem[] = [
  { to: '/review', label: '今日任务', icon: CalendarDays },
  { to: '/shadowing', label: '影子跟读', icon: Mic2 },
  { to: '/dictation', label: '听写练习', icon: Headphones },
  { to: '/dashboard', label: '学习仪表盘', icon: LayoutDashboard },
  { to: '/checkin', label: '每日打卡', icon: CalendarCheck },
]

const mobilePrimary: NavItem[] = [
  { to: '/review', label: '今日', icon: CalendarDays },
  { to: '/dictation', label: '听写', icon: Headphones },
  { to: '/shadowing', label: '跟读', icon: Mic2 },
  { to: '/korean/daily', label: '韩语', icon: BookOpen },
  { to: '/ielts/vocab', label: '雅思', icon: GraduationCap },
]

const mobileMore: NavItem[] = [
  { to: '/dashboard', label: '学习仪表盘', icon: LayoutDashboard },
  { to: '/korean/wordbook', label: '韩语单词本', icon: BookMarked },
  { to: '/korean/wrong', label: '韩语错题本', icon: AlertOctagon },
  { to: '/ielts/wordbook', label: '雅思单词本', icon: BookMarked },
  { to: '/ielts/wrong', label: '雅思错题本', icon: AlertOctagon },
  { to: '/checkin', label: '每日打卡', icon: CalendarCheck },
  { to: '/settings', label: '设置', icon: SettingsIcon },
]

function Item({ item, mobile, onNavigate }: { item: NavItem; mobile?: boolean; onNavigate?: () => void }) {
  const wordbook = useStore((s) => s.wordbook)
  const wrongbook = useStore((s) => s.wrongbook)
  const koWord = wordbook.some((w) => w.category === 'korean')
  const koWrong = wrongbook.some((w) => w.category === 'korean')
  const ieWord = wordbook.some((w) => w.category === 'ielts')
  const ieWrong = wrongbook.some((w) => w.category === 'ielts')
  const dotMap: Record<string, boolean> = {
    '/korean/wordbook': koWord,
    '/korean/wrong': koWrong,
    '/ielts/wordbook': ieWord,
    '/ielts/wrong': ieWrong,
  }
  const dot = dotMap[item.to]
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
          isActive
            ? 'bg-gradient-to-r from-lavender to-lavender-deep text-white shadow-soft'
            : 'text-gray-600 hover:bg-lavender-light/60'
        } ${mobile ? 'flex-col gap-0.5 py-1 text-[10px]' : ''}`
      }
    >
      {dot && (
        <>
          <span aria-hidden="true" className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral" />
          <span className="sr-only">有可查看内容</span>
        </>
      )}
      <item.icon size={mobile ? 20 : 18} />
      <span className="truncate">{item.label}</span>
    </NavLink>
  )
}

export default function Sidebar() {
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false)
  const studyMinutes = useStore((s) => s.studyMinutes)
  const today = localDateKey()
  const mins = studyMinutes[today] || 0
  const hh = Math.floor(mins / 60)
  const mm = mins % 60

  useEffect(() => {
    if (!mobileMoreOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMoreOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileMoreOpen])

  return (
    <>
      {/* PC / 平板侧栏 */}
      <aside className="hidden lg:flex lg:h-[100dvh] lg:sticky lg:top-0 flex-col w-[260px] shrink-0 overflow-hidden bg-white/80 backdrop-blur border-r border-lavender-light">
        <div className="shrink-0 px-5 py-5 flex items-center gap-2 border-b border-lavender-light">
          <span className="text-2xl">🌸</span>
          <div>
            <div className="font-bold text-lavender-deep leading-tight">Lavender Study</div>
            <div className="text-[11px] text-gray-400">韩语 + 雅思双轨学习</div>
          </div>
        </div>
        <div className="shrink-0 px-5 py-2 text-xs text-gray-400">
          今日学习 {hh > 0 ? `${hh}h ` : ''}
          {mm}m
        </div>
        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-4 space-y-5 [scrollbar-gutter:stable]" aria-label="桌面主导航">
          <Section title="韩语学习" items={korean} />
          <Section title="雅思备考" items={ielts} />
          <Section title="个人中心" items={center} />
        </nav>
        <div className="shrink-0 p-3 border-t border-lavender-light">
          <Item item={{ to: '/settings', label: '设置', icon: SettingsIcon }} />
        </div>
      </aside>

      {/* 手机底部 Tab */}
      <nav className="mobile-tabbar lg:hidden fixed bottom-0 left-0 right-0 z-30 flex justify-around bg-white/95 backdrop-blur border-t border-lavender-light px-1 py-1" aria-label="移动端主导航">
        {mobilePrimary.map((item) => (
          <Item key={item.to} item={item} mobile />
        ))}
        <button
          type="button"
          onClick={() => setMobileMoreOpen((open) => !open)}
          aria-expanded={mobileMoreOpen}
          aria-controls="mobile-more-menu"
          className={`group relative flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[10px] transition ${mobileMoreOpen ? 'bg-lavender text-white' : 'text-gray-600 hover:bg-lavender-light/60'}`}
        >
          <MoreHorizontal size={20} />
          <span>更多</span>
        </button>
      </nav>

      {mobileMoreOpen ? (
        <div className="fixed inset-0 z-20 bg-black/20 lg:hidden" onClick={() => setMobileMoreOpen(false)}>
          <div
            id="mobile-more-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-more-title"
            className="mobile-more-panel absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <span id="mobile-more-title" className="font-semibold text-lavender-deep">更多功能</span>
              <button type="button" aria-label="关闭更多功能" onClick={() => setMobileMoreOpen(false)} className="rounded-full px-3 py-1 text-xs text-gray-500 hover:bg-cream">关闭</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mobileMore.map((item) => (
                <Item key={item.to} item={item} mobile onNavigate={() => setMobileMoreOpen(false)} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function Section({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <div className="px-3 mb-1 text-[11px] font-semibold tracking-wider text-lavender-deep/70 uppercase">
        {title}
      </div>
      <div className="space-y-1">
        {items.map((it) => (
          <Item key={it.to} item={it} />
        ))}
      </div>
    </div>
  )
}
