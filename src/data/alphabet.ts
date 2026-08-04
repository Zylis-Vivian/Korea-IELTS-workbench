import type { Sound } from '../types'

// 标准笔画数（用于手写板评分参考）
const STROKE: Record<string, number> = {
  ㄱ: 1, ㄴ: 1, ㄷ: 2, ㄹ: 3, ㅁ: 4, ㅂ: 4, ㅅ: 2, ㅇ: 1, ㅈ: 3,
  ㅊ: 4, ㅋ: 3, ㅌ: 4, ㅍ: 5, ㅎ: 3,
  ㅏ: 2, ㅓ: 2, ㅗ: 2, ㅜ: 2, ㅡ: 1, ㅣ: 1, ㅐ: 3, ㅔ: 3,
  ㅚ: 3, ㅟ: 2, ㅑ: 3, ㅕ: 3, ㅛ: 3, ㅠ: 3, ㅒ: 4, ㅖ: 4,
  ㅘ: 3, ㅝ: 3, ㅙ: 4, ㅞ: 4, ㅢ: 2,
}

export const strokeOf = (c: string) => STROKE[c] ?? 2

const V: Sound[] = [
  { char: 'ㅏ', romanization: 'a', name: '아', category: 'vowel', group: '单元音', description: '嘴自然张开，舌身平放，类似汉语“啊”。', example: { word: '아빠', roman: 'appa', zh: '爸爸' } },
  { char: 'ㅓ', romanization: 'eo', name: '어', category: 'vowel', group: '单元音', description: '比“啊”口型略小，舌身后缩，类似“饿”的轻声。', example: { word: '어머니', roman: 'eomeoni', zh: '妈妈' } },
  { char: 'ㅗ', romanization: 'o', name: '오', category: 'vowel', group: '单元音', description: '双唇收圆向前突出，类似“哦”。', example: { word: '오빠', roman: 'oppa', zh: '哥哥' } },
  { char: 'ㅜ', romanization: 'u', name: '우', category: 'vowel', group: '单元音', description: '双唇收得更圆更突出，类似“乌”。', example: { word: '우유', roman: 'uyu', zh: '牛奶' } },
  { char: 'ㅡ', romanization: 'eu', name: '으', category: 'vowel', group: '单元音', description: '嘴微张，舌身平放，双唇放松，无对应汉语音，类似“诗”的韵母。', example: { word: '그릇', roman: 'geureut', zh: '碗' } },
  { char: 'ㅣ', romanization: 'i', name: '이', category: 'vowel', group: '单元音', description: '嘴角向两边展开，舌面前抬，类似“衣”。', example: { word: '이빨', roman: 'ippal', zh: '牙齿' } },
  { char: 'ㅐ', romanization: 'ae', name: '애', category: 'vowel', group: '单元音', description: '嘴张得比“ㅔ”大，类似“爱”的韵母。', example: { word: '개', roman: 'gae', zh: '狗' } },
  { char: 'ㅔ', romanization: 'e', name: '에', category: 'vowel', group: '单元音', description: '嘴半开，舌身略抬，类似“耶”的轻声。', example: { word: '계란', roman: 'gyeran', zh: '鸡蛋' } },
  { char: 'ㅚ', romanization: 'oe', name: '외', category: 'vowel', group: '单元音', description: '先发“ㅗ”再滑向“ㅣ”，类似“约”。', example: { word: '꽃', roman: 'kkot', zh: '花' } },
  { char: 'ㅟ', romanization: 'wi', name: '위', category: 'vowel', group: '单元音', description: '先发“ㅜ”再滑向“ㅣ”，类似“鱼”。', example: { word: '위', roman: 'wi', zh: '上面' } },
  { char: 'ㅑ', romanization: 'ya', name: '야', category: 'vowel', group: '双元音', description: '“ㅣ”+“ㅏ”，类似“呀”。', example: { word: '야구', roman: 'yagu', zh: '棒球' } },
  { char: 'ㅕ', romanization: 'yeo', name: '여', category: 'vowel', group: '双元音', description: '“ㅣ”+“ㅓ”，类似“野”。', example: { word: '여자', roman: 'yeoja', zh: '女子' } },
  { char: 'ㅛ', romanization: 'yo', name: '요', category: 'vowel', group: '双元音', description: '“ㅣ”+“ㅗ”，类似“哟”。', example: { word: '요리', roman: 'yori', zh: '料理' } },
  { char: 'ㅠ', romanization: 'yu', name: '유', category: 'vowel', group: '双元音', description: '“ㅣ”+“ㅜ”，类似“柚”。', example: { word: '유리', roman: 'yuri', zh: '玻璃' } },
  { char: 'ㅒ', romanization: 'yae', name: '얘', category: 'vowel', group: '双元音', description: '“ㅣ”+“ㅐ”，类似“耶”。', example: { word: '얘기', roman: 'yaegi', zh: '故事' } },
  { char: 'ㅖ', romanization: 'ye', name: '예', category: 'vowel', group: '双元音', description: '“ㅣ”+“ㅔ”，类似“也”。', example: { word: '예쁘다', roman: 'yeppeuda', zh: '漂亮' } },
  { char: 'ㅘ', romanization: 'wa', name: '와', category: 'vowel', group: '双元音', description: '“ㅗ”+“ㅏ”，类似“哇”。', example: { word: '과일', roman: 'gwa-il', zh: '水果' } },
  { char: 'ㅝ', romanization: 'wo', name: '워', category: 'vowel', group: '双元音', description: '“ㅜ”+“ㅓ”，类似“窝”。', example: { word: '워터', roman: 'woteo', zh: '水（water）' } },
  { char: 'ㅙ', romanization: 'wae', name: '왜', category: 'vowel', group: '双元音', description: '“ㅗ”+“ㅐ”，类似“外”。', example: { word: '왜', roman: 'wae', zh: '为什么' } },
  { char: 'ㅞ', romanization: 'we', name: '웨', category: 'vowel', group: '双元音', description: '“ㅜ”+“ㅔ”，类似“卫”的合音。', example: { word: '웨딩', roman: 'weding', zh: '婚礼（wedding）' } },
  { char: 'ㅢ', romanization: 'ui', name: '의', category: 'vowel', group: '双元音', description: '“ㅡ”+“ㅣ”；词首读“의”，词中常读“ㅣ”。', example: { word: '의자', roman: 'uija', zh: '椅子' } },
]

