import { useState, useEffect } from 'react'
import { PageHeader } from '../../components/Layout'
import { useStore } from '../../stores/useStore'
import { PlayCircle, Plus, X } from 'lucide-react'

interface Vid {
  id: string
  bvid: string
  title: string
  up: string
  cat: string
}

// 预置推荐（可按需在 src/data 扩展；留空 bvid 时不显示）
const PRESET: Vid[] = [
  { id: 'p1', bvid: '', title: '韩语四十音入门（元音+辅音）', up: '韩语养乐多', cat: '四十音教学' },
  { id: 'p2', bvid: '', title: 'TOPIK 初级语法精讲', up: '韩语便利店', cat: '语法讲解' },
  { id: 'p3', bvid: '', title: '日常口语情景对话', up: '韩语养乐多', cat: '口语练习' },
]

const CATS = ['全部', '四十音教学', '单词记忆', '语法讲解', '口语练习', 'TOPIK备考', '韩国文化']

export default function KoreanVideo() {
  const showVideo = useStore((s) => s.settings.showVideo)
  const [userVids, setUserVids] = useState<Vid[]>([])
  const [cat, setCat] = useState('全部')
  const [playing, setPlaying] = useState<Vid | null>(null)
  const [bvid, setBvid] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('lavender-videos')
      if (raw) setUserVids(JSON.parse(raw))
    } catch {}
  }, [])

  const addVid = () => {
    if (!bvid.trim()) return
    const v: Vid = {
      id: 'u' + Date.now(),
      bvid: bvid.trim(),
      title: title.trim() || '我的视频',
      up: '我',
      cat: 'TOPIK备考',
    }
    const next = [v, ...userVids]
    setUserVids(next)
    localStorage.setItem('lavender-videos', JSON.stringify(next))
    setBvid('')
    setTitle('')
  }
  const delVid = (id: string) => {
    const next = userVids.filter((v) => v.id !== id)
    setUserVids(next)
    localStorage.setItem('lavender-videos', JSON.stringify(next))
  }

  if (!showVideo) {
    return (
      <div className="fade-in">
        <PageHeader title="B站视频学习" />
        <div className="bg-white rounded-card shadow-card p-6 text-center text-gray-400 text-sm">
          已在「设置」中关闭视频区。开启后可在此观看 B 站韩语教学视频。
        </div>
      </div>
    )
  }

  const all = [...userVids, ...PRESET]
  const list = cat === '全部' ? all : all.filter((v) => v.cat === cat)

  return (
    <div className="fade-in">
      <PageHeader title="B站视频学习" desc="文字讲解为主，视频为增值补充。可添加 B 站视频 BV 号，在工作台内直接播放。" />

      <div className="flex flex-wrap gap-2 mb-4">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs ${cat === c ? 'bg-lavender text-white' : 'bg-white text-gray-500'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {playing && playing.bvid ? (
        <div className="bg-white rounded-card shadow-card p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-lavender-deep">{playing.title}</span>
            <button onClick={() => setPlaying(null)} className="text-gray-400 hover:text-coral">
              <X size={18} />
            </button>
          </div>
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
            <iframe
              className="w-full h-full"
              src={`https://player.bilibili.com/player.html?bvid=${playing.bvid}&high_quality=1&autoplay=0`}
              allowFullScreen
              title={playing.title}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-card shadow-card p-4 mb-4 text-sm text-gray-500">
          点击任意视频卡片即可在右侧/下方播放（需填入有效 BV 号）。
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {list.map((v) => (
          <div key={v.id} className="bg-white rounded-card shadow-card p-4 flex flex-col">
            <div className="flex items-center gap-2 text-lavender-deep mb-1">
              <PlayCircle size={18} />
              <span className="text-xs bg-lavender-light rounded px-2 py-0.5">{v.cat}</span>
            </div>
            <div className="font-medium text-sm">{v.title}</div>
            <div className="text-xs text-gray-400 mt-1">UP：{v.up}</div>
            <div className="flex gap-2 mt-2">
              {v.bvid ? (
                <button
                  onClick={() => setPlaying(v)}
                  className="flex-1 py-1.5 rounded-full bg-lavender text-white text-xs hover:bg-lavender-deep"
                >
                  播放
                </button>
              ) : (
                <span className="flex-1 text-center text-xs text-gray-300 py-1.5">待添加 BV 号</span>
              )}
              {v.id.startsWith('u') && (
                <button onClick={() => delVid(v.id)} className="px-2 text-gray-400 hover:text-coral">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-card shadow-card p-4 mt-4">
        <div className="text-sm font-medium text-lavender-deep mb-2">➕ 添加 B 站视频</div>
        <div className="flex flex-wrap gap-2">
          <input
            value={bvid}
            onChange={(e) => setBvid(e.target.value)}
            placeholder="BV 号，如 BV1xx411c7mD"
            className="flex-1 min-w-[160px] px-3 py-2 rounded-lg border border-lavender-light text-sm"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="标题"
            className="flex-1 min-w-[120px] px-3 py-2 rounded-lg border border-lavender-light text-sm"
          />
          <button onClick={addVid} className="px-4 py-2 rounded-full bg-lavender text-white text-sm flex items-center gap-1">
            <Plus size={14} /> 添加
          </button>
        </div>
      </div>
    </div>
  )
}
