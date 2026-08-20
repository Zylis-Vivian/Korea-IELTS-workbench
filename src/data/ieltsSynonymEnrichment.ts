import type { SynonymGroup } from './ieltsVocabData'

export interface SynonymEnrichment {
  /** 适合放在写作/口语中的语境标签。 */
  context: string
  /** 优先记忆的搭配，而不是脱离语境背同义词。 */
  collocations: string[]
  example: string
  exampleCn: string
  /** 只在替换词并非完全等价时提示语义边界。 */
  caution?: string
}

/**
 * 先覆盖雅思写作中最常用的一组高频替换词。
 * 其他词条仍可正常搜索和练习，后续可以按学习数据继续补充，而不会改变原始词库结构。
 */
const ENRICHMENTS: Record<string, SynonymEnrichment> = {
  increase: {
    context: '图表趋势 / 数量变化',
    collocations: ['increase significantly', 'a steady increase in', 'increase from A to B'],
    example: 'The proportion of online shoppers increased significantly from 2010 to 2020.',
    exampleCn: '2010 到 2020 年，网购者的比例显著上升。',
    caution: 'surge / soar 语气更强，适合明显或快速上升。',
  },
  decrease: {
    context: '图表趋势 / 数量变化',
    collocations: ['decrease sharply', 'a gradual decrease in', 'decrease by 10%'],
    example: 'The figure for car use decreased steadily over the period.',
    exampleCn: '这段时期汽车使用量稳步下降。',
    caution: 'plummet 表示骤降，不能替代所有一般的 decrease。',
  },
  improve: {
    context: '措施效果 / 社会议题',
    collocations: ['improve public health', 'improve access to', 'significantly improve'],
    example: 'Better public transport can improve access to education.',
    exampleCn: '更好的公共交通能够改善人们接受教育的机会。',
  },
  worsen: {
    context: '问题后果 / 消极趋势',
    collocations: ['worsen inequality', 'worsen the problem', 'further worsen'],
    example: 'Unplanned urban growth may worsen traffic congestion.',
    exampleCn: '无规划的城市扩张可能会加剧交通拥堵。',
    caution: 'exacerbate 更正式，通常接问题、差距或负面影响。',
  },
  cause: {
    context: '因果论证 / 解释原因',
    collocations: ['cause damage', 'cause concern', 'cause serious problems'],
    example: 'A lack of sleep can cause poor concentration.',
    exampleCn: '睡眠不足会导致注意力不集中。',
    caution: 'contribute to 只表示促成，语气弱于 cause；lead to / result in 后接结果。',
  },
  solve: {
    context: '问题解决 / 政策建议',
    collocations: ['solve a problem', 'address the issue', 'tackle inequality'],
    example: 'Investment in public transport can help tackle congestion.',
    exampleCn: '投资公共交通有助于解决拥堵问题。',
    caution: 'address / tackle 强调采取行动，不一定表示问题已经彻底解决。',
  },
  show: {
    context: '数据描述 / 证据引入',
    collocations: ['show a trend', 'show that', 'clearly demonstrate'],
    example: 'The figures indicate that demand rose steadily.',
    exampleCn: '数据表明需求稳步上升。',
    caution: 'indicate 偏数据迹象，demonstrate 偏证据充分，不要机械互换。',
  },
  think: {
    context: '观点表达 / 议论文立场',
    collocations: ['argue that', 'believe that', 'maintain that'],
    example: 'Some researchers argue that early feedback improves learning.',
    exampleCn: '一些研究者认为，及时反馈能够改善学习效果。',
    caution: 'claim 可能暗含“尚待证明”，argue 更适合呈现论证立场。',
  },
  use: {
    context: '方法手段 / 资源利用',
    collocations: ['use resources efficiently', 'employ a method', 'adopt a policy'],
    example: 'Governments should adopt a long-term approach to water management.',
    exampleCn: '政府应采用长期的水资源管理方法。',
    caution: 'utilize 偏正式但不一定比 use 更好；adopt 通常接方法、政策或观点。',
  },
  change: {
    context: '社会变化 / 趋势转型',
    collocations: ['change dramatically', 'undergo a change', 'transform the way'],
    example: 'The city has undergone significant changes in the last decade.',
    exampleCn: '这座城市在过去十年发生了显著变化。',
  },
  important: {
    context: '观点强调 / 论证重点',
    collocations: ['a crucial factor', 'play a vital role', 'be of great importance'],
    example: 'Public trust plays a vital role in the success of health campaigns.',
    exampleCn: '公众信任对健康宣传活动的成功起着至关重要的作用。',
    caution: '不要在同一段反复堆叠 crucial、vital、essential，选择一个即可。',
  },
  problem: {
    context: '问题定义 / 讨论风险',
    collocations: ['pose a problem', 'address the issue', 'a pressing challenge'],
    example: 'Limited housing supply poses a serious problem for young families.',
    exampleCn: '住房供应有限给年轻家庭带来了严重问题。',
    caution: 'issue 比 problem 更中性；challenge 不一定表示无法解决。',
  },
  advantage: {
    context: '利弊分析 / 方案评价',
    collocations: ['a major advantage', 'benefit from', 'a positive aspect'],
    example: 'A major advantage of cycling is that it produces no direct emissions.',
    exampleCn: '骑行的一大优势是不会直接产生排放。',
  },
  disadvantage: {
    context: '利弊分析 / 限制说明',
    collocations: ['a potential drawback', 'a serious limitation', 'the downside of'],
    example: 'The main drawback of remote work is the loss of informal interaction.',
    exampleCn: '远程办公的主要缺点是减少了非正式交流。',
  },
  result: {
    context: '结果总结 / 因果衔接',
    collocations: ['result in', 'the outcome of', 'a possible consequence'],
    example: 'Poor maintenance can result in costly repairs later.',
    exampleCn: '维护不善可能会导致之后昂贵的维修费用。',
    caution: 'result in 表示“导致”，result from 表示“由……导致”，注意方向。',
  },
  support: {
    context: '论据支撑 / 政策立场',
    collocations: ['support an argument', 'support the view that', 'advocate for'],
    example: 'The survey results support the view that flexible schedules improve retention.',
    exampleCn: '调查结果支持灵活安排能够提高留存率这一观点。',
  },
  reduce: {
    context: '政策措施 / 数量控制',
    collocations: ['reduce emissions', 'curb growth', 'cut costs'],
    example: 'Improving insulation can reduce household energy consumption.',
    exampleCn: '改善隔热能够减少家庭能源消耗。',
    caution: 'curb / restrain 强调遏制增长，alleviate 更常接痛苦、压力或问题。',
  },
}

export function getSynonymEnrichment(group: SynonymGroup): SynonymEnrichment | undefined {
  return ENRICHMENTS[group.base.trim().toLowerCase()]
}
