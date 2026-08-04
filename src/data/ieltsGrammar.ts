// 雅思核心语法 + 长难句拆解数据

export interface GrammarItem {
  id: string
  name: string
  category: string
  explanation: string
  formula: string
  examples: { en: string; cn: string }[]
  commonErrors: string[]
  ieltsApp: string
  mnemonic: string
  quiz: { q: string; options: string[]; answer: number; explain: string }[]
}

export const grammarItems: GrammarItem[] = [
  {
    id: 'present-perfect',
    name: '现在完成时',
    category: '时态',
    explanation: '表示过去发生的动作对现在造成影响，或从过去持续到现在。结构 have/has + 过去分词。常与 already, yet, since, for, just 连用。雅思写作中用于引出背景与既有研究。',
    formula: 'S + have/has + V.pp (+ since/for...)',
    examples: [
      { en: 'Researchers have found a link between sleep and memory.', cn: '研究者已发现睡眠与记忆的关联。' },
      { en: 'The demand has increased since 2010.', cn: '需求自 2010 年以来一直在增长。' },
    ],
    commonErrors: ['误用一般过去时描述持续状态（× The demand increased since 2010）', 'have/has 与主语单复数不一致'],
    ieltsApp: '写作引言段交代研究背景；口语 Part 2 描述经历',
    mnemonic: 'has/have + 过分 = 已完成但连着现在',
    quiz: [
      { q: '选正确表达：这项研究___（发现）一种新方法。', options: ['has found', 'found since', 'has find'], answer: 0, explain: '现在完成时 has found 表对现在的影响。' },
    ],
  },
  {
    id: 'passive',
    name: '被动语态',
    category: '时态',
    explanation: '学术写作高频，强调动作承受者而非执行者。be + 过去分词。可保留 by 施动者，也可省略。常用于方法、结果与客观描述。',
    formula: 'S + be + V.pp (+ by O)',
    examples: [
      { en: 'The experiment was conducted in 2020.', cn: '实验于 2020 年进行。' },
      { en: 'A solution is proposed to reduce emissions.', cn: '提出了一项减少排放的方案。' },
    ],
    commonErrors: ['及物动词才能用于被动', '被动进行时 be being done 易遗漏 being'],
    ieltsApp: '写作 Task 1 流程图/地图、Task 2 客观论述',
    mnemonic: '被动 = 被字句，be + 过分',
    quiz: [
      { q: 'The data ___ (collect) from 500 participants.', options: ['was collected', 'collected', 'has collect'], answer: 0, explain: '数据被收集，用被动 was collected。' },
    ],
  },
  {
    id: 'relative',
    name: '定语从句',
    category: '从句',
    explanation: '修饰名词，分为限定性与非限定性（逗号隔开）。关系代词 who/whom/which/that/whose，关系副词 when/where/why。介词+which/whom 常见于学术长句。',
    formula: '先行词 + 关系词 + 从句',
    examples: [
      { en: 'The policy, which was introduced in 2015, improved air quality.', cn: '该政策（2015 年推出）改善了空气质量。' },
      { en: 'Students who study abroad face cultural challenges.', cn: '留学的学生面临文化挑战。' },
    ],
    commonErrors: ['非限定性从句不可用 that', '先行词为物时用 which 而非 who'],
    ieltsApp: '阅读长难句拆分、写作提升句式复杂度',
    mnemonic: '从句跟着名词跑，逗号决定限不限',
    quiz: [
      { q: 'The city ___ I was born has changed a lot.', options: ['where', 'which', 'who'], answer: 0, explain: 'city 是地点，用 where 或 in which。' },
    ],
  },
  {
    id: 'noun-clause',
    name: '名词性从句',
    category: '从句',
    explanation: '在句中充当主语、宾语、表语或同位语。引导词 that / wh- 词 / whether。主语从句常后置用 it 作形式主语。',
    formula: 'That/Wh- + 陈述句语序',
    examples: [
      { en: 'It is clear that climate change is accelerating.', cn: '显然气候变化正在加速。' },
      { en: 'The graph shows why demand fluctuated.', cn: '图表显示了需求波动的原因。' },
    ],
    commonErrors: ['从句需用陈述语序（× why did it happen）', 'whether 与 if 在介词后不可混用'],
    ieltsApp: '写作 Task 2 观点表达、图表描述原因',
    mnemonic: '名词从句当名词用，语序不变',
    quiz: [
      { q: '___ he will attend is uncertain.', options: ['Whether', 'If', 'That'], answer: 0, explain: '主语从句表“是否”用 Whether，if 不可置句首作主语。' },
    ],
  },
  {
    id: 'nonfinite',
    name: '非谓语动词',
    category: '非谓语',
    explanation: '不作谓语的动词形式：动名词 doing（主语/宾语）、不定式 to do（目的/结果/补语）、分词 doing/done（定语/状语/补语）。可大幅压缩句式。',
    formula: 'doing / to do / done',
    examples: [
      { en: 'Reading widely improves vocabulary.', cn: '广泛阅读提升词汇量。' },
      { en: 'To solve this, governments must act.', cn: '为解决此问题，政府必须行动。' },
    ],
    commonErrors: ['悬垂分词（逻辑主语错误）', '动名词与不定式混用导致语义偏差'],
    ieltsApp: '写作高分句式、阅读长句主干提取',
    mnemonic: '非谓语不当谓语，doing/to do/done 三兄弟',
    quiz: [
      { q: '___ (walk) in the park, she saw a rare bird.', options: ['Walking', 'Walked', 'To walk'], answer: 0, explain: '现在分词作时间状语，主语 she 与 walk 主动。' },
    ],
  },
  {
    id: 'subjunctive',
    name: '虚拟语气',
    category: '特殊句式',
    explanation: '表达与事实相反、建议或愿望。If 条件句（与现在/过去相反）、wish/if only、建议类 it is vital that + (should) do。',
    formula: 'If + 过去时, S + would do（与现在相反）',
    examples: [
      { en: 'If governments invested more, emissions would fall.', cn: '若政府投入更多，排放会下降。' },
      { en: 'It is essential that action be taken now.', cn: '现在必须采取行动。' },
    ],
    commonErrors: ['would 与 if 条件中重复使用', '与过去相反用 had done'],
    ieltsApp: '写作提出建议与假设情景',
    mnemonic: '虚拟 = 假想，时态往回退一格',
    quiz: [
      { q: 'If I ___ rich, I would travel.', options: ['were', 'am', 'will be'], answer: 0, explain: '与现在相反，be 用 were。' },
    ],
  },
  {
    id: 'inversion',
    name: '倒装句',
    category: '特殊句式',
    explanation: '为强调或语法需要，将助动词/be 置于主语前。否定词开头（never, hardly, not only）、only + 状语、so/neither 等触发部分倒装。',
    formula: '否定词 + 助动词 + 主语 + 动词',
    examples: [
      { en: 'Not only did they reduce cost, but they improved quality.', cn: '他们不仅降低成本，还提升了质量。' },
      { en: 'Only by recycling can we save resources.', cn: '唯有通过回收我们才能节约资源。' },
    ],
    commonErrors: ['仅在否定/only 等触发词后倒装', '主谓一致仍需注意'],
    ieltsApp: '写作提升句式多样性、强调论点',
    mnemonic: '否定打头，助动词先走',
    quiz: [
      { q: 'Never ___ such a beautiful view.', options: ['have I seen', 'I have seen', 'I saw'], answer: 0, explain: 'Never 开头部分倒装：have I seen。' },
    ],
  },
  {
    id: 'emphasis',
    name: '强调句',
    category: '特殊句式',
    explanation: '用 It is/was + 被强调部分 + that/who + 其余，强调主语、宾语或状语。不可强调谓语动词与定语。',
    formula: 'It is/was + X + that/who + ...',
    examples: [
      { en: 'It was the government that funded the project.', cn: '正是政府资助了这个项目。' },
      { en: 'It is education that changes lives.', cn: '改变命运的是教育。' },
    ],
    commonErrors: ['强调人也可用 that', '不可强调谓语动词'],
    ieltsApp: '写作突出核心原因或主体',
    mnemonic: 'It is ... that，框住要强调的',
    quiz: [
      { q: '___ the teacher who helped me.', options: ['It was', 'It is', 'Was it'], answer: 0, explain: '强调人，过去时用 It was ... who。' },
    ],
  },
]

