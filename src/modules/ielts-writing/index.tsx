import { useState } from 'react'
import { PageHeader } from '../../components/Layout'
import IeltsQuiz from '../../components/IeltsQuiz'
import { WRITING } from '../../data/ielts'
import { writingQuiz } from '../../data/ieltsQuizData'

export default function IeltsWriting() {
  const [sel, setSel] = useState(WRITING[0])
  const [draft, setDraft] = useState('')

  return (
    <div className="fade-in">
      <PageHeader title="雅思写作训练" desc="题库 + 思路大纲 + 写作区。AI 批改（TR/CC/LR/GRA）需接入后端评分服务，本地先练笔与结构。" />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
        <div className="bg-white rounded-card shadow-card p-3 space-y-1">
          {WRITING.map((w) => (
            <button
              key={w.id}
              onClick={() => {
                setSel(w)
                setDraft('')
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${sel.id === w.id ? 'bg-lavender-light text-lavender-deep' : 'hover:bg-cream'}`}
            >
              {w.type}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-card shadow-card p-5 fade-in space-y-4">
          <div>
            <span className="text-xs bg-lavender-light text-lavender-deep rounded px-2 py-0.5">{sel.type}</span>{' '}
            <span className="text-xs text-gray-400">{sel.topic}</span>
          </div>
          <div className="p-3 rounded-xl bg-cream text-sm">{sel.prompt}</div>

          <div>
            <div className="text-sm font-medium text-lavender-deep mb-1">📐 写作思路大纲</div>
            <div className="text-sm text-gray-700 p-3 rounded-xl bg-lavender-light/40">{sel.outline}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-lavender-deep mb-1">✍️ 我的作文</div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={8}
              placeholder="在此输入你的英文作文……"
              className="w-full p-3 rounded-xl border border-lavender-light text-sm"
            />
            <div className="text-xs text-gray-400 mt-1">字数：{draft.trim() ? draft.trim().split(/\s+/).length : 0}</div>
          </div>

          <div className="text-xs text-gray-400 bg-cream rounded-xl p-3">
            💡 说明：完整的 AI 批改（逐句语法、词汇替换、四项评分）需要后端 API。本项目为纯前端，已为你保留「题库 + 大纲 + 练笔」闭环；接入评分服务后在此处展示报告即可。
          </div>
        </div>
      </div>

      <IeltsQuiz title="写作自测" source="雅思写作" questions={writingQuiz} />
    </div>
  )
}
