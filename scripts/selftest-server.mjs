import { app } from '../server/index.js'

const server = app.listen(0, '127.0.0.1')
await new Promise((resolve) => server.once('listening', resolve))
const address = server.address()
const base = `http://127.0.0.1:${address.port}`

let failures = 0
async function check(name, condition, detail = '') {
  if (condition) {
    console.log(`  PASS  ${name}${detail ? ` — ${detail}` : ''}`)
  } else {
    failures++
    console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`)
  }
}

try {
  const health = await fetch(`${base}/api/tts/health`)
  await check('健康检查可用', health.status === 200)
  await check('隐藏 Express 标识', !health.headers.has('x-powered-by'))
  await check('安全响应头已启用', health.headers.get('x-content-type-options') === 'nosniff')

  const getTts = await fetch(`${base}/api/tts?text=test`)
  await check('TTS 不接受 GET', getTts.status === 404)

  const empty = await fetch(`${base}/api/tts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: '' }),
  })
  await check('拒绝空文本', empty.status === 400)

  const invalidSpeed = await fetch(`${base}/api/tts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: '안녕하세요', speed: 5 }),
  })
  await check('拒绝越界语速', invalidSpeed.status === 400)

  const tooLong = await fetch(`${base}/api/tts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: '가'.repeat(501) }),
  })
  await check('拒绝超长文本', tooLong.status === 400)

  const crossOrigin = await fetch(`${base}/api/tts/health`, {
    headers: { Origin: 'https://untrusted.example' },
  })
  await check('不授权未知跨域来源', !crossOrigin.headers.has('access-control-allow-origin'))
} finally {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
}

if (failures > 0) process.exit(1)
