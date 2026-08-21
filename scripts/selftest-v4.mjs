// V4 修复自测：不启动浏览器，直接把相关 TS 数据层打包进内存后执行断言。
// 用法：node scripts/selftest-v4.mjs
import esbuild from 'esbuild'
import { pathToFileURL } from 'node:url'
import { writeFileSync, mkdtempSync, readFileSync, existsSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const ENTRY = `
import { GRAMMAR } from './src/data/grammar'
import { grammarItems, longSentences } from './src/data/ieltsGrammar'
import { FULL_SCENE_GROUPS, FULL_TOPIC_GROUPS } from './src/data/ieltsVocabFull'
import { sceneVocab, topicVocab } from './src/data/ieltsVocabData'
import { PRONUNCIATION } from './src/data/pronunciation'
import { ALL_SYNONYMS } from './src/data/ieltsVocabNew'
import { getSynonymEnrichment } from './src/data/ieltsSynonymEnrichment'
import { YONSEI_WORDS } from './src/data/yonseiVocab'
import { yonseiAudioKey } from './src/utils/yonseiAudio'
import { createReviewItem, reviewItem, isDue } from './src/utils/review'
export { GRAMMAR, grammarItems, longSentences, FULL_SCENE_GROUPS, FULL_TOPIC_GROUPS, sceneVocab, topicVocab, PRONUNCIATION, ALL_SYNONYMS, getSynonymEnrichment, YONSEI_WORDS, yonseiAudioKey, createReviewItem, reviewItem, isDue }
`

const dir = mkdtempSync(join(tmpdir(), 'v4test-'))
const entryFile = join(process.cwd(), '__selftest_entry.ts')
writeFileSync(entryFile, ENTRY)

const out = join(dir, 'bundle.mjs')
await esbuild.build({
  entryPoints: [entryFile],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: out,
  loader: { '.json': 'json' },
  logLevel: 'silent',
})

const m = await import(pathToFileURL(out).href)
const { rmSync } = await import('node:fs')
rmSync(entryFile, { force: true })

let pass = 0
let fail = 0
const check = (name, cond, detail = '') => {
  if (cond) {
    pass++
    console.log(`  PASS  ${name}${detail ? '  — ' + detail : ''}`)
  } else {
    fail++
    console.log(`  FAIL  ${name}${detail ? '  — ' + detail : ''}`)
  }
}

// ───────── 问题1：韩语语法条目太少 ─────────
console.log('\n[问题1] 韩语语法库')
const G = m.GRAMMAR
const byLevel = G.reduce((a, g) => ((a[g.level] = (a[g.level] || 0) + 1), a), {})
check('总量 ≥60 条', G.length >= 60, `实际 ${G.length}`)
check('初级 ≥25', byLevel['初级'] >= 25, `实际 ${byLevel['初级'] || 0}`)
check('中级 ≥25', byLevel['中级'] >= 25, `实际 ${byLevel['中级'] || 0}`)
check('高级 ≥15', byLevel['高级'] >= 15, `实际 ${byLevel['高级'] || 0}`)
check('level 值仅含 初级/中级/高级', Object.keys(byLevel).every((k) => ['初级', '中级', '高级'].includes(k)), Object.keys(byLevel).join('/'))
check('id 唯一', new Set(G.map((g) => g.id)).size === G.length)
check('每条含 examples ≥1', G.every((g) => (g.examples || []).length >= 1))
check('每条含 mnemonic', G.every((g) => !!g.mnemonic))
check('每条含 common_errors ≥1', G.every((g) => (g.common_errors || []).length >= 1))
check('每条含 quiz ≥1', G.every((g) => (g.quiz || []).length >= 1))
check('例句含罗马音+中文', G.every((g) => g.examples.every((e) => e.ko && e.roman && e.zh)))

// ───────── 问题2：雅思语法 & 长难句 ─────────
console.log('\n[问题2] 雅思语法库 + 长难句真题库')
const GI = m.grammarItems
const LS = m.longSentences
const cats = GI.reduce((a, g) => ((a[g.category] = (a[g.category] || 0) + 1), a), {})
check('语法条目 20~25', GI.length >= 20 && GI.length <= 25, `实际 ${GI.length}`)
check('覆盖 5 大分类', ['时态', '从句', '非谓语', '特殊句式', '写作专项'].every((c) => cats[c] > 0), JSON.stringify(cats))
check('语法 id 唯一', new Set(GI.map((g) => g.id)).size === GI.length)
check('每条 examples ≥2', GI.every((g) => (g.examples || []).length >= 2))
check('每条 commonErrors ≥1', GI.every((g) => (g.commonErrors || []).length >= 1))
check('每条 mnemonic + ieltsApp', GI.every((g) => g.mnemonic && g.ieltsApp))
check('每条 quiz 选项与答案合法', GI.every((g) => g.quiz.every((q) => q.options.length >= 2 && q.answer >= 0 && q.answer < q.options.length && q.explain)))
check('长难句 15~20', LS.length >= 15 && LS.length <= 20, `实际 ${LS.length}`)
check('长难句 id 唯一', new Set(LS.map((s) => s.id)).size === LS.length)
check('含 6.0 与 7.0+ 两档', LS.some((s) => s.difficulty === '6.0') && LS.some((s) => s.difficulty === '7.0+'), LS.reduce((a, s) => ((a[s.difficulty] = (a[s.difficulty] || 0) + 1), a), {}) && JSON.stringify(LS.reduce((a, s) => ((a[s.difficulty] = (a[s.difficulty] || 0) + 1), a), {})))
check('每句含主干+修饰+译文+语法点', LS.every((s) => s.mainClause && s.modifiers.length >= 1 && s.translation && s.grammarPoints.length >= 1))

// ───────── 问题2b：韩语音变重点规则 ─────────
console.log('\n[问题2b] 韩语音变重点规则')
const P = m.PRONUNCIATION
const priority = ['link', 'final', 'nasal', 'liquid', 'tense', 'aspiration']
check('音变规则 id 唯一', new Set(P.map((rule) => rule.id)).size === P.length)
check('六类重点规则齐全', priority.every((id) => P.some((rule) => rule.id === id)), priority.join('、'))
check('重点规则均含公式与例词', priority.every((id) => { const rule = P.find((item) => item.id === id); return !!rule?.formula && (rule.examples || []).length >= 3 }))

// ───────── 延世韩国语词汇字段完整性 ─────────
console.log('\n[延世韩国语词汇字段]')
const missingYonseiPos = m.YONSEI_WORDS.filter((word) => !String(word.posZh || word.pos || '').trim())
const missingYonseiRomanization = m.YONSEI_WORDS.filter((word) => !String(word.romanization || '').trim())
check('延世词条已接入', m.YONSEI_WORDS.length >= 4000, `实际 ${m.YONSEI_WORDS.length} 条`)
check('每条含中文词性', missingYonseiPos.length === 0, `缺失 ${missingYonseiPos.length} 条`)
check('每条含罗马音', missingYonseiRomanization.length === 0, `缺失 ${missingYonseiRomanization.length} 条`)
check('示例词性「네」可用', m.YONSEI_WORDS.some((word) => word.volume === 1 && word.korean === '네' && word.posZh === '叹'))

const audioRoot = join(process.cwd(), 'public', 'audio', 'ko')
const audioManifest = JSON.parse(readFileSync(join(audioRoot, 'manifest.json'), 'utf8'))
const missingYonseiAudio = m.YONSEI_WORDS.filter((word) => !audioManifest[m.yonseiAudioKey(word.korean)])
const manifestFiles = Array.from(new Set(Object.values(audioManifest)))
const missingAudioFiles = manifestFiles.filter((file) => !existsSync(join(audioRoot, file)))
const tooShortAudioFiles = manifestFiles.filter((file) => {
  const path = join(audioRoot, file)
  return existsSync(path) && statSync(path).size < 2048
})
check('每条延世词汇均有音频映射', missingYonseiAudio.length === 0, `缺失 ${missingYonseiAudio.length} 条`)
check('manifest 引用的 MP3 均存在', missingAudioFiles.length === 0, `缺失 ${missingAudioFiles.length} 个文件`)
check('MP3 不含异常短空壳', tooShortAudioFiles.length === 0, `异常 ${tooShortAudioFiles.length} 个文件`)

// ───────── 问题3：雅思词汇「词汇真经全量」 ─────────
console.log('\n[问题3] 雅思词汇全量切换')
const FS = m.FULL_SCENE_GROUPS
const FT = m.FULL_TOPIC_GROUPS
const SV = m.sceneVocab
const TV = m.topicVocab
const fullSceneWords = FS.reduce((n, g) => n + g.words.length, 0)
const builtinSceneWords = SV.reduce((n, g) => n + g.words.length, 0)
check('全量场景分组非空', FS.length > 0, `${FS.length} 个场景`)
check('全量场景总词数 > 3000', fullSceneWords > 3000, `实际 ${fullSceneWords} 词`)
check('全量 ≫ 内置（切换后内容确实变化）', fullSceneWords > builtinSceneWords * 5, `内置 ${builtinSceneWords} → 全量 ${fullSceneWords}`)
check('场景名无数字前缀残留', FS.every((g) => !/^\d+[_\-.]/.test(g.scene)), FS.slice(0, 5).map((g) => g.scene).join('、'))
check('每个场景至少 1 词', FS.every((g) => g.words.length >= 1))
check('场景按词数降序', FS.every((g, i) => i === 0 || FS[i - 1].words.length >= g.words.length))
check('全量话题分组非空', FT.length > 0, `${FT.length} 个话题`)
check('内置场景库仍完整（未被覆盖）', SV.length > 0 && builtinSceneWords > 0, `内置 ${SV.length} 场景 / ${builtinSceneWords} 词`)
check('内置话题库仍完整（未被覆盖）', TV.length > 0, `内置 ${TV.length} 话题`)
check('词条字段完整（word+chinese）', FS.every((g) => g.words.every((w) => w.word && w.chinese)))

// ───────── 问题4：同义替换内容 + 复习闭环数据层 ─────────
console.log('\n[问题4] 同义替换内容与复习卡')
const enriched = m.ALL_SYNONYMS.filter((group) => m.getSynonymEnrichment(group))
check('同义替换总量 ≥400', m.ALL_SYNONYMS.length >= 400, `实际 ${m.ALL_SYNONYMS.length}`)
check('高频同义替换已补语境', enriched.length >= 15, `实际 ${enriched.length} 组`)
check('语境条目含搭配+例句+中文', enriched.every((group) => {
  const detail = m.getSynonymEnrichment(group)
  return !!detail?.context && detail.collocations.length >= 2 && detail.example && detail.exampleCn
}))
const practiceCard = m.createReviewItem({
  id: 'selftest-synonym-card', language: 'en', kind: 'word', title: '同义替换自测',
  prompt: 'increase', answer: 'rise / grow', translation: '表示上升', source: '自测', href: '/ielts/vocab?tab=synonym',
})
const practicedCard = m.reviewItem(practiceCard, 'good', new Date(Date.now() + 1000))
check('同义替换可生成统一复习卡', practiceCard.card.due && practiceCard.source === '自测')
check('复习评分会更新 FSRS 卡片', practicedCard.card.reps >= 1 && practicedCard.updatedAt >= practiceCard.updatedAt)
check('新建复习卡立即可进入到期队列', m.isDue(practiceCard, new Date()))

console.log('\n[全量场景 TOP10]')
FS.slice(0, 10).forEach((g) => console.log(`  ${g.scene}（${g.words.length}）`))

console.log(`\n════ 自测结果：${pass} 通过 / ${fail} 失败 ════`)
rmSync(dir, { recursive: true, force: true })
process.exit(fail === 0 ? 0 : 1)
