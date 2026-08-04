// 每日学习数据：纯小白（TOPIK 1~2）水平，7 天一轮回。
// 每天包含：15-16 个单词（标注 TOPIK 等级）、5 句常用句、5 个语法点、4-5 道小考题。

export interface DailyWord {
  korean: string
  romanization: string
  chinese: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}
export interface DailySentence {
  korean: string
  romanization: string
  chinese: string
  level: number
}
export interface DailyGrammar {
  title: string
  pattern: string
  explanation: string
  example: string
  exampleCn: string
  level: number
}
export interface DailyQuiz {
  q: string
  options: string[]
  answer: number
  explain: string
}
export interface DailyLesson {
  day: number
  theme: string
  words: DailyWord[]
  sentences: DailySentence[]
  grammar: DailyGrammar[]
  quiz: DailyQuiz[]
}

export const DAILY_LESSONS: DailyLesson[] = [
  // ───────────────────────── Day 1 ─────────────────────────
  {
    day: 1,
    theme: '打招呼与自我介绍',
    words: [
      { korean: '안녕하세요', romanization: 'annyeonghaseyo', chinese: '您好（敬语）', level: 1 },
      { korean: '안녕', romanization: 'annyeong', chinese: '你好 / 再见（平语）', level: 1 },
      { korean: '감사합니다', romanization: 'gamsahamnida', chinese: '谢谢（敬语）', level: 1 },
      { korean: '고맙습니다', romanization: 'gomapseumnida', chinese: '谢谢', level: 1 },
      { korean: '죄송합니다', romanization: 'joesonghamnida', chinese: '对不起（敬语）', level: 1 },
      { korean: '네', romanization: 'ne', chinese: '是 / 好', level: 1 },
      { korean: '아니요', romanization: 'aniyo', chinese: '不 / 不是', level: 1 },
      { korean: '저는', romanization: 'jeoneun', chinese: '我（主题助词）', level: 1 },
      { korean: '이름', romanization: 'ireum', chinese: '名字', level: 1 },
      { korean: '학생', romanization: 'haksaeng', chinese: '学生', level: 1 },
      { korean: '한국', romanization: 'hanguk', chinese: '韩国', level: 1 },
      { korean: '사람', romanization: 'saram', chinese: '人', level: 1 },
      { korean: '친구', romanization: 'chingu', chinese: '朋友', level: 1 },
      { korean: '만나서 반갑습니다', romanization: 'mannaseo bangapseumnida', chinese: '很高兴见到您', level: 1 },
      { korean: '선생님', romanization: 'seonsaengnim', chinese: '老师', level: 1 },
    ],
    sentences: [
      { korean: '안녕하세요. 만나서 반갑습니다.', romanization: 'annyeonghaseyo. mannaseo bangapseumnida.', chinese: '您好，很高兴见到您。', level: 1 },
      { korean: '저는 학생입니다.', romanization: 'jeoneun haksaengimnida.', chinese: '我是学生。', level: 1 },
      { korean: '제 이름은 민준입니다.', romanization: 'je ireumeun minjunimnida.', chinese: '我的名字是敏俊。', level: 1 },
      { korean: '감사합니다. 안녕히 가세요.', romanization: 'gamsahamnida. annyeonghi gaseyo.', chinese: '谢谢。请慢走。', level: 1 },
      { korean: '이분은 제 친구입니다.', romanization: 'ibuneun je chinguimnida.', chinese: '这位是我的朋友。', level: 1 },
    ],
    grammar: [
      { title: '입니다 / ㅂ니다（正式敬语结尾）', pattern: '词干 + ㅂ니다/습니다', explanation: '动词 / 形容词词干后加 ㅂ니다 或 습니다，用于正式场合或对长辈说话。', example: '학생입니다. / 감사합니다.', exampleCn: '是学生。/ 谢谢。', level: 1 },
      { title: '이다 + 예요 / 이에요（是）', pattern: '名词 + 이에요 / 예요', explanation: '名词后表示"是"；开音节（无收音）用 예요，闭音节（有收音）用 이에요。', example: '학생이에요. / 친구예요.', exampleCn: '是学生。/ 是朋友。', level: 1 },
      { title: '은 / 는（主题标记）', pattern: '体词 + 은 / 는', explanation: '标示句子主题：闭音节用 은，开音节用 는。', example: '저는 / 이름은', exampleCn: '我（主题）/ 名字（主题）', level: 1 },
      { title: '네 / 아니요（是非回答）', pattern: '네 / 아니요', explanation: '对一般疑问句用 네（是）或 아니요（不是）回答。', example: '네, 학생입니다.', exampleCn: '是的，我是学生。', level: 1 },
      { title: '안녕하세요 vs 안녕', pattern: '敬语 / 平语', explanation: '前者是敬语，对陌生人或长辈；后者是平语，对朋友或晚辈。', example: '안녕하세요(敬) / 안녕(平)', exampleCn: '您好 / 你好', level: 1 },
    ],
    quiz: [
      { q: '"谢谢"的韩语敬语是？', options: ['감사합니다', '안녕하세요', '죄송합니다'], answer: 0, explain: '감사합니다 是"谢谢"的敬语说法。' },
      { q: '"我是学生"怎么说？', options: ['저는 학생입니다', '학생 저는입니다', '저는 학생이에요요'], answer: 0, explain: '主题助词는 用在 저 后，判断用 입니다。' },
      { q: '表示"主题"的助词是？', options: ['은 / 는', '을 / 를', '에서'], answer: 0, explain: '은/는 是主题标记，을/를 是宾格。' },
      { q: '"名字"的韩语是？', options: ['이름', '나이', '사람'], answer: 0, explain: '이름 = 名字；나이 = 年龄；사람 = 人。' },
      { q: '对长辈说"你好"应该用？', options: ['안녕', '안녕하세요', '잘 자요'], answer: 1, explain: '对长辈或陌生人用敬语 안녕하세요。' },
    ],
  },

  // ───────────────────────── Day 2 ─────────────────────────
  {
    day: 2,
    theme: '数字与年龄',
    words: [
      { korean: '하나', romanization: 'hana', chinese: '一（固有数词）', level: 1 },
      { korean: '둘', romanization: 'dul', chinese: '二（固有数词）', level: 1 },
      { korean: '셋', romanization: 'set', chinese: '三（固有数词）', level: 1 },
      { korean: '넷', romanization: 'net', chinese: '四（固有数词）', level: 1 },
      { korean: '다섯', romanization: 'daseot', chinese: '五（固有数词）', level: 1 },
      { korean: '열', romanization: 'yeol', chinese: '十（固有数词）', level: 1 },
      { korean: '스물', romanization: 'seumul', chinese: '二十（固有数词）', level: 1 },
      { korean: '나이', romanization: 'nai', chinese: '年龄', level: 1 },
      { korean: '몇', romanization: 'myeot', chinese: '几（疑问）', level: 1 },
      { korean: '살', romanization: 'sal', chinese: '岁', level: 1 },
      { korean: '십', romanization: 'sip', chinese: '十（汉字数词）', level: 2 },
      { korean: '이십', romanization: 'isip', chinese: '二十（汉字数词）', level: 2 },
      { korean: '백', romanization: 'baek', chinese: '百（汉字数词）', level: 2 },
      { korean: '서른', romanization: 'seoreun', chinese: '三十（固有数词）', level: 1 },
      { korean: '마흔', romanization: 'maheun', chinese: '四十（固有数词）', level: 1 },
    ],
    sentences: [
      { korean: '제 나이는 스무 살입니다.', romanization: 'je naineun seumu sarimnida.', chinese: '我二十岁。', level: 1 },
      { korean: '몇 살이에요?', romanization: 'myeot sarieyo?', chinese: '几岁呀？', level: 1 },
      { korean: '열 살입니다.', romanization: 'yeol sarimnida.', chinese: '十岁。', level: 1 },
      { korean: '스물다섯 살이에요.', romanization: 'seumuldaseot sarieyo.', chinese: '二十五岁。', level: 1 },
      { korean: '서른 살이에요.', romanization: 'seoreun sarieyo.', chinese: '三十岁。', level: 1 },
    ],
    grammar: [
      { title: '固有数词 vs 汉字数词', pattern: '하나~ / 일,이,삼~', explanation: '年龄、个数、顺序常用固有数词（하나,둘…）；金额、日期、电话常用汉字数词（일,이,삼…）。', example: '스무 살(年龄) / 천 원(金额)', exampleCn: '二十岁 / 一千韩元', level: 1 },
      { title: '살（岁）', pattern: '固有数词 + 살', explanation: '年龄单位，与固有数词连用。', example: '스무 살', exampleCn: '二十岁', level: 1 },
      { title: '몇（疑问词）', pattern: '몇 + 量词', explanation: '表示"几"，如 몇 살（几岁）、몇 명（几个人）。', example: '몇 살이에요?', exampleCn: '几岁了？', level: 1 },
      { title: '이에요 / 예요 复习', pattern: '名词 + 이에요 / 예요', explanation: '名词判断句，闭音节+이에요。', example: '스무 살이에요.', exampleCn: '是二十岁。', level: 1 },
      { title: '한국 나이（韩国年龄）', pattern: '—', explanation: '韩国传统算法：出生即 1 岁，每年春节 +1，叫"한국 나이"。', example: '한국 나이는 스물여덟 살', exampleCn: '韩国年龄是二十八岁', level: 2 },
    ],
    quiz: [
      { q: '"五"的固有数词是？', options: ['다섯', '오', '구'], answer: 0, explain: '다섯 是五的固有数词；오 是汉字数词"五"。' },
      { q: '"二十岁"用哪种说法？', options: ['스무 살', '이십 살', '이십세'], answer: 0, explain: '年龄用固有数词，二十岁 = 스무 살。' },
      { q: '"几岁"怎么问？', options: ['몇 살', '몇 명', '몇 개'], answer: 0, explain: '몇 살 = 几岁；몇 명 = 几个人；몇 개 = 几个。' },
      { q: '年龄一般用哪种数词？', options: ['固有数词', '汉字数词', '都可以'], answer: 0, explain: '年龄、个数用固有数词（하나~）。' },
      { q: '"百"的汉字数词是？', options: ['백', '하나', '일백'], answer: 0, explain: '백 本身就是"百"；일백 是"一百"。' },
    ],
  },

  // ───────────────────────── Day 3 ─────────────────────────
  {
    day: 3,
    theme: '家庭与人物',
    words: [
      { korean: '가족', romanization: 'gajok', chinese: '家人', level: 1 },
      { korean: '아버지', romanization: 'abeoji', chinese: '爸爸', level: 1 },
      { korean: '어머니', romanization: 'eomeoni', chinese: '妈妈', level: 1 },
      { korean: '오빠', romanization: 'oppa', chinese: '哥哥（女称）', level: 1 },
      { korean: '언니', romanization: 'eonni', chinese: '姐姐（女称）', level: 1 },
      { korean: '형', romanization: 'hyeong', chinese: '哥哥（男称）', level: 1 },
      { korean: '누나', romanization: 'nuna', chinese: '姐姐（男称）', level: 1 },
      { korean: '동생', romanization: 'dongsaeng', chinese: '弟弟 / 妹妹', level: 1 },
      { korean: '할아버지', romanization: 'harabeoji', chinese: '爷爷', level: 1 },
      { korean: '할머니', romanization: 'halmeoni', chinese: '奶奶', level: 1 },
      { korean: '아들', romanization: 'adeul', chinese: '儿子', level: 1 },
      { korean: '딸', romanization: 'ttal', chinese: '女儿', level: 1 },
      { korean: '남편', romanization: 'nampyeon', chinese: '丈夫', level: 2 },
      { korean: '아내', romanization: 'anae', chinese: '妻子', level: 2 },
      { korean: '식구', romanization: 'sikgu', chinese: '家庭成员', level: 1 },
    ],
    sentences: [
      { korean: '우리 가족은 다섯 명입니다.', romanization: 'uri gajogeun daseot myeongimnida.', chinese: '我家有五口人。', level: 1 },
      { korean: '오빠는 학생입니다.', romanization: 'oppaneun haksaengimnida.', chinese: '哥哥是学生。', level: 1 },
      { korean: '동생이 있어요.', romanization: 'dongsaengi isseoyo.', chinese: '我有弟弟 / 妹妹。', level: 1 },
      { korean: '어머니를 사랑해요.', romanization: 'eomeonireul saranghaeyo.', chinese: '我爱妈妈。', level: 1 },
      { korean: '할머니 집에 가요.', romanization: 'halmeoni jibe gayo.', chinese: '去奶奶家。', level: 1 },
    ],
    grammar: [
      { title: '称谓的男女区分', pattern: '오빠/언니 vs 형/누나', explanation: '叫哥哥：女生叫 오빠，男生叫 형；叫姐姐：女生叫 언니，男生叫 누나。', example: '오빠(女称哥) / 형(男称哥)', exampleCn: '哥哥（女称）/ 哥哥（男称）', level: 1 },
      { title: '명（名 / 人）', pattern: '数字 + 명', explanation: '人数单位：한 명（一人）、다섯 명（五人）。', example: '다섯 명', exampleCn: '五口人', level: 1 },
      { title: '있어요 / 없어요（有 / 没有）', pattern: '体词 + 이/가 + 있어요', explanation: '表示存在或拥有。', example: '동생이 있어요.', exampleCn: '有弟弟/妹妹。', level: 1 },
      { title: '에 가요（去～）', pattern: '地点 + 에 + 가다', explanation: '目的地助词 에 加"去"。', example: '집에 가요.', exampleCn: '回家。', level: 1 },
      { title: '을 / 랑 사랑해요（爱～）', pattern: '宾格 + 사랑하다', explanation: '宾格助词 을/를 标记爱的对象。', example: '어머니를 사랑해요.', exampleCn: '爱妈妈。', level: 1 },
    ],
    quiz: [
      { q: '女生叫"哥哥"用？', options: ['오빠', '형', '누나'], answer: 0, explain: '女称哥哥 = 오빠；男称哥哥 = 형。' },
      { q: '"我家有五口人"哪项正确？', options: ['우리 가족은 다섯 명입니다', '우리 가족 다섯 명', '가족은 다섯 명이에요'], answer: 0, explain: '人数用 명，并加正式结尾입니다。' },
      { q: '"有弟弟"怎么说？', options: ['동생이 있어요', '동생 있어요', '동생을 있어요'], answer: 0, explain: '存在句主语用 이/가：동생이 있어요。' },
      { q: '男生叫"姐姐"用？', options: ['언니', '누나', '형'], answer: 1, explain: '女称姐姐 = 언니；男称姐姐 = 누나。' },
      { q: '"去奶奶家"的"去"对应？', options: ['가요', '사요', '자요'], answer: 0, explain: '가다 = 去，敬语 가요。' },
    ],
  },

  // ───────────────────────── Day 4 ─────────────────────────
  {
    day: 4,
    theme: '食物与餐厅',
    words: [
      { korean: '밥', romanization: 'bap', chinese: '饭', level: 1 },
      { korean: '물', romanization: 'mul', chinese: '水', level: 1 },
      { korean: '김치', romanization: 'gimchi', chinese: '泡菜', level: 1 },
      { korean: '고기', romanization: 'gogi', chinese: '肉', level: 1 },
      { korean: '채소', romanization: 'chaeso', chinese: '蔬菜', level: 1 },
      { korean: '사과', romanization: 'sagwa', chinese: '苹果', level: 1 },
      { korean: '빵', romanization: 'ppang', chinese: '面包', level: 1 },
      { korean: '커피', romanization: 'keopi', chinese: '咖啡', level: 1 },
      { korean: '맛있어요', romanization: 'masisseoyo', chinese: '好吃', level: 1 },
      { korean: '매워요', romanization: 'maewoyo', chinese: '辣', level: 1 },
      { korean: '배고파요', romanization: 'baegopayo', chinese: '饿', level: 1 },
      { korean: '주문', romanization: 'jumun', chinese: '点餐', level: 2 },
      { korean: '계산', romanization: 'gyesan', chinese: '结账', level: 2 },
      { korean: '식당', romanization: 'sikdang', chinese: '餐厅', level: 1 },
      { korean: '메뉴', romanization: 'menyu', chinese: '菜单', level: 1 },
    ],
    sentences: [
      { korean: '밥 먹었어요?', romanization: 'bap meogeosseoyo?', chinese: '吃饭了吗？', level: 1 },
      { korean: '물 주세요.', romanization: 'mul juseyo.', chinese: '请给我水。', level: 1 },
      { korean: '이거 맛있어요.', romanization: 'igeo masisseoyo.', chinese: '这个很好吃。', level: 1 },
      { korean: '주문할게요.', romanization: 'jumunhalgeyo.', chinese: '我要点餐。', level: 2 },
      { korean: '계산서 주세요.', romanization: 'gyesanseo juseyo.', chinese: '请给我账单。', level: 2 },
    ],
    grammar: [
      { title: '맛있다 → 맛있어요（ㅂ 不规则）', pattern: 'ㅂ + 元音 → 우', explanation: '词干以 ㅂ 结尾的形容词，遇元音前 ㅂ 变 우：맛있어요、고맙습니다。', example: '맛있어요 / 고마워요', exampleCn: '好吃 / 谢谢（平语）', level: 1 },
      { title: '어요 / 아요（非正式敬语）', pattern: '词干 + 아요 / 어요', explanation: '动词 / 形容词后最常见的敬语结尾，比 ㅂ니다 随意。', example: '먹어요 / 가요', exampleCn: '吃 / 去', level: 1 },
      { title: '주세요（请给）', pattern: '名词 + 주세요', explanation: '礼貌请求句式。', example: '물 주세요.', exampleCn: '请给我水。', level: 1 },
      { title: '았 / 었어요（过去时）', pattern: '词干 + 았/었 + 어요', explanation: '表示过去：먹 + 었 + 어요 = 먹었어요（吃了）。', example: '밥 먹었어요.', exampleCn: '吃饭了。', level: 1 },
      { title: '배고프다 → 배고파요', pattern: 'ㅂ 不规则', explanation: '饿：词干 배고프 + 아요，ㅂ 变 우 → 배고파요。', example: '배고파요.', exampleCn: '饿了。', level: 1 },
    ],
    quiz: [
      { q: '"好吃"怎么说？', options: ['맛있어요', '맛있어', '맛있다요'], answer: 0, explain: '맛있다 的敬语是 맛있어요（ㅂ 不规则）。' },
      { q: '"请给我水"哪项正确？', options: ['물 주세요', '물 주세', '물 줘요'], answer: 0, explain: '请求用 주세요。' },
      { q: '过去时"吃了"是？', options: ['먹었어요', '먹어요', '먹을게요'], answer: 0, explain: '먹 + 었 + 어요 = 먹었어요。' },
      { q: '"辣"的韩语是？', options: ['매워요', '달아요', '시원해요'], answer: 0, explain: '매워요 = 辣；달아요 = 甜；시원해요 = 凉爽。' },
      { q: '"点餐"的韩语是？', options: ['주문', '계산', '식사'], answer: 0, explain: '주문 = 点餐；계산 = 结账。' },
    ],
  },

  // ───────────────────────── Day 5 ─────────────────────────
  {
    day: 5,
    theme: '时间与日期',
    words: [
      { korean: '오늘', romanization: 'oneul', chinese: '今天', level: 1 },
      { korean: '내일', romanization: 'naeil', chinese: '明天', level: 1 },
      { korean: '어제', romanization: 'eoje', chinese: '昨天', level: 1 },
      { korean: '시간', romanization: 'sigan', chinese: '时间', level: 1 },
      { korean: '분', romanization: 'bun', chinese: '分钟', level: 1 },
      { korean: '시', romanization: 'si', chinese: '点（钟）', level: 1 },
      { korean: '아침', romanization: 'achim', chinese: '早上', level: 1 },
      { korean: '점심', romanization: 'jeomsim', chinese: '中午 / 午饭', level: 1 },
      { korean: '저녁', romanization: 'jeonyeok', chinese: '晚上 / 晚饭', level: 1 },
      { korean: '주말', romanization: 'jumal', chinese: '周末', level: 1 },
      { korean: '월요일', romanization: 'woryoil', chinese: '周一', level: 1 },
      { korean: '토요일', romanization: 'toyoil', chinese: '周六', level: 1 },
      { korean: '일요일', romanization: 'iryoil', chinese: '周日', level: 1 },
      { korean: '날짜', romanization: 'naljja', chinese: '日期', level: 2 },
      { korean: '언제', romanization: 'eonje', chinese: '什么时候', level: 1 },
    ],
    sentences: [
      { korean: '오늘 날씨가 좋아요.', romanization: 'oneul nalssiga joayo.', chinese: '今天天气很好。', level: 1 },
      { korean: '몇 시예요?', romanization: 'myeot siyeyo?', chinese: '几点了？', level: 1 },
      { korean: '내일 만나요.', romanization: 'naeil mannayo.', chinese: '明天见。', level: 1 },
      { korean: '토요일에 쉬어요.', romanization: 'toyire sseoyo.', chinese: '周六休息。', level: 1 },
      { korean: '언제 갈까요?', romanization: 'eonje galkkayo?', chinese: '什么时候去呢？', level: 1 },
    ],
    grammar: [
      { title: '요일（星期）', pattern: '월/화/수/목/금/토/일 + 요일', explanation: '星期由"天干+요일"构成：월요일(一)、화요일(二)…일요일(日)。', example: '토요일 / 일요일', exampleCn: '周六 / 周日', level: 1 },
      { title: '에（时间助词）', pattern: '时间 + 에', explanation: '动作发生的时间后用 에。', example: '토요일에 쉬어요.', exampleCn: '周六休息。', level: 1 },
      { title: '몇 시（几点）', pattern: '몇 시 + 예요?', explanation: '询问钟点。', example: '몇 시예요?', exampleCn: '几点了？', level: 1 },
      { title: '갈까요?（共动 / 建议）', pattern: '动词 + ㄹ까요?', explanation: '提议一起做某事："我们~吧？"', example: '언제 갈까요?', exampleCn: '什么时候去呢？', level: 1 },
      { title: '아침 / 점심 / 저녁', pattern: '—', explanation: '一日三餐时段词，也指早 / 午 / 晚饭。', example: '아침에 운동해요.', exampleCn: '早上运动。', level: 1 },
    ],
    quiz: [
      { q: '"明天"的韩语是？', options: ['내일', '어제', '오늘'], answer: 0, explain: '내일 = 明天；어제 = 昨天；오늘 = 今天。' },
      { q: '"几点了"怎么说？', options: ['몇 시예요', '몇 살이에요', '언제예요'], answer: 0, explain: '몇 시 = 几点。' },
      { q: '星期六是？', options: ['토요일', '일요일', '월요일'], answer: 0, explain: '토요일 = 周六；일요일 = 周日；월요일 = 周一。' },
      { q: '动作时间后用的助词是？', options: ['에', '에서', '으로'], answer: 0, explain: '时间助词用 에（토요일에）。' },
      { q: '"什么时候去呢"表达建议用？', options: ['갈까요', '가요', '갔어요'], answer: 0, explain: 'ㄹ까요 表建议 / 共动。' },
    ],
  },

  // ───────────────────────── Day 6 ─────────────────────────
  {
    day: 6,
    theme: '日常与爱好',
    words: [
      { korean: '운동', romanization: 'undong', chinese: '运动', level: 1 },
      { korean: '음악', romanization: 'eumak', chinese: '音乐', level: 1 },
      { korean: '영화', romanization: 'yeonghwa', chinese: '电影', level: 1 },
      { korean: '책', romanization: 'chaek', chinese: '书', level: 1 },
      { korean: '읽다', romanization: 'ikda', chinese: '读', level: 1 },
      { korean: '듣다', romanization: 'deutda', chinese: '听', level: 1 },
      { korean: '좋아하다', romanization: 'joahada', chinese: '喜欢', level: 1 },
      { korean: '자주', romanization: 'jaju', chinese: '经常', level: 1 },
      { korean: '가끔', romanization: 'gakkeum', chinese: '有时', level: 1 },
      { korean: '매일', romanization: 'maeil', chinese: '每天', level: 1 },
      { korean: '일찍', romanization: 'iljjik', chinese: '早', level: 1 },
      { korean: '늦게', romanization: 'neutge', chinese: '晚', level: 1 },
      { korean: '쉬다', romanization: 'swida', chinese: '休息', level: 1 },
      { korean: '일하다', romanization: 'ilhada', chinese: '工作', level: 1 },
      { korean: '취미', romanization: 'chwimi', chinese: '爱好', level: 1 },
    ],
    sentences: [
      { korean: '취미가 뭐예요?', romanization: 'chwimiga mwoyeyo?', chinese: '你的爱好是什么？', level: 1 },
      { korean: '음악 듣는 것을 좋아해요.', romanization: 'eumak deutneun geoseul joahaeyo.', chinese: '我喜欢听音乐。', level: 1 },
      { korean: '매일 운동해요.', romanization: 'maeil undonghaeyo.', chinese: '我每天运动。', level: 1 },
      { korean: '주말에 책을 읽어요.', romanization: 'jumare chaegeul ilgeoyo.', chinese: '周末我看书。', level: 1 },
      { korean: '일찍 자요.', romanization: 'iljjik jayo.', chinese: '我早睡。', level: 1 },
    ],
    grammar: [
      { title: '하다 动词', pattern: '汉字词 + 하다', explanation: '大量汉字词 + 하다 构成动词：운동하다、공부하다、사랑하다。', example: '운동해요 / 공부해요', exampleCn: '运动 / 学习', level: 1 },
      { title: '는 것을 좋아해요（喜欢做～）', pattern: '动词 + 는 것 + 을/를 + 좋아하다', explanation: '把动作名词化后作"喜欢"的宾语。', example: '음악 듣는 것을 좋아해요.', exampleCn: '喜欢听音乐。', level: 1 },
      { title: '자주 / 가끔 / 매일（频率副词）', pattern: '副词 + 动词', explanation: '放动词前：자주(经常)、가끔(有时)、매일(每天)。', example: '매일 운동해요.', exampleCn: '每天运动。', level: 1 },
      { title: '뭐예요?（是什么）', pattern: '뭐 + 예요?', explanation: '뭐 是 무엇（什么）的缩略。', example: '취미가 뭐예요?', exampleCn: '爱好是什么？', level: 1 },
      { title: '어요 / 아요 复习', pattern: '现在时敬语', explanation: '하다 类词干用 해요：운동해요、좋아해요。', example: '좋아해요.', exampleCn: '喜欢。', level: 1 },
    ],
    quiz: [
      { q: '"爱好"的韩语是？', options: ['취미', '운동', '음악'], answer: 0, explain: '취미 = 爱好。' },
      { q: '"我喜欢听音乐"哪项正确？', options: ['음악 듣는 것을 좋아해요', '음악 좋아해요 듣는', '음악 듣기 좋아해요'], answer: 0, explain: '듣는 것 + 을 + 좋아해요 是标准结构。' },
      { q: '"每天"的韩语是？', options: ['매일', '가끔', '자주'], answer: 0, explain: '매일 = 每天；가끔 = 有时；자주 = 经常。' },
      { q: '"什么"的缩略是？', options: ['뭐', '무어', '머'], answer: 0, explain: '뭐 = 무엇 的缩略。' },
      { q: '하다 动词"学习"是？', options: ['공부해요', '공부어요', '공부여요'], answer: 0, explain: '공부하다 → 공부해요。' },
    ],
  },

  // ───────────────────────── Day 7 ─────────────────────────
  {
    day: 7,
    theme: '购物与颜色',
    words: [
      { korean: '색깔', romanization: 'saekkkal', chinese: '颜色', level: 1 },
      { korean: '빨간색', romanization: 'ppalgansaek', chinese: '红色', level: 1 },
      { korean: '파란색', romanization: 'paransaek', chinese: '蓝色', level: 1 },
      { korean: '노란색', romanization: 'noransaek', chinese: '黄色', level: 1 },
      { korean: '초록색', romanization: 'choroksaek', chinese: '绿色', level: 1 },
      { korean: '하얀색', romanization: 'hayansek', chinese: '白色', level: 1 },
      { korean: '검은색', romanization: 'geomeunsaek', chinese: '黑色', level: 1 },
      { korean: '크다', romanization: 'keuda', chinese: '大', level: 1 },
      { korean: '작다', romanization: 'jakda', chinese: '小', level: 1 },
      { korean: '비싸다', romanization: 'bissada', chinese: '贵', level: 2 },
      { korean: '싸다', romanization: 'ssada', chinese: '便宜', level: 2 },
      { korean: '사이즈', romanization: 'saijeu', chinese: '尺码', level: 2 },
      { korean: '사다', romanization: 'sada', chinese: '买', level: 1 },
      { korean: '입다', romanization: 'iptda', chinese: '穿', level: 1 },
      { korean: '바꾸다', romanization: 'bakkuda', chinese: '换', level: 2 },
    ],
    sentences: [
      { korean: '이거 얼마예요?', romanization: 'igeo eolmayeyo?', chinese: '这个多少钱？', level: 1 },
      { korean: '빨간색으로 주세요.', romanization: 'ppalgansaegeuro juseyo.', chinese: '请给我红色的。', level: 1 },
      { korean: '너무 비싸요.', romanization: 'neomu bissayo.', chinese: '太贵了。', level: 2 },
      { korean: '사이즈가 작아요.', romanization: 'saijeuga jagayo.', chinese: '尺码太小。', level: 2 },
      { korean: '바꿔 주세요.', romanization: 'bakkwo juseyo.', chinese: '请帮我换一下。', level: 2 },
    ],
    grammar: [
      { title: '색（颜色）', pattern: '颜色词 + 색', explanation: '颜色命名：빨간(红)+색=빨간색；파란(蓝)+색=파란색。', example: '빨간색 / 파란색', exampleCn: '红色 / 蓝色', level: 1 },
      { title: '얼마예요?（多少钱）', pattern: '이거 + 얼마예요?', explanation: '购物问价常用句。', example: '이거 얼마예요?', exampleCn: '这个多少钱？', level: 1 },
      { title: '으로 / 로 주세요（请给～）', pattern: '材料 / 方式 + 으로/로', explanation: '工具 / 材料助词：빨간색으로(用红色)。', example: '빨간색으로 주세요.', exampleCn: '请给红色的。', level: 1 },
      { title: '을 / 를（宾格）', pattern: '体词 + 을 / 를', explanation: '标记宾语：闭音节+을，开音节+를。', example: '이거를 사요.', exampleCn: '买这个。', level: 1 },
      { title: '고 싶다（想做～）', pattern: '动词 + 고 싶다', explanation: '表达愿望：사고 싶어요(想买)。', example: '사고 싶어요.', exampleCn: '想买。', level: 2 },
    ],
    quiz: [
      { q: '"红色"的韩语是？', options: ['빨간색', '파란색', '노란색'], answer: 0, explain: '빨간색 = 红色。' },
      { q: '"这个多少钱"怎么说？', options: ['이거 얼마예요', '이거 비싸요', '얼마 주세요'], answer: 0, explain: '얼마예요 = 多少钱。' },
      { q: '"太贵了"是？', options: ['너무 비싸요', '너무 싸요', '비싸고 싶어요'], answer: 0, explain: '너무 = 太；비싸요 = 贵。' },
      { q: '材料助词"用红色"用？', options: ['빨간색으로', '빨간색을', '빨간색에'], answer: 0, explain: '으로/로 表材料 / 方式。' },
      { q: '"想买"怎么说？', options: ['사고 싶어요', '사요 싶어요', '사는 싶어요'], answer: 0, explain: '动词 + 고 싶다 表愿望。' },
    ],
  },
]

/** 根据真实日期算出"今天"是第几天（7 天一轮回），保证每天内容稳定。 */
export function getTodayLessonIndex(): number {
  const dayMs = 86400000
  const epoch = Date.UTC(2026, 0, 1) // 以 2026-01-01 为起点
  const diff = Math.floor((Date.now() - epoch) / dayMs)
  return ((diff % DAILY_LESSONS.length) + DAILY_LESSONS.length) % DAILY_LESSONS.length
}
