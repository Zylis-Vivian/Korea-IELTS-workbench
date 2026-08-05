// 每日刷词工具：基于日期的确定性选词（无需后端，换天自动更新）
// 思路：用「日期字符串」做随机种子对全量词表做 Fisher-Yates 洗牌，
// 取出前 N 个作为当天词表。同一天结果稳定，跨天自然变化。

export function todayStr(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// FNV-1a 字符串哈希 -> 32 位无符号整数
function hashStr(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// mulberry32：小巧的确定性伪随机数发生器
function mulberry32(seed: number) {
  let a = seed >>> 0
  return function () {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = arr.slice()
  const rand = mulberry32(seed)
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 取某天的确定性词表（前 count 个）
export function getDailyWords<T>(all: T[], dateStr: string, count: number): T[] {
  const seed = hashStr('korean-daily-v1-' + dateStr)
  const shuffled = seededShuffle(all, seed)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// 统计某天词表的完成情况
export function getDailyProgress(
  dailyState: Record<string, Record<string, 'known' | 'unknown'>>,
  dateStr: string,
  words: { korean: string }[]
): { done: number; known: number; unknown: number; total: number } {
  const day = dailyState[dateStr] || {}
  let known = 0
  let unknown = 0
  let done = 0
  for (const w of words) {
    const st = day[w.korean]
    if (st === 'known') {
      known++
      done++
    } else if (st === 'unknown') {
      unknown++
      done++
    }
  }
  return { done, known, unknown, total: words.length }
}
