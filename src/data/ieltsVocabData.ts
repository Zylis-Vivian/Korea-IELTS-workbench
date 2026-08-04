// 雅思词汇学习数据（场景词 / 话题词 / 同义替换 / 词根词缀）
// 数据持续扩充中；结构清晰，后续可直接往数组里加内容。

export interface SceneWord {
  word: string
  phonetic: string
  pos: string
  chinese: string
  example: string
  exampleCn: string
}
export interface SceneGroup {
  scene: string
  words: SceneWord[]
}
export interface TopicGroup {
  topic: string
  words: SceneWord[]
}
export interface SynonymGroup {
  base: string
  replaces: string[]
  note: string
}
export interface RootItem {
  root: string
  meaning: string
  words: { word: string; chinese: string }[]
}

// ───────── 场景词汇（听力/口语高频） ─────────
export const sceneVocab: SceneGroup[] = [
  {
    scene: '租房住宿',
    words: [
      { word: 'landlord', phonetic: '/ˈlændlɔːd/', pos: 'n.', chinese: '房东', example: 'The landlord fixed the heater.', exampleCn: '房东修好了暖气。' },
      { word: 'tenant', phonetic: '/ˈtenənt/', pos: 'n.', chinese: '租客', example: 'Tenants must pay rent on time.', exampleCn: '租客须按时交租。' },
      { word: 'deposit', phonetic: '/dɪˈpɒzɪt/', pos: 'n.', chinese: '押金', example: 'A month’s deposit is required.', exampleCn: '需要一个月押金。' },
      { word: 'lease', phonetic: '/liːs/', pos: 'n.', chinese: '租约', example: 'Sign a one-year lease.', exampleCn: '签一年租约。' },
      { word: 'furnished', phonetic: '/ˈfɜːnɪʃt/', pos: 'adj.', chinese: '带家具的', example: 'A furnished flat.', exampleCn: '带家具的公寓。' },
      { word: 'utility', phonetic: '/juːˈtɪləti/', pos: 'n.', chinese: '公用事业（水电等）', example: 'Utility bills are included.', exampleCn: '水电费已包含。' },
      { word: 'accommodation', phonetic: '/əˌkɒməˈdeɪʃn/', pos: 'n.', chinese: '住宿', example: 'Student accommodation is limited.', exampleCn: '学生住宿有限。' },
      { word: 'dormitory', phonetic: '/ˈdɔːmətri/', pos: 'n.', chinese: '宿舍', example: 'Live in a dormitory.', exampleCn: '住宿舍。' },
    ],
  },
  {
    scene: '旅游出行',
    words: [
      { word: 'destination', phonetic: '/ˌdestɪˈneɪʃn/', pos: 'n.', chinese: '目的地', example: 'A popular tourist destination.', exampleCn: '热门旅游目的地。' },
      { word: 'itinerary', phonetic: '/aɪˈtɪnərəri/', pos: 'n.', chinese: '行程', example: 'Plan your itinerary.', exampleCn: '规划行程。' },
      { word: 'sightseeing', phonetic: '/ˈsaɪtsiːɪŋ/', pos: 'n.', chinese: '观光', example: 'Go sightseeing in the city.', exampleCn: '在城市观光。' },
      { word: 'souvenir', phonetic: '/ˌsuːvəˈnɪə/', pos: 'n.', chinese: '纪念品', example: 'Buy a souvenir.', exampleCn: '买纪念品。' },
      { word: 'boarding pass', phonetic: '/ˈbɔːdɪŋ pɑːs/', pos: 'n.', chinese: '登机牌', example: 'Show your boarding pass.', exampleCn: '出示登机牌。' },
      { word: 'customs', phonetic: '/ˈkʌstəmz/', pos: 'n.', chinese: '海关', example: 'Pass through customs.', exampleCn: '过海关。' },
      { word: 'baggage claim', phonetic: '/ˈbæɡɪdʒ kleɪm/', pos: 'n.', chinese: '行李提取处', example: 'Wait at baggage claim.', exampleCn: '在行李提取处等候。' },
      { word: 'transit', phonetic: '/ˈtrænzɪt/', pos: 'n.', chinese: '中转', example: 'A transit flight.', exampleCn: '中转航班。' },
    ],
  },
  {
    scene: '医疗健康',
    words: [
      { word: 'symptom', phonetic: '/ˈsɪmptəm/', pos: 'n.', chinese: '症状', example: 'What are the symptoms?', exampleCn: '有哪些症状？' },
      { word: 'diagnosis', phonetic: '/ˌdaɪəɡˈnəʊsɪs/', pos: 'n.', chinese: '诊断', example: 'Receive a diagnosis.', exampleCn: '得到诊断。' },
      { word: 'prescription', phonetic: '/prɪˈskrɪpʃn/', pos: 'n.', chinese: '处方', example: 'Fill the prescription.', exampleCn: '取处方配药。' },
      { word: 'therapy', phonetic: '/ˈθerəpi/', pos: 'n.', chinese: '治疗', example: 'Physical therapy helps.', exampleCn: '物理治疗有帮助。' },
      { word: 'nutrition', phonetic: '/njuˈtrɪʃn/', pos: 'n.', chinese: '营养', example: 'Good nutrition matters.', exampleCn: '良好营养很重要。' },
      { word: 'chronic', phonetic: '/ˈkrɒnɪk/', pos: 'adj.', chinese: '慢性的', example: 'A chronic disease.', exampleCn: '慢性病。' },
      { word: 'infectious', phonetic: '/ɪnˈfekʃəs/', pos: 'adj.', chinese: '传染性的', example: 'An infectious disease.', exampleCn: '传染病。' },
      { word: 'vaccination', phonetic: '/ˌvæksɪˈneɪʃn/', pos: 'n.', chinese: '疫苗接种', example: 'Get a vaccination.', exampleCn: '接种疫苗。' },
    ],
  },
  {
    scene: '工作职场',
    words: [
      { word: 'recruit', phonetic: '/rɪˈkruːt/', pos: 'v.', chinese: '招聘', example: 'Recruit new staff.', exampleCn: '招聘新员工。' },
      { word: 'resignation', phonetic: '/ˌrezɪɡˈneɪʃn/', pos: 'n.', chinese: '辞职', example: 'Hand in resignation.', exampleCn: '递交辞呈。' },
      { word: 'promotion', phonetic: '/prəˈməʊʃn/', pos: 'n.', chinese: '晋升', example: 'Get a promotion.', exampleCn: '获得晋升。' },
      { word: 'colleague', phonetic: '/ˈkɒliːɡ/', pos: 'n.', chinese: '同事', example: 'Help a colleague.', exampleCn: '帮助同事。' },
      { word: 'supervisor', phonetic: '/ˈsuːpəvaɪzə/', pos: 'n.', chinese: '主管', example: 'Ask the supervisor.', exampleCn: '问主管。' },
      { word: 'overtime', phonetic: '/ˈəʊvətaɪm/', pos: 'n.', chinese: '加班', example: 'Work overtime.', exampleCn: '加班。' },
      { word: 'deadline', phonetic: '/ˈdedlaɪn/', pos: 'n.', chinese: '截止日期', example: 'Meet the deadline.', exampleCn: '赶上截止日期。' },
      { word: 'performance review', phonetic: '/pəˈfɔːməns rɪˈvjuː/', pos: 'n.', chinese: '绩效评估', example: 'Annual performance review.', exampleCn: '年度绩效评估。' },
    ],
  },
  {
    scene: '校园学习',
    words: [
      { word: 'curriculum', phonetic: '/kəˈrɪkjələm/', pos: 'n.', chinese: '课程', example: 'A broad curriculum.', exampleCn: '广泛的课程。' },
      { word: 'seminar', phonetic: '/ˈsemɪnɑː/', pos: 'n.', chinese: '研讨课', example: 'Attend a seminar.', exampleCn: '参加研讨课。' },
      { word: 'assignment', phonetic: '/əˈsaɪnmənt/', pos: 'n.', chinese: '作业', example: 'Finish the assignment.', exampleCn: '完成作业。' },
      { word: 'dissertation', phonetic: '/ˌdɪsəˈteɪʃn/', pos: 'n.', chinese: '学位论文', example: 'Write a dissertation.', exampleCn: '写学位论文。' },
      { word: 'scholarship', phonetic: '/ˈskɒləʃɪp/', pos: 'n.', chinese: '奖学金', example: 'Win a scholarship.', exampleCn: '获得奖学金。' },
      { word: 'enrollment', phonetic: '/ɪnˈrəʊlmənt/', pos: 'n.', chinese: '注册入学', example: 'Enrollment is open.', exampleCn: '注册已开放。' },
      { word: 'prerequisite', phonetic: '/ˌpriːˈrekwəzɪt/', pos: 'n.', chinese: '先修条件', example: 'A prerequisite course.', exampleCn: '先修课程。' },
      { word: 'transcript', phonetic: '/ˈtrænskrɪpt/', pos: 'n.', chinese: '成绩单', example: 'Request a transcript.', exampleCn: '申请成绩单。' },
    ],
  },
  {
    scene: '餐饮美食',
    words: [
      { word: 'cuisine', phonetic: '/kwɪˈziːn/', pos: 'n.', chinese: '菜系', example: 'French cuisine.', exampleCn: '法国菜。' },
      { word: 'ingredient', phonetic: '/ɪnˈɡriːdiənt/', pos: 'n.', chinese: '食材', example: 'Fresh ingredients.', exampleCn: '新鲜食材。' },
      { word: 'recipe', phonetic: '/ˈresəpi/', pos: 'n.', chinese: '食谱', example: 'Follow the recipe.', exampleCn: '照食谱做。' },
      { word: 'vegetarian', phonetic: '/ˌvedʒəˈteəriən/', pos: 'adj.', chinese: '素食的', example: 'A vegetarian diet.', exampleCn: '素食饮食。' },
      { word: 'allergy', phonetic: '/ˈælədʒi/', pos: 'n.', chinese: '过敏', example: 'A food allergy.', exampleCn: '食物过敏。' },
      { word: 'reservation', phonetic: '/ˌrezəˈveɪʃn/', pos: 'n.', chinese: '预订', example: 'Make a reservation.', exampleCn: '预订。' },
      { word: 'menu', phonetic: '/ˈmenjuː/', pos: 'n.', chinese: '菜单', example: 'Read the menu.', exampleCn: '看菜单。' },
      { word: 'buffet', phonetic: '/ˈbʊfeɪ/', pos: 'n.', chinese: '自助餐', example: 'A lunch buffet.', exampleCn: '午餐自助。' },
    ],
  },
]

