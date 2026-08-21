import { applyPhoneticsIfNeeded } from './koreanPhonetics'

// 延世词汇本地音频清单。
// 音频文件随工作台构建产物提供，不把 PDF 或个人录音上传到云端。
export type YonseiAudioManifest = Record<string, string>

let manifestPromise: Promise<YonseiAudioManifest> | null = null
let manifestCache: YonseiAudioManifest | null = null
export const YONSEI_AUDIO_VERSION = '3'
const AUDIO_MANIFEST_URL = `/audio/ko/manifest.json?v=${YONSEI_AUDIO_VERSION}`

export function loadYonseiAudioManifest(): Promise<YonseiAudioManifest> {
  if (typeof window === 'undefined') return Promise.resolve({})
  if (!manifestPromise) {
    manifestPromise = fetch(AUDIO_MANIFEST_URL, { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) throw new Error(`audio manifest ${response.status}`)
        return response.json() as Promise<YonseiAudioManifest>
      })
      .then((manifest) => {
        manifestCache = manifest
        return manifest
      })
      .catch(() => {
        manifestPromise = null
        manifestCache = null
        return {}
      })
  }
  return manifestPromise
}

export function getLoadedYonseiAudioManifest(): YonseiAudioManifest | null {
  return manifestCache
}

export function yonseiAudioKey(text: string): string {
  return applyPhoneticsIfNeeded(text.trim())
}

export function yonseiAudioFile(text: string, manifest: YonseiAudioManifest): string | undefined {
  return manifest[yonseiAudioKey(text)]
}

export function yonseiAudioUrl(file: string): string {
  return `/audio/ko/${encodeURIComponent(file)}?v=${YONSEI_AUDIO_VERSION}`
}
