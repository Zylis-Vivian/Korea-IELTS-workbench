// 娱乐学习数据：几厘米动画（每日 2 个）、韩国男团综艺、韩剧切片。
// 每条都附带：中韩对照台词、生词、语法点、韩国小知识，并给出 B站观看入口。

export interface EntVocab {
  korean: string
  romanization: string
  chinese: string
  level: number
}
export interface EntGrammar {
  pattern: string
  explanation: string
  example: string
}
export interface EntDialogue {
  kr: string
  cn: string
}
export interface EntItem {
  id: string
  title: string
  group: string
  kind: 'animation' | 'kpop' | 'drama'
  desc: string
  /** 中韩对照台词（动画 / 剧情） */
  dialogue?: EntDialogue[]
  vocab: EntVocab[]
  grammar: EntGrammar[]
  /** 韩国小知识 / 背景 */
  culture?: string
  /** B站视频 BV 号（可选，填入后可内嵌播放） */
  bvid?: string
  /** B站搜索关键词（用于"去B站观看"按钮） */
  searchQuery: string
}

// ───────────────────────── 几厘米动画（每日取 2 个） ─────────────────────────
export const ANIMATIONS: EntItem[] = [
  {
    id: 'anim-greet',
    title: '第1话 · 打招呼',
    group: '几厘米动画',
    kind: 'animation',
    desc: '小兔子出门遇到朋友，用最基础的问候开启一天。',
    dialogue: [
      { kr: '안녕! 나는 토끼야.', cn: '你好！我是小兔子。' },
      { kr: '뭐 해?', cn: '你在干嘛？' },
      { kr: '같이 놀자!', cn: '一起玩吧！' },
    ],
    vocab: [
      { korean: '안녕', romanization: 'annyeong', chinese: '你好 / 再见（平语）', level: 1 },
      { korean: '나', romanization: 'na', chinese: '我', level: 1 },
      { korean: '놀다', romanization: 'nolda', chinese: '玩', level: 1 },
      { korean: '같이', romanization: 'gachi', chinese: '一起', level: 1 },
    ],
    grammar: [
      { pattern: '나는 ~야（我是~）', explanation: '平语自我介绍：나(我) + 는(主题) + 이름 + 야。', example: '나는 토끼야.' },
      { pattern: '뭐 해?（在干嘛）', explanation: '뭐=무엇(什么)，해=하다 的平语，口语常用。', example: '뭐 해?' },
      { pattern: '~자（共动）', explanation: '动词词干 + 자 表示"一起做吧"，比 갈까요 更随意。', example: '같이 놀자!' },
    ],
    culture: '韩国动画/儿歌里对朋友都用平语(반말)，但现实中对长辈必须用敬语 안녕하세요。',
    searchQuery: '几厘米动画 韩语 打招呼',
  },
  {
    id: 'anim-thanks',
    title: '第2话 · 说谢谢与对不起',
    group: '几厘米动画',
    kind: 'animation',
    desc: '小熊帮了忙，学会说谢谢；不小心撞到朋友，学会说对不起。',
    dialogue: [
      { kr: '고마워!', cn: '谢谢！' },
      { kr: '미안해.', cn: '对不起。' },
      { kr: '천만에.', cn: '不客气。' },
    ],
    vocab: [
      { korean: '고맙다', romanization: 'gomapda', chinese: '谢谢（词根）', level: 1 },
      { korean: '미안하다', romanization: 'mianhada', chinese: '对不起', level: 1 },
      { korean: '천만에', romanization: 'cheonmane', chinese: '不客气', level: 1 },
    ],
    grammar: [
      { pattern: '고마워（谢谢·平语）', explanation: '고맙다 的平语感叹形；敬语是 고맙습니다 / 감사합니다。', example: '고마워!' },
      { pattern: '미안해（对不起·平语）', explanation: '미안하다 的平语；敬语是 죄송합니다。', example: '미안해.' },
      { pattern: '천만에（不客气）', explanation: '对谢谢的礼貌回应，书面/口语都用。', example: '천만에.' },
    ],
    culture: '对长辈说"谢谢"要用 감사합니다；朋友间 고마워 即可。',
    searchQuery: '几厘米动画 谢谢 对不起',
  },
  {
    id: 'anim-feel',
    title: '第3话 · 表达情绪',
    group: '几厘米动画',
    kind: 'animation',
    desc: '拿到礼物很开心，下雨不能出去玩有点难过。',
    dialogue: [
      { kr: '기뻐!', cn: '好开心！' },
      { kr: '슬퍼…', cn: '好难过…' },
      { kr: '화났어.', cn: '我生气了。' },
    ],
    vocab: [
      { korean: '기쁘다', romanization: 'gippeuda', chinese: '高兴', level: 1 },
      { korean: '슬프다', romanization: 'seulpeuda', chinese: '悲伤', level: 2 },
      { korean: '화나다', romanization: 'hwanada', chinese: '生气', level: 2 },
    ],
    grammar: [
      { pattern: '기뻐!（开心·感叹）', explanation: '기쁘다 遇 아/어요 → 기뻐，感叹时省略요。', example: '기뻐!' },
      { pattern: '슬퍼…（难过·省略）', explanation: '슬프다 → 슬퍼，句尾拖长表示委屈。', example: '슬퍼…' },
      { pattern: '화났어（生气了）', explanation: '화나다 过去时平语：화나 + 았 + 어 = 화났어。', example: '화났어.' },
    ],
    culture: '韩国人表达情绪很丰富，语气词(어~, 아~)配合表情是日常交流的一部分。',
    searchQuery: '几厘米动画 情绪 开心',
  },
  {
    id: 'anim-eat',
    title: '第4话 · 吃饭啦',
    group: '几厘米动画',
    kind: 'animation',
    desc: '饭点到了，小动物们围坐一起吃饭。',
    dialogue: [
      { kr: '밥 먹자!', cn: '吃饭吧！' },
      { kr: '맛있어!', cn: '好吃！' },
      { kr: '배불러.', cn: '吃饱了。' },
    ],
    vocab: [
      { korean: '밥', romanization: 'bap', chinese: '饭', level: 1 },
      { korean: '맛있다', romanization: 'masitda', chinese: '好吃', level: 1 },
      { korean: '배부르다', romanization: 'baebureuda', chinese: '饱', level: 1 },
    ],
    grammar: [
      { pattern: '밥 먹자（吃饭吧）', explanation: '먹다(吃) + 자 共动；韩国人常用"밥 먹자"约饭。', example: '밥 먹자!' },
      { pattern: '맛있어（好吃·平语）', explanation: '맛있다 → 맛있어（ㅂ不规则），感叹省요。', example: '맛있어!' },
      { pattern: '배불러（饱了）', explanation: '배부르다 平语；敬语 배부릅니다。', example: '배불러.' },
    ],
    culture: '"밥 먹었어?(吃饭了吗)"是韩国人最常用的关心问候，类似"吃了吗"。',
    searchQuery: '几厘米动画 吃饭 好吃',
  },
  {
    id: 'anim-sleep',
    title: '第5话 · 晚安',
    group: '几厘米动画',
    kind: 'animation',
    desc: '夜深了，小伙伴们互道晚安。',
    dialogue: [
      { kr: '잘 자!', cn: '晚安！' },
      { kr: '꿈 꿔.', cn: '做个好梦。' },
      { kr: '피곤하네.', cn: '好累呀。' },
    ],
    vocab: [
      { korean: '자다', romanization: 'jada', chinese: '睡', level: 1 },
      { korean: '꿈', romanization: 'kkum', chinese: '梦', level: 1 },
      { korean: '피곤하다', romanization: 'pigonhada', chinese: '累', level: 1 },
    ],
    grammar: [
      { pattern: '잘 자（晚安·平语）', explanation: '자다(睡) 命令式平语；敬语 잘 자요 / 잘 자요. 对长辈用 잘 자요。', example: '잘 자!' },
      { pattern: '꿈 꿔（做梦·平语）', explanation: '꿈(梦) + 꾸다(做) 命令式；完整是"좋은 꿈 꿔"(做个好梦)。', example: '꿈 꿔.' },
      { pattern: '피곤하네（好累呀）', explanation: '피곤하다 + ~네 表示感叹/新发现。', example: '피곤하네.' },
    ],
    culture: '韩国人睡前常互发"잘 자요"，是温柔的社交习惯。',
    searchQuery: '几厘米动画 晚安 睡觉',
  },
  {
    id: 'anim-weather',
    title: '第6话 · 天气',
    group: '几厘米动画',
    kind: 'animation',
    desc: '窗外下雨又放晴，小动物们聊起天气。',
    dialogue: [
      { kr: '비 온다.', cn: '下雨了。' },
      { kr: '날씨 좋다!', cn: '天气真好！' },
      { kr: '추워.', cn: '好冷。' },
    ],
    vocab: [
      { korean: '비', romanization: 'bi', chinese: '雨', level: 1 },
      { korean: '날씨', romanization: 'nalssi', chinese: '天气', level: 1 },
      { korean: '춥다', romanization: 'chupda', chinese: '冷', level: 1 },
    ],
    grammar: [
      { pattern: '비 온다（下雨）', explanation: '비(雨) + 오다(来)；온다 是 오다 的陈述形。', example: '비 온다.' },
      { pattern: '날씨 좋다（天气好）', explanation: '좋다(好) 描述天气；敬语 날씨가 좋아요。', example: '날씨 좋다!' },
      { pattern: '추워（冷·平语）', explanation: '춥다 → 추워（ㅂ不规则）。', example: '추워.' },
    ],
    culture: '韩国四季分明，聊天气是开启话题的安全选择，类似"今天挺冷啊"。',
    searchQuery: '几厘米动画 天气 下雨',
  },
]

