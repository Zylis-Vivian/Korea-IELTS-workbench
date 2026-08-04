import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 暴露局域网 host，方便手机同 WiFi 访问
// 开发模式下将 /api 代理到本地 TTS 后端（默认 8787）
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
})
