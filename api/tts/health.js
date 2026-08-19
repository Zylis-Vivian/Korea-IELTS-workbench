// Vercel Function：健康检查不触发 TTS 合成，也不读取或上传任何密钥。
export default function handler(_req, res) {
  res.status(200).json({
    ok: true,
    azure: Boolean(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION),
    google: Boolean(process.env.GOOGLE_TTS_API_KEY),
  })
}
