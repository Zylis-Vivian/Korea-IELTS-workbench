import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const exists = (file) => fs.existsSync(path.join(root, file))
const manifest = JSON.parse(read('public/manifest.webmanifest'))
const index = read('index.html')
const sw = read('public/sw.js')
const sidebar = read('src/components/Sidebar.tsx')
const yonsei = read('src/modules/korean-yonsei/index.tsx')
const pronunciation = read('src/hooks/usePronunciation.ts')
const vercel = read('vercel.json')

const checks = [
  ['manifest display=standalone', manifest.display === 'standalone'],
  ['manifest scope/start_url', manifest.scope === '/' && manifest.start_url === '/'],
  ['manifest has installable icon', manifest.icons?.some((icon) => icon.src.includes('lavender-study')) === true],
  ['JPEG/ SVG icon files exist', exists('public/icons/lavender-study.jpg') && exists('public/icons/lavender-study.svg')],
  ['index links manifest', index.includes('rel="manifest"')],
  ['index has iOS safe viewport', index.includes('viewport-fit=cover')],
  ['index links apple touch icon', index.includes('apple-touch-icon')],
  ['service worker caches shell', sw.includes('lavender-study-shell-v3') && sw.includes("/audio/ko/manifest.json?v=3") && sw.includes("request.mode === 'navigate'")],
  ['service worker supports updates', sw.includes('SKIP_WAITING')],
  ['Vercel API entries exist', exists('api/tts.js') && exists('api/tts/health.js') && read('api/tts.js').includes("../server/index.js")],
  ['Vercel SPA rewrite keeps API paths', vercel.includes('"rewrites"') && vercel.includes('"destination": "/index.html"') && vercel.includes('(?!api')],
  ['mobile primary nav includes review loop', ['/review', '/dictation', '/shadowing'].every((route) => sidebar.includes(`to: '${route}'`))],
  ['Yonsei unit shadowing stays on the vocabulary page', yonsei.includes('页内跟读本单元') && !yonsei.includes('to={`/shadowing?source=yonsei')],
  ['local MP3 uses the shared controllable player', pronunciation.includes('playAudioUrl(yonseiAudioUrl(file), speed)') && pronunciation.includes('stopAudioPlayback')],
]

let failed = 0
for (const [label, ok] of checks) {
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${label}`)
  if (!ok) failed++
}
console.log(`\n════ PWA 自测：${checks.length - failed} 通过 / ${failed} 失败 ════`)
if (failed) process.exit(1)
