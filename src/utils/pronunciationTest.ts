// src/utils/pronunciationTest.ts
// 发音方案轻量健康检查：只读取后端配置和本地浏览器能力，不合成音频、不产生付费调用。
// 真正的音频合成只在用户点击发音时发生。

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

async function checkBackendHealth(): Promise<{ azure: EngineResult; google: EngineResult }> {
  const start = performance.now()
  try {
    const res = await fetch('/api/tts/health')
    const timeMs = Math.round(performance.now() - start)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const health = (await res.json()) as { azure?: boolean; google?: boolean }
    return {
      azure: { engine: 'azure', ok: !!health.azure, timeMs, error: health.azure ? undefined : '后端未配置' },
      google: { engine: 'google', ok: !!health.google, timeMs, error: health.google ? undefined : '后端未配置' },
    }
  } catch (e) {
    const timeMs = Math.round(performance.now() - start)
    const error = (e as Error).message
    return {
      azure: { engine: 'azure', ok: false, timeMs, error },
      google: { engine: 'google', ok: false, timeMs, error },
    }
  }
}

async function checkEdgeCapability(): Promise<EngineResult> {
  const start = performance.now()
  try {
    const { edgeTtsSupported } = await import('./edgeTts')
    const timeMs = Math.round(performance.now() - start)
    const ok = edgeTtsSupported()
    return { engine: 'edge', ok, timeMs, error: ok ? undefined : '非安全上下文(需 https/localhost)' }
  } catch (e) {
    return { engine: 'edge', ok: false, timeMs: Math.round(performance.now() - start), error: (e as Error).message }
  }
}

export async function runPronunciationTest(): Promise<TestReport> {
  const [backend, edge, webVoices] = await Promise.all([
    checkBackendHealth(),
    checkEdgeCapability(),
    getWebVoices(),
  ])
  const { azure, google } = backend

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
