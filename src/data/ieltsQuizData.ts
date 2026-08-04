import type { QuizQ } from '../components/IeltsQuiz'

// 雅思四模块自测题（提交后错题自动归档进雅思错题本）
export const listeningQuiz: QuizQ[] = [
  { q: 'Section 1 常考场景是？', options: ['学术讲座', '日常咨询/住宿旅游', '课堂讨论'], answer: 1, explain: 'Section 1 多为日常对话（住宿、旅游、报名等）。' },
  { q: '听到数字 "fifteen" 与 "fifty" 易混淆，关键是听清？', options: ['元音长短', '重音位置', '尾音鼻音'], answer: 0, explain: '/ɪ/ 与 /aɪ/ 元音区分是辨音重点。' },
  { q: '地图题常用方位词不包括？', options: ['opposite', 'next to', 'however'], answer: 2, explain: 'however 是转折连词，非方位词。' },
]

export const readingQuiz: QuizQ[] = [
  { q: 'TRUE / FALSE / NOT GIVEN 中，原文未提及该信息应选？', options: ['FALSE', 'NOT GIVEN', 'TRUE'], answer: 1, explain: '原文无对应信息 → NOT GIVEN。' },
  { q: '判断题中 "All students passed" 与原文 "Most students passed" 的关系是？', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 1, explain: '原文说大多数，不能推出全部，故 FALSE。' },
  { q: 'Heading Matching 应优先找？', options: ['例子', '主旨句（常在段首/段尾）', '数字'], answer: 1, explain: '段落主旨句多在段首或段尾。' },
]

export const speakingQuiz: QuizQ[] = [
  { q: 'Part 2 个人陈述的标准时长是？', options: ['1 分钟准备 + 2 分钟陈述', '3 分钟陈述', '5 分钟'], answer: 0, explain: 'Part 2：1 分钟准备，2 分钟陈述。' },
  { q: '提升流利度应避免？', options: ['适当停顿思考', '频繁自我纠正', '使用连接词'], answer: 1, explain: '频繁自我纠正会破坏流利度。' },
]

export const writingQuiz: QuizQ[] = [
  { q: '大作文 "To what extent do you agree?" 属于？', options: ['同意与否型', '优缺点型', '原因措施型'], answer: 0, explain: '典型同意与否（opinion）题型。' },
  { q: '小作文时间分配建议？', options: ['20 分钟', '40 分钟', '60 分钟'], answer: 0, explain: '小作文严格 20 分钟，大作文 40 分钟。' },
]
