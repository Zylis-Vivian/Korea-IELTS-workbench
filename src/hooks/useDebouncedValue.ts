import { useEffect, useState } from 'react'

/**
 * 延迟提交输入值，避免大词库在每次按键时都重新筛选和分页。
 * delay 只影响筛选值，不会阻塞输入框本身的即时回显。
 */
export default function useDebouncedValue<T>(value: T, delay = 180): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(timer)
  }, [delay, value])

  return debounced
}
