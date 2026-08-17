import { useMemo, useState } from 'react'
import { Volume2, BookMarked, Check, Shuffle, RotateCcw, Search, MessageCircle } from 'lucide-react'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import { useStore } from '../../stores/useStore'
import { sceneVocab, roots, topicVocab, type SceneWord } from '../../data/ieltsVocabData'
import { ALL_TOPIC_GROUPS, ALL_SYNONYMS, SPEAKING_GROUPS, type SpeakItem } from '../../data/ieltsVocabNew'
import { FULL_SCENE_GROUPS, FULL_TOPIC_GROUPS } from '../../data/ieltsVocabFull'

type Tab = 'browse' | 'study' | 'synonym' | 'root' | 'speaking'
const allWords: SceneWord[] = [
  ...sceneVocab.flatMap((g) => g.words.map((w) => ({ ...w, group: g.scene }))),
  ...ALL_TOPIC_GROUPS.flatMap((g) => g.words.map((w) => ({ ...w, group: g.topic }))),
]

export default function IeltsVocab() {
  const [tab, setTab] = useState<Tab>('browse')
  return (
    <div className="fade-in">
      <PageHeader title="📚 雅思词汇学习" desc="场景词库 + 同义替换 + 词根词缀 + 口语题库 + 多种练习模式，一键存入雅思单词本。" />
      <div className="flex gap-1 mb-4 bg-white rounded-full p-1 shadow-card overflow-x-auto">
        {([
          ['browse', '词库浏览'],
          ['study', '学习模式'],
          ['synonym', '同义替换'],
          ['root', '词根词缀'],
          ['speaking', '口语题库'],
        ] as [Tab, string][]).map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`flex-1 px-3 py-2 rounded-full text-sm whitespace-nowrap ${
              tab === k ? 'bg-lavender text-white shadow-soft' : 'text-gray-500'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      {tab === 'browse' && <Browse />}
      {tab === 'study' && <Study />}
      {tab === 'synonym' && <Synonym />}
      {tab === 'root' && <Root />}
      {tab === 'speaking' && <Speaking />}
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
      className={`shrink-0 px-2 py-1 rounded-lg text-xs flex items-center gap-1 ${
        inBook ? 'bg-emerald-50 text-emerald-500' : 'bg-lavender text-white'
      }`}
    >
      {inBook ? <Check size={13} /> : <BookMarked size={13} />}
      {inBook ? '已存' : '存入'}
    </button>
  )
}

function Browse() {
  const [scene, setScene] = useState(sceneVocab[0].scene)
  const [topic, setTopic] = useState(ALL_TOPIC_GROUPS[0].topic)
  const [view, setView] = useState<'scene' | 'topic'>('scene')
  const [src, setSrc] = useState<'builtin' | 'zhenting'>('builtin')
  const [q, setQ] = useState('')
  // 词库源：内置精选（sceneVocab / topicVocab） vs 词汇真经全量（data/ielts-vocabulary.json 全量词库）
  const sceneGroups = src === 'zhenting' ? FULL_SCENE_GROUPS : sceneVocab
  const topicGroups = src === 'zhenting' ? FULL_TOPIC_GROUPS : topicVocab
  // 切换词库源 / 视图后，当前选中项可能不在新数据集里，做安全兜底避免 find() 崩溃
  const safeScene = sceneGroups.some((g) => g.scene === scene) ? scene : sceneGroups[0]?.scene ?? scene
  const safeTopic = topicGroups.some((g) => g.topic === topic) ? topic : topicGroups[0]?.topic ?? topic
  const list =
    view === 'scene'
      ? (sceneGroups.find((g) => g.scene === safeScene)?.words ?? [])
      : (topicGroups.find((g) => g.topic === safeTopic)?.words ?? [])
  const filtered = useMemo(() => {
    if (!q.trim()) return list
    const kw = q.trim().toLowerCase()
    return list.filter(
      (w) => w.word.toLowerCase().includes(kw) || w.chinese.includes(q.trim()) || w.phonetic.toLowerCase().includes(kw)
    )
  }, [list, q])
  return (
    <div>
      <div className="flex gap-2 mb-3 flex-wrap items-center">
        <div className="inline-flex rounded-full bg-white shadow-card p-1">
          <button
            onClick={() => setView('scene')}
            className={`px-3 py-1 rounded-full text-sm ${view === 'scene' ? 'bg-lavender text-white' : 'text-gray-500'}`}
          >
            场景词
          </button>
          <button
            onClick={() => setView('topic')}
            className={`px-3 py-1 rounded-full text-sm ${view === 'topic' ? 'bg-lavender text-white' : 'text-gray-500'}`}
          >
            话题词
          </button>
        </div>
        {/* 词库源切换 */}
        <div className="inline-flex rounded-full bg-white shadow-card p-1">
          <button
            onClick={() => setSrc('builtin')}
            className={`px-3 py-1 rounded-full text-sm ${src === 'builtin' ? 'bg-lavender text-white' : 'text-gray-500'}`}
          >
            内置精选
          </button>
          <button
            onClick={() => setSrc('zhenting')}
            className={`px-3 py-1 rounded-full text-sm ${src === 'zhenting' ? 'bg-lavender text-white' : 'text-gray-500'}`}
          >
            词汇真经全量
          </button>
        </div>
        <select
          className="inp"
          value={view === 'scene' ? safeScene : safeTopic}
          onChange={(e) => (view === 'scene' ? setScene(e.target.value) : setTopic(e.target.value))}
        >
          {(view === 'scene' ? sceneGroups : topicGroups).map((g) => (
            <option key={g.scene || g.topic} value={g.scene || g.topic}>
              {g.scene || g.topic}（{(g.words || []).length}）
            </option>
          ))}
        </select>
        <div className="relative flex-1 min-w-[160px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索英文 / 中文 / 音标"
            className="inp w-full pl-9"
          />
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">{filtered.length} 词</span>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-12">没有匹配的单词，换个关键词试试～</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filtered.map((w, i) => (
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
      )}
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
        <button onClick={restart} className="flex items-center gap-1 text-lavender-deep">
          <RotateCcw size={12} /> 换一批
        </button>
      </div>
      <div
        onClick={() => setFlipped((f) => !f)}
        className="bg-white rounded-card shadow-card p-8 text-center cursor-pointer min-h-[180px] flex flex-col items-center justify-center select-none"
      >
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
        <button
          onClick={() => {
            setKnown(known + 1)
            next()
          }}
          className="flex-1 py-2 rounded-xl bg-emerald-500 text-white text-sm"
        >
          认识 ✓
        </button>
        <button onClick={next} className="flex-1 py-2 rounded-xl bg-cream text-gray-600 text-sm">
          不认识，跳过
        </button>
      </div>
    </div>
  )
}

function Synonym() {
  return (
    <div className="space-y-2">
      <div className="text-xs text-gray-400 mb-1">共 {ALL_SYNONYMS.length} 组高频替换（写作/阅读核心，含内置 + 词汇真经 538）</div>
      {ALL_SYNONYMS.map((s, i) => (
        <div key={i} className="bg-white rounded-card shadow-card p-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-lavender-deep">{s.base}</span>
            <span className="text-gray-300">→</span>
            {s.replaces.map((r) => (
              <span key={r} className="text-sm text-gray-700 bg-cream rounded-full px-2 py-0.5">
                {r}
              </span>
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
          <div className="font-medium text-lavender-deep">
            -{r.root}- <span className="text-sm text-gray-500">({r.meaning})</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {r.words.map((w) => (
              <span key={w.word} className="text-xs bg-cream rounded-lg px-2 py-1 text-gray-700">
                {w.word} <span className="text-gray-400">{w.chinese}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Speaking() {
  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-400">共 {SPEAKING_GROUPS.reduce((s, g) => s + g.items.length, 0)} 题（Part 1–3，源自 IELTS-Speaking-AI）</div>
      {SPEAKING_GROUPS.map((g) => (
        <div key={g.part}>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle size={15} className="text-lavender-deep" />
            <h3 className="font-semibold text-gray-700">{g.part}</h3>
            <span className="text-xs text-gray-400">{g.items.length} 题</span>
          </div>
          <div className="space-y-2">
            {g.items.map((it: SpeakItem, i) => (
              <div key={i} className="bg-white rounded-card shadow-card p-3">
                <div className="text-sm text-gray-800 whitespace-pre-line">{it.question}</div>
                <div className="text-xs text-gray-400 mt-1">{it.topic}</div>
              </div>
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
