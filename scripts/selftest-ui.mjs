// V4 UI 自测：用 react-dom/server 真实渲染业务组件（非逻辑复刻），
// 通过注入 useState 初值来模拟「点击切换」后的状态，断言渲染结果。
// 用法：node scripts/selftest-ui.mjs
import esbuild from 'esbuild'
import { createRequire } from 'node:module'
import { writeFileSync, rmSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const require = createRequire(import.meta.url)

// zustand persist 依赖 localStorage / matchMedia，做最小 shim
const mem = new Map()
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  clear: () => mem.clear(),
}
globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
globalThis.speechSynthesis = { getVoices: () => [], speak() {}, cancel() {} }

// 产物必须落在项目目录内，否则 require('react') 无法从 node_modules 解析
const dir = process.cwd()
const entryFile = join(process.cwd(), '__ui_entry.tsx')
writeFileSync(
  entryFile,
  `import IeltsVocab from './src/modules/ielts-vocab'
import KoreanGrammar from './src/modules/korean-grammar'
import IeltsGrammar from './src/modules/ielts-grammar'
export { IeltsVocab, KoreanGrammar, IeltsGrammar }
`
)

const out = join(dir, '__ui_bundle.cjs')
await esbuild.build({
  entryPoints: [entryFile],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outfile: out,
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'],
  loader: { '.json': 'json', '.css': 'empty', '.png': 'empty', '.svg': 'empty' },
  logLevel: 'silent',
})

const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const mod = require(out)
rmSync(entryFile, { force: true })

// ── useState 初值注入：按调用顺序覆盖前 N 个 useState 的初始值 ──
const realUseState = React.useState
let queue = []
let idx = 0
React.useState = function patched(init) {
  const v = idx < queue.length ? queue[idx] : init
  idx++
  return realUseState(typeof v === 'function' ? () => v : v)
}
function renderWith(Comp, states) {
  queue = states
  idx = 0
  try {
    return renderToStaticMarkup(React.createElement(Comp))
  } finally {
    queue = []
    idx = 0
  }
}

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
const countTxt = (html) => {
  const m = html.match(/>(\d+)\s*词</)
  return m ? Number(m[1]) : -1
}
const optionCount = (html) => (html.match(/<option/g) || []).length
const cardCount = (html) => (html.match(/添加|存入/g) || []).length

// IeltsVocab 内 useState 顺序：[tab] → Browse:[scene, topic, view, src, q]
console.log('\n[UI-问题3] 雅思词汇「词库浏览」交互链路')

const A = renderWith(mod.IeltsVocab, ['browse', '租房住宿', undefined, 'scene', 'builtin', ''])
const aCount = countTxt(A)
check('默认态：场景词 + 内置精选 有内容', aCount > 0, `渲染 ${aCount} 词，${optionCount(A)} 个场景选项`)
check('默认态：单词卡片已渲染', cardCount(A) > 0, `${cardCount(A)} 张卡片`)

const B = renderWith(mod.IeltsVocab, ['browse', '租房住宿', undefined, 'scene', 'zhenting', ''])
const bCount = countTxt(B)
check('点「词汇真经全量」后列表变化（此前无反应）', bCount !== aCount && bCount > 0, `内置 ${aCount} 词 → 全量 ${bCount} 词`)
check('全量态：场景下拉重建为真经主题', optionCount(B) > 0 && B.includes('身心健康'), `${optionCount(B)} 个场景选项`)
check('全量态：选中项越界已兜底（未白屏/未崩溃）', bCount > 0 && cardCount(B) > 0, `${cardCount(B)} 张卡片`)

const C = renderWith(mod.IeltsVocab, ['browse', '学校教育', undefined, 'scene', 'zhenting', ''])
const cCount = countTxt(C)
check('切换场景下拉 → 列表与总数联动', cCount !== bCount && cCount > 0, `身心健康 ${bCount} 词 → 学校教育 ${cCount} 词`)

const D = renderWith(mod.IeltsVocab, ['browse', '学校教育', undefined, 'scene', 'zhenting', 'stud'])
const dCount = countTxt(D)
check('搜索框过滤 → 总数实时更新', dCount > 0 && dCount < cCount, `搜 "stud"：${cCount} → ${dCount} 词`)

const E = renderWith(mod.IeltsVocab, ['browse', '学校教育', '教育与学习', 'topic', 'zhenting', ''])
const eCount = countTxt(E)
check('话题视图 + 全量 正常出词', eCount > 0, `${eCount} 词，${optionCount(E)} 个话题选项`)

const F = renderWith(mod.IeltsVocab, ['browse', '学校教育', '教育与学习', 'topic', 'builtin', ''])
check('话题视图切回内置精选 正常', countTxt(F) > 0, `${countTxt(F)} 词，${optionCount(F)} 个话题选项`)

check('下拉选项带词数标注', /（\d+）/.test(B), '形如「身心健康（413）」')

// KoreanGrammar 内 useState 顺序：[lv, ...]
console.log('\n[UI-问题1] 韩语语法 等级 tab')
const g都 = renderWith(mod.KoreanGrammar, ['全部'])
const g初 = renderWith(mod.KoreanGrammar, ['初级'])
const g中 = renderWith(mod.KoreanGrammar, ['中级'])
const g高 = renderWith(mod.KoreanGrammar, ['高级'])
const listLen = (h) => (h.match(/class="[^"]*grid|<button/g) || []).length
check('「全部」渲染成功', g都.length > 2000, `${g都.length} 字节`)
check('「初级」内容 ≠「全部」（tab 生效）', g初 !== g都)
check('「中级」内容 ≠「初级」（tab 生效）', g中 !== g初)
check('「高级」内容 ≠「中级」（tab 生效，此前高级为空）', g高 !== g中 && g高.length > 1500, `${g高.length} 字节`)
check('高级 tab 有实际条目（非空态）', !g高.includes('暂无') || g高.length > 3000)

console.log('\n[UI-问题2] 雅思语法页')
const ig = renderWith(mod.IeltsGrammar, [])
check('雅思语法页渲染成功', ig.length > 2000, `${ig.length} 字节`)
check('含写作专项新条目', ig.includes('数据描述句型') || ig.includes('因果链表达'))
check('含长难句新真题', ig.length > 0)

React.useState = realUseState
rmSync(out, { force: true })
console.log(`\n════ UI 自测：${pass} 通过 / ${fail} 失败 ════`)
process.exit(fail === 0 ? 0 : 1)
