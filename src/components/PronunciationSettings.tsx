// src/components/PronunciationSettings.tsx
// 发音引擎设置：下拉切换方案 + 声线 + 重新测试 + 清空缓存
import { useState } from 'react'
import { useStore } from '../stores/useStore'
import { usePronunciation } from '../hooks/usePronunciation'
import { runPronunciationTest } from '../utils/pronunciationTest'
import { clearTtsCache } from '../utils/pronunciationCache'
import type { TtsEngine, TtsGender } from '../hooks/usePronunciation'
import { RefreshCw, Trash2, Volume2 } from 'lucide-react'

const ENGINES: { value: TtsEngine; label: string }[] = [
  { value: 'auto', label: '自动（Azure → Google → Edge，失败降级）' },
  { value: 'azure', label: 'Azure TTS（需本地后端密钥）' },
  { value: 'google', label: 'Google TTS（需本地后端密钥）' },
  { value: 'edge', label: 'Edge TTS（微软在线，免密钥，推荐云端）' },
  { value: 'web', label: 'Web Speech API（浏览器原生，需系统韩文语音）' },
]

export default function PronunciationSettings() {
  const settings = useStore((s) => s.settings)
  const update = useStore((s) => s.updateSettings)
  const setPronStatus = useStore((s) => s.setPronStatus)
  const { speak } = usePronunciation()
  const [testing, setTesting] = useState(false)

  const reTest = async () => {
    setTesting(true)
    const report = await runPronunciationTest()
    const premium = report.azure.ok || report.google.ok || report.edge.ok
    const level = premium ? 'green' : report.web.koVoice ? 'yellow' : 'red'
    const active = report.azure.ok
      ? 'Azure TTS'
      : report.google.ok
        ? 'Google TTS'
        : report.edge.ok
          ? 'Edge TTS'
          : report.web.koVoice
            ? 'Web Speech'
            : '无可用韩文语音'
    setPronStatus({ level, activeEngine: active, webVoices: report.web.voices, report, lastTest: report.timestamp })
    setTesting(false)
  }

  const onEngineChange = async (e: TtsEngine) => {
    update({ ttsEngine: e })
    // 切换后再次测试确认该方案可用
    void reTest()
  }

  const onGenderChange = (g: TtsGender) => {
    update({ ttsGender: g })
    // 试听
    void speak('안녕하세요', { forceEngine: 'auto', voice: g })
  }

  return (
    <div className="bg-white rounded-card shadow-card p-5 space-y-4">
      <div className="text-sm font-medium text-lavender-deep flex items-center gap-1">
        <Volume2 size={15} /> 发音引擎
      </div>

      <div>
        <div className="text-xs text-gray-400 mb-1">选择发音方案</div>
        <select
          value={settings.ttsEngine}
          onChange={(e) => onEngineChange(e.target.value as TtsEngine)}
          className="w-full rounded-lg border border-lavender/40 px-3 py-2 text-sm bg-cream text-gray-700 focus:outline-none focus:ring-2 focus:ring-lavender"
        >
          {ENGINES.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="text-xs text-gray-400 mb-1">声线（Azure 生效）</div>
        <div className="flex gap-2">
          {(['female', 'male'] as TtsGender[]).map((g) => (
            <button
              key={g}
              onClick={() => onGenderChange(g)}
              className={`px-4 py-2 rounded-full text-sm ${
                settings.ttsGender === g ? 'bg-lavender text-white' : 'bg-cream text-gray-500'
              }`}
            >
              {g === 'female' ? '女声 (SunHi)' : '男声 (InJoon)'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={reTest}
          disabled={testing}
          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-lavender-light text-lavender-deep text-sm hover:bg-lavender hover:text-white transition disabled:opacity-60"
        >
          <RefreshCw size={14} className={testing ? 'animate-spin' : ''} /> {testing ? '测试中…' : '重新运行发音测试'}
        </button>
        <button
          onClick={() => clearTtsCache()}
          className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-cream text-gray-500 text-sm hover:bg-gray-200 transition"
          title="清空发音音频缓存（IndexedDB）"
        >
          <Trash2 size={14} /> 清缓存
        </button>
      </div>

      <div className="text-xs text-gray-400 leading-relaxed">
        发音标准：<b>标准首尔音</b>（参考外研社U校园《韩国语语音入门》/ 首尔大学语音体系）。
        优先级：<code>Azure</code> → <code>Google</code>（二者均需本地后端环境变量
        <code>AZURE_SPEECH_KEY</code>、<code>AZURE_SPEECH_REGION</code>、<code>GOOGLE_TTS_API_KEY</code>）→
        <code>Edge TTS</code>（微软在线，免密钥，与 Azure 同源的韩文神经网络语音 ko-KR-SunHiNeural / ko-KR-InJoonNeural，云端也能用）→
        <code>Web Speech</code>（需系统装有韩文语音）。
        句子/短语会先做韩语音变预处理，单词与单字母不做音变。
      </div>
    </div>
  )
}
