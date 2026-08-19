import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// 默认仅监听本机；需要手机同 WiFi 调试时显式设置 LAN_DEV=1。
// 开发模式下将 /api 代理到本地 TTS 后端（默认 8787）
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    build: {
      sourcemap: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/pdfjs-dist')) return 'pdf'
            if (id.includes('node_modules/recharts')) return 'charts'
            if (id.includes('node_modules/framer-motion')) return 'motion'
          },
        },
      },
    },
    server: {
      host: env.LAN_DEV === '1' ? true : '127.0.0.1',
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:8787',
          changeOrigin: true,
        },
      },
    },
    preview: {
      host: '127.0.0.1',
      port: 4173,
    },
  }
})
