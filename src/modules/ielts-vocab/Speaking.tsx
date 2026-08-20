import { MessageCircle } from 'lucide-react'
import { SPEAKING_GROUPS, type SpeakItem } from '../../data/ieltsVocabNew'

export default function Speaking() {
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
