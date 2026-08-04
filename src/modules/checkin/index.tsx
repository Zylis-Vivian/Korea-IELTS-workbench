import { useState } from 'react'
import { PageHeader } from '../../components/Layout'
import { useStore, currentStreak } from '../../stores/useStore'
import { CalendarCheck, Flame } from 'lucide-react'

export default function Checkin() {
  const checkin = useStore((s) => s.checkin)
  const addCheckin = useStore((s) => s.addCheckin)
  const [justDone, setJustDone] = useState(false)

  const today = new Date().toISOString().slice(0, 10)
  const doneToday = !!checkin[today]
  const streak = currentStreak(checkin)

  // 当月日历
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const first = new Date(year, month, 1).getDay()
  const days = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]

  const onClick = () => {
    if (doneToday) return
    addCheckin()
    setJustDone(true)
    setTimeout(() => setJustDone(false), 1500)
  }

  return (
    <div className="fade-in">
      <PageHeader title="每日打卡" desc="坚持每天来学一会儿，养成学习习惯 🌸" />

      <div className="bg-white rounded-card shadow-card p-5 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Flame size={28} className="text-orange-500" />
          <div>
            <div className="text-2xl font-bold text-lavender-deep">{streak} 天</div>
            <div className="text-xs text-gray-400">连续打卡</div>
          </div>
        </div>
        <button
          onClick={onClick}
          disabled={doneToday}
          className={`px-5 py-2.5 rounded-full font-medium text-sm ${
            doneToday ? 'bg-mint/50 text-emerald-700' : 'bg-lavender text-white hover:bg-lavender-deep'
          }`}
        >
          {doneToday ? '今日已打卡 ✓' : '今日打卡'}
        </button>
      </div>
      {justDone && <div className="text-center text-emerald-600 text-sm mb-3">🎉 打卡成功！继续保持！</div>}

      <div className="bg-white rounded-card shadow-card p-5">
        <div className="text-sm font-medium text-lavender-deep mb-3">
          {year} 年 {month + 1} 月
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-1">
          {['日', '一', '二', '三', '四', '五', '六'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />
            const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
            const done = !!checkin[key]
            const isToday = key === today
            return (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                  done
                    ? 'bg-lavender text-white'
                    : isToday
                    ? 'bg-lavender-light text-lavender-deep'
                    : 'bg-cream text-gray-500'
                }`}
              >
                {done ? <CalendarCheck size={16} /> : d}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