// ───────── 话题词汇（写作/口语高频） ─────────
export const topicVocab: TopicGroup[] = [
  {
    topic: '教育',
    words: [
      { word: 'standardized testing', phonetic: '/ˈstændədaɪzd ˈtestɪŋ/', pos: 'n.', chinese: '标准化考试', example: 'Standardized testing is debated.', exampleCn: '标准化考试有争议。' },
      { word: 'homeschooling', phonetic: '/ˈhəʊmskuːlɪŋ/', pos: 'n.', chinese: '家庭教育', example: 'Homeschooling is growing.', exampleCn: '家庭教育在增长。' },
      { word: 'academic integrity', phonetic: '/ˌækəˈdemɪk ˈɪntəɡrəti/', pos: 'n.', chinese: '学术诚信', example: 'Uphold academic integrity.', exampleCn: '维护学术诚信。' },
      { word: 'critical thinking', phonetic: '/ˈkrɪtɪkl ˈθɪŋkɪŋ/', pos: 'n.', chinese: '批判性思维', example: 'Develop critical thinking.', exampleCn: '培养批判性思维。' },
      { word: 'rote learning', phonetic: '/rəʊt ˈlɜːnɪŋ/', pos: 'n.', chinese: '死记硬背', example: 'Rote learning is inefficient.', exampleCn: '死记硬背效率低。' },
    ],
  },
  {
    topic: '科技',
    words: [
      { word: 'digital divide', phonetic: '/ˈdɪdʒɪtl dɪˈvaɪd/', pos: 'n.', chinese: '数字鸿沟', example: 'Bridge the digital divide.', exampleCn: '弥合数字鸿沟。' },
      { word: 'privacy concern', phonetic: '/ˈprɪvəsi kənˈsɜːn/', pos: 'n.', chinese: '隐私担忧', example: 'Privacy concerns rise.', exampleCn: '隐私担忧上升。' },
      { word: 'automation', phonetic: '/ˌɔːtəˈmeɪʃn/', pos: 'n.', chinese: '自动化', example: 'Automation replaces jobs.', exampleCn: '自动化取代工作。' },
      { word: 'social media addiction', phonetic: '/ˈsəʊʃl ˈmiːdiə əˈdɪkʃn/', pos: 'n.', chinese: '社交媒体成瘾', example: 'Social media addiction harms teens.', exampleCn: '社交媒体成瘾伤害青少年。' },
    ],
  },
  {
    topic: '环境',
    words: [
      { word: 'climate change', phonetic: '/ˈklaɪmət tʃeɪndʒ/', pos: 'n.', chinese: '气候变化', example: 'Climate change is urgent.', exampleCn: '气候变化紧迫。' },
      { word: 'carbon footprint', phonetic: '/ˈkɑːbən ˈfʊtprɪnt/', pos: 'n.', chinese: '碳足迹', example: 'Reduce your carbon footprint.', exampleCn: '减少碳足迹。' },
      { word: 'waste management', phonetic: '/weɪst ˈmænɪdʒmənt/', pos: 'n.', chinese: '废物管理', example: 'Improve waste management.', exampleCn: '改进废物管理。' },
      { word: 'renewable energy', phonetic: '/rɪˈnjuːəbl ˈenədʒi/', pos: 'n.', chinese: '可再生能源', example: 'Invest in renewable energy.', exampleCn: '投资可再生能源。' },
    ],
  },
  {
    topic: '政府与社会',
    words: [
      { word: 'public funding', phonetic: '/ˈpʌblɪk ˈfʌndɪŋ/', pos: 'n.', chinese: '公共资金', example: 'Public funding for schools.', exampleCn: '学校的公共资金。' },
      { word: 'welfare system', phonetic: '/ˈwelfeə ˈsɪstəm/', pos: 'n.', chinese: '福利制度', example: 'A fair welfare system.', exampleCn: '公平的福利制度。' },
      { word: 'taxation', phonetic: '/tækˈseɪʃn/', pos: 'n.', chinese: '税收', example: 'Higher taxation.', exampleCn: '更高的税收。' },
      { word: 'infrastructure', phonetic: '/ˈɪnfrəstrʌktʃə/', pos: 'n.', chinese: '基础设施', example: 'Upgrade infrastructure.', exampleCn: '升级基础设施。' },
    ],
  },
  {
    topic: '工作与经济',
    words: [
      { word: 'job security', phonetic: '/dʒɒb sɪˈkjʊərəti/', pos: 'n.', chinese: '工作保障', example: 'Job security matters.', exampleCn: '工作保障很重要。' },
      { word: 'work-life balance', phonetic: '/wɜːk laɪf ˈbæləns/', pos: 'n.', chinese: '工作生活平衡', example: 'Seek work-life balance.', exampleCn: '寻求工作生活平衡。' },
      { word: 'economic recession', phonetic: '/ˌiːkəˈnɒmɪk rɪˈseʃn/', pos: 'n.', chinese: '经济衰退', example: 'An economic recession.', exampleCn: '经济衰退。' },
      { word: 'entrepreneurship', phonetic: '/ˌɒntrəprəˈnɜːʃɪp/', pos: 'n.', chinese: '创业', example: 'Encourage entrepreneurship.', exampleCn: '鼓励创业。' },
    ],
  },
]

