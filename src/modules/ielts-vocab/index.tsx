import { useMemo, useState } from 'react'
import { Volume2, BookMarked, Check, Shuffle, RotateCcw } from 'lucide-react'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import { useStore } from '../../stores/useStore'
import { sceneVocab, topicVocab, synonyms, roots, type SceneWord } from '../../data/ieltsVocabData'

type Tab = 'browse' | 'study' | 'synonym' | 'root'
const allWords: SceneWord[] = [
  ...sceneVocab.flatMap((g) => g.words.map((w) => ({ ...w, group: g.scene }))),
  ...topicVocab.flatMap((g) => g.words.map((w) => ({ ...w, group: g.topic }))),
]

export default function IeltsVocab() {
  const [tab, setTab] = useState<Tab>('browse')
  return (
    <div className="fade-in">
      <PageHeader title="📚 雅思词汇学习" desc="场景词库 + 同义替换 + 词根词缀 + 多种练习模式，一键存入雅思单词本。" />
      <div className="flex gap-1 mb-4 bg-white rounded-full p-1 shadow-card overflow-x-auto">
        {([['browse', '词库浏览'], ['study', '学习模式'], ['synonym', '同义替换'], ['root', '词根词缀']] as [Tab, string][]).map(
          ([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`flex-1 px-3 py-2 rounded-full text-sm whitespace-nowrap ${tab === k ? 'bg-lavender text-white shadow-soft' : 'text-gray-500'}`}>
              {l}
            </button>
          )
        )}
      </div>
      {tab === 'browse' && <Browse />}
      {tab === 'study' && <Study />}
      {tab === 'synonym' && <Synonym />}
      {tab === 'root' && <Root />}
    </div>
  )
}

function AddBtn({ w }: { w: SceneWord }) {
  const addWord = useStore((s) => s.addWord)
  const wordbook = useStore((s) => s.wordbook)
  const inBook = wordbook.some((x) => x.category === 'ielts' && x.english?.toLowerCase() === w.word.toLowerCase())
  return (
    <button
      disabled={inBook}
      onClick={() =>
        addWord({ source: '雅思词汇', category: 'ielts', korean: '', romanization: '', chinese: w.chinese, english: w.word, phonetic: w.phonetic, pos: w.pos, example: w.example, exampleZh: w.exampleCn })
      }
      className={`shrink-0 px-2 py-1 rounded-lg text-xs flex items-center gap-1 ${inBook ? 'bg-emerald-50 text-emerald-500' : 'bg-lavender text-white'}`}
    >
      {inBook ? <Check size={13} /> : <BookMarked size={13} />}
      {inBook ? '已存' : '存入'}
    </button>
  )
}

function Browse() {
  const [scene, setScene] = useState(sceneVocab[0].scene)
  const [topic, setTopic] = useState(topicVocab[0].topic)
  const [view, setView] = useState<'scene' | 'topic'>('scene')
  const list = view === 'scene' ? sceneVocab.find((g) => g.scene === scene)!.words : topicVocab.find((g) => g.topic === topic)!.words
  return (
    <div>
      <div className="flex gap-2 mb-3 flex-wrap items-center">
        <div className="inline-flex rounded-full bg-white shadow-card p-1">
          <button onClick={() => setView('scene')} className={`px-3 py-1 rounded-full text-sm ${view === 'scene' ? 'bg-lavender text-white' : 'text-gray-500'}`}>场景词</button>
          <button onClick={() => setView('topic')} className={`px-3 py-1 rounded-full text-sm ${view === 'topic' ? 'bg-lavender text-white' : 'text-gray-500'}`}>话题词</button>
        </div>
        <select className="inp" value={view === 'scene' ? scene : topic} onChange={(e) => (view === 'scene' ? setScene(e.target.value) : setTopic(e.target.value))}>
          {(view === 'scene' ? sceneVocab : topicVocab).map((g) => (
            <option key={g.scene || g.topic} value={g.scene || g.topic}>{g.scene || g.topic}</option>
          ))}
        </select>
        <span className="text-xs text-gray-400">{list.length} 词</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {list.map((w, i) => (
          <div key={i} className="bg-white rounded-card shadow-card p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-gray-800">{w.word}</span>
                <SpeakerButton text={w.word} category="ielts" size={13} />
                <span className="text-xs text-gray-400">{w.phonetic}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cream text-gray-500">{w.pos}</span>
              </div>
              <div className="text-sm text-gray-600">{w.chinese}</div>
              <div className="text-xs text-gray-400 truncate">{w.example}</div>
            </div>
            <AddBtn w={w} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Study() {
  const [list, setList] = useState<SceneWord[]>(() => shuffle(allWords).slice(0, 10))
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const cur = list[idx]
  const restart = () => {
    setList(shuffle(allWords).slice(0, 10))
    setIdx(0)
    setFlipped(false)
    setKnown(0)
  }
  const next = () => {
    if (idx < list.length - 1) {
      setIdx(idx + 1)
      setFlipped(false)
    } else restart()
  }
  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>进度 {idx + 1}/{list.length}</span>
        <span>已掌握 {known}</span>
        <button onClick={restart} className="flex items-center gap-1 text-lavender-deep"><RotateCcw size={12} /> 换一批</button>
      </div>
      <div onClick={() => setFlipped((f) => !f)} className="bg-white rounded-card shadow-card p-8 text-center cursor-pointer min-h-[180px] flex flex-col items-center justify-center select-none">
        <SpeakerButton text={cur.word} category="ielts" size={20} className="mb-3" />
        {!flipped ? (
          <div className="text-2xl font-bold text-gray-800">{cur.word}</div>
        ) : (
          <div>
            <div className="text-lg text-lavender-deep">{cur.chinese}</div>
            <div className="text-sm text-gray-400 mt-1">{cur.phonetic} · {cur.pos}</div>
            <div className="text-sm text-gray-500 mt-2">{cur.example}</div>
          </div>
        )}
        <div className="text-xs text-gray-300 mt-4">点击卡片翻面</div>
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={() => { setKnown(known + 1); next() }} className="flex-1 py-2 rounded-xl bg-emerald-500 text-white text-sm">认识 ✓</button>
        <button onClick={next} className="flex-1 py-2 rounded-xl bg-cream text-gray-600 text-sm">不认识，跳过</button>
      </div>
    </div>
  )
}

function Synonym() {
  return (
    <div className="space-y-2">
      <div className="text-xs text-gray-400 mb-1">共 {synonyms.length} 组高频替换（写作/阅读核心）</div>
      {synonyms.map((s, i) => (
        <div key={i} className="bg-white rounded-card shadow-card p-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-lavender-deep">{s.base}</span>
            <span className="text-gray-300">→</span>
            {s.replaces.map((r) => (
              <span key={r} className="text-sm text-gray-700 bg-cream rounded-full px-2 py-0.5">{r}</span>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-1">{s.note}</div>
        </div>
      ))}
    </div>
  )
}

function Root() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {roots.map((r, i) => (
        <div key={i} className="bg-white rounded-card shadow-card p-3">
          <div className="font-medium text-lavender-deep">-{r.root}- <span className="text-sm text-gray-500">({r.meaning})</span></div>
          <div className="flex flex-wrap gap-1 mt-2">
            {r.words.map((w) => (
              <span key={w.word} className="text-xs bg-cream rounded-lg px-2 py-1 text-gray-700">{w.word} <span className="text-gray-400">{w.chinese}</span></span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
