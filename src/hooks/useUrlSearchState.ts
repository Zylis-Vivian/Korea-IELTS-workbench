import { useEffect, useState } from 'react'

/**
 * 保留搜索词到当前路由的 query string，刷新页面或从复习队列返回时仍能回到原来的上下文。
 * 直接使用 history.replaceState，避免把每次输入变成浏览器历史记录；SSR/静态自测环境没有 window 时回退为空值。
 */
export default function useUrlSearchState(key: string, defaultValue = ''): [string, (value: string) => void] {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return defaultValue
    return new URLSearchParams(window.location.search).get(key) || defaultValue
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    const normalized = value.trim()
    if (normalized) url.searchParams.set(key, value)
    else url.searchParams.delete(key)
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
  }, [key, value])

  return [value, setValue]
}
