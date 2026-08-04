import { useState } from 'react'
import { PageHeader } from '../../components/Layout'
import { grammarItems, longSentences, type LongSentence } from '../../data/ieltsGrammar'

const connectors = ['although', 'though', 'because', 'since', 'if', 'that', 'which', 'who', 'whom', 'when', 'where', 'while', 'whereas', 'but', 'and', 'or', 'so', 'after', 'before']

export default function IeltsGrammar() {
  const [open, setOpen] = useState(grammarItems[0].id)
  const [picked, setPicked] = useState<Record<string, number>>({})
  const item = grammarItems.find((g) => g.id === open)!
  const quiz = item.quiz[0]

  return (
    <div className="fade-in">
      <PageHeader title="📐 雅思语法大全" desc="核心语法精讲 + 长难句拆解引擎，写作阅读提分底座。" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 语法列表 */}
        <div className="bg-white rounded-card shadow-card p-2 lg:col-span-1 max-h-[70vh] overflow-y-auto">
          {grammarItems.map((g) => (
            <button
              key={g.id}
              onClick={() => { setOpen(g.id); setPicked({}) }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm mb-1 ${open === g.id ? 'bg-lavender-light text-lavender-deep' : 'hover:bg-cream text-gray-600'}`}
            >
              <span className="font-medium">{g.name}</span>
              <span className="text-[10px] text-gray-400 ml-1">{g.category}</span>
            </button>
          ))}
        </div>

        {/* 语法详情 */}
        <div className="bg-white rounded-card shadow-card p-5 lg:col-span-2 space-y-3">
          <div>
            <h3 className="font-bold text-lavender-deep text-lg">{item.name}</h3>
            <div className="text-xs text-gray-400 mb-2">归类：{item.category} · 公式：<code className="bg-cream px-1 rounded">{item.formula}</code></div>
            <p className="text-sm text-gray-600 leading-relaxed">{item.explanation}</p>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">例句</div>
            <ul className="space-y-1">
              {item.examples.map((e, i) => (
                <li key={i} className="text-sm">
                  <span className="text-lavender-deep">{e.en}</span>
                  <span className="text-gray-400"> — {e.cn}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-medium text-coral/80 mb-1">⚠️ 常见错误</div>
            <ul className="list-disc list-inside text-sm text-gray-500">
              {item.commonErrors.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          <div className="text-sm text-gray-500">
            <span className="text-gray-700 font-medium">💡 雅思应用：</span>{item.ieltsApp}
            <div className="mt-1"><span className="text-gray-700 font-medium">🔑 记忆口诀：</span>{item.mnemonic}</div>
          </div>
          {quiz && (
            <div className="border-t border-lavender-light pt-3">
              <div className="text-sm font-medium text-gray-700">小测验</div>
              <div className="text-sm text-gray-600 mt-1">{quiz.q}</div>
              <div className="space-y-1 mt-2">
                {quiz.options.map((o, i) => {
                  const p = picked[item.id]
                  const chosen = p === i
                  const correct = i === quiz.answer
                  const color = p === undefined ? 'hover:bg-cream' : correct ? 'bg-emerald-50 text-emerald-700' : chosen ? 'bg-coral/10 text-coral' : 'text-gray-500'
                  return (
                    <button key={i} onClick={() => setPicked((s) => ({ ...s, [item.id]: i }))} className={`w-full text-left px-3 py-2 rounded-lg text-sm border border-lavender-light ${color}`}>
                      {o}
                    </button>
                  )
                })}
              </div>
              {picked[item.id] !== undefined && (
                <div className={`text-xs mt-2 ${picked[item.id] === quiz.answer ? 'text-emerald-600' : 'text-coral'}`}>
                  {picked[item.id] === quiz.answer ? '✓ 正确！' : '✗ 不正确。'}{quiz.explain}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <LongSentenceAnalyzer />
    </div>
  )
}

function LongSentenceAnalyzer() {
  const [sel, setSel] = useState<LongSentence>(longSentences[0])
  const [input, setInput] = useState('')
  const [analyzed, setAnalyzed] = useState<string[] | null>(null)

  const analyze = () => {
    const s = input.trim()
    if (!s) return
    // 轻量解析：按连接词切分并标注（深度拆解见预置库）
    const hits = connectors.filter((c) => new RegExp(`\\b${c}\\b`, 'i').test(s))
    setAnalyzed(hits.length ? hits : ['（未检测到显著从句连接词，可能为主句或并列结构）'])
  }

  return (
    <div className="mt-6 bg-white rounded-card shadow-card p-5">
      <div className="font-medium text-lavender-deep mb-3">🔬 长难句拆解引擎</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">从真题库选择（含完整拆解）</div>
          <select className="inp w-full mb-2" value={sel.id} onChange={(e) => setSel(longSentences.find((l) => l.id === e.target.value)!)}>
            {longSentences.map((l) => (
              <option key={l.id} value={l.id}>[{l.difficulty}] {l.sentence.slice(0, 40)}…</option>
            ))}
          </select>
          <div className="text-sm font-medium text-gray-800">{sel.sentence}</div>
          <div className="mt-2 text-sm space-y-1">
            <div><span className="text-lavender-deep">主干：</span><span className="text-gray-700">{sel.mainClause}</span></div>
            {sel.modifiers.map((m, i) => <div key={i} className="text-gray-600">↳ 修饰：{m}</div>)}
            <div><span className="text-lavender-deep">逻辑：</span>{sel.logic}</div>
            <div><span className="text-lavender-deep">翻译：</span>{sel.translation}</div>
            <div className="flex flex-wrap gap-1 pt-1">
              {sel.grammarPoints.map((g) => <span key={g} className="text-[11px] bg-cream rounded-full px-2 py-0.5 text-gray-500">{g}</span>)}
            </div>
            <div className="text-xs text-gray-400">出处：{sel.source}</div>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">粘贴你遇到的长句（连接词/从句标注）</div>
          <textarea className="inp w-full h-24" placeholder="例如：Although the cost is high, it will prove economical." value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={analyze} className="mt-2 px-4 py-2 rounded-xl bg-lavender text-white text-sm">分析</button>
          {analyzed && (
            <div className="mt-2 text-sm text-gray-600">
              检测到结构标记：{analyzed.join('、')}
              <div className="text-xs text-gray-400 mt-1">提示：深度拆解（主干/修饰/翻译）请对照上方真题库案例，逐步套用。</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