const C: Sound[] = [
  { char: 'ㄱ', romanization: 'g', name: '기역', category: 'consonant', group: '松音', description: '舌根抵软腭，声带不紧张，类似“歌”的声母（平音）。', example: { word: '구', roman: 'gu', zh: '球/九' } },
  { char: 'ㄷ', romanization: 'd', name: '디귿', category: 'consonant', group: '松音', description: '舌尖抵上齿龈，类似“得”的声母。', example: { word: '다리', roman: 'dari', zh: '腿' } },
  { char: 'ㅂ', romanization: 'b', name: '비읍', category: 'consonant', group: '松音', description: '双唇闭合后张开，类似“波”的声母。', example: { word: '바다', roman: 'bada', zh: '海' } },
  { char: 'ㅅ', romanization: 's', name: '시옷', category: 'consonant', group: '松音', description: '舌尖靠近上齿龈，气流摩擦而出，类似“思”的声母。', example: { word: '사과', roman: 'sagwa', zh: '苹果' } },
  { char: 'ㅈ', romanization: 'j', name: '지읒', category: 'consonant', group: '松音', description: '舌面前部接近硬腭，类似“资”的声母。', example: { word: '자장면', roman: 'jajangmyeon', zh: '炸酱面' } },
  { char: 'ㄲ', romanization: 'kk', name: '쌍기역', category: 'consonant', group: '紧音', description: '与ㄱ同部位，但声带与肌肉紧张，发音短促用力（紧音）。', example: { word: '꼬마', roman: 'kkoma', zh: '小孩' } },
  { char: 'ㄸ', romanization: 'tt', name: '쌍디귿', category: 'consonant', group: '紧音', description: '与ㄷ同部位，紧音，短促有力。', example: { word: '딸', roman: 'ttal', zh: '女儿' } },
  { char: 'ㅃ', romanization: 'pp', name: '쌍비읍', category: 'consonant', group: '紧音', description: '与ㅂ同部位，紧音。', example: { word: '빵', roman: 'ppang', zh: '面包' } },
  { char: 'ㅆ', romanization: 'ss', name: '쌍시옷', category: 'consonant', group: '紧音', description: '与ㅅ同部位，紧音。', example: { word: '쓰다', roman: 'sseuda', zh: '写' } },
  { char: 'ㅉ', romanization: 'jj', name: '쌍지읒', category: 'consonant', group: '紧音', description: '与ㅈ同部位，紧音。', example: { word: '짜장면', roman: 'jjajangmyeon', zh: '炸酱面' } },
  { char: 'ㅋ', romanization: 'k', name: '키읔', category: 'consonant', group: '送气音', description: '与ㄱ同部位，送气强，类似“科”的声母。', example: { word: '커피', roman: 'keopi', zh: '咖啡' } },
  { char: 'ㅌ', romanization: 't', name: '티읕', category: 'consonant', group: '送气音', description: '与ㄷ同部位，送气强，类似“他”的声母。', example: { word: '토마토', roman: 'tomato', zh: '番茄' } },
  { char: 'ㅍ', romanization: 'p', name: '피읖', category: 'consonant', group: '送气音', description: '与ㅂ同部位，送气强，类似“坡”的声母。', example: { word: '피자', roman: 'pija', zh: '披萨' } },
  { char: 'ㅊ', romanization: 'ch', name: '치읓', category: 'consonant', group: '送气音', description: '与ㅈ同部位，送气强，类似“吃”的声母。', example: { word: '친구', roman: 'chingu', zh: '朋友' } },
  { char: 'ㄴ', romanization: 'n', name: '니은', category: 'consonant', group: '鼻音与流音', description: '舌尖抵上齿龈，气流从鼻腔出，类似“那”的声母。', example: { word: '나비', roman: 'nabi', zh: '蝴蝶' } },
  { char: 'ㄹ', romanization: 'r/l', name: '리을', category: 'consonant', group: '鼻音与流音', description: '舌尖弹上齿龈，词首发“ㄹ”近似“r”，词中/尾近似“l”。', example: { word: '라디오', roman: 'radio', zh: '收音机' } },
  { char: 'ㅁ', romanization: 'm', name: '미음', category: 'consonant', group: '鼻音与流音', description: '双唇闭合，气流从鼻腔出，类似“妈”的声母。', example: { word: '마을', roman: 'ma-eul', zh: '村庄' } },
  { char: 'ㅇ', romanization: 'ng', name: '이응', category: 'consonant', group: '鼻音与流音', description: '作辅音时不发音；作收音时为后鼻音“ng”。', example: { word: '아이', roman: 'ai', zh: '孩子' } },
  { char: 'ㅎ', romanization: 'h', name: '히읗', category: 'consonant', group: '摩擦音', description: '声门摩擦成音，类似“喝”的声母，常引发送气化。', example: { word: '하늘', roman: 'haneul', zh: '天空' } },
]

