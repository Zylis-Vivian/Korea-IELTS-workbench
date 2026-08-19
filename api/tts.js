// Vercel Function：固定映射 /api/tts，复用受限的 Express TTS 路由。
import { app } from '../server/index.js'

export default function handler(req, res) {
  const query = typeof req.url === 'string' && req.url.includes('?')
    ? req.url.slice(req.url.indexOf('?'))
    : ''
  req.url = `/api/tts${query}`
  return app(req, res)
}
