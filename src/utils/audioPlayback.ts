export type AudioPlaybackErrorCode = 'blocked' | 'load' | 'timeout' | 'unsupported'

export class AudioPlaybackError extends Error {
  code: AudioPlaybackErrorCode
  cause?: unknown

  constructor(code: AudioPlaybackErrorCode, message: string, options?: { cause?: unknown }) {
    super(message)
    this.name = 'AudioPlaybackError'
    this.code = code
    this.cause = options?.cause
  }
}

let sharedAudio: HTMLAudioElement | null = null
let settleActivePlayback: (() => void) | null = null

function getSharedAudio(): HTMLAudioElement {
  if (typeof Audio === 'undefined') {
    throw new AudioPlaybackError('unsupported', '当前环境不支持网页音频播放。')
  }
  if (!sharedAudio) {
    sharedAudio = new Audio()
    sharedAudio.preload = 'auto'
  }
  return sharedAudio
}

function playbackError(error: unknown): AudioPlaybackError {
  const name = error instanceof DOMException ? error.name : ''
  if (name === 'NotAllowedError') {
    return new AudioPlaybackError('blocked', '浏览器阻止了自动播放，请再次点击播放按钮。', { cause: error })
  }
  return new AudioPlaybackError('load', '音频加载或解码失败，请检查网络后重试。', { cause: error })
}

/**
 * 立即停止当前共享播放器，并让等待它结束的队列正常退出。
 * 复用同一个 HTMLAudioElement 可以避免 iPhone/iPad 为队列中的每个词
 * 重新触发自动播放限制。
 */
export function stopAudioPlayback(): void {
  if (sharedAudio) {
    sharedAudio.pause()
    try {
      sharedAudio.currentTime = 0
    } catch {
      // 某些浏览器在 metadata 尚未加载时不允许修改 currentTime。
    }
  }
  settleActivePlayback?.()
  settleActivePlayback = null
}

export function playAudioUrl(url: string, speed = 1): Promise<void> {
  stopAudioPlayback()

  let audio: HTMLAudioElement
  try {
    audio = getSharedAudio()
  } catch (error) {
    return Promise.reject(error)
  }

  const safeSpeed = Math.min(2, Math.max(0.5, speed))

  return new Promise<void>((resolve, reject) => {
    let settled = false
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const cleanup = () => {
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
      if (timeoutId) clearTimeout(timeoutId)
      if (settleActivePlayback === onStopped) settleActivePlayback = null
    }

    const finish = (error?: AudioPlaybackError) => {
      if (settled) return
      settled = true
      cleanup()
      if (error) reject(error)
      else resolve()
    }

    const onEnded = () => finish()
    const onError = () => finish(new AudioPlaybackError('load', '音频文件无法加载或解码。'))
    const onStopped = () => finish()

    settleActivePlayback = onStopped
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    audio.src = url
    audio.load()
    audio.defaultPlaybackRate = safeSpeed
    audio.playbackRate = safeSpeed
    if ('preservesPitch' in audio) audio.preservesPitch = true

    // 单词音频通常不到 5 秒；30 秒仍未结束说明请求或媒体元素已卡住。
    timeoutId = setTimeout(() => {
      audio.pause()
      finish(new AudioPlaybackError('timeout', '音频播放超时，请重试。'))
    }, 30_000)

    try {
      const promise = audio.play()
      promise?.catch((error) => finish(playbackError(error)))
    } catch (error) {
      finish(playbackError(error))
    }
  })
}

export async function playAudioBlob(blob: Blob, speed = 1): Promise<void> {
  const url = URL.createObjectURL(blob)
  try {
    await playAudioUrl(url, speed)
  } finally {
    URL.revokeObjectURL(url)
  }
}
