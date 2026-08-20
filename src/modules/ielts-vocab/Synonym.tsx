import { ALL_SYNONYMS } from '../../data/ieltsVocabNew'

export default function Synonym() {
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
