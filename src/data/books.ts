// 教材中心：23 本教材元数据（按「教材音频整合」文档 2.3 预置清单）
// 即使 PDF 还未放入 public/books，也先建好完整记录；pdf_path 留空时阅读器显示上传引导
export type BookLanguage = 'korean' | 'english'
export type BookLevel = 'beginner' | 'intermediate' | 'advanced'
export type BookType =
  | 'comprehensive'
  | 'grammar'
  | 'vocab'
  | 'culture'
  | 'listening'
  | 'reading'
  | 'writing'
  | 'speaking'
  | 'practice-test'

export interface Book {
  id: string
  title: string
  titleOriginal: string
  author: string
  publisher: string
  language: BookLanguage
  level: BookLevel
  type: BookType
  pdfPath: string // /books/korean/xxx.pdf ，空字符串表示未放入
  audioFolder: string // /audio/korean/xxx/
  coverEmoji: string // 占位封面（无真实图时）
  totalPages: number
  totalLessons: number
  description: string
  tags: string[]
  source: string
  addedDate: string
  progress: number // 0-100
  currentPage: number
  isFavorite: boolean
}

export const books: Book[] = [
  // ───────── 韩语教材 ─────────
  { id: 'std-korean-1', title: '标准韩国语 第一册', titleOriginal: '표준한국어 1', author: '安炳浩 等', publisher: '北京大学出版社', language: 'korean', level: 'beginner', type: 'comprehensive', pdfPath: '', audioFolder: '/audio/korean/std-korean-1/', coverEmoji: '📘', totalPages: 320, totalLessons: 30, description: '国内高校韩语专业经典教材，体系完整，适合零基础入门。', tags: ['综合', '零基础', '北大'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: true },
  { id: 'std-korean-2', title: '标准韩国语 第二册', titleOriginal: '표준한국어 2', author: '安炳浩 等', publisher: '北京大学出版社', language: 'korean', level: 'intermediate', type: 'comprehensive', pdfPath: '', audioFolder: '/audio/korean/std-korean-2/', coverEmoji: '📗', totalPages: 340, totalLessons: 30, description: '承接第一册，进入中级语法与会话。', tags: ['综合', '中级'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'yonsei-1', title: '延世韩国语 1', titleOriginal: '연세 한국어 1', author: '延世大学韩国语学堂', publisher: '延世大学出版社', language: 'korean', level: 'beginner', type: 'comprehensive', pdfPath: '', audioFolder: '/audio/korean/yonsei-1/', coverEmoji: '📕', totalPages: 280, totalLessons: 10, description: '全球最广泛使用的新版延世教材，配套音频极其完善。', tags: ['综合', '零基础', '热门'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: true },
  { id: 'yonsei-2', title: '延世韩国语 2', titleOriginal: '연세 한국어 2', author: '延世大学韩国语学堂', publisher: '延世大学出版社', language: 'korean', level: 'beginner', type: 'comprehensive', pdfPath: '', audioFolder: '/audio/korean/yonsei-2/', coverEmoji: '📕', totalPages: 290, totalLessons: 10, description: '初级下，巩固四十音后的基础表达。', tags: ['综合', '初级'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'yonsei-3', title: '延世韩国语 3', titleOriginal: '연세 한국어 3', author: '延世大学韩国语学堂', publisher: '延世大学出版社', language: 'korean', level: 'intermediate', type: 'comprehensive', pdfPath: '', audioFolder: '/audio/korean/yonsei-3/', coverEmoji: '📙', totalPages: 300, totalLessons: 10, description: '中级上，话题更贴近生活与社会。', tags: ['综合', '中级'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'yonsei-4', title: '延世韩国语 4', titleOriginal: '연세 한국어 4', author: '延世大学韩国语学堂', publisher: '延世大学出版社', language: 'korean', level: 'intermediate', type: 'comprehensive', pdfPath: '', audioFolder: '/audio/korean/yonsei-4/', coverEmoji: '📙', totalPages: 305, totalLessons: 10, description: '中级下，衔接 TOPIK 3-4 级。', tags: ['综合', '中级'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'yonsei-5', title: '延世韩国语 5', titleOriginal: '연세 한국어 5', author: '延世大学韩国语学堂', publisher: '延世大学出版社', language: 'korean', level: 'advanced', type: 'comprehensive', pdfPath: '', audioFolder: '/audio/korean/yonsei-5/', coverEmoji: '📒', totalPages: 310, totalLessons: 10, description: '高级上。', tags: ['综合', '高级'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'yonsei-6', title: '延世韩国语 6', titleOriginal: '연세 한국어 6', author: '延世大学韩国语学堂', publisher: '延世大学出版社', language: 'korean', level: 'advanced', type: 'comprehensive', pdfPath: '', audioFolder: '/audio/korean/yonsei-6/', coverEmoji: '📒', totalPages: 315, totalLessons: 10, description: '高级下，接近母语水平。', tags: ['综合', '高级'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'new-yonsei-1', title: '新版延世韩国语 1（听力）', titleOriginal: 'NEW 연세 한국어 1', author: '延世大学韩国语学堂', publisher: '延世大学出版社', language: 'korean', level: 'beginner', type: 'listening', pdfPath: '', audioFolder: '/audio/korean/new-yonsei-1/', coverEmoji: '🎧', totalPages: 160, totalLessons: 10, description: '按技能分册版·听力册。', tags: ['听力', '分册'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'sejong-1', title: '世宗韩国语 1', titleOriginal: '세종한국어 1', author: '世宗学堂财团', publisher: '世宗学堂', language: 'korean', level: 'beginner', type: 'comprehensive', pdfPath: '', audioFolder: '/audio/korean/sejong-1/', coverEmoji: '👑', totalPages: 240, totalLessons: 12, description: '韩国政府官方推广教材，文化内容多。', tags: ['综合', '文化'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'sejong-2', title: '世宗韩国语 2', titleOriginal: '세종한국어 2', author: '世宗学堂财团', publisher: '世宗学堂', language: 'korean', level: 'beginner', type: 'comprehensive', pdfPath: '', audioFolder: '/audio/korean/sejong-2/', coverEmoji: '👑', totalPages: 245, totalLessons: 12, description: '初级下。', tags: ['综合'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'vitamin-1', title: '维他命韩国语 1', titleOriginal: '비타민 한국어 1', author: '韩国多乐园', publisher: '多乐园', language: 'korean', level: 'beginner', type: 'comprehensive', pdfPath: '', audioFolder: '/audio/korean/vitamin-1/', coverEmoji: '💊', totalPages: 220, totalLessons: 25, description: '全彩印刷，趣味性强，适合自学者。', tags: ['综合', '全彩'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'grammar-live-basic', title: '活学活用韩国语语法（初级）', titleOriginal: '외국인을 위한 한국어 문법', author: '韩国教育振兴研究会', publisher: '进明出版社', language: 'korean', level: 'beginner', type: 'grammar', pdfPath: '', audioFolder: '/audio/korean/grammar-basic/', coverEmoji: '📐', totalPages: 360, totalLessons: 40, description: '按主题归纳初级语法，讲解清晰。', tags: ['语法', '初级'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'grammar-live-inter', title: '活学活用韩国语语法（中级）', titleOriginal: '외국인을 위한 한국어 문법', author: '韩国教育振兴研究会', publisher: '进明出版社', language: 'korean', level: 'intermediate', type: 'grammar', pdfPath: '', audioFolder: '/audio/korean/grammar-inter/', coverEmoji: '📐', totalPages: 380, totalLessons: 45, description: '中级语法系统梳理。', tags: ['语法', '中级'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'grammar-live-adv', title: '活学活用韩国语语法（高级）', titleOriginal: '외국인을 위한 한국어 문법', author: '韩国教育振兴研究会', publisher: '进明出版社', language: 'korean', level: 'advanced', type: 'grammar', pdfPath: '', audioFolder: '/audio/korean/grammar-adv/', coverEmoji: '📐', totalPages: 400, totalLessons: 50, description: '高级语法与语体。', tags: ['语法', '高级'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'cultural-korean-1', title: '有文化的韩国语 1', titleOriginal: '문화가 있는 한국어 1', author: '韩国文化院', publisher: '韩国文化院', language: 'korean', level: 'beginner', type: 'culture', pdfPath: '', audioFolder: '/audio/korean/cultural-1/', coverEmoji: '🏯', totalPages: 200, totalLessons: 15, description: '通过文化主题学韩语。', tags: ['文化', '初级'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'real-life-korean', title: 'Real-Life Korean', titleOriginal: 'Real-Life Korean', author: 'Talk To Me In Korean', publisher: 'TTMIK', language: 'korean', level: 'intermediate', type: 'speaking', pdfPath: '', audioFolder: '/audio/korean/real-life/', coverEmoji: '💬', totalPages: 260, totalLessons: 20, description: '地道口语表达，源自热门播客。', tags: ['口语', '地道'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'korean-pron-guide', title: '韩语发音指南（带音频）', titleOriginal: '한국어 발음 가이드', author: '韩语发音研究所', publisher: '韩语发音研究所', language: 'korean', level: 'beginner', type: 'listening', pdfPath: '', audioFolder: '/audio/korean/pron-guide/', coverEmoji: '🔊', totalPages: 180, totalLessons: 20, description: '逐音标发音要领与最小对立对练习。', tags: ['发音', '入门'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },

  // ───────── 雅思教材 ─────────
  { id: 'cambridge-10', title: '剑桥雅思 10', titleOriginal: 'Cambridge IELTS 10', author: 'Cambridge ESOL', publisher: 'Cambridge University Press', language: 'english', level: 'intermediate', type: 'practice-test', pdfPath: '', audioFolder: '/audio/ielts/cambridge-10/', coverEmoji: '🟦', totalPages: 180, totalLessons: 4, description: '真题集，含 4 套完整试题 + 听力音频。', tags: ['真题', '听力', '写作'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: true },
  { id: 'cambridge-11', title: '剑桥雅思 11', titleOriginal: 'Cambridge IELTS 11', author: 'Cambridge ESOL', publisher: 'Cambridge University Press', language: 'english', level: 'intermediate', type: 'practice-test', pdfPath: '', audioFolder: '/audio/ielts/cambridge-11/', coverEmoji: '🟦', totalPages: 180, totalLessons: 4, description: '真题集 11。', tags: ['真题'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'cambridge-12', title: '剑桥雅思 12', titleOriginal: 'Cambridge IELTS 12', author: 'Cambridge ESOL', publisher: 'Cambridge University Press', language: 'english', level: 'intermediate', type: 'practice-test', pdfPath: '', audioFolder: '/audio/ielts/cambridge-12/', coverEmoji: '🟦', totalPages: 180, totalLessons: 4, description: '真题集 12。', tags: ['真题'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'cambridge-13', title: '剑桥雅思 13', titleOriginal: 'Cambridge IELTS 13', author: 'Cambridge ESOL', publisher: 'Cambridge University Press', language: 'english', level: 'intermediate', type: 'practice-test', pdfPath: '', audioFolder: '/audio/ielts/cambridge-13/', coverEmoji: '🟦', totalPages: 180, totalLessons: 4, description: '真题集 13。', tags: ['真题'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'cambridge-14', title: '剑桥雅思 14', titleOriginal: 'Cambridge IELTS 14', author: 'Cambridge ESOL', publisher: 'Cambridge University Press', language: 'english', level: 'intermediate', type: 'practice-test', pdfPath: '', audioFolder: '/audio/ielts/cambridge-14/', coverEmoji: '🟦', totalPages: 180, totalLessons: 4, description: '真题集 14。', tags: ['真题'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'cambridge-15', title: '剑桥雅思 15', titleOriginal: 'Cambridge IELTS 15', author: 'Cambridge ESOL', publisher: 'Cambridge University Press', language: 'english', level: 'intermediate', type: 'practice-test', pdfPath: '', audioFolder: '/audio/ielts/cambridge-15/', coverEmoji: '🟦', totalPages: 180, totalLessons: 4, description: '真题集 15。', tags: ['真题', '热门'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'cambridge-16', title: '剑桥雅思 16', titleOriginal: 'Cambridge IELTS 16', author: 'Cambridge ESOL', publisher: 'Cambridge University Press', language: 'english', level: 'intermediate', type: 'practice-test', pdfPath: '', audioFolder: '/audio/ielts/cambridge-16/', coverEmoji: '🟦', totalPages: 180, totalLessons: 4, description: '真题集 16。', tags: ['真题'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'cambridge-17', title: '剑桥雅思 17', titleOriginal: 'Cambridge IELTS 17', author: 'Cambridge ESOL', publisher: 'Cambridge University Press', language: 'english', level: 'intermediate', type: 'practice-test', pdfPath: '', audioFolder: '/audio/ielts/cambridge-17/', coverEmoji: '🟦', totalPages: 180, totalLessons: 4, description: '真题集 17。', tags: ['真题'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'cambridge-18', title: '剑桥雅思 18', titleOriginal: 'Cambridge IELTS 18', author: 'Cambridge ESOL', publisher: 'Cambridge University Press', language: 'english', level: 'intermediate', type: 'practice-test', pdfPath: '', audioFolder: '/audio/ielts/cambridge-18/', coverEmoji: '🟦', totalPages: 180, totalLessons: 4, description: '真题集 18。', tags: ['真题'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
  { id: 'cambridge-19', title: '剑桥雅思 19', titleOriginal: 'Cambridge IELTS 19', author: 'Cambridge ESOL', publisher: 'Cambridge University Press', language: 'english', level: 'intermediate', type: 'practice-test', pdfPath: '', audioFolder: '/audio/ielts/cambridge-19/', coverEmoji: '🟦', totalPages: 180, totalLessons: 4, description: '最新真题集 19。', tags: ['真题', '新'], source: 'baidu-netdisk', addedDate: '2026-07-30', progress: 0, currentPage: 1, isFavorite: false },
]

export function getBook(id: string): Book | undefined {
  return books.find((b) => b.id === id)
}
