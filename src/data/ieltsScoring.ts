// 雅思评分标准数据

export interface BandRow {
  min: number
  max: number
  band: number
}

// 听力 / 阅读（A 类）正确题数 → 分数（40 题）
export const listeningScale: BandRow[] = [
  { min: 39, max: 40, band: 9 }, { min: 37, max: 38, band: 8.5 }, { min: 35, max: 36, band: 8 },
  { min: 32, max: 34, band: 7.5 }, { min: 30, max: 31, band: 7 }, { min: 26, max: 29, band: 6.5 },
  { min: 23, max: 25, band: 6 }, { min: 18, max: 22, band: 5.5 }, { min: 16, max: 17, band: 5 },
  { min: 13, max: 15, band: 4.5 }, { min: 11, max: 12, band: 4 }, { min: 8, max: 10, band: 3.5 },
]

export const readingScale: BandRow[] = [
  { min: 39, max: 40, band: 9 }, { min: 37, max: 38, band: 8.5 }, { min: 35, max: 36, band: 8 },
  { min: 33, max: 34, band: 7.5 }, { min: 30, max: 32, band: 7 }, { min: 27, max: 29, band: 6.5 },
  { min: 23, max: 26, band: 6 }, { min: 19, max: 22, band: 5.5 }, { min: 15, max: 18, band: 5 },
  { min: 13, max: 14, band: 4.5 }, { min: 10, max: 12, band: 4 }, { min: 8, max: 9, band: 3.5 },
]

export function bandFor(scale: BandRow[], correct: number): number {
  const row = scale.find((r) => correct >= r.min && correct <= r.max)
  return row ? row.band : 0
}

export interface CriteriaItem {
  code: string
  name: string
  band9: string
  band7: string
  band5: string
}

export const writingCriteria: CriteriaItem[] = [
  { code: 'TR/TA', name: '任务回应', band9: '充分回应所有要求，立场清晰，结论自然', band7: '回应主要要求，偶有偏题', band5: '仅部分回应，立场模糊' },
  { code: 'CC', name: '连贯衔接', band9: '衔接自然，分段恰到好处', band7: '逻辑清晰，偶有衔接生硬', band5: '缺乏连贯，段落混乱' },
  { code: 'LR', name: '词汇丰富', band9: '用词精准丰富，极少错误', band7: '词汇足够，偶有不当', band5: '词汇有限，重复多' },
  { code: 'GRA', name: '语法准确', band9: '句式多样且准确', band7: '句式有变化，偶有错误', band5: '仅简单句，错误频繁' },
]

export const speakingCriteria: CriteriaItem[] = [
  { code: 'FC', name: '流利度', band9: '流利自然，几乎无停顿', band7: '基本流利，偶有犹豫', band5: '频繁停顿，表达吃力' },
  { code: 'LR', name: '词汇', band9: '词汇丰富地道', band7: '表达充分，偶有不准', band5: '词汇匮乏' },
  { code: 'GRA', name: '语法', band9: '句式多样且准确', band7: '句式有变化，错误少', band5: '仅简单结构，错误多' },
  { code: 'P', name: '发音', band9: '母语级清晰', band7: '易懂，重音语调可控', band5: '影响理解' },
]

export interface BandFeature {
  band: string
  features: string[]
}
export const bandFeatures: BandFeature[] = [
  { band: '5.0', features: ['能大致表达，但错误频繁', '词汇与句式有限', '衔接薄弱'] },
  { band: '6.0', features: ['能稳定使用常见表达', '有段落意识', '仍有明显错误但不影响理解'] },
  { band: '7.0', features: ['表达灵活，偶有亮点', '逻辑清晰连贯', '偶尔小错'] },
  { band: '8.0', features: ['流畅自然，地道', '结构严谨', '几乎无错误'] },
]

export interface PathItem {
  from: string
  to: string
  stop: string[]
  build: string[]
}
export const paths: PathItem[] = [
  { from: '5.5', to: '6.0', stop: ['背模板式开头', '主谓不一致', '通篇简单句'], build: ['每段有明确主旨句', '用连接词串联', '每篇 2-3 个复合句'] },
  { from: '6.0', to: '6.5', stop: ['同义替换单一', '段落间跳跃', '词汇重复'], build: ['同义替换词表', '每段 5-6 句', '精准使用学术词'] },
  { from: '6.5', to: '7.0', stop: ['句式单调', '论点展开不足', '少量硬伤'], build: ['倒装/强调/虚拟', '举例+解释结构', '自查语法'] },
  { from: '7.0', to: '7.5', stop: ['偶有中式表达', '连贯略生硬'], build: ['地道搭配', '自然衔接', '灵活多变句式'] },
]
