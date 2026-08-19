// server/tts.js
// 多方案 TTS 合成：Azure Neural TTS（首选）→ Google Cloud TTS（备选）
// 所有密钥均来自环境变量，绝不硬编码。
// 若某方案缺少环境变量，则该方案被跳过（返回 null），由调用方决定降级。

// 语音名称常量
export const AZURE_VOICES = {
  female: 'ko-KR-SunHiNeural',
  male: 'ko-KR-InJoonNeural',
}
export const GOOGLE_VOICE = 'ko-KR-Neural2-A'
const UPSTREAM_TIMEOUT_MS = Number(process.env.TTS_TIMEOUT_MS || 10_000)

async function fetchWithTimeout(url, options) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`上游 TTS 请求超过 ${UPSTREAM_TIMEOUT_MS}ms`)
    }
    throw error
  } finally {
    clearTimeout(timer)
  }
}

// 将 speed（0.5~2）映射为 Azure SSML 可识别的 rate 表达式
function azureRate(speed) {
  // Azure 接受相对值（如 "0.8"）或命名（slow/medium/fast/x-slow）
  // 这里直接用相对数字字符串，最贴近原 speed
  return String(speed)
}

function buildAzureSSML(text, voiceName, speed) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ko-KR">
  <voice name="${voiceName}">
    <prosody rate="${azureRate(speed)}">${escapeXml(text)}</prosody>
  </voice>
</speak>`
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// ---------- Azure Neural TTS ----------
// 无环境变量 → 返回 null（跳过）
export async function synthAzure(text, voice = 'female', speed = 1) {
  const key = process.env.AZURE_SPEECH_KEY
  const region = process.env.AZURE_SPEECH_REGION
  if (!key || !region) return null
  const url = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`
  const voiceName = AZURE_VOICES[voice] || AZURE_VOICES.female
  const res = await fetchWithTimeout(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
    },
    body: buildAzureSSML(text, voiceName, speed),
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(`Azure TTS 失败: HTTP ${res.status} ${msg.slice(0, 120)}`)
  }
  return Buffer.from(await res.arrayBuffer())
}

// ---------- Google Cloud TTS ----------
// 无环境变量 → 返回 null（跳过）
export async function synthGoogle(text, voice = 'ko-KR-Neural2-A', speed = 1) {
  const apiKey = process.env.GOOGLE_TTS_API_KEY
  if (!apiKey) return null
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`
  const body = {
    input: { text },
    voice: { languageCode: 'ko-KR', name: voice },
    audioConfig: { audioEncoding: 'MP3', speakingRate: speed },
  }
  const res = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(`Google TTS 失败: HTTP ${res.status} ${msg.slice(0, 120)}`)
  }
  const json = await res.json()
  if (!json.audioContent) throw new Error('Google TTS 返回空音频')
  return Buffer.from(json.audioContent, 'base64')
}

// ---------- 统一入口 ----------
// engine: 'auto' | 'azure' | 'google'
// 返回 { audio: Buffer, engine: 'azure'|'google', format: 'mp3' }
export async function synthesize(text, speed = 1, voice = 'female', engine = 'auto') {
  if (engine === 'azure') {
    const buf = await synthAzure(text, voice, speed)
    if (!buf) throw new Error('Azure 方案不可用：缺少 AZURE_SPEECH_KEY / AZURE_SPEECH_REGION 环境变量')
    return { audio: buf, engine: 'azure', format: 'mp3' }
  }
  if (engine === 'google') {
    const buf = await synthGoogle(text, GOOGLE_VOICE, speed)
    if (!buf) throw new Error('Google 方案不可用：缺少 GOOGLE_TTS_API_KEY 环境变量')
    return { audio: buf, engine: 'google', format: 'mp3' }
  }

  // auto：依次尝试 Azure → Google
  try {
    const buf = await synthAzure(text, voice, speed)
    if (buf) return { audio: buf, engine: 'azure', format: 'mp3' }
  } catch (e) {
    console.warn('[TTS] Azure 尝试失败，降级 Google：', e.message)
  }
  try {
    const buf = await synthGoogle(text, GOOGLE_VOICE, speed)
    if (buf) return { audio: buf, engine: 'google', format: 'mp3' }
  } catch (e) {
    console.warn('[TTS] Google 尝试失败：', e.message)
  }
  throw new Error('所有后端 TTS 方案均不可用（Azure/Google 缺少密钥或调用失败），请使用 Web Speech API 兜底。')
}
