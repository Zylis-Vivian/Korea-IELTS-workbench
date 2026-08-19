// Vercel Serverless Function 入口。
// 通过独立 /api 入口托管同一份 Express 应用，不需要上传任何 TTS 密钥。
import { app } from '../server/index.js'

export default app
