import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import { useStore } from '../../stores/useStore'
import { IELTS_VOCAB } from '../../data/ieltsVocab'
import type { BoardCategory, WordMastery } from '../../types'
import {
  BookmarkX,
  Plus,
  Download,
  Upload,
  AlertTriangle,
  Trash2,
  Search,
  Filter,
  ArrowUpDown,
  BookMarked,
  AlertOctagon,
  CheckCircle2,
  CircleDot,
  Circle,
} from 'lucide-react'
import { parseImportText, type ImportItem } from '../../utils/importData'

interface Props {
  category: BoardCategory
  kind: 'word' | 'wrong'
}

const CAT_LABEL: Record<BoardCategory, string> = { korean: '韩语', ielts: '雅思' }
const MASTERY_LABEL: Record<WordMastery, string> = {
  unlearned: '未学',
  learning: '学习中',
  mastered: '已掌握',
}
const MASTERY_NEXT: Record<WordMastery, WordMastery> = {
  unlearned: 'learning',
  learning: 'mastered',
  mastered: 'unlearned',
}
const MASTERY_ICON: Record<WordMastery, typeof Circle> = {
  unlearned: Circle,
  learning: CircleDot,
  mastered: CheckCircle2,
}

const SWITCH: { category: BoardCategory; kind: 'word' | 'wrong'; label: string }[] = [
  { category: 'korean', kind: 'word', label: '韩语单词' },
  { category: 'korean', kind: 'wrong', label: '韩语错题' },
  { category: 'ielts', kind: 'word', label: '雅思单词' },
  { category: 'ielts', kind: 'wrong', label: '雅思错题' },
]