// ───────────────────────── 韩国男团综艺 ─────────────────────────
export const KPOP: EntItem[] = [
  {
    id: 'kpop-cortis',
    title: 'Cortis · 新人男团登场',
    group: 'Cortis',
    kind: 'kpop',
    desc: 'HYBE 旗下新人男团 Cortis 的自我介绍与出道舞台。',
    dialogue: [
      { kr: '안녕하세요, 코르트입니다!', cn: '大家好，我们是 Cortis！' },
      { kr: '저희 노래 들어주세요.', cn: '请听我们的歌。' },
    ],
    vocab: [
      { korean: '코르트', romanization: 'koreuteu', chinese: 'Cortis（团名）', level: 2 },
      { korean: '신인', romanization: 'sinin', chinese: '新人', level: 2 },
      { korean: '노래', romanization: 'norae', chinese: '歌', level: 1 },
      { korean: '무대', romanization: 'mudae', chinese: '舞台', level: 3 },
    ],
    grammar: [
      { pattern: '~입니다（是·正式）', explanation: '团体名 + 입니다 做正式自我介绍，舞台/采访时必用。', example: '코르트입니다.' },
      { pattern: '저희（我们·谦让）', explanation: '对粉丝/镜头用 저희(我们) 比 우리 更谦逊有礼。', example: '저희 노래' },
    ],
    culture: 'Cortis 是 HYBE 2025 年推出的新人男团，成员亲自参与作词作曲，走"音乐人偶像"路线。',
    searchQuery: 'Cortis 코르트 위버스',
  },
  {
    id: 'kpop-exo',
    title: 'EXO · 五人时期团综',
    group: 'EXO（五人）',
    kind: 'kpop',
    desc: '现以 SUHO、Baekhyun、Chanyeol、Kai、Sehun 五人活动为主的团综与综艺片段。',
    dialogue: [
      { kr: '우리는 EXO입니다.', cn: '我们是 EXO。' },
      { kr: '항상 응원해줘서 고마워요.', cn: '一直应援我们，谢谢。' },
    ],
    vocab: [
      { korean: 'EXO', romanization: 'ekso', chinese: 'EXO（团名）', level: 2 },
      { korean: '멤버', romanization: 'membeo', chinese: '成员', level: 2 },
      { korean: '응원', romanization: 'eungwon', chinese: '应援', level: 2 },
      { korean: '팬', romanization: 'paen', chinese: '粉丝', level: 2 },
    ],
    grammar: [
      { pattern: '우리는 ~입니다', explanation: '우리(我们) + 는(主题) + 团名 + 입니다。', example: '우리는 EXO입니다.' },
      { pattern: '고마워요（谢谢·敬语）', explanation: '对粉丝用敬语 고마워요 / 감사합니다。', example: '고마워요.' },
    ],
    culture: 'EXO 现以五人（SUHO、Baekhyun、Chanyeol、Kai、Sehun）为主开展活动，粉丝名为"EXO-L"。',
    searchQuery: 'EXO 五人 团综 综艺',
  },
  {
    id: 'kpop-txt',
    title: 'TXT · 与 MOA 的互动',
    group: 'TXT',
    kind: 'kpop',
    desc: 'Tomorrow X Together 在直播/签售中对粉丝 MOA 说的暖心话。',
    dialogue: [
      { kr: '안녕하세요, 투모로우 바이 투게더입니다.', cn: '大家好，我们是 Tomorrow X Together。' },
      { kr: 'MOA 사랑해요!', cn: '爱 MOA！' },
    ],
    vocab: [
      { korean: 'TXT', romanization: 'ti-ek-seu-ti', chinese: 'Tomorrow X Together', level: 2 },
      { korean: 'MOA', romanization: 'moa', chinese: 'TXT 粉丝名', level: 2 },
      { korean: '사랑', romanization: 'sarang', chinese: '爱', level: 1 },
      { korean: '늘', romanization: 'neul', chinese: '总是', level: 2 },
    ],
    grammar: [
      { pattern: '안녕하세요, ~입니다', explanation: '正式登场问候的固定句式，综艺/直播开头必说。', example: '투모로우 바이 투게더입니다.' },
      { pattern: '사랑해요（爱·敬语）', explanation: '사랑하다 敬语；对粉丝常说 사랑해요 / 사랑합니다。', example: 'MOA 사랑해요!' },
    ],
    culture: 'TXT 全称 Tomorrow X Together，粉丝名 MOA 意为"Moments of Alwaysness"；他们常用 "늘 고마워요" 感谢粉丝。',
    searchQuery: 'TXT MOA 위버스 라이브',
  },
  {
    id: 'kpop-lovefan',
    title: '通用 · 爱粉丝的告白',
    group: '男团通用',
    kind: 'kpop',
    desc: '各团在安可/获奖感言里高频出现的告白句式，学会了到处都能用。',
    dialogue: [
      { kr: '우리 팬들 정말 고마워요.', cn: '我们的粉丝真的谢谢你们。' },
      { kr: '항상 곁에 있어줘서 고마워요.', cn: '一直陪在身边，谢谢。' },
    ],
    vocab: [
      { korean: '팬', romanization: 'paen', chinese: '粉丝', level: 2 },
      { korean: '곁', romanization: 'gyeot', chinese: '身边', level: 3 },
      { korean: '정말', romanization: 'jeongmal', chinese: '真的', level: 1 },
      { korean: '늘', romanization: 'neul', chinese: '总是', level: 2 },
    ],
    grammar: [
      { pattern: '정말 고마워요（真的很感谢）', explanation: '정말(真的) 强调程度，配 고마워요 表深情。', example: '정말 고마워요.' },
      { pattern: '~어줘서（因为~所以感谢）', explanation: '서 表原因，줘서 来自 주다；"因为你~所以谢谢"。', example: '곁에 있어줘서 고마워요.' },
    ],
    culture: '韩国偶像文化里"粉丝应援"是双向的，偶像常在安可环节单膝跪地读手写信，是非常动人的传统。',
    searchQuery: '男团 安可 感谢粉丝 名场面',
  },
]

