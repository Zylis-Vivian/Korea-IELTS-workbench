import { PageHeader } from '../../components/Layout'
import { useStore } from '../../stores/useStore'
import PronunciationSettings from '../../components/PronunciationSettings'
import { Moon, Sun, Volume2, Video } from 'lucide-react'

export default function Settings() {
  const settings = useStore((s) => s.settings)
  const update = useStore((s) => s.updateSettings)

  return (
    <div className="fade-in">
      <PageHeader title="设置" desc="个性化你的学习体验。" />

      <div className="space-y-4">
        <PronunciationSettings />

        <div className="bg-white rounded-card shadow-card p-5">
          <div className="text-sm font-medium text-lavender-deep mb-1">📻 音频来源（可选）</div>
          <div className="text-xs text-gray-400 mb-3">
            填入后可解锁喜马拉雅/蜻蜓 FM 在线音频。留空则仅使用本地 MP3 与 TTS 合成，界面不会报错。
          </div>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs text-gray-500">喜马拉雅 app_key</span>
              <input
                className="inp w-full mt-1"
                placeholder="在 open.ximalaya.com 注册获取"
                value={settings.audioConfig.ximalayaKey}
                onChange={(e) => update({ audioConfig: { ...settings.audioConfig, ximalayaKey: e.target.value } })}
              />
            </label>
            <label className="block">
              <span className="text-xs text-gray-500">蜻蜓 FM client_id</span>
              <input
                className="inp w-full mt-1"
                placeholder="在 open.qingting.fm 注册获取"
                value={settings.audioConfig.qingtingId}
                onChange={(e) => update({ audioConfig: { ...settings.audioConfig, qingtingId: e.target.value } })}
              />
            </label>
            <label className="block">
              <span className="text-xs text-gray-500">蜻蜓 FM client_secret</span>
              <input
                className="inp w-full mt-1"
                type="password"
                placeholder="与 client_id 配套"
                value={settings.audioConfig.qingtingSecret}
                onChange={(e) => update({ audioConfig: { ...settings.audioConfig, qingtingSecret: e.target.value } })}
              />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-5">
          <div className="text-sm font-medium text-lavender-deep mb-2">🔊 发音语速</div>
          <div className="flex gap-2">
            {[0.75, 1, 1.25, 1.5].map((r) => (
              <button
                key={r}
                onClick={() => update({ ttsSpeed: r })}
                className={`px-4 py-2 rounded-full text-sm ${settings.ttsSpeed === r ? 'bg-lavender text-white' : 'bg-cream text-gray-500'}`}
              >
                {r}x
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <Volume2 size={13} /> 部分浏览器/手机若无韩文语音，将自动以罗马音作为替代。
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-5">
          <div className="text-sm font-medium text-lavender-deep mb-2">🔤 字体大小</div>
          <input
            type="range"
            min={14}
            max={22}
            value={settings.fontSize}
            onChange={(e) => update({ fontSize: Number(e.target.value) })}
            className="w-full accent-lavender"
          />
          <div className="text-sm mt-1" style={{ fontSize: settings.fontSize }}>
            预览：안녕하세요, Hello 🌸
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-5 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-lavender-deep flex items-center gap-1">
              <Video size={15} /> 显示 B站视频区
            </div>
            <div className="text-xs text-gray-400 mt-1">关闭后工作台隐藏视频模块（文字讲解不受影响）。</div>
          </div>
          <button
            onClick={() => update({ showVideo: !settings.showVideo })}
            className={`w-12 h-7 rounded-full transition relative ${settings.showVideo ? 'bg-lavender' : 'bg-gray-300'}`}
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${settings.showVideo ? 'left-6' : 'left-1'}`}
            />
          </button>
        </div>

        <div className="bg-white rounded-card shadow-card p-5 text-xs text-gray-400 flex items-center gap-2">
          <Moon size={14} /> 主题：薰衣草紫（固定）。所有学习数据保存在本机浏览器（LocalStorage），清除浏览器数据会丢失进度。
        </div>
      </div>
    </div>
  )
}
