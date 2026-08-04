// src/utils/pronunciationTest.ts
// 发音方案自动测试：Azure / Google / Edge(在线) / Web Speech API，异步执行，不阻塞 UI。
// 在控制台打印报告，并返回结构化结果供状态指示器/设置面板使用。

import { synthEdge, edgeTtsSupported } from './edgeTts'

export interface EngineResult {
  engine: 'azure' | 'google' | 'edge'
  ok: boolean
  timeMs?: number
  error?: string
}

export interface WebResult {
  available: boolean
  koVoice: boolean
  voices: string[]
}

export interface TestReport {
  azure: EngineResult
  google: EngineResult
  edge: EngineResult
  web: WebResult
  timestamp: number
}

function getWebVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return resolve([])
    const vs = window.speechSynthesis.getVoices()
    if (vs.length) return resolve(vs)
    const onChanged = () => {
      resolve(window.speechSynthesis.getVoices())
      window.speechSynthesis.removeEventListener('voiceschanged', onChanged)
    }
    window.speechSynthesis.addEventListener('voiceschanged', onChanged)
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1500)
  })
}

async function testBackend(engine: 'azure' | 'google'): Promise<EngineResult> {
  const start = performance.now()
  try {
    const url = `/api/tts?engine=${engine}&text=${encodeURIComponent('안녕하세요')}&speed=0.8`
    const res = await fetch(url)
    const ct = res.headers.get('Content-Type') || ''
    const timeMs = Math.round(performance.now() - start)
    if (res.ok && ct.includes('audio')) {
      // 消费响应体，避免连接挂起
      await res.arrayBuffer().catch(() => {})
      return { engine, ok: true, timeMs }
    }
    const body = await res.json().catch(() => ({}))
    return { engine, ok: false, timeMs, error: body?.error || `HTTP ${res.status}` }
  } catch (e) {
    return { engine, ok: false, timeMs: Math.round(performance.now() - start), error: (e as Error).message }
  }
}

async function testEdge(): Promise<EngineResult> {
  const start = performance.now()
  if (!edgeTtsSupported()) {
    return { engine: 'edge', ok: false, timeMs: 0, error: '非安全上下文(需 https/localhost)' }
  }
  try {
    const blob = await synthEdge('안녕하세요', 'female', 1)
    const timeMs = Math.round(performance.now() - start)
    if (blob && blob.size > 0) return { engine: 'edge', ok: true, timeMs }
    return { engine: 'edge', ok: false, timeMs, error: '返回空音频' }
  } catch (e) {
    return { engine: 'edge', ok: false, timeMs: Math.round(performance.now() - start), error: (e as Error).message }
  }
}

export async function runPronunciationTest(): Promise<TestReport> {
  const [azure, google, edge, webVoices] = await Promise.all([
    testBackend('azure'),
    testBackend('google'),
    testEdge(),
    getWebVoices(),
  ])

  const web: WebResult = {
    available: typeof window !== 'undefined' && 'speechSynthesis' in window,
    koVoice: webVoices.some((v) => v.lang.toLowerCase().startsWith('ko')),
    voices: webVoices.map((v) => `${v.name} (${v.lang})`),
  }

  const report: TestReport = { azure, google, edge, web, timestamp: Date.now() }
  printReport(report)
  return report
}

// 控制台报告格式
export function printReport(r: TestReport) {
  const t = (ms?: number) => (ms != null ? `${ms}ms` : '-')
  const line = (ok: boolean) => (ok ? '✅ 可用' : '❌ 不可用')
  console.log(
    `%c🌸 发音方案测试报告 ${new Date(r.timestamp).toLocaleString()}`,
    'color:#7c5fb3;font-weight:bold'
  )
  console.log(`[Azure TTS]   ${line(r.azure.ok)}  ${r.azure.ok ? t(r.azure.timeMs) : r.azure.error || ''}`)
  console.log(`[Google TTS]  ${line(r.google.ok)}  ${r.google.ok ? t(r.google.timeMs) : r.google.error || ''}`)
  console.log(`[Edge TTS]    ${line(r.edge.ok)}  ${r.edge.ok ? t(r.edge.timeMs) : r.edge.error || ''}`)
  console.log(`[Web Speech]  ${r.web.available ? '✅ 可用' : '❌ 不可用'}  韩语语音: ${r.web.koVoice ? '有' : '无'}`)
  if (r.web.voices.length) {
    console.log('  可用语音列表:')
    r.web.voices.forEach((v) => console.log('   - ' + v))
  }
  const active = r.azure.ok
    ? 'Azure TTS (ko-KR-SunHiNeural / ko-KR-InJoonNeural)'
    : r.google.ok
      ? 'Google TTS (ko-KR-Neural2-A)'
      : r.edge.ok
        ? 'Edge TTS (微软在线, 免密钥, 标准首尔音)'
        : r.web.koVoice
          ? 'Web Speech API (ko-KR)'
          : '无可用韩文语音'
  console.log(`=> 当前生效引擎: ${active}`)
  console.log('发音标准: 标准首尔音 (Seoul standard)，参考外研社U校园《韩国语语音入门》/ 首尔大学语音体系')
  console.log('链路口径: Azure → Google → Edge(在线) → Web Speech；云端无后端时由 Edge 提供标准首尔音')
}
