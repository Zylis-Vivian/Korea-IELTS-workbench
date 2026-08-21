import { useMemo } from 'react'
import { PageHeader } from '../../components/Layout'
import { useStore, currentStreak } from '../../stores/useStore'
import { ALPHABET } from '../../data/alphabet'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Flame, Clock, BookmarkPlus, AlertCircle, CheckCircle2, Headphones, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { isDue } from '../../utils/review'
import { localDateKey } from '../../utils/localDate'

const COLORS = ['#A8E6CF', '#E6DFF5', '#FF8B94']

export default function Dashboard() {
  const mastery = useStore((s) => s.mastery)
  const studyMinutes = useStore((s) => s.studyMinutes)
  const checkin = useStore((s) => s.checkin)
  const wordbook = useStore((s) => s.wordbook)
  const wrongbook = useStore((s) => s.wrongbook)
  const reviewItems = useStore((s) => s.reviewItems)

  const today = localDateKey()
  const todayMin = studyMinutes[today] || 0

  const koWord = wordbook.filter((w) => w.category === 'korean').length
  const ieWord = wordbook.filter((w) => w.category === 'ielts').length
  const koWrong = wrongbook.filter((w) => w.category === 'korean').length
  const ieWrong = wrongbook.filter((w) => w.category === 'ielts').length

  const stat = { mastered: 0, learning: 0, unlearned: 0 }
  ALPHABET.forEach((s) => stat[mastery[s.char] || 'unlearned']++)
  const pieData = [
    { name: '已掌握', value: stat.mastered },
    { name: '学习中', value: stat.learning },
    { name: '未学', value: stat.unlearned },
  ]

  const weekData = useMemo(() => {
    const arr: { d: string; m: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const dt = new Date()
      dt.setDate(dt.getDate() - i)
      const key = localDateKey(dt)
      arr.push({ d: `${dt.getMonth() + 1}/${dt.getDate()}`, m: studyMinutes[key] || 0 })
    }
    return arr
  }, [studyMinutes])

  const streak = currentStreak(checkin)
  const dueCount = reviewItems.filter((item) => isDue(item)).length

  return (
    <div className="fade-in">
      <PageHeader title="学习仪表盘" desc="你的双轨学习数据总览 🌸" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Stat icon={<Clock size={18} />} label="今日学习" value={`${todayMin} 分`} color="text-lavender-deep" />
        <Stat icon={<Flame size={18} />} label="连续打卡" value={`${streak} 天`} color="text-orange-500" />
        <Stat icon={<BookmarkPlus size={18} />} label="单词本" value={`${wordbook.length}`} color="text-emerald-600" sub={`韩语 ${koWord} · 雅思 ${ieWord}`} />
        <Stat icon={<AlertCircle size={18} />} label="错题本" value={`${wrongbook.length}`} color="text-coral" sub={`韩语 ${koWrong} · 雅思 ${ieWrong}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-card shadow-card p-5">
          <div className="font-medium text-lavender-deep mb-3">四十音掌握进度</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-3 text-xs mt-2">
            <span>🟢 已掌握 {stat.mastered}</span>
            <span>🟣 学习中 {stat.learning}</span>
            <span>🔴 未学 {stat.unlearned}</span>
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-5">
          <div className="font-medium text-lavender-deep mb-3">近 7 天学习时长（分钟）</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weekData}>
              <XAxis dataKey="d" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="m" fill="#B19CD9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-center bg-gradient-to-r from-lavender-deep to-lavender rounded-card shadow-card p-5 text-white">
        <div>
          <div className="flex items-center gap-2 font-semibold"><Headphones size={18} /> 今日学习队列</div>
          <p className="mt-1 text-sm text-white/80">{dueCount ? `有 ${dueCount} 条内容到期，先复习再学新内容。` : '进入今日任务，系统会按记忆强度安排单词、句子和听力。'}</p>
        </div>
        <Link to="/review" className="inline-flex items-center justify-center gap-1 rounded-full bg-white px-4 py-2 text-sm text-lavender-deep hover:bg-cream">
          开始复习 <ArrowRight size={15} />
        </Link>
      </div>

      <div className="mt-5 bg-white rounded-card shadow-card p-5 flex items-center gap-3 text-sm text-gray-600">
        <CheckCircle2 size={18} className="text-emerald-500" />
        建议先完成「今日学习任务」，再回到「影子跟读」强化听读记忆；学习记录会自动保存在当前设备。
      </div>
    </div>
  )
}

function Stat({ icon, label, value, color, sub }: { icon: React.ReactNode; label: string; value: string; color: string; sub?: string }) {
  return (
    <div className="bg-white rounded-card shadow-card p-4 flex flex-col gap-1">
      <div className={`${color}`}>{icon}</div>
      <div className="text-xl font-bold text-gray-700">{value}</div>
      <div className="text-xs text-gray-400">{label}{sub ? `（${sub}）` : ''}</div>
    </div>
  )
}