function downloadCSV(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function BoardView({ category, kind }: Props) {
  const navigate = useNavigate()
  const wordbook = useStore((s) => s.wordbook)
  const wrongbook = useStore((s) => s.wrongbook)
  const setWordMastery = useStore((s) => s.setWordMastery)
  const removeWord = useStore((s) => s.removeWord)
  const removeWrong = useStore((s) => s.removeWrong)
  const clearWordbook = useStore((s) => s.clearWordbook)
  const clearWrongbook = useStore((s) => s.clearWrongbook)
  const addWord = useStore((s) => s.addWord)
  const addWrong = useStore((s) => s.addWrong)

  const [search, setSearch] = useState('')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [sort, setSort] = useState<'newest' | 'oldest' | 'alpha'>('newest')
  const [showAdd, setShowAdd] = useState(false)
  const [showLib, setShowLib] = useState(false)
  const [libSearch, setLibSearch] = useState('')
  // 导入
  const [showImport, setShowImport] = useState(false)
  const [parsed, setParsed] = useState<ImportItem[] | null>(null)
  const [importErrors, setImportErrors] = useState<string[]>([])
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append')
  const [importMsg, setImportMsg] = useState('')
  // 录入表单
  const [form, setForm] = useState({
    korean: '', romanization: '', english: '', phonetic: '', pos: '', chinese: '',
    question: '', yourAnswer: '', correct: '',
  })

  const isWord = kind === 'word'
  const items = (isWord ? wordbook : wrongbook).filter((x) => x.category === category)

  const sources = useMemo(() => Array.from(new Set(items.map((x) => x.source))), [items])

  const filtered = useMemo(() => {
    let list = items.slice()
    if (sourceFilter !== 'all') list = list.filter((x) => x.source === sourceFilter)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter((x) =>
        isWord
          ? (((x as any).korean || '') + (x as any).english + (x as any).chinese + ((x as any).romanization || '') + ((x as any).phonetic || '')).toLowerCase().includes(q)
          : ((x as any).question + (x as any).yourAnswer + (x as any).correct).toLowerCase().includes(q)
      )
    }
    list.sort((a, b) => {
      if (sort === 'newest') return b.createdAt - a.createdAt
      if (sort === 'oldest') return a.createdAt - b.createdAt
      const ka = ((a as any).korean || (a as any).english || '') as string
      const kb = ((b as any).korean || (b as any).english || '') as string
      return ka.localeCompare(kb, 'ko')
    })
    return list
  }, [items, sourceFilter, search, sort, isWord])

  // 掌握度统计（单词本）
  const masteryStat = useMemo(() => {
    const s = { unlearned: 0, learning: 0, mastered: 0 }
    items.forEach((x) => (s as any)[(x as any).mastery || 'unlearned']++)
    return s
  }, [items])

  const title = `${CAT_LABEL[category]}${isWord ? '单词本' : '错题本'}`

  const handleExport = () => {
    if (isWord) {
      const rows: (string | number)[][] = [['来源', '分类', '韩文', '罗马音', '英文', '音标', '词性', '中文', '掌握度', '添加时间']]
      items.forEach((w: any) =>
        rows.push([w.source, CAT_LABEL[category], w.korean || '', w.romanization || '', w.english || '', w.phonetic || '', w.pos || '', w.chinese, MASTERY_LABEL[w.mastery] || '未学', new Date(w.createdAt).toLocaleDateString()])
      )
      downloadCSV(`${title}.csv`, rows)
    } else {
      const rows: (string | number)[][] = [['来源', '分类', '题目', '你的答案', '正确答案', '添加时间']]
      items.forEach((w: any) =>
        rows.push([w.source, CAT_LABEL[category], w.question, w.yourAnswer, w.correct, new Date(w.createdAt).toLocaleDateString()])
      )
      downloadCSV(`${title}.csv`, rows)
    }
  }

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const text = String(reader.result || '')
        const res = parseImportText(text, file.name, kind, category)
        setParsed(res.items)
        setImportErrors(res.errors)
        setImportMsg('')
      } catch (err) {
        setParsed(null)
        setImportErrors([])
        setImportMsg('解析失败：' + (err as Error).message)
      }
    }
    reader.readAsText(file, 'utf-8')
    e.target.value = '' // 允许重复选择同一文件
  }

  const sameWord = (a: ImportItem, b: any) =>
    a.type === 'word' && b.type === 'word' &&
    a.category === b.category &&
    (a.korean || '') === (b.korean || '') &&
    (a.english || '') === (b.english || '') &&
    a.chinese === b.chinese
  const sameWrong = (a: ImportItem, b: any) =>
    a.type === 'wrong' && b.type === 'wrong' &&
    a.category === b.category &&
    a.question === b.question &&
    a.correct === b.correct

  const handleConfirmImport = () => {
    if (!parsed || parsed.length === 0) return
    if (importMode === 'replace') {
      isWord ? clearWordbook(category) : clearWrongbook(category)
    }
    const existing = isWord ? wordbook : wrongbook
    let added = 0
    let skipped = 0
    parsed.forEach((it) => {
      const dup = existing.some((x: any) =>
        isWord ? sameWord(it, x) : sameWrong(it, x)
      )
      if (dup) {
        skipped++
        return
      }
      if (it.type === 'word') {
        addWord({
          source: it.source,
          category: it.category,
          korean: it.korean,
          romanization: it.romanization,
          english: it.english,
          phonetic: it.phonetic,
          pos: it.pos,
          chinese: it.chinese,
          mastery: it.mastery,
        })
      } else {
        addWrong({
          source: it.source,
          category: it.category,
          question: it.question,
          yourAnswer: it.yourAnswer,
          correct: it.correct,
        })
      }
      added++
    })
    setImportMsg(`导入完成：新增 ${added} 条，跳过重复 ${skipped} 条。`)
    setShowImport(false)
    setParsed(null)
    setImportErrors([])
  }

  const handleAddWord = () => {
    if (category === 'korean') {
      if (!form.korean.trim() || !form.chinese.trim()) return
      addWord({ korean: form.korean.trim(), romanization: form.romanization.trim(), chinese: form.chinese.trim(), source: '手动添加', category })
    } else {
      if (!form.english.trim() || !form.chinese.trim()) return
      addWord({ english: form.english.trim(), phonetic: form.phonetic.trim(), pos: form.pos.trim(), chinese: form.chinese.trim(), source: '手动添加', category })
    }
    setForm({ korean: '', romanization: '', english: '', phonetic: '', pos: '', chinese: '', question: '', yourAnswer: '', correct: '' })
    setShowAdd(false)
  }

  const handleAddWrong = () => {
    if (!form.question.trim() || !form.correct.trim()) return
    addWrong({ source: '手动录入', category, question: form.question.trim(), yourAnswer: form.yourAnswer.trim() || '（未作答）', correct: form.correct.trim() })
    setForm({ korean: '', romanization: '', english: '', phonetic: '', pos: '', chinese: '', question: '', yourAnswer: '', correct: '' })
    setShowAdd(false)
  }

  const addLibWord = (w: (typeof IELTS_VOCAB)[number]) => {
    addWord({ english: w.english, phonetic: w.phonetic, pos: w.pos, chinese: w.chinese, source: '雅思词库', category: 'ielts' })
  }

  return (
    <div className="fade-in">
      <PageHeader title={title} desc={`${CAT_LABEL[category]}学习${isWord ? '收藏的单词' : '练习中的错题'}都在这里，支持分类、搜索、管理与导出。`} />

      {/* 四板块切换 */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {SWITCH.map((s) => {
          const active = s.category === category && s.kind === kind
          return (
            <button
              key={s.label}
              onClick={() => navigate(`/${s.category}/${s.kind === 'word' ? 'wordbook' : 'wrong'}`)}
              className={`px-3 py-1.5 rounded-full text-xs transition ${
                active ? 'bg-lavender text-white' : 'bg-white text-gray-500 hover:bg-lavender-light/60'
              }`}
            >
              {s.label}
            </button>
          )
        })}
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard icon={<BookMarked size={16} />} label="总数" value={items.length} />
        {isWord ? (
          <>
            <StatCard icon={<Circle size={14} />} label="未学" value={masteryStat.unlearned} color="text-gray-500" />
            <StatCard icon={<CircleDot size={14} />} label="学习中" value={masteryStat.learning} color="text-amber-500" />
            <StatCard icon={<CheckCircle2 size={14} />} label="已掌握" value={masteryStat.mastered} color="text-emerald-600" />
          </>
        ) : (
          <StatCard icon={<AlertOctagon size={16} />} label="待复习" value={items.length} color="text-coral" />
        )}
      </div>

      {/* 工具条 */}
      <div className="bg-white rounded-card shadow-card p-3 mb-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-cream flex-1 min-w-[160px]">
          <Search size={15} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索…"
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Filter size={15} />
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="bg-cream rounded-lg px-2 py-1.5 outline-none">
            <option value="all">全部来源</option>
            {sources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <ArrowUpDown size={15} />
          <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="bg-cream rounded-lg px-2 py-1.5 outline-none">
            <option value="newest">最新添加</option>
            <option value="oldest">最早添加</option>
            <option value="alpha">按字母</option>
          </select>
        </div>
        <button onClick={handleExport} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cream text-gray-600 text-sm hover:bg-lavender-light">
          <Download size={15} /> 导出
        </button>
        <button
          onClick={() => { setShowImport(true); setParsed(null); setImportErrors([]); setImportMsg('') }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cream text-gray-600 text-sm hover:bg-lavender-light"
        >
          <Upload size={15} /> 导入
        </button>
        {items.length > 0 && (
          <button
            onClick={() => {
              if (confirm(`确定清空「${title}」全部内容吗？此操作不可撤销。`)) {
                isWord ? clearWordbook(category) : clearWrongbook(category)
              }
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cream text-coral text-sm hover:bg-coral/10"
          >
            <Trash2 size={15} /> 清空
          </button>
        )}
        <button
          onClick={() => { setShowAdd((v) => !v); setShowLib(false) }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-lavender text-white text-sm hover:bg-lavender-deep"
        >
          <Plus size={15} /> {isWord ? '添加单词' : '录入错题'}
        </button>
        {isWord && category === 'ielts' && (
          <button
            onClick={() => { setShowLib((v) => !v); setShowAdd(false) }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cream text-gray-600 text-sm hover:bg-lavender-light"
          >
            <BookMarked size={15} /> 雅思词库
          </button>
        )}
      </div>

      {/* 添加表单 */}
      {showAdd && (
        <div className="bg-white rounded-card shadow-card p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {isWord ? (
            <>
              {category === 'korean' ? (
                <>
                  <Field label="韩文"><input value={form.korean} onChange={(e) => setForm({ ...form, korean: e.target.value })} className="inp" placeholder="예: 안녕하세요" /></Field>
                  <Field label="罗马音"><input value={form.romanization} onChange={(e) => setForm({ ...form, romanization: e.target.value })} className="inp" placeholder="annyeonghaseyo" /></Field>
                </>
              ) : (
                <>
                  <Field label="英文"><input value={form.english} onChange={(e) => setForm({ ...form, english: e.target.value })} className="inp" placeholder="sustainable" /></Field>
                  <Field label="音标"><input value={form.phonetic} onChange={(e) => setForm({ ...form, phonetic: e.target.value })} className="inp" placeholder="/səˈsteɪnəbl/" /></Field>
                  <Field label="词性"><input value={form.pos} onChange={(e) => setForm({ ...form, pos: e.target.value })} className="inp" placeholder="adj." /></Field>
                </>
              )}
              <Field label="中文释义" full><input value={form.chinese} onChange={(e) => setForm({ ...form, chinese: e.target.value })} className="inp" placeholder="可持续的" /></Field>
              <div className="sm:col-span-2 flex justify-end gap-2">
                <button onClick={() => setShowAdd(false)} className="px-4 py-1.5 rounded-full bg-cream text-gray-500 text-sm">取消</button>
                <button onClick={handleAddWord} className="px-4 py-1.5 rounded-full bg-lavender text-white text-sm">保存</button>
              </div>
            </>
          ) : (
            <>
              <Field label="题目" full><textarea value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="inp" rows={2} placeholder="题干内容…" /></Field>
              <Field label="你的答案"><input value={form.yourAnswer} onChange={(e) => setForm({ ...form, yourAnswer: e.target.value })} className="inp" placeholder="（选错的答案）" /></Field>
              <Field label="正确答案"><input value={form.correct} onChange={(e) => setForm({ ...form, correct: e.target.value })} className="inp" placeholder="正确答案" /></Field>
              <div className="sm:col-span-2 flex justify-end gap-2">
                <button onClick={() => setShowAdd(false)} className="px-4 py-1.5 rounded-full bg-cream text-gray-500 text-sm">取消</button>
                <button onClick={handleAddWrong} className="px-4 py-1.5 rounded-full bg-lavender text-white text-sm">保存</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* 雅思词库浏览器 */}
      {showLib && isWord && category === 'ielts' && (
        <div className="bg-white rounded-card shadow-card p-4 mb-4">
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-cream mb-3 max-w-xs">
            <Search size={15} className="text-gray-400" />
            <input value={libSearch} onChange={(e) => setLibSearch(e.target.value)} placeholder="搜索词库…" className="bg-transparent outline-none text-sm w-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto">
            {IELTS_VOCAB.filter((w) => !libSearch.trim() || (w.english + w.chinese).toLowerCase().includes(libSearch.trim().toLowerCase())).map((w) => (
              <div key={w.english} className="flex items-center justify-between border border-lavender-light rounded-xl px-3 py-2">
                <div>
                  <div className="text-sm font-medium">{w.english} <span className="text-xs text-gray-400">{w.phonetic} {w.pos}</span></div>
                  <div className="text-xs text-gray-500">{w.chinese}</div>
                </div>
                <button onClick={() => addLibWord(w)} className="text-lavender-deep hover:text-lavender text-sm">+ 收藏</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 列表 */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-card shadow-card p-8 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
          <BookMarked size={24} />
          {items.length === 0
            ? isWord
              ? category === 'korean'
                ? '还没有收藏韩语单词，去词汇/语法/对话模块点「收藏」吧。'
                : '雅思单词本还是空的，点上方「添加单词」或「雅思词库」开始积累。'
              : '还没有错题，去做「综合练习」或录入一道吧。'
            : '没有符合筛选条件的内容。'}
        </div>
      ) : isWord ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((w: any) => {
            const speakText = w.korean || w.english
            const Icon = MASTERY_ICON[w.mastery] || Circle
            return (
              <div key={w.id} className="bg-white rounded-card shadow-card p-4 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {w.korean && <span className="text-2xl korean-font font-bold text-lavender-deep">{w.korean}</span>}
                      {w.english && <span className="text-xl font-bold text-lavender-deep">{w.english}</span>}
                      {speakText && <SpeakerButton text={speakText} size={14} />}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {[w.romanization, w.phonetic, w.pos].filter(Boolean).join('  ')}
                    </div>
                    <div className="text-sm">{w.chinese}</div>
                    <div className="text-[10px] text-gray-400 mt-1">来源：{w.source}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => setWordMastery(w.id, MASTERY_NEXT[w.mastery] || 'learning')}
                    title="点击切换掌握度"
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                      w.mastery === 'mastered'
                        ? 'bg-mint/40 text-emerald-700'
                        : w.mastery === 'learning'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Icon size={13} /> {MASTERY_LABEL[w.mastery] || '未学'}
                  </button>
                  <button onClick={() => removeWord(w.id)} className="text-gray-300 hover:text-coral" title="删除">
                    <BookmarkX size={18} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((w: any) => (
            <div key={w.id} className="bg-white rounded-card shadow-card p-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">{w.question}</span>
                <button onClick={() => removeWrong(w.id)} className="text-gray-300 hover:text-coral shrink-0" title="删除">
                  <BookmarkX size={16} />
                </button>
              </div>
              <div className="text-xs mt-1 text-coral">你的答案：{w.yourAnswer}</div>
              <div className="text-xs mt-1 text-emerald-600">正确答案：{w.correct}</div>
              <div className="text-[10px] text-gray-400 mt-1">来源：{w.source} · {new Date(w.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}

      {/* 导入弹窗 */}
      {showImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowImport(false)}>
          <div
            className="bg-white rounded-card shadow-card w-full max-w-lg max-h-[85vh] overflow-y-auto p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-700">导入{CAT_LABEL[category]}{isWord ? '单词' : '错题'}</h3>
              <button onClick={() => setShowImport(false)} className="text-gray-300 hover:text-gray-500 text-xl leading-none">×</button>
            </div>

            {!parsed && (
              <>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  支持 CSV（与「导出」格式一致，含表头）或 JSON（对象数组，键名支持中文/英文）。
                  表头自动识别：来源 / 分类 / 韩文 / 罗马音 / 英文 / 音标 / 词性 / 中文 / 掌握度（单词），
                  或 来源 / 分类 / 题目 / 你的答案 / 正确答案（错题）。缺字段可留空，按当前板块自动归属。
                </p>
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-lavender-light rounded-xl py-8 cursor-pointer hover:bg-lavender-light/40 transition">
                  <Upload size={28} className="text-lavender" />
                  <span className="text-sm text-gray-500">点击选择 CSV / JSON 文件</span>
                  <input type="file" accept=".csv,.json,text/csv,application/json" onChange={handleImportFile} className="hidden" />
                </label>
                {importMsg && <div className="mt-3 text-sm text-coral">{importMsg}</div>}
              </>
            )}

            {parsed && (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <label className="flex items-center gap-1 text-sm text-gray-600">
                    <input type="radio" checked={importMode === 'append'} onChange={() => setImportMode('append')} /> 追加（跳过重复）
                  </label>
                  <label className="flex items-center gap-1 text-sm text-gray-600">
                    <input type="radio" checked={importMode === 'replace'} onChange={() => setImportMode('replace')} /> 覆盖当前板块
                  </label>
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  共解析 <b className="text-lavender-deep">{parsed.length}</b> 条有效数据
                  {importErrors.length > 0 && <span className="text-coral">，{importErrors.length} 行已跳过</span>}。
                </div>

                {importErrors.length > 0 && (
                  <div className="text-xs text-coral bg-coral/5 rounded-lg p-2 mb-2 max-h-24 overflow-y-auto">
                    {importErrors.slice(0, 8).map((e, i) => (<div key={i}>· {e}</div>))}
                    {importErrors.length > 8 && <div>…等共 {importErrors.length} 条</div>}
                  </div>
                )}

                <div className="border border-lavender-light rounded-xl divide-y max-h-56 overflow-y-auto mb-3">
                  {parsed.slice(0, 50).map((it, i) => (
                    <div key={i} className="px-3 py-1.5 text-xs flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${it.category === 'korean' ? 'bg-lavender-light text-lavender-deep' : 'bg-mint/40 text-emerald-700'}`}>
                        {it.category === 'korean' ? '韩语' : '雅思'}
                      </span>
                      <span className="truncate">
                        {it.type === 'word'
                          ? `${it.korean || it.english || ''} · ${it.chinese}`
                          : `${it.question} → ${it.correct}`}
                      </span>
                    </div>
                  ))}
                  {parsed.length > 50 && <div className="px-3 py-1.5 text-xs text-gray-400">…仅预览前 50 条</div>}
                </div>

                <div className="flex justify-end gap-2">
                  <button onClick={() => { setShowImport(false); setParsed(null) }} className="px-4 py-1.5 rounded-full bg-cream text-gray-500 text-sm">取消</button>
                  <button onClick={handleConfirmImport} className="px-4 py-1.5 rounded-full bg-lavender text-white text-sm hover:bg-lavender-deep">确认导入</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {importMsg && !showImport && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-lavender-deep text-white text-sm px-4 py-2 rounded-full shadow-lg">
          {importMsg}
        </div>
      )}
    </div>
  )
}

function StatCard({ icon, label, value, color = 'text-lavender-deep' }: { icon: React.ReactNode; label: string; value: number; color?: string }) {
  return (
    <div className="bg-white rounded-card shadow-card p-3 flex items-center gap-2">
      <span className={color}>{icon}</span>
      <div>
        <div className="text-lg font-bold text-gray-700">{value}</div>
        <div className="text-[11px] text-gray-400">{label}</div>
      </div>
    </div>
  )
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`flex flex-col gap-1 ${full ? 'sm:col-span-2' : ''}`}>
      <span className="text-xs text-gray-500">{label}</span>
      {children}
    </label>
  )
}
