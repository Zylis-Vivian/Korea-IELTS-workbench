export function hasKoreanVoice(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false
  return window.speechSynthesis.getVoices().some((voice) => voice.lang.toLowerCase().startsWith('ko'))
}

