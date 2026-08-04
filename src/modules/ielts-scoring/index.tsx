import { useState } from 'react'
import { PageHeader } from '../../components/Layout'
import { listeningScale, readingScale, bandFor, writingCriteria, speakingCriteria, bandFeatures, paths } from '../../data/ieltsScoring'

type Tab = 'scale' | 'criteria' | 'self' | 'path'
export default function IeltsScoring() {
  const [tab, setTab] = useState<Tab>('scale')
  return (
    <div className="fade-in">
      <PageHeader title="🏅 雅思评分标准" desc="官方细则 + 分数对照 + 自测 + 提分路径。" />
      <div className="flex gap-1 mb-4 bg-white rounded-full p-1 shadow-card overflow-x-auto">
        {([['scale', '分数对照'], ['criteria', '四项细则'], ['self', '自测对照'], ['path', '提分路径']] as [Tab, string][]).map(
          ([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`flex-1 px-3 py-2 rounded-full text-sm whitespace-nowrap ${tab === k ? 'bg-lavender text-white shadow-soft' : 'text-gray-500'}`}>{l}</button>
          )
        )}
      </div>
      {tab === 'scale' && <ScaleTab />}
      {tab === 'criteria' && <CriteriaTab />}
      {tab === 'self' && <SelfTab />}
      {tab === 'path' && <PathTab />}
    </div>
  )
}

function ScaleTab() {
  const [correct, setCorrect] = useState(32)
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-card shadow-card p-5">
        <div className="text-sm font-medium text-lavender-deep mb-2">输入做对题数（共 40 题）→ 预估分数</div>
        <input type="range" min={0} max={40} value={correct} onChange={(e) => setCorrect(Number(e.target.value))} className="w-full accent-lavender" />
        <div className="flex justify-between text-sm mt-2">
          <span>做对 {correct} 题</span>
          <span className="font-bold text-lavender-deep">听力 ≈ {bandFor(listeningScale, correct)} · 阅读 ≈ {bandFor(readingScale, correct)}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[['听力（A 类）', listeningScale], ['阅读（A 类）', readingScale]].map(([title, scale]) => (
          <div key={title as string} className="bg-white rounded-card shadow-card p-4">
            <div className="font-medium text-gray-700 mb-2">{title}</div>
            <div className="space-y-0.5 text-xs">
              {(scale as any).map((r: any, i: number) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-500">对 {r.min}-{r.max} 题</span>
                  <span className="text-lavender-deep font-medium">{r.band}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CriteriaTab() {
  return (
    <div className="space-y-4">
      <CriterionTable title="写作四项评分" items={writingCriteria} />
      <CriterionTable title="口语四项评分" items={speakingCriteria} />
    </div>
  )
}

function CriterionTable({ title, items }: { title: string; items: typeof writingCriteria }) {
  return (
    <div className="bg-white rounded-card shadow-card p-4 overflow-x-auto">
      <div className="font-medium text-gray-700 mb-2">{title}</div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-lavender-light">
            <th className="py-1 pr-2">维度</th><th className="pr-2">9 分</th><th className="pr-2">7 分</th><th>5 分</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.code} className="border-b border-lavender-light/60 align-top">
              <td className="py-2 pr-2 font-medium text-lavender-deep whitespace-nowrap">{c.code}<br /><span className="text-xs text-gray-400">{c.name}</span></td>
              <td className="pr-2 text-gray-600">{c.band9}</td>
              <td className="pr-2 text-gray-600">{c.band7}</td>
              <td className="text-gray-600">{c.band5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SelfTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {bandFeatures.map((b) => (
        <div key={b.band} className="bg-white rounded-card shadow-card p-4">
          <div className="font-bold text-lavender-deep mb-2">Band {b.band} 特征</div>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {b.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}

function PathTab() {
  return (
    <div className="space-y-3">
      {paths.map((p) => (
        <div key={p.from} className="bg-white rounded-card shadow-card p-4">
          <div className="font-medium text-lavender-deep mb-2">{p.from} → {p.to} 核心改动</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-coral/80 mb-1">必须改掉</div>
              <ul className="list-disc list-inside text-gray-500">{p.stop.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div>
              <div className="text-emerald-600 mb-1">必须养成</div>
              <ul className="list-disc list-inside text-gray-500">{p.build.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