// 27 个收音 → 7 种代表音
const B_SINGLE: { char: string; rep: string; word: string; roman: string; zh: string }[] = [
  { char: 'ㄱ', rep: 'ㄱ[ㄱ]', word: '국', roman: 'guk', zh: '汤' },
  { char: 'ㄴ', rep: 'ㄴ[ㄴ]', word: '산', roman: 'san', zh: '山' },
  { char: 'ㄷ', rep: 'ㄷ[ㄷ]', word: '받', roman: 'bat', zh: '받다（受）' },
  { char: 'ㄹ', rep: 'ㄹ[ㄹ]', word: '달', roman: 'dal', zh: '月亮' },
  { char: 'ㅁ', rep: 'ㅁ[ㅁ]', word: '봄', roman: 'bom', zh: '春天' },
  { char: 'ㅂ', rep: 'ㅂ[ㅂ]', word: '입', roman: 'ip', zh: '嘴' },
  { char: 'ㅅ', rep: 'ㅅ[ㄷ]', word: '있다', roman: 'itda', zh: '有' },
  { char: 'ㅇ', rep: 'ㅇ[ㅇ]', word: '강', roman: 'gang', zh: '江' },
  { char: 'ㅈ', rep: 'ㅈ[ㄷ]', word: '젖', roman: 'jeot', zh: '奶' },
  { char: 'ㅊ', rep: 'ㅊ[ㄷ]', word: '꽃', roman: 'kkot', zh: '花' },
  { char: 'ㅋ', rep: 'ㅋ[ㄱ]', word: '부엌', roman: 'bueok', zh: '厨房' },
  { char: 'ㄱ', rep: 'ㄱ[ㄱ]', word: '밖', roman: 'bak', zh: '外面' },
  { char: 'ㅍ', rep: 'ㅍ[ㅂ]', word: '앞', roman: 'ap', zh: '前面' },
  { char: 'ㅎ', rep: 'ㅎ[ㄷ]', word: '좋다', roman: 'jota', zh: '好' },
]
const B_DOUBLE: { char: string; rep: string; word: string; roman: string; zh: string }[] = [
  { char: 'ㄲ', rep: 'ㄲ[ㄱ]', word: '넋', roman: 'neok', zh: '灵魂' },
  { char: 'ㄳ', rep: 'ㄳ[ㄱ]', word: '몫', roman: 'mok', zh: '份儿' },
  { char: 'ㄵ', rep: 'ㄵ[ㄴ]', word: '앉다', roman: 'antda', zh: '坐' },
  { char: 'ㄶ', rep: 'ㄶ[ㄴ]', word: '많다', roman: 'mantda', zh: '多' },
  { char: 'ㄺ', rep: 'ㄺ[ㄱ]', word: '읽다', roman: 'ikda', zh: '读' },
  { char: 'ㄻ', rep: 'ㄻ[ㅁ]', word: '젊다', roman: 'jeomda', zh: '年轻' },
  { char: 'ㄼ', rep: 'ㄼ[ㅂ]', word: '여덟', roman: 'yeodeolp', zh: '八' },
  { char: 'ㄽ', rep: 'ㄽ[ㄹ]', word: '외곬', roman: 'oegol', zh: '一条道' },
  { char: 'ㅀ', rep: 'ㅀ[ㄹ]', word: '잃다', roman: 'ilta', zh: '丢' },
  { char: 'ㅄ', rep: 'ㅄ[ㅂ]', word: '값', roman: 'gap', zh: '价格' },
  { char: 'ㄾ', rep: 'ㄾ[ㄹ]', word: '훑다', roman: 'hultta', zh: '扫' },
  { char: 'ㄿ', rep: 'ㄿ[ㅂ]', word: '읊다', roman: 'eupda', zh: '吟诵' },
  { char: 'ㄺ', rep: 'ㄺ[ㄹ]', word: '얇다', roman: 'yalta', zh: '薄' },
]

const B: Sound[] = [
  ...B_SINGLE.map((b) => ({
    char: b.char,
    romanization: b.rep,
    name: '받침',
    category: 'batchim' as const,
    group: '单收音',
    description: `收音（韵尾），代表音 ${b.rep}。`,
    example: { word: b.word, roman: b.roman, zh: b.zh },
    represents: b.rep,
  })),
  ...B_DOUBLE.map((b) => ({
    char: b.char,
    romanization: b.rep,
    name: '겹받침',
    category: 'batchim' as const,
    group: '双收音',
    description: `双收音，代表音 ${b.rep}（左留右移/综合）。`,
    example: { word: b.word, roman: b.roman, zh: b.zh },
    represents: b.rep,
  })),
]

export const ALPHABET: Sound[] = [...V, ...C, ...B]
export const VOWELS = V
export const CONSONANTS = C
export const BATCHIMS = B
