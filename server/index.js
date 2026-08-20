// server/index.js
// 发音后端服务：暴露受限的 POST /api/tts，并在生产环境托管打包后的前端 dist。
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import { createHash } from 'node:crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { synthesize } from './tts.js'

// 载入 .env（若存在），不报错
try {
  const { config } = await import('dotenv')
  config()
} catch {
  /* dotenv 可选 */
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
app.disable('x-powered-by')
if (process.env.TRUST_PROXY === '1') app.set('trust proxy', 1)

const configuredOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const devOrigins = process.env.NODE_ENV === 'production'
  ? []
  : ['http://localhost:5173', 'http://127.0.0.1:5173']
const allowedOrigins = new Set([...configuredOrigins, ...devOrigins])

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))
app.use(cors({
  origin(origin, callback) {
    // Requests without Origin are same-origin/server-to-server. Cross-origin callers must be allow-listed.
    callback(null, !origin || allowedOrigins.has(origin))
  },
}))
app.use(express.json({ limit: '16kb' }))

const ttsLimiter = rateLimit({
  windowMs: 60_000,
  limit: Number(process.env.TTS_RATE_LIMIT || 30),
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: '请求过于频繁，请稍后再试', code: 'RATE_LIMITED' },
})

const CACHE_TTL_MS = 60 * 60 * 1000
const CACHE_MAX_ENTRIES = 100
const audioCache = new Map()

function getCached(key) {
  const cached = audioCache.get(key)
  if (!cached) return null
  if (cached.expiresAt <= Date.now()) {
    audioCache.delete(key)
    return null
  }
  audioCache.delete(key)
  audioCache.set(key, cached)
  return cached.value
}

function setCached(key, value) {
  audioCache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS })
  while (audioCache.size > CACHE_MAX_ENTRIES) {
    const oldest = audioCache.keys().next().value
    audioCache.delete(oldest)
  }
}

function parseParams(req) {
  const q = req.body || {}
  const text = typeof q.text === 'string' ? q.text.trim() : ''
  const parsedSpeed = Number(q.speed ?? q.rate ?? 1)
  const speed = Number.isFinite(parsedSpeed) ? parsedSpeed : 1
  const voice = q.voice === 'male' ? 'male' : 'female'
  const engine = ['azure', 'google', 'auto'].includes(q.engine) ? q.engine : 'auto'
  return { text, speed, voice, engine }
}

app.post(['/api/tts', '/tts'], ttsLimiter, async (req, res) => {
  try {
    const { text, speed, voice, engine } = parseParams(req)
    if (!text) return res.status(400).json({ error: 'text 参数必填', code: 'INVALID_TEXT' })
    if (text.length > 500) {
      return res.status(400).json({ error: 'text 最多 500 个字符', code: 'TEXT_TOO_LONG' })
    }
    if (speed < 0.5 || speed > 2) {
      return res.status(400).json({ error: 'speed 必须在 0.5 到 2 之间', code: 'INVALID_SPEED' })
    }

    const cacheKey = createHash('sha256').update(JSON.stringify({ text, speed, voice, engine })).digest('hex')
    const cached = getCached(cacheKey)
    if (cached) {
      res.set('Content-Type', 'audio/mpeg')
      res.set('X-TTS-Engine', cached.engine)
      res.set('X-TTS-Cache', 'hit')
      res.set('Cache-Control', 'private, max-age=3600')
      return res.send(cached.audio)
    }

    const { audio, engine: used, format } = await synthesize(text, speed, voice, engine)
    const contentType = format === 'mp3' ? 'audio/mpeg' : 'audio/wav'
    setCached(cacheKey, { audio, engine: used })
    res.set('Content-Type', contentType)
    res.set('X-TTS-Engine', used)
    res.set('X-TTS-Cache', 'miss')
    res.set('Cache-Control', 'private, max-age=3600')
    res.send(audio)
  } catch (e) {
    console.error('[TTS] synthesis failed:', e instanceof Error ? e.message : e)
    res.status(502).json({ error: '语音服务暂时不可用', code: 'TTS_UNAVAILABLE', engine: 'none' })
  }
})

app.get(['/api/tts/health', '/tts/health'], (_req, res) => {
  res.json({
    ok: true,
    azure: !!(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION),
    google: !!process.env.GOOGLE_TTS_API_KEY,
  })
})

// 生产环境：托管前端 dist（npm run build 之后）
const dist = path.join(__dirname, '..', 'dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: 'not found' })
    res.sendFile(path.join(dist, 'index.html'))
  })
}

const PORT = process.env.PORT || 8787
export { app }

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`🌸 TTS 后端已启动: http://localhost:${PORT}`)
    console.log(`   Azure: ${process.env.AZURE_SPEECH_KEY ? '已配置' : '未配置(跳过)'}`)
    console.log(`   Google: ${process.env.GOOGLE_TTS_API_KEY ? '已配置' : '未配置(跳过)'}`)
  })
}
