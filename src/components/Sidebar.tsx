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
} from 'lucide-react'
import { useStore } from '../stores/useStore'

interface NavItem {
  to: string
  label: string
  icon: typeof Grid3x3
  dot?: boolean
}

const korean: NavItem[] = [
  { to: '/korean/alphabet', label: '四十音图', icon: Grid3x3 },
  { to: '/korean/daily', label: '每日学习', icon: CalendarDays },
  { to: '/korean/vocab', label: '词汇学习', icon: BookOpen },
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
  { to: '/dashboard', label: '学习仪表盘', icon: LayoutDashboard },
  { to: '/books', label: '教材中心', icon: BookOpen },
  { to: '/checkin', label: '每日打卡', icon: CalendarCheck },
]

function Item({ item, mobile }: { item: NavItem; mobile?: boolean }) {
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
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
          isActive
            ? 'bg-gradient-to-r from-lavender to-lavender-deep text-white shadow-soft'
            : 'text-gray-600 hover:bg-lavender-light/60'
        } ${mobile ? 'flex-col gap-0.5 py-1 text-[10px]' : ''}`
      }
    >
      {dot && (
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral" />
      )}
      <item.icon size={mobile ? 20 : 18} />
      <span className="truncate">{item.label}</span>
    </NavLink>
  )
}

export default function Sidebar() {
  const studyMinutes = useStore((s) => s.studyMinutes)
  const today = new Date().toISOString().slice(0, 10)
  const mins = studyMinutes[today] || 0
  const hh = Math.floor(mins / 60)
  const mm = mins % 60

  return (
    <>
      {/* PC / 平板侧栏 */}
      <aside className="hidden md:flex flex-col w-[260px] shrink-0 h-full bg-white/80 backdrop-blur border-r border-lavender-light">
        <div className="px-5 py-5 flex items-center gap-2 border-b border-lavender-light">
          <span className="text-2xl">🌸</span>
          <div>
            <div className="font-bold text-lavender-deep leading-tight">Lavender Study</div>
            <div className="text-[11px] text-gray-400">韩语 + 雅思双轨学习</div>
          </div>
        </div>
        <div className="px-5 py-2 text-xs text-gray-400">
          今日学习 {hh > 0 ? `${hh}h ` : ''}
          {mm}m
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-5">
          <Section title="韩语学习" items={korean} />
          <Section title="雅思备考" items={ielts} />
          <Section title="个人中心" items={center} />
        </nav>
        <div className="p-3 border-t border-lavender-light">
          <Item item={{ to: '/settings', label: '设置', icon: SettingsIcon }} />
        </div>
      </aside>

      {/* 手机底部 Tab */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex justify-around bg-white/95 backdrop-blur border-t border-lavender-light px-1 py-1">
        {[
          { to: '/korean/daily', label: '每日', icon: CalendarDays },
          { to: '/korean/alphabet', label: '发音', icon: Grid3x3 },
          { to: '/korean/vocab', label: '单词', icon: BookOpen },
          { to: '/ielts/vocab', label: '雅思', icon: BookOpen },
          { to: '/settings', label: '设置', icon: SettingsIcon },
        ].map(
          (it) => (
            <Item key={it.to} item={it} mobile />
          )
        )}
      </nav>
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
