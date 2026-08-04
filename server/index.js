// server/index.js
// 发音后端服务：暴露 /api/tts（GET + POST），并在生产环境托管打包后的前端 dist。
import express from 'express'
import cors from 'cors'
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
app.use(cors())
app.use(express.json())

function parseParams(req) {
  const q = req.method === 'GET' ? req.query : req.body || {}
  const text = typeof q.text === 'string' ? q.text : ''
  const speed = parseFloat(q.speed ?? q.rate ?? '1') || 1
  const voice = q.voice === 'male' ? 'male' : 'female'
  const engine = ['azure', 'google', 'auto'].includes(q.engine) ? q.engine : 'auto'
  return { text, speed, voice, engine }
}

// 统一处理 TTS 请求（GET 便于测试：/api/tts?text=안녕하세요&speed=0.8&engine=auto）
app.all('/api/tts', async (req, res) => {
  try {
    const { text, speed, voice, engine } = parseParams(req)
    if (!text) return res.status(400).json({ error: 'text 参数必填' })
    const { audio, engine: used, format } = await synthesize(text, speed, voice, engine)
    const contentType = format === 'mp3' ? 'audio/mpeg' : 'audio/wav'
    res.set('Content-Type', contentType)
    res.set('X-TTS-Engine', used)
    res.set('Cache-Control', 'public, max-age=604800')
    res.send(audio)
  } catch (e) {
    res.status(502).json({ error: e.message, engine: 'none' })
  }
})

app.get('/api/tts/health', (_req, res) => {
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
app.listen(PORT, () => {
  console.log(`🌸 TTS 后端已启动: http://localhost:${PORT}`)
  console.log(`   Azure: ${process.env.AZURE_SPEECH_KEY ? '已配置' : '未配置(跳过)'}`)
  console.log(`   Google: ${process.env.GOOGLE_TTS_API_KEY ? '已配置' : '未配置(跳过)'}`)
})
