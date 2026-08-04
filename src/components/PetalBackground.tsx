import { useMemo } from 'react'

// 低性能消耗的薰衣草花瓣飘落背景
export default function PetalBackground({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 10,
        dur: 8 + Math.random() * 8,
        size: 10 + Math.random() * 12,
        emoji: i % 2 === 0 ? '🌸' : '💜',
      })),
    [count]
  )
  return (
    <div className="petal-bg">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
