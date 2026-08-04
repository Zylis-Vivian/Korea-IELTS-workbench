// 教材词书种子数据（按「教材音频整合」文档 6.3 预置）。
// 后续可从 PDF 提取或手动扩充。韩语词接入「韩语单词本」，英语词接入「雅思单词本」。
export interface BookWord {
  korean?: string
  english?: string
  chinese: string
  phonetic?: string
  example?: string
  exampleCn?: string
}

export interface BookLessonVocab {
  bookId: string
  lesson: number
  lessonTitle: string
  words: BookWord[]
}

export const bookVocab: BookLessonVocab[] = [
  // ───────── 延世韩国语 1（前 3 课） ─────────
  {
    bookId: 'yonsei-1', lesson: 1, lessonTitle: '안녕하세요 您好',
    words: [
      { korean: '안녕하세요', chinese: '您好（敬语）', phonetic: 'an-nyeong-ha-se-yo', example: '안녕하세요. 처음 뵙겠습니다.', exampleCn: '您好，初次见面。' },
      { korean: '감사합니다', chinese: '谢谢', phonetic: 'gam-sa-hap-ni-da', example: '도와주셔서 감사합니다.', exampleCn: '谢谢您的帮助。' },
      { korean: '네', chinese: '是', phonetic: 'ne' },
      { korean: '아니요', chinese: '不是', phonetic: 'a-ni-yo' },
      { korean: '이름', chinese: '名字', phonetic: 'i-reum', example: '이름이 무엇입니까?', exampleCn: '您叫什么名字？' },
    ],
  },
  {
    bookId: 'yonsei-1', lesson: 2, lessonTitle: '학교 学校',
    words: [
      { korean: '학교', chinese: '学校', phonetic: 'hak-kkyo', example: '학교에 가요.', exampleCn: '去学校。' },
      { korean: '도서관', chinese: '图书馆', phonetic: 'do-seo-gwan' },
      { korean: '친구', chinese: '朋友', phonetic: 'chin-gu', example: '친구를 만났어요.', exampleCn: '见了朋友。' },
      { korean: '책', chinese: '书', phonetic: 'chaek' },
      { korean: '공부하다', chinese: '学习', phonetic: 'gong-bu-ha-da' },
    ],
  },
  {
    bookId: 'yonsei-1', lesson: 3, lessonTitle: '가족 家人',
    words: [
      { korean: '가족', chinese: '家人', phonetic: 'ga-jok' },
      { korean: '어머니', chinese: '母亲', phonetic: 'eo-meo-ni' },
      { korean: '아버지', chinese: '父亲', phonetic: 'a-beo-ji' },
      { korean: '형제', chinese: '兄弟', phonetic: 'hyeong-je' },
      { korean: '사랑하다', chinese: '爱', phonetic: 'sa-rang-ha-da' },
    ],
  },
  // ───────── 标准韩国语 1（部分） ─────────
  {
    bookId: 'std-korean-1', lesson: 1, lessonTitle: '기초 基础',
    words: [
      { korean: '안녕', chinese: '你好/再见（平语）', phonetic: 'an-nyeong' },
      { korean: '잘', chinese: '好（副词）', phonetic: 'jal' },
      { korean: '먹다', chinese: '吃', phonetic: 'meok-da' },
      { korean: '마시다', chinese: '喝', phonetic: 'ma-si-da' },
      { korean: '주다', chinese: '给', phonetic: 'ju-da' },
    ],
  },
  // ───────── 剑桥雅思 阅读高频词（英语，接入雅思单词本） ─────────
  {
    bookId: 'cambridge-10', lesson: 0, lessonTitle: '阅读高频词',
    words: [
      { english: 'hypothesis', chinese: '假设', phonetic: '/haɪˈpɒθəsɪs/', example: 'The hypothesis was tested.', exampleCn: '该假设被检验。' },
      { english: 'methodology', chinese: '方法论', phonetic: '/ˌmeθəˈdɒlədʒi/' },
      { english: 'sustainable', chinese: '可持续的', phonetic: '/səˈsteɪnəbl/' },
      { english: 'biodiversity', chinese: '生物多样性', phonetic: '/ˌbaɪəʊdaɪˈvɜːsəti/' },
      { english: 'inevitable', chinese: '不可避免的', phonetic: '/ɪnˈevɪtəbl/' },
      { english: 'consequence', chinese: '后果', phonetic: '/ˈkɒnsɪkwəns/' },
      { english: 'significant', chinese: '显著的', phonetic: '/sɪɡˈnɪfɪkənt/' },
      { english: 'phenomenon', chinese: '现象', phonetic: '/fəˈnɒmɪnən/' },
      { english: 'equivalent', chinese: '等价的', phonetic: '/ɪˈkwɪvələnt/' },
      { english: 'coordinates', chinese: '坐标', phonetic: '/kəʊˈɔːdɪneɪts/' },
    ],
  },
]

export function vocabByBook(bookId: string): BookLessonVocab[] {
  return bookVocab.filter((v) => v.bookId === bookId)
}
