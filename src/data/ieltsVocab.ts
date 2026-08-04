// 雅思高频核心词汇（场景/话题通用），用于「雅思单词本」词库浏览器
export interface IeltsWord {
  english: string
  phonetic: string
  pos: string
  chinese: string
  example: string
  exampleZh: string
  topic: string
}

export const IELTS_VOCAB: IeltsWord[] = [
  { english: 'sustainable', phonetic: '/səˈsteɪnəbl/', pos: 'adj.', chinese: '可持续的', example: 'We need a sustainable approach to development.', exampleZh: '我们需要一种可持续的发展方式。', topic: '环境' },
  { english: 'controversial', phonetic: '/ˌkɒntrəˈvɜːʃl/', pos: 'adj.', chinese: '有争议的', example: 'The plan is highly controversial.', exampleZh: '该计划极具争议。', topic: '社会' },
  { english: 'implement', phonetic: '/ˈɪmplɪment/', pos: 'v.', chinese: '实施，执行', example: 'The government implemented new policies.', exampleZh: '政府实施了新政策。', topic: '政府' },
  { english: 'significant', phonetic: '/sɪɡˈnɪfɪkənt/', pos: 'adj.', chinese: '重要的，显著的', example: 'There was a significant increase.', exampleZh: '出现了显著增长。', topic: '通用' },
  { english: 'demonstrate', phonetic: '/ˈdemənstreɪt/', pos: 'v.', chinese: '证明，展示', example: 'The data demonstrates a clear trend.', exampleZh: '数据展示了一个清晰的趋势。', topic: '通用' },
  { english: 'approximately', phonetic: '/əˈprɒksɪmətli/', pos: 'adv.', chinese: '大约', example: 'It costs approximately 100 dollars.', exampleZh: '大约花费 100 美元。', topic: '通用' },
  { english: 'consequence', phonetic: '/ˈkɒnsɪkwəns/', pos: 'n.', chinese: '后果，结果', example: 'As a consequence, prices rose.', exampleZh: '结果价格上升了。', topic: '通用' },
  { english: 'fundamental', phonetic: '/ˌfʌndəˈmentl/', pos: 'adj.', chinese: '基本的，根本的', example: 'Education is fundamental to progress.', exampleZh: '教育对进步是根本的。', topic: '教育' },
  { english: 'negotiate', phonetic: '/nɪˈɡəʊʃieɪt/', pos: 'v.', chinese: '谈判，协商', example: 'They negotiated a better deal.', exampleZh: '他们谈成了一个更好的交易。', topic: '工作' },
  { english: 'phenomenon', phonetic: '/fəˈnɒmɪnən/', pos: 'n.', chinese: '现象', example: 'Climate change is a global phenomenon.', exampleZh: '气候变化是全球性现象。', topic: '环境' },
  { english: 'objective', phonetic: '/əbˈdʒektɪv/', pos: 'adj./n.', chinese: '客观的；目标', example: 'We must remain objective.', exampleZh: '我们必须保持客观。', topic: '通用' },
  { english: 'restrict', phonetic: '/rɪˈstrɪkt/', pos: 'v.', chinese: '限制，约束', example: 'New laws restrict emissions.', exampleZh: '新法律限制了排放。', topic: '政府' },
  { english: 'considerable', phonetic: '/kənˈsɪdərəbl/', pos: 'adj.', chinese: '相当大的', example: 'It took considerable effort.', exampleZh: '这花费了相当大的努力。', topic: '通用' },
  { english: 'accumulate', phonetic: '/əˈkjuːmjəleɪt/', pos: 'v.', chinese: '积累', example: 'Wealth accumulates over time.', exampleZh: '财富随时间积累。', topic: '经济' },
  { english: 'comprehensive', phonetic: '/ˌkɒmprɪˈhensɪv/', pos: 'adj.', chinese: '全面的，综合的', example: 'A comprehensive review was done.', exampleZh: '进行了一次全面的审查。', topic: '通用' },
  { english: 'inevitable', phonetic: '/ɪnˈevɪtəbl/', pos: 'adj.', chinese: '不可避免的', example: 'Change is inevitable.', exampleZh: '变化不可避免。', topic: '通用' },
  { english: 'predominant', phonetic: '/prɪˈdɒmɪnənt/', pos: 'adj.', chinese: '占主导地位的', example: 'English is predominant online.', exampleZh: '英语在网络上占主导地位。', topic: '文化' },
  { english: 'allocate', phonetic: '/ˈæləkeɪt/', pos: 'v.', chinese: '分配，拨出', example: 'Funds were allocated to schools.', exampleZh: '资金被分配给学校。', topic: '政府' },
  { english: 'subsequent', phonetic: '/ˈsʌbsɪkwənt/', pos: 'adj.', chinese: '随后的', example: 'The subsequent report confirmed it.', exampleZh: '随后的报告证实了这一点。', topic: '通用' },
  { english: 'vulnerable', phonetic: '/ˈvʌlnərəbl/', pos: 'adj.', chinese: '脆弱的，易受伤害的', example: 'Children are vulnerable.', exampleZh: '儿童是脆弱的。', topic: '社会' },
  { english: 'transform', phonetic: '/trænsˈfɔːm/', pos: 'v.', chinese: '使改变，转化', example: 'Technology transformed society.', exampleZh: '科技改变了社会。', topic: '科技' },
  { english: 'inequality', phonetic: '/ˌɪnɪˈkwɒləti/', pos: 'n.', chinese: '不平等', example: 'Income inequality is rising.', exampleZh: '收入不平等在加剧。', topic: '社会' },
  { english: 'emphasis', phonetic: '/ˈemfəsɪs/', pos: 'n.', chinese: '强调，重点', example: 'The emphasis is on safety.', exampleZh: '重点在于安全。', topic: '通用' },
  { english: 'adequate', phonetic: '/ˈædɪkwət/', pos: 'adj.', chinese: '足够的，适当的', example: 'We need adequate food.', exampleZh: '我们需要足够的食物。', topic: '通用' },
  { english: 'illustrate', phonetic: '/ˈɪləstreɪt/', pos: 'v.', chinese: '说明，阐明', example: 'The chart illustrates the trend.', exampleZh: '图表说明了这一趋势。', topic: '通用' },
  { english: 'tremendous', phonetic: '/trəˈmendəs/', pos: 'adj.', chinese: '巨大的', example: 'There was tremendous growth.', exampleZh: '出现了巨大的增长。', topic: '通用' },
  { english: 'catastrophe', phonetic: '/kəˈtæstrəfi/', pos: 'n.', chinese: '灾难', example: 'The earthquake was a catastrophe.', exampleZh: '地震是一场灾难。', topic: '环境' },
  { english: 'inevitably', phonetic: '/ɪnˈevɪtəbli/', pos: 'adv.', chinese: '不可避免地', example: 'Costs will inevitably rise.', exampleZh: '成本不可避免地会上升。', topic: '通用' },
  { english: 'potential', phonetic: '/pəˈtenʃl/', pos: 'adj./n.', chinese: '潜在的；潜力', example: 'It has great potential.', exampleZh: '它有巨大的潜力。', topic: '通用' },
  { english: 'preserve', phonetic: '/prɪˈzɜːv/', pos: 'v.', chinese: '保护，保存', example: 'We must preserve nature.', exampleZh: '我们必须保护自然。', topic: '环境' },
  { english: 'contribute', phonetic: '/kənˈtrɪbjuːt/', pos: 'v.', chinese: '贡献，导致', example: 'Cars contribute to pollution.', exampleZh: '汽车导致污染。', topic: '环境' },
  { english: 'concentrate', phonetic: '/ˈkɒnsntreɪt/', pos: 'v.', chinese: '集中，专注', example: 'Focus helps you concentrate.', exampleZh: '专注有助于集中注意力。', topic: '教育' },
  { english: 'evaluate', phonetic: '/ɪˈvæljueɪt/', pos: 'v.', chinese: '评估，评价', example: 'We must evaluate the risk.', exampleZh: '我们必须评估风险。', topic: '通用' },
  { english: 'beneficial', phonetic: '/ˌbenɪˈfɪʃl/', pos: 'adj.', chinese: '有益的', example: 'Exercise is beneficial.', exampleZh: '锻炼有益。', topic: '健康' },
  { english: 'obvious', phonetic: '/ˈɒbviəs/', pos: 'adj.', chinese: '明显的', example: 'The answer is obvious.', exampleZh: '答案很明显。', topic: '通用' },
  { english: 'distinct', phonetic: '/dɪˈstɪŋkt/', pos: 'adj.', chinese: '明显的，不同的', example: 'There are distinct views.', exampleZh: '有不同的观点。', topic: '通用' },
  { english: 'diminish', phonetic: '/dɪˈmɪnɪʃ/', pos: 'v.', chinese: '减少，削弱', example: 'Risks diminish over time.', exampleZh: '风险随时间减少。', topic: '通用' },
  { english: 'feasible', phonetic: '/ˈfiːzəbl/', pos: 'adj.', chinese: '可行的', example: 'The plan is feasible.', exampleZh: '该计划可行。', topic: '通用' },
]
