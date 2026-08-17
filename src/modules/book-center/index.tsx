import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, BookOpen, Headphones, BookMarked, Radio, Filter } from 'lucide-react'
import { PageHeader } from '../../components/Layout'
import { books, getBook, type Book, type BookLanguage, type BookLevel, type BookType } from '../../data/books'
import { tracksByBook, audioTracks } from '../../data/audio-tracks'
import { ximalayaAlbums } from '../../data/ximalaya-albums'
import AudioPlayer from '../../components/AudioPlayer'
import BookVocab from './BookVocab'

type Tab = 'shelf' | 'audio' | 'vocab' | 'platform'

const levelLabel: Record<BookLevel, string> = { beginner: '初级', intermediate: '中级', advanced: '高级' }
const typeLabel: Record<BookType, string> = {
  comprehensive: '综合', grammar: '语法', vocab: '词汇', culture: '文化',
  listening: '听力', reading: '阅读', writing: '写作', speaking: '口语', 'practice-test': '真题',
}

export default function BookCenter() {
  const [tab, setTab] = useState<Tab>('shelf')
  const [lang, setLang] = useState<'all' | BookLanguage>('all')
  const [lv, setLv] = useState<'all' | BookLevel>('all')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<'added' | 'name' | 'level'>('added')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    let r = books.filter(
      (b) =>
        (lang === 'all' || b.language === lang) &&
        (lv === 'all' || b.level === lv) &&
        (q === '' || b.title.includes(q) || b.author.includes(q) || b.tags.some((t) => t.includes(q)))
    )
    if (sort === 'name') r = [...r].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'level') r = [...r].sort((a, b) => ['beginner', 'intermediate', 'advanced'].indexOf(a.level) - ['beginner', 'intermediate', 'advanced'].indexOf(b.level))
    return r
  }, [lang, lv, q, sort])

  return (
    <div className="fade-in">
      <PageHeader title="📚 教材中心" desc="电子书阅读 + 配套音频 + 教材词书，一站式学习闭环。" />

      {/* Tab 切换 */}
      <div className="flex gap-1 mb-4 bg-white rounded-full p-1 shadow-card w-full overflow-x-auto">
        {([
          { k: 'shelf', label: '书架', icon: BookOpen },
          { k: 'audio', label: '音频库', icon: Headphones },
          { k: 'vocab', label: '教材词书', icon: BookMarked },
          { k: 'platform', label: '在线音频', icon: Radio },
        ] as { k: Tab; label: string; icon: typeof BookOpen }[]).map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-sm whitespace-nowrap ${
              tab === t.k ? 'bg-lavender text-white shadow-soft' : 'text-gray-500'
            }`}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'shelf' && (
        <>
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <div className="flex items-center gap-1 bg-white rounded-full px-3 shadow-card flex-1 min-w-[180px]">
              <Search size={15} className="text-gray-400" />
              <input className="inp flex-1 bg-transparent" placeholder="搜索书名 / 作者 / 标签" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <select className="inp" value={lang} onChange={(e) => setLang(e.target.value as any)}>
              <option value="all">全部语言</option>
              <option value="korean">🇰🇷 韩语</option>
              <option value="english">🇬🇧 雅思</option>
            </select>
            <select className="inp" value={lv} onChange={(e) => setLv(e.target.value as any)}>
              <option value="all">全部级别</option>
              <option value="beginner">初级</option>
              <option value="intermediate">中级</option>
              <option value="advanced">高级</option>
            </select>
            <select className="inp" value={sort} onChange={(e) => setSort(e.target.value as any)}>
              <option value="added">按添加时间</option>
              <option value="name">按名称</option>
              <option value="level">按难度</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((b) => (
              <BookCard key={b.id} book={b} onClick={() => navigate(`/books/reader/${b.id}`)} />
            ))}
          </div>
          {filtered.length === 0 && <div className="text-center text-gray-400 py-10">没有匹配的教材。</div>}
        </>
      )}

      {tab === 'audio' && <BookAudio />}
      {tab === 'vocab' && <BookVocab />}

      {tab === 'platform' && (
        <div className="space-y-3">
          <div className="rounded-card bg-blue-50 p-3 text-sm text-blue-700">
            在线平台凭据不再保存在浏览器中；当前仅提供专辑入口，避免把 client secret 暴露给前端脚本。
          </div>
          {(['korean', 'english'] as const).map((lg) => (
            <div key={lg}>
              <div className="text-sm font-medium text-lavender-deep mb-2">
                {lg === 'korean' ? '🇰🇷 韩语教材专辑' : '🇬🇧 雅思教材专辑'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ximalayaAlbums.filter((a) => a.language === lg).map((a) => (
                  <div key={a.id} className="bg-white rounded-card shadow-card p-3">
                    <div className="font-medium text-gray-700">{a.name}</div>
                    <div className="text-xs text-gray-400 mb-1">共 {a.lessons} 期 · {a.note}</div>
                    <a href={a.albumUrl} target="_blank" rel="noreferrer" className="text-xs text-lavender-deep underline">
                      在喜马拉雅打开 ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function BookCard({ book, onClick }: { book: Book; onClick: () => void }) {
  const tracks = tracksByBook(book.id)
  return (
    <button onClick={onClick} className="bg-white rounded-card shadow-card overflow-hidden text-left hover:shadow-soft transition group">
      <div className="h-28 bg-gradient-to-br from-lavender-light to-lavender/30 flex items-center justify-center text-5xl relative">
        {book.coverEmoji}
        {book.isFavorite && <Star size={16} className="absolute top-2 right-2 text-yellow-400 fill-yellow-400" />}
        <span className={`absolute top-2 left-2 text-[10px] px-1.5 py-0.5 rounded-full ${book.language === 'english' ? 'bg-blue-100 text-blue-600' : 'bg-white/80 text-lavender-deep'}`}>
          {book.language === 'english' ? '雅思' : '韩语'}
        </span>
      </div>
      <div className="p-3">
        <div className="font-medium text-gray-800 text-sm truncate">{book.title}</div>
        <div className="text-xs text-gray-400 truncate">{book.author}</div>
        <div className="flex gap-1 mt-2 flex-wrap">
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cream text-gray-500">{levelLabel[book.level]}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cream text-gray-500">{typeLabel[book.type]}</span>
        </div>
        {tracks.length > 0 && (
          <div className="text-[10px] text-lavender-deep mt-1 flex items-center gap-1">
            <Headphones size={11} /> {tracks.length} 条音频
          </div>
        )}
      </div>
    </button>
  )
}

function BookAudio() {
  const [bookId, setBookId] = useState<string>('all')
  const opts = Array.from(new Set(audioTracks.map((t) => t.bookId)))
  const tracks = bookId === 'all' ? audioTracks : tracksByBook(bookId)
  return (
    <div>
      <div className="flex gap-2 mb-3 flex-wrap">
        <button onClick={() => setBookId('all')} className={`px-3 py-1.5 rounded-full text-sm ${bookId === 'all' ? 'bg-lavender text-white' : 'bg-cream text-gray-500'}`}>全部</button>
        {opts.map((id) => (
          <button key={id} onClick={() => setBookId(id)} className={`px-3 py-1.5 rounded-full text-sm ${bookId === id ? 'bg-lavender text-white' : 'bg-cream text-gray-500'}`}>
            {getBook(id)?.title || id}
          </button>
        ))}
      </div>
      <AudioPlayer tracks={tracks} />
    </div>
  )
}