// ───────── 同义替换库（写作/阅读核心） ─────────
export const synonyms: SynonymGroup[] = [
  { base: 'increase', replaces: ['rise', 'grow', 'expand', 'escalate', 'surge', 'soar', 'climb'], note: '表示上升，写作替换 avoid repetition' },
  { base: 'decrease', replaces: ['decline', 'drop', 'fall', 'shrink', 'plummet', 'dip', 'descend'], note: '表示下降' },
  { base: 'improve', replaces: ['enhance', 'boost', 'promote', 'upgrade', 'ameliorate', 'optimize'], note: '表示改善' },
  { base: 'worsen', replaces: ['deteriorate', 'aggravate', 'exacerbate', 'degrade'], note: '表示恶化' },
  { base: 'cause', replaces: ['lead to', 'result in', 'contribute to', 'trigger', 'induce', 'provoke'], note: '表示导致' },
  { base: 'solve', replaces: ['resolve', 'address', 'tackle', 'overcome', 'rectify', 'mitigate'], note: '表示解决' },
  { base: 'show', replaces: ['demonstrate', 'indicate', 'reveal', 'illustrate', 'exhibit', 'display'], note: '表示表明' },
  { base: 'think', replaces: ['believe', 'argue', 'claim', 'assert', 'maintain', 'contend'], note: '表示认为' },
  { base: 'use', replaces: ['utilize', 'employ', 'apply', 'adopt', 'implement', 'leverage'], note: '表示使用' },
  { base: 'change', replaces: ['transform', 'alter', 'modify', 'adjust', 'reshape', 'restructure'], note: '表示改变' },
  { base: 'build', replaces: ['construct', 'erect', 'establish', 'found', 'set up', 'create'], note: '表示建立' },
  { base: 'destroy', replaces: ['demolish', 'raze', 'devastate', 'obliterate'], note: '表示摧毁' },
  { base: 'protect', replaces: ['safeguard', 'preserve', 'shield', 'defend', 'secure', 'guard'], note: '表示保护' },
  { base: 'allow', replaces: ['permit', 'enable', 'authorize', 'grant', 'facilitate', 'empower'], note: '表示允许' },
  { base: 'prevent', replaces: ['prohibit', 'hinder', 'impede', 'obstruct', 'deter', 'avert'], note: '表示阻止' },
  { base: 'problem', replaces: ['issue', 'challenge', 'difficulty', 'concern', 'dilemma', 'obstacle'], note: '名词：问题' },
  { base: 'advantage', replaces: ['benefit', 'merit', 'strength', 'positive aspect', 'upside'], note: '名词：优势' },
  { base: 'disadvantage', replaces: ['drawback', 'downside', 'limitation', 'shortcoming', 'flaw'], note: '名词：劣势' },
  { base: 'reason', replaces: ['cause', 'factor', 'explanation', 'motivation', 'rationale'], note: '名词：原因' },
  { base: 'result', replaces: ['consequence', 'outcome', 'effect', 'implication', 'repercussion'], note: '名词：结果' },
  { base: 'people', replaces: ['individuals', 'citizens', 'the public', 'the populace', 'society'], note: '名词：人们' },
  { base: 'money', replaces: ['funds', 'resources', 'capital', 'finance', 'revenue', 'budget'], note: '名词：钱' },
  { base: 'place', replaces: ['location', 'venue', 'site', 'area', 'region', 'destination'], note: '名词：地方' },
  { base: 'idea', replaces: ['concept', 'notion', 'theory', 'perspective', 'viewpoint', 'approach'], note: '名词：想法' },
  { base: 'important', replaces: ['crucial', 'significant', 'vital', 'essential', 'pivotal', 'paramount'], note: '形容词：重要的' },
  { base: 'difficult', replaces: ['challenging', 'demanding', 'arduous', 'tough', 'strenuous'], note: '形容词：困难的' },
  { base: 'easy', replaces: ['straightforward', 'effortless', 'simple', 'uncomplicated'], note: '形容词：容易的' },
  { base: 'big', replaces: ['substantial', 'considerable', 'enormous', 'massive', 'immense'], note: '形容词：大的' },
  { base: 'small', replaces: ['minor', 'insignificant', 'negligible', 'minimal', 'marginal'], note: '形容词：小的' },
  { base: 'good', replaces: ['beneficial', 'favorable', 'positive', 'advantageous', 'commendable'], note: '形容词：好的' },
  { base: 'bad', replaces: ['detrimental', 'adverse', 'negative', 'harmful', 'deleterious'], note: '形容词：坏的' },
  { base: 'obvious', replaces: ['apparent', 'evident', 'clear', 'conspicuous', 'manifest'], note: '形容词：明显的' },
  { base: 'different', replaces: ['distinct', 'diverse', 'varied', 'dissimilar', 'disparate'], note: '形容词：不同的' },
  { base: 'same', replaces: ['identical', 'equivalent', 'indistinguishable', 'uniform'], note: '形容词：相同的' },
]

