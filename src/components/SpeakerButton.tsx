import { Volume2 } from 'lucide-react'
import { usePronunciation } from '../hooks/usePronunciation'

interface Props {
  text: string
  lang?: string
  category?: 'korean' | 'ielts'
  size?: number
  className?: string
}

// 通用发音按钮：韩语走多方案 TTS 管线（后端择优 + Web Speech 降级），
// 非韩语（如英语）直接走浏览器 Web Speech API。
export default function SpeakerButton({ text, lang = 'ko-KR', category, size = 18, className = '' }: Props) {
  const { speak } = usePronunciation()
  const effectiveLang = category === 'ielts' ? 'en-US' : lang

  const onClick = () => {
    void speak(text, { lang: effectiveLang })
  }

  return (
    <button
      onClick={onClick}
      title={`播放发音 (${lang})`}
      className={`inline-flex items-center justify-center rounded-full bg-lavender-light text-lavender-deep hover:bg-lavender hover:text-white transition ${className}`}
      style={{ width: size + 18, height: size + 18 }}
    >
      <Volume2 size={size} />
    </button>
  )
}

export function hasKoreanVoice(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false
  return window.speechSynthesis.getVoices().some((v) => v.lang.startsWith('ko'))
}
