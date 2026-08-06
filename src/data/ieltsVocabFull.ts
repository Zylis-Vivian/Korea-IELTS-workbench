// 雅思「词汇真经全量」场景化适配层
// 将 data/ielts-vocabulary.json（词汇真经 + 听力179，按 topic 组织，~3700 词）
// 映射到「场景(scene)」维度，使「词汇真经全量」tab 在【场景视图】下也有内容、
// 切换场景下拉可过滤、总量数字随筛选实时更新。
//
// 红线：仅 import + 字段映射 + 派生，绝不修改任何现有词条。
import { sceneVocab, type SceneWord, type SceneGroup, type TopicGroup } from './ieltsVocabData'
import { ALL_TOPIC_GROUPS } from './ieltsVocabNew'
import rawIelts from '../../data/ielts-vocabulary.json'

interface RawIelts {
  id: string
  english: string
  chinese: string
  phonetic: string
  partOfSpeech: string
  level: string
  topic: string
  exampleSentences: { korean: string; english: string; chinese: string }[]
  source: string
}

const RAW = rawIelts as unknown as RawIelts[]

// 主题 -> 场景 的精确归并字典（命中 topic 文本即用）
const TOPIC_TO_SCENE: Record<string, string> = {
  旅游: '旅游出行',
  旅游出行: '旅游出行',
  医疗: '医疗健康',
  健康: '医疗健康',
  医疗健康: '医疗健康',
  工作: '工作职场',
  职场: '工作职场',
  工作职场: '工作职场',
  校园: '校园学习',
  教育: '教育学术',
  教育学术: '教育学术',
  餐饮: '餐饮美食',
  食物: '餐饮美食',
  美食: '餐饮美食',
  交通: '交通出行',
  交通出行: '交通出行',
  购物: '购物消费',
  消费: '购物消费',
  金融: '银行金融',
  银行金融: '银行金融',
  经济: '商业经济',
  商业: '商业经济',
  商业经济: '商业经济',
  媒体: '媒体传播',
  媒体传播: '媒体传播',
  环境: '环境保护',
  环境保护: '环境保护',
  科技: '科技与媒体',
  科技与媒体: '科技与媒体',
  社交: '社交活动',
  社交活动: '社交活动',
  家庭: '家庭生活',
  家庭情感: '家庭生活',
  运动: '运动健身',
  运动健身: '运动健身',
  艺术: '艺术文化',
  文化: '艺术文化',
  法律: '法律司法',
  法律司法: '法律司法',
  心理: '心理与行为',
  心理与行为: '心理与行为',
  太空: '太空与科学',
  科学: '太空与科学',
  食品: '食品与农业',
  农业: '食品与农业',
  食品与农业: '食品与农业',
  建筑: '建筑与城市',
  城市: '建筑与城市',
  志愿: '志愿服务与慈善',
  慈善: '志愿服务与慈善',
}

// 关键词兜底（对 topic + chinese + english 做包含匹配），覆盖未精确命中的主题
const SCENE_KEYWORDS: { scene: string; keys: string[] }[] = [
  { scene: '旅游出行', keys: ['旅游', '旅行', '景点', '机票', '酒店', '行程', '行李'] },
  { scene: '医疗健康', keys: ['医疗', '健康', '病', '药', '症状', '医院', '治疗', '营养', '疾'] },
  { scene: '工作职场', keys: ['工作', '职场', '公司', '员工', '面试', '工资', '职业', '职称'] },
  { scene: '校园学习', keys: ['学校', '学生', '课程', '老师', '作业', '考试', '大学', '学术'] },
  { scene: '餐饮美食', keys: ['餐', '食', '吃', '菜', '饮', '味'] },
  { scene: '交通出行', keys: ['交通', '车', '路', '地铁', '公交', '驾驶', '通勤'] },
  { scene: '购物消费', keys: ['购物', '买', '商', '消费', '商品', '品牌'] },
  { scene: '银行金融', keys: ['钱', '银行', '利率', '投资', '金融', '预算', '存款'] },
  { scene: '环境保护', keys: ['环境', '污染', '生态', '气候', '能源', '排放', '绿色'] },
  { scene: '科技与媒体', keys: ['科技', '网络', '互联网', '电脑', '手机', '软件', '数据', '算法'] },
  { scene: '社交活动', keys: ['朋友', '社交', '聚', '聊天', '邀请', '熟'] },
  { scene: '家庭生活', keys: ['家', '父母', '孩子', '家务', '亲戚', '居'] },
  { scene: '运动健身', keys: ['运动', '体育', '健身', '比赛', '球', '锻炼'] },
  { scene: '艺术文化', keys: ['艺术', '文化', '音乐', '电影', '书', '展览', '画'] },
  { scene: '法律司法', keys: ['法律', '法院', '罪', '警察', '律师', '判', '立'] },
  { scene: '心理与行为', keys: ['心理', '情绪', '行为', '性格', '压力', '动机'] },
  { scene: '商业经济', keys: ['经济', '贸易', '市场', '企业', '商业', '工业', '产业'] },
  { scene: '太空与科学', keys: ['科学', '太空', '实验', '宇宙', '研究', '探索'] },
]

