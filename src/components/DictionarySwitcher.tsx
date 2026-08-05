// 词库切换器：按 category 分组渲染词库按钮，受控 activeId / onSelect。
// 用于「词汇学习」模块的「核心词库 / 延世韩国语」等词库切换。
import type { DictMeta } from '../data/yonseiVocab'

interface Props {
  dictionaries: DictMeta[]
  activeId: string
  onSelect: (id: string) => void
}

export default function DictionarySwitcher({ dictionaries, activeId, onSelect }: Props) {
  // 按 category 分组
  const groups = dictionaries.reduce<Record<string, DictMeta[]>>((acc, d) => {
    if (!acc[d.category]) acc[d.category] = []
    acc[d.category].push(d)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(groups).map(([category, dicts]) => (
        <div key={category} className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400 whitespace-nowrap">{category}</span>
          <div className="inline-flex rounded-full bg-white shadow-card p-1 gap-1 flex-wrap">
            {dicts.map((d) => (
              <button
                key={d.id}
                onClick={() => onSelect(d.id)}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition ${
                  activeId === d.id
                    ? 'bg-lavender text-white shadow'
                    : 'text-gray-500 hover:bg-lavender-light/60'
                }`}
              >
                {d.name}
                <span className="ml-1.5 opacity-70">{d.length}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
