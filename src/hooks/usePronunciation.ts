// src/hooks/usePronunciation.ts
// 发音播放核心 hook。韩语发音管线（优先级）：
//   0) 预生成本地音频（首选，100% 可用）：构建期用 Edge TTS 把各模块韩文串合成为 MP3 打包进站点，
//      浏览器直接播放同域静态文件，不依赖运行时网络 / 系统韩文语音 / 后端，保证“点击即出声、绝不静默”。
//   1) 后端 /api/tts：Azure Neural TTS（首选）→ Google Cloud TTS（备选），
//      密钥来自服务端环境变量 AZURE_SPEECH_KEY / AZURE_SPEECH_REGION / GOOGLE_TTS_API_KEY
//      （需本地 `npm start` 带 .env 或环境变量启动 server/index.js）。
//   2) 微软 Edge 在线 TTS（keyless，浏览器原生 WebSocket + Web Crypto）：
//      韩文神经网络语音 ko-KR-SunHiNeural / ko-KR-InJoonNeural，与 Azure 同源、同为标准首尔音；
//      且在中国大陆可访问，云端静态托管（无后端）也能用。
//   3) 浏览器 Web Speech API（兜底）：显式 utterance.lang='ko-KR'，
//      在用户 click 同步上下文内先 cancel 再 speak，需系统装有韩文语音。
// 句子/短语（含空格）先做韩语音变预处理；单词与单个字母不做音变。
// 非韩语（如英语）直接走 Web Speech。
import { useCallback } from 'react'
import { useStore } from '../stores/useStore'
import { applyPhoneticsIfNeeded } from '../utils/koreanPhonetics'
import { getCachedAudio, cacheAudio } from '../utils/pronunciationCache'
// synthEdge 改为动态导入（避免 edge-tts-universal 在模块加载时触发 TDZ 崩溃）
// 仅在用户点击发音、走到 Edge TTS 兜底路径时才加载
import { hasKoreanVoice } from '../components/SpeakerButton'

export type TtsEngine = 'auto' | 'azure' | 'google' | 'edge' | 'web'
export type TtsGender = 'female' | 'male'

export type SpeakResult = 'local' | 'azure' | 'google' | 'edge' | 'web' | 'web-fallback' | 'failed'

// 预加载浏览器语音列表：Web Speech 的 getVoices() 首次调用常为空，
// 需监听 voiceschanged 事件后才会填充，否则韩语会“静默失败”。
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const loadVoices = () => {
    try {
      window.speechSynthesis.getVoices()
    } catch {
      /* ignore */
    }
  }
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
}

// ── 预生成音频 manifest（懒加载，仅一次） ──
// 必须在调用 loadManifest() 之前声明，否则 let 的 TDZ 会在模块加载时抛错导致整页白屏
let manifestPromise: Promise<Record<string, string>> | null = null
function loadManifest(): Promise<Record<string, string>> {
  if (!manifestPromise) {
    manifestPromise = fetch('/audio/ko/manifest.json')
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({} as Record<string, string>))
  }
  return manifestPromise
}

// 应用启动即预取本地音频 manifest（仅一次），确保首次点击时无需等待网络，
// 直接命中本地 MP3 播放，规避浏览器“用户手势后异步播放被拦截”的风险。
if (typeof window !== 'undefined') {
  void loadManifest()
}

function pickVoice(lang = 'ko-KR'): SpeechSynthesisVoice | undefined {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return undefined
  // 优先精确匹配 ko-KR，其次同语言代码，最后同语种前缀
  return (
    voices.find((v) => v.lang === lang) ||
    voices.find((v) => v.lang.toLowerCase() === lang.toLowerCase()) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()))
  )
}

function webSpeak(text: string, lang = 'ko-KR', speed = 1) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('[发音] 当前环境不支持 Web Speech API，无法播放兜底发音')
    return
  }
  const synth = window.speechSynthesis
  synth.cancel() // 先取消，避免队列堆积导致“静默 / 只播最后一条”
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang // 显式设置为韩语（标准首尔音由系统/引擎决定）
  u.rate = speed
  const v = pickVoice(lang)
  if (v) u.voice = v
  synth.speak(u) // 在用户 click 同步上下文中调用
}

function playUrl(url: string): Promise<void> {
  return new Promise((resolve) => {
    const audio = new Audio(url)
    audio.onended = () => resolve()
    audio.onerror = () => resolve()
    audio.play().catch(() => resolve())
  })
}

function playBlob(blob: Blob) {
  const url = URL.createObjectURL(blob)
  const audio = new Audio(url)
  audio.onended = () => URL.revokeObjectURL(url)
  audio.play().catch(() => URL.revokeObjectURL(url))
}

