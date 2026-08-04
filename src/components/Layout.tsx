import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useStore } from '../stores/useStore'

// 内容区容器：顶部标题栏 + 距离底部 Tab 的留白（手机）
// 每次切换模块自动累计约 1 分钟学习时长（用于仪表盘统计）
export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const addStudyMinutes = useStore((s) => s.addStudyMinutes)

  useEffect(() => {
    addStudyMinutes(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <div className="min-h-full px-4 sm:px-6 py-5 pb-24 md:pb-6 max-w-5xl mx-auto">
      {children}
    </div>
  )
}

export function PageHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-bold text-lavender-deep">{title}</h1>
      {desc && <p className="text-sm text-gray-500 mt-1">{desc}</p>}
    </div>
  )
}
