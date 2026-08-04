// src/utils/edgeTts.ts
// 微软 Edge 在线 TTS（keyless，浏览器原生 WebSocket + Web Crypto）。
// 特点：
//   - 无需 API Key、无需自建后端；
//   - 在中国大陆可访问（Bing 服务，不像 Google TTS 被墙）；
//   - 支持韩文神经网络语音 ko-KR-SunHiNeural(女) / ko-KR-InJoonNeural(男)。
// 作为「云端无后端 / 系统无韩文语音」时的关键兜底，保证韩语发音可正常播放。
// 注意：依赖 Web Crypto（crypto.subtle），仅在安全上下文（https 或 localhost）可用；
// 非安全上下文（如 http://局域网IP）会自动降级到 Web Speech。
// EdgeTTS 改为动态导入（避免在模块加载时触发 TDZ 崩溃）
// 仅在 synthEdge() 被调用时才加载 edge-tts-universal/browser
let _edgeTtsModule: typeof import('edge-tts-universal/browser') | null = null
async function getEdgeTts() {
  if (!_edgeTtsModule) {
    _edgeTtsModule = await import('edge-tts-universal/browser')
  }
  return _edgeTtsModule
}

export type EdgeVoice = 'ko-KR-SunHiNeural' | 'ko-KR-InJoonNeural'

export function edgeVoiceFor(gender: 'female' | 'male'): EdgeVoice {
  return gender === 'male' ? 'ko-KR-InJoonNeural' : 'ko-KR-SunHiNeural'
}

// Edge 的 prosody rate 用带符号的百分比字符串（必须含 +/-，正则 ^[+-]\d+%$），如 +0% / -10% / +20%
function edgeRate(speed: number): string {
  const pct = Math.round((speed - 1) * 100)
  const sign = pct >= 0 ? '+' : '-'
  return `${sign}${Math.abs(pct)}%`
}

export function edgeTtsSupported(): boolean {
  return typeof window !== 'undefined' && !!window.crypto && !!window.crypto.subtle
}

// 合成韩文语音，返回 mp3 Blob；任何失败都向外抛出，交由上层继续降级
export async function synthEdge(text: string, gender: 'female' | 'male', speed: number): Promise<Blob> {
  if (!edgeTtsSupported()) throw new Error('当前环境不支持 Web Crypto（非安全上下文）')
  const { EdgeTTS } = await getEdgeTts()
  const tts = new EdgeTTS(text, edgeVoiceFor(gender), { rate: edgeRate(speed) })
  const res = await tts.synthesize()
  if (!res.audio || res.audio.size === 0) throw new Error('Edge TTS 返回空音频')
  return res.audio
}