// ───────────────────────── 韩剧切片 ─────────────────────────
export const DRAMAS: EntItem[] = [
  {
    id: 'drama-watermelon',
    title: '闪烁的西瓜 · 青春告白',
    group: '闪烁的西瓜',
    kind: 'drama',
    desc: '穿越题材青春剧，男主对女主鼓起勇气说出的那句告白。',
    dialogue: [
      { kr: '너를 좋아해.', cn: '我喜欢你。' },
      { kr: '음악이 우리를 이어줬어.', cn: '是音乐把我们连在了一起。' },
    ],
    vocab: [
      { korean: '좋아하다', romanization: 'joahada', chinese: '喜欢', level: 1 },
      { korean: '음악', romanization: 'eumak', chinese: '音乐', level: 1 },
      { korean: '시간', romanization: 'sigan', chinese: '时间', level: 1 },
      { korean: '이어주다', romanization: 'ieojuda', chinese: '连接', level: 3 },
    ],
    grammar: [
      { pattern: '너를 좋아해（喜欢你）', explanation: '너(你) + 를(宾格) + 좋아하다；平语告白常用。', example: '너를 좋아해.' },
      { pattern: '~아/어요（平语陈述）', explanation: '剧情/朋友间用平语；对长辈才用 요 敬语。', example: '이어줬어.' },
    ],
    culture: '《闪烁的西瓜》(반짝이는 워터멜론) 是 2023 年 tvN 穿越青春剧，以乐队与1995年为背景，原声带(OST)极受欢迎。',
    searchQuery: '闪烁的西瓜 名场面 台词',
  },
  {
    id: 'drama-goong',
    title: '宫 · 宫廷敬语',
    group: '宫',
    kind: 'drama',
    desc: '平民少女嫁入皇室，学习如何使用宫廷敬语。',
    dialogue: [
      { kr: '황태자전하, 안녕하십니까.', cn: '皇太子殿下，您好。' },
      { kr: '궁궐은 참 아름다워요.', cn: '宫殿真美。' },
    ],
    vocab: [
      { korean: '황태자', romanization: 'hwangtaeja', chinese: '皇太子', level: 3 },
      { korean: '전하', romanization: 'jeonha', chinese: '殿下', level: 3 },
      { korean: '궁궐', romanization: 'gung-gwol', chinese: '宫殿', level: 3 },
      { korean: '아름답다', romanization: 'areumdapda', chinese: '美丽', level: 2 },
    ],
    grammar: [
      { pattern: '안녕하십니까（您您好·最高敬语）', explanation: '십니까 是 하십니다 的疑问形，对皇室/极尊贵者使用。', example: '안녕하십니까.' },
      { pattern: '~어요（敬语描述）', explanation: '아름답다 → 아름다워요，礼貌描述。', example: '아름다워요.' },
    ],
    culture: '《宫》(궁) 是 2006 年 MBC cult 韩剧，设定在韩国仍为君主制的平行世界；剧中敬语等级极分明，是学"尊待称"的好素材。',
    searchQuery: '韩剧 宫 台词 皇太子',
  },
  {
    id: 'drama-demon',
    title: '与恶魔有约 · 契约罗曼史',
    group: '与恶魔有约',
    kind: 'drama',
    desc: '财阀继承女与恶魔签订契约，步步沦陷的台词。',
    dialogue: [
      { kr: '계약해요.', cn: '我们签契约吧。' },
      { kr: '운명인 것 같아요.', cn: '好像是命运呢。' },
    ],
    vocab: [
      { korean: '악마', romanization: 'angma', chinese: '恶魔', level: 3 },
      { korean: '계약', romanization: 'gyeyak', chinese: '契约', level: 3 },
      { korean: '운명', romanization: 'unmyeong', chinese: '命运', level: 3 },
      { korean: '기업', romanization: 'gieop', chinese: '企业', level: 3 },
    ],
    grammar: [
      { pattern: '계약해요（签契约·敬语）', explanation: '계약(契约) + 하다 → 계약해요；剧情用敬语显正式感。', example: '계약해요.' },
      { pattern: '~인 것 같아요（好像~）', explanation: '것 같다 表推测"好像"；인 来自 이다。', example: '운명인 것 같아요.' },
    ],
    culture: '《与恶魔有约》(악마와 거래했다) 是 2023-2024 年 SBS 奇幻浪漫剧，男主为"恶魔"设定，台词多用正式敬语营造距离感。',
    searchQuery: '与恶魔有约 名场面 台词',
  },
  {
    id: 'drama-watch',
    title: '通用 · 追剧必备句',
    group: '韩剧通用',
    kind: 'drama',
    desc: '看任何韩剧都能用上的高频感叹与讨论句。',
    dialogue: [
      { kr: '드라마 진짜 재미있어요.', cn: '这部剧真的好看。' },
      { kr: '다음 회 기다려요.', cn: '等着看下一集。' },
    ],
    vocab: [
      { korean: '드라마', romanization: 'deurama', chinese: '电视剧', level: 1 },
      { korean: '재미있다', romanization: 'jaemi-itda', chinese: '有趣', level: 1 },
      { korean: '기다리다', romanization: 'gidarida', chinese: '等待', level: 1 },
      { korean: '회', romanization: 'hoe', chinese: '集（量词）', level: 2 },
    ],
    grammar: [
      { pattern: '재미있어요（好看·敬语）', explanation: '재미있다 → 재미있어요（ㅂ不规则）。', example: '재미있어요.' },
      { pattern: '기다려요（等待·敬语）', explanation: '기다리다 敬语；平语 기다려。', example: '기다려요.' },
    ],
    culture: '韩国人追剧常用"몰입(沉浸)""킹받다(气死)"等网络热词；"다음 회"指下一集，追更文化盛行。',
    searchQuery: '韩剧 经典台词 合集',
  },
]

/** 根据日期取"今日"要看的 2 个动画（6 个一循环，每次取连续 2 个）。 */
export function getTodayAnimations(): EntItem[] {
  const n = ANIMATIONS.length
  const idx = Math.floor(Date.now() / 86400000) % n
  return [ANIMATIONS[idx % n], ANIMATIONS[(idx + 1) % n]]
}
