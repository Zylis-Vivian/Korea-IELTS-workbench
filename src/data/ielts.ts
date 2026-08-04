import type {
  IeltsListeningItem,
  IeltsReadingArticle,
  IeltsSpeakingTopic,
  IeltsWritingTask,
} from '../types'

export const LISTENING: IeltsListeningItem[] = [
  {
    id: 'l1',
    title: 'Campus Accommodation Enquiry',
    accent: '英音',
    script:
      'Receptionist: Hello, University Housing Office. How can I help? Student: Hi, I\'m a new postgraduate and I\'d like to ask about on-campus rooms. Receptionist: Sure. We have shared flats and studio rooms. The shared flat is 120 pounds per week, and the studio is 180. Student: Is the rent inclusive of bills? Receptionist: Yes, water and electricity are included, but you pay for your own internet. Student: Great. When can I move in? Receptionist: From the 15th of September.',
    questions: [
      { q: '每周共享公寓租金是多少？', a: '120 英镑' },
      { q: '房租包含哪些账单？', a: '水费和电费（网络自费）' },
    ],
  },
  {
    id: 'l2',
    title: 'Museum Tour Introduction',
    accent: '澳音',
    script:
      'Guide: Welcome to the National Museum. Our guided tour starts at the main hall. The first exhibition on the left shows Aboriginal art dating back over 20,000 years. Please do not use flash photography. The cafe is on the second floor, and the gift shop closes at 5 p.m. The bus to the city centre leaves every 30 minutes from the east gate.',
    questions: [
      { q: '原住民艺术距今多少年？', a: '超过 20,000 年' },
      { q: '礼品店几点关门？', a: '下午 5 点' },
    ],
  },
]

export const READING: IeltsReadingArticle[] = [
  {
    id: 'r1',
    title: 'The Hidden Life of Urban Trees',
    topic: '环境',
    level: '中等',
    body: 'Cities are often thought of as concrete deserts, yet a growing body of research reveals that urban trees form complex, cooperative networks. Beneath the pavement, their roots intertwine and, with the help of fungi, exchange nutrients and warning signals about pests. A large, healthy tree can support dozens of smaller neighbours by sharing sugar produced through photosynthesis. Urban planners are beginning to recognise that tree diversity, not just number, is what makes a city resilient to heat waves and disease. However, compacted soil and limited space remain major threats. Experts argue that treating trees as infrastructure — with budgets and maintenance — is essential for future liveable cities.',
    questions: [
      { q: '城市树木通过什么与真菌交换资源？', a: '根系（roots）与真菌形成的网络' },
      { q: '专家认为城市韧性更依赖树木的什么？', a: '多样性（diversity）而非数量' },
    ],
  },
  {
    id: 'r2',
    title: 'Why We Sleep',
    topic: '健康',
    level: '较难',
    body: 'Sleep is not merely the absence of wakefulness; it is an active, restorative state essential to memory consolidation and immune function. During slow-wave sleep, the brain replays the day\'s experiences, strengthening neural connections. REM sleep, by contrast, supports mood regulation. Chronic deprivation is linked to obesity, poor concentration and weakened defences. Despite this, modern culture often glorifies sleeplessness as a sign of productivity. Researchers recommend a consistent schedule and a dark, cool bedroom as the simplest interventions with the largest payoff.',
    questions: [
      { q: '慢波睡眠（slow-wave sleep）的作用？', a: '巩固记忆、强化神经连接' },
      { q: '作者批评现代文化把什么误认为高效？', a: '少睡/不睡（sleeplessness）' },
    ],
  },
]

export const SPEAKING: IeltsSpeakingTopic[] = [
  {
    id: 's1',
    part: 'Part 1',
    category: '人物/日常',
    question: 'Do you like reading books? Why or why not?',
    sample: [
      { score: '5.5', text: 'Yes, I like reading because it is interesting and I can learn new things from books.' },
      { score: '6.5', text: 'I do enjoy reading, especially novels, because it helps me relax after a long day and broadens my horizons.' },
      { score: '7.5', text: 'I\'m quite into reading. I tend to alternate between fiction and non-fiction, and I find it not only unwinds me but also exposes me to perspectives I\'d never encounter otherwise.' },
    ],
    keywords: ['relax', 'broaden horizons', 'unwind', 'perspective'],
  },
  {
    id: 's2',
    part: 'Part 2',
    category: '事件',
    question: 'Describe a time you helped someone. You should say: who, what you did, and how you felt.',
    sample: [
      { score: '5.5', text: 'I helped my friend with his homework. He was happy and I was happy too.' },
      { score: '6.5', text: 'Last month I helped an old neighbour carry heavy bags upstairs. She thanked me, and I felt proud because small acts matter.' },
      { score: '7.5', text: 'I recall assisting a tourist who was lost near the station. I walked her to the right platform, and seeing her relief made the effort worthwhile — it reinforced how rewarding everyday kindness can be.' },
    ],
    keywords: ['neighbour', 'proud', 'worthwhile', 'everyday kindness'],
  },
  {
    id: 's3',
    part: 'Part 3',
    category: '抽象',
    question: 'Why is volunteering important for society?',
    sample: [
      { score: '6.5', text: 'Volunteering helps people in need and makes communities stronger and more connected.' },
      { score: '7.5', text: 'Beyond immediate relief, volunteering fosters social cohesion and cultivates empathy, which in the long run reduces inequality and builds trust between strangers.' },
    ],
    keywords: ['social cohesion', 'empathy', 'inequality', 'trust'],
  },
]

export const WRITING: IeltsWritingTask[] = [
  {
    id: 'w1',
    type: 'Task 2（议论文）',
    topic: '教育',
    prompt: 'Some people believe university education should be free for everyone. To what extent do you agree or disagree?',
    outline:
      '开头：表明立场（部分同意）。主体段1：免费教育的益处（公平、提升国民素质）。主体段2：财政压力与滥用风险（需条件限制）。结论：建议按需资助而非全面免费。',
  },
  {
    id: 'w2',
    type: 'Task 1（图表）',
    topic: '环境',
    prompt: 'The chart below shows the percentage of renewable energy in total consumption in three countries from 2000 to 2020.',
    outline:
      '总述趋势：三国可再生能源占比均上升。对比：Country A 增幅最大；Country B 平稳；Country C 起点高但增速慢。突出最高值与交点年份。',
  },
]
