import { applyPhoneticsIfNeeded } from './koreanPhonetics'

// 延世词汇本地音频清单。
// 音频文件随工作台构建产物提供，不把 PDF 或个人录音上传到云端。
export type YonseiAudioManifest = Record<string, string>

let manifestPromise: Promise<YonseiAudioManifest> | null = null
const AUDIO_MANIFEST_URL = '/audio/ko/manifest.json?v=2'

export function loadYonseiAudioManifest(): Promise<YonseiAudioManifest> {
  if (typeof window === 'undefined') return Promise.resolve({})
  if (!manifestPromise) {
    manifestPromise = fetch(AUDIO_MANIFEST_URL, { cache: 'force-cache' })
      .then((response) => (response.ok ? response.json() as Promise<YonseiAudioManifest> : {}))
      .catch(() => ({}))
  }
  return manifestPromise
}

export function yonseiAudioKey(text: string): string {
  return applyPhoneticsIfNeeded(text.trim())
}

export function yonseiAudioFile(text: string, manifest: YonseiAudioManifest): string | undefined {
  return manifest[yonseiAudioKey(text)]
}