// ───────── 长难句拆解库 ─────────
export interface LongSentence {
  id: string
  sentence: string
  difficulty: '5.0' | '6.0' | '7.0+'
  mainClause: string
  modifiers: string[]
  logic: string
  translation: string
  grammarPoints: string[]
  source: string
}

export const longSentences: LongSentence[] = [
  {
    id: 'ls1',
    sentence: 'Although the initial cost is high, renewable energy will, in the long run, prove more economical.',
    difficulty: '6.0',
    mainClause: 'renewable energy will prove more economical',
    modifiers: ['Although the initial cost is high（让步状语从句）', 'in the long run（插入状语）'],
    logic: '让步：尽管…但是…',
    translation: '尽管初期成本高，但从长远看可再生能源会更经济。',
    grammarPoints: ['让步状语从句', '插入语', '比较级'],
    source: '剑桥雅思 写作范文',
  },
  {
    id: 'ls2',
    sentence: 'It is the government, rather than individuals, that should bear the primary responsibility for reducing carbon emissions.',
    difficulty: '7.0+',
    mainClause: 'It is the government that should bear the responsibility',
    modifiers: ['rather than individuals（插入对比）', 'for reducing carbon emissions（目的状语）'],
    logic: '强调：责任主体是政府而非个人',
    translation: '应是政府而非个人承担减排的主要责任。',
    grammarPoints: ['强调句', 'rather than 对比', '非谓语动词'],
    source: '剑桥雅思 大作文',
  },
  {
    id: 'ls3',
    sentence: 'The study, which tracked 2,000 children over a decade, found that screen time was linked to shorter attention spans.',
    difficulty: '6.0',
    mainClause: 'The study found that screen time was linked to shorter attention spans',
    modifiers: ['which tracked 2,000 children over a decade（非限定定语从句）', 'that 引导宾语从句'],
    logic: '因果/说明：研究发现…',
    translation: '这项研究追踪了 2000 名儿童十年，发现屏幕时间与注意力缩短有关。',
    grammarPoints: ['非限定性定语从句', '宾语从句', '被动语态'],
    source: '剑桥雅思 阅读',
  },
  {
    id: 'ls4',
    sentence: 'Had the policy been implemented earlier, the decline in biodiversity might have been slowed.',
    difficulty: '7.0+',
    mainClause: 'the decline might have been slowed',
    modifiers: ['Had the policy been implemented earlier（虚拟条件句倒装）'],
    logic: '虚拟：与过去相反',
    translation: '若政策更早实施，生物多样性下降本可减缓。',
    grammarPoints: ['虚拟语气倒装', '被动语态', '过去完成时'],
    source: '剑桥雅思 大作文',
  },
  {
    id: 'ls5',
    sentence: 'Not only does urbanization create jobs, but it also places enormous pressure on public services.',
    difficulty: '7.0+',
    mainClause: 'urbanization creates jobs and places pressure',
    modifiers: ['Not only does urbanization create jobs（否定词开头倒装）', 'but it also places pressure（并列）'],
    logic: '递进：不仅…而且…',
    translation: '城市化不仅创造就业，也给公共服务带来巨大压力。',
    grammarPoints: ['倒装句', '并列结构', '介词搭配'],
    source: '剑桥雅思 大作文',
  },
  {
    id: 'ls6',
    sentence: 'Children who grow up in bilingual households tend to develop better problem-solving skills than their monolingual peers.',
    difficulty: '6.0',
    mainClause: 'Children tend to develop better skills',
    modifiers: ['who grow up in bilingual households（定语从句）', 'than their monolingual peers（比较状语）'],
    logic: '比较：双语 vs 单语',
    translation: '在双语家庭长大的孩子往往比单语同伴具备更好的解决问题能力。',
    grammarPoints: ['定语从句', '比较级', '主谓一致'],
    source: '雅思口语 素材',
  },
]