// 轻量提示（发音彻底失败时给出可见反馈，避免“静默失败”让用户以为坏了）
function toast(msg: string) {
  try {
    if (typeof document === 'undefined') return
    const el = document.createElement('div')
    el.textContent = msg
    el.style.cssText =
      'position:fixed;left:50%;bottom:84px;transform:translateX(-50%);background:#7c3aed;color:#fff;' +
      'padding:10px 16px;border-radius:999px;font-size:13px;z-index:9999;box-shadow:0 6px 18px rgba(124,58,237,.35);max-width:90vw;text-align:center'
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 3600)
  } catch {
    /* ignore */
  }
}

async function fetchTts(
  text: string,
  engine: TtsEngine,
  voice: TtsGender,
  speed: number
): Promise<{ blob: Blob; used: string }> {
  const url = `/api/tts?engine=${encodeURIComponent(engine)}&voice=${encodeURIComponent(
    voice
  )}&speed=${encodeURIComponent(String(speed))}&text=${encodeURIComponent(text)}`
  const res = await fetch(url)
  const ct = res.headers.get('Content-Type') || ''
  if (!res.ok || !ct.includes('audio')) {
    throw new Error(`后端不可用 (${res.status}, ${ct})`)
  }
  const blob = await res.blob()
  const used = res.headers.get('X-TTS-Engine') || engine
  return { blob, used }
}

export function usePronunciation() {
  const ttsEngine = useStore((s) => s.settings.ttsEngine)
  const ttsGender = useStore((s) => s.settings.ttsGender)
  const ttsSpeed = useStore((s) => s.settings.ttsSpeed)
  const setPronStatus = useStore((s) => s.setPronStatus)

  const speak = useCallback(
    async (text: string, opts: { lang?: string; voice?: TtsGender; speed?: number; forceEngine?: TtsEngine } = {}): Promise<SpeakResult> => {
      const lang = opts.lang || 'ko-KR'
      const voice = opts.voice || ttsGender
      const speed = opts.speed ?? ttsSpeed
      const engine = opts.forceEngine || ttsEngine

      // 非韩语 → 直接 Web Speech
      if (!lang.toLowerCase().startsWith('ko')) {
        webSpeak(text, lang, speed)
        return 'web'
      }

      // 韩语：句子/短语先做音变预处理（单词与单字母自动跳过）；并 trim 以对齐音频 manifest 键名
      const ttsText = applyPhoneticsIfNeeded(text.trim())

      try {
        // 0) 预生成本地音频（同域 MP3，标准首尔音，优先且最稳）
        const manifest = await loadManifest()
        const file = manifest[ttsText]
        if (file) {
          setPronStatus({ level: 'green', activeEngine: '本地音频(标准首尔音)' })
          await playUrl(`/audio/ko/${file}`)
          return 'local'
        }

        // 强制 Web Speech（最轻量，需系统韩文语音）
        if (engine === 'web') {
          webSpeak(ttsText, 'ko-KR', speed)
          return 'web'
        }

        // 命中缓存（后端或 Edge 生成的音频 blob，记录来源引擎）
        const cacheKey = `${engine}:${voice}:${speed}:${ttsText}`
        const cached = await getCachedAudio(cacheKey)
        if (cached) {
          playBlob(cached.blob)
          setPronStatus({ level: 'green', activeEngine: cached.engine || '缓存音频' })
          return (cached.engine as SpeakResult) || 'azure'
        }

        // 1) 后端 /api/tts（本地 npm start 带密钥时可用，Azure/Google 神经网络语音，标准首尔音）
        if (engine !== 'edge') {
          try {
            const { blob, used } = await fetchTts(ttsText, engine, voice, speed)
            playBlob(blob)
            void cacheAudio(cacheKey, blob, used)
            setPronStatus({ level: 'green', activeEngine: used })
            return used as SpeakResult
          } catch {
            // 后端不可用 → 落到 Edge TTS
          }
        }

        // 2) Edge 在线 TTS（keyless，浏览器原生；云端/无后端也能用，同样标准首尔音）
        try {
          const { synthEdge: _synthEdge } = await import('../utils/edgeTts')
          const blob = await _synthEdge(ttsText, voice, speed)
          playBlob(blob)
          void cacheAudio(cacheKey, blob, 'edge')
          setPronStatus({ level: 'green', activeEngine: 'Edge TTS' })
          return 'edge' as SpeakResult
        } catch {
          // 3) 最后降级到浏览器 Web Speech（需系统装有韩文语音）
          webSpeak(ttsText, 'ko-KR', speed)
          setPronStatus({
            level: hasKoreanVoice() ? 'yellow' : 'red',
            activeEngine: hasKoreanVoice() ? 'Web Speech' : '无可用韩文语音',
          })
          return 'web-fallback'
        }
      } catch {
        // 任何意外异常都尽量用 Web Speech 兜底
        webSpeak(ttsText, 'ko-KR', speed)
        return 'web-fallback'
      }
    },
    [ttsEngine, ttsGender, ttsSpeed, setPronStatus]
  )

  return { speak }
}