// 真经原始 topic 形如「21_身心健康」「05_学校教育」「听力179考点词」。
// 归组以 topic 为准（确定性、可预期），仅在无 topic 时才走关键词兜底，
// 避免按中文释义模糊匹配把同一主题的词打散到多个场景。
function normalizeTopic(topic: string): string {
  return (topic || '').replace(/^\d+[_\-.\s]*/, '').trim()
}

function sceneFor(w: RawIelts): string {
  if (TOPIC_TO_SCENE[w.topic]) return TOPIC_TO_SCENE[w.topic]
  const norm = normalizeTopic(w.topic)
  if (norm) return TOPIC_TO_SCENE[norm] ?? norm
  // 无主题词：按中文/英文关键词兜底归类
  const hay = (w.chinese + ' ' + w.english).toLowerCase()
  for (const { scene, keys } of SCENE_KEYWORDS) {
    if (keys.some((k) => hay.includes(k))) return scene
  }
  return '综合话题（词汇真经）'
}

function toSceneWord(w: RawIelts): SceneWord {
  const ex = (w.exampleSentences || [])[0]
  return {
    word: w.english,
    phonetic: w.phonetic || '',
    pos: w.partOfSpeech || '',
    chinese: w.chinese || '',
    example: ex?.english || '',
    exampleCn: ex?.chinese || '',
  }
}

const groups = new Map<string, SceneWord[]>()
for (const r of RAW) {
  const s = sceneFor(r)
  if (!groups.has(s)) groups.set(s, [])
  groups.get(s)!.push(toSceneWord(r))
}

// 全量场景分组（按词数降序，便于用户优先看到大场景）
export const FULL_SCENE_GROUPS: SceneGroup[] = Array.from(groups.entries())
  .map(([scene, words]) => ({ scene, words }))
  .sort((a, b) => b.words.length - a.words.length)

// 全量话题分组：把 ALL_TOPIC_GROUPS 的原始名（形如「01_自然地理」）统一去掉序号前缀，
// 并合并规范化后同名的分组（如内置「太空探索」8 词 + 真经「04_太空探索」75 词），
// 合并时按单词去重，保证下拉里不出现重复/带序号的话题名。
const topicMerge = new Map<string, { words: TopicGroup['words']; seen: Set<string> }>()
for (const g of ALL_TOPIC_GROUPS) {
  const key = normalizeTopic(g.topic) || g.topic
  if (!topicMerge.has(key)) topicMerge.set(key, { words: [], seen: new Set() })
  const bucket = topicMerge.get(key)!
  for (const w of g.words || []) {
    const k = (w.word || '').toLowerCase()
    if (!k || bucket.seen.has(k)) continue
    bucket.seen.add(k)
    bucket.words.push(w)
  }
}

export const FULL_TOPIC_GROUPS: TopicGroup[] = Array.from(topicMerge.entries())
  .map(([topic, v]) => ({ topic, words: v.words }))
  .sort((a, b) => b.words.length - a.words.length)

// 兼容默认导出：内置场景词库（供需要完整列表处引用）
export { sceneVocab }