// ───────── 词根词缀速记 ─────────
export const roots: RootItem[] = [
  { root: 'spect', meaning: '看', words: [{ word: 'inspect', chinese: '检查' }, { word: 'respect', chinese: '尊敬' }, { word: 'prospect', chinese: '前景' }, { word: 'spectacle', chinese: '景象' }] },
  { root: 'dict', meaning: '说', words: [{ word: 'dictate', chinese: '口述' }, { word: 'predict', chinese: '预测' }, { word: 'contradict', chinese: '反驳' }, { word: 'dictionary', chinese: '词典' }] },
  { root: 'struct', meaning: '建造', words: [{ word: 'construct', chinese: '建造' }, { word: 'instruct', chinese: '指导' }, { word: 'destruct', chinese: '破坏' }, { word: 'structure', chinese: '结构' }] },
  { root: 'port', meaning: '搬运', words: [{ word: 'import', chinese: '进口' }, { word: 'export', chinese: '出口' }, { word: 'transport', chinese: '运输' }, { word: 'report', chinese: '报告' }] },
  { root: 'bio', meaning: '生命', words: [{ word: 'biology', chinese: '生物学' }, { word: 'biography', chinese: '传记' }, { word: 'antibiotic', chinese: '抗生素' }, { word: 'symbiosis', chinese: '共生' }] },
  { root: 'geo', meaning: '地球', words: [{ word: 'geography', chinese: '地理' }, { word: 'geology', chinese: '地质学' }, { word: 'geometry', chinese: '几何' }, { word: 'geocentric', chinese: '地心的' }] },
  { root: 'phon', meaning: '声音', words: [{ word: 'phone', chinese: '电话' }, { word: 'phonetic', chinese: '语音的' }, { word: 'symphony', chinese: '交响乐' }, { word: 'microphone', chinese: '麦克风' }] },
  { root: 'chron', meaning: '时间', words: [{ word: 'chronicle', chinese: '编年史' }, { word: 'chronic', chinese: '慢性的' }, { word: 'synchronize', chinese: '同步' }, { word: 'anachronism', chinese: '时代错误' }] },
  { root: 'therm', meaning: '热', words: [{ word: 'thermal', chinese: '热的' }, { word: 'thermometer', chinese: '温度计' }, { word: 'thermostat', chinese: '恒温器' }, { word: 'isothermal', chinese: '等温的' }] },
  { root: 'scope', meaning: '看/范围', words: [{ word: 'telescope', chinese: '望远镜' }, { word: 'microscope', chinese: '显微镜' }, { word: 'scope', chinese: '范围' }, { word: 'periscope', chinese: '潜望镜' }] },
  { root: 'graph', meaning: '写/图', words: [{ word: 'photograph', chinese: '照片' }, { word: 'autograph', chinese: '亲笔签名' }, { word: 'paragraph', chinese: '段落' }, { word: 'biography', chinese: '传记' }] },
  { root: 'cred', meaning: '相信', words: [{ word: 'credit', chinese: '信用' }, { word: 'credible', chinese: '可信的' }, { word: 'incredible', chinese: '难以置信的' }, { word: 'credential', chinese: '证书' }] },
  { root: 'tract', meaning: '拉', words: [{ word: 'attract', chinese: '吸引' }, { word: 'contract', chinese: '合同' }, { word: 'extract', chinese: '提取' }, { word: 'distract', chinese: '分心' }] },
  { root: 'ject', meaning: '投掷', words: [{ word: 'project', chinese: '项目' }, { word: 'reject', chinese: '拒绝' }, { word: 'inject', chinese: '注射' }, { word: 'object', chinese: '反对' }] },
  { root: 'scrib/script', meaning: '写', words: [{ word: 'describe', chinese: '描述' }, { word: 'prescribe', chinese: '开处方' }, { word: 'manuscript', chinese: '手稿' }, { word: 'transcript', chinese: '成绩单' }] },
]
