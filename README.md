# 韩语 + 雅思双轨学习工作台

一个面向韩语（延世韩国语体系）与雅思（IELTS）备考的网页学习应用，技术栈为 **Vite + React 18 + TypeScript + Tailwind + Zustand**。

## 功能概览

- **韩语词汇学习**：词汇预览（按主题 + TOPIK 等级）、学习模式（翻卡自测）、每日刷新（按日期确定性选词）、单词总汇（滑卡刷词），支持四套词库一键切换（核心词库 / 延世韩国语 1-6 / Korean Flashcards / TOPIK）与教材册次筛选。
- **雅思词汇学习**：场景词库 / 话题词浏览（内置精选 ↔ 词汇真经全量切换）、学习模式、同义替换、词根词缀、口语题库（Part 1–3）等多种练习模式。
- **发音引擎（黄金标准）**：点击即出声，优先级为 `预生成本地 MP3（Edge TTS 标准首尔音）→ 后端 Azure/Google 神经网络 TTS → Edge 在线 TTS → 浏览器 Web Speech API 兜底`，保证绝不静默。
- 单词本 / 错题本、每日一句、发音测评等辅助模块。

## 数据摄入（独立通道）

开源词库经 `scripts/merge-vocabulary.mjs` 清洗后输出到 `data/*.json`，前端通过独立模块（`src/data/yonseiVocab.ts` 等）接入，**不修改** `src/data/*.ts` 既有词条。

```bash
# 1) 开源词库已获用户授权 git clone 至 tmp/（本次 5 个源仓库均已克隆）
# 2) 运行清洗脚本
node scripts/merge-vocabulary.mjs
# 3) 如需罗马音自检
node scripts/merge-vocabulary.mjs --selftest
```

当前已接入 5 套数据源（详见「数据来源及许可证」）：延世韩国语 1-6（4,054 词）、Korean Flashcards（4,243 词）、TOPIK 分级（20 词）、雅思词汇真经 + 听力 179（3,723 词）、同义替换（376 组）、口语题库（62 题）。韩语合并总库 `data/korean-vocabulary.json` 去重后 6,923 词。

## 音频生成

```bash
node scripts/gen-audio.mjs   # Edge TTS 生成韩语 MP3 → public/audio/ko/ + manifest.json
```

## 开发与构建

```bash
npm install
npm run dev      # 本地开发（Vite + 后端 API）
npm run build    # 生产构建（vite build）
npm start        # 启动后端 API 服务（含 Azure/Google TTS 时需 .env 配置密钥）
```

## 数据来源及许可证

| 数据源 | 许可证 | 用途 / 产物 |
|---|---|---|
| [open-yonsei-korean-vocabulary](https://github.com/Amulopapa67/open-yonsei-korean-vocabulary) | CC BY-SA 3.0 | 延世韩国语 1-6 册（4,054 词）→ `data/yonsei-korean.json` / `data/korean-vocabulary.json` |
| [korean-flashcards](https://github.com/niksavis/korean-flashcards) | MIT | 韩语日常词汇（4,243 词）→ `data/korean-flashcards.json` |
| [output（topik）](https://github.com/fulsomenko/output) | Apache 2.0 | TOPIK 分级词库（20 词）→ `data/topik-vocab.json` |
| [my-ielts](https://github.com/hefengxian/my-ielts) | 未附 LICENSE（作者保留权利） | 雅思词汇真经 + 听力 179（3,723 词）+ 同义替换（376 组）→ `data/ielts-vocabulary.json` / `data/ielts-synonyms.json` |
| [IELTS-Speaking-AI](https://github.com/1599570912/IELTS-Speaking-AI) | MIT | 雅思口语题库（62 题）→ `data/ielts-speaking.json` |

> 说明：上述 5 个源仓库均已获用户授权 `git clone` 至 `tmp/` 并由 `scripts/merge-vocabulary.mjs` 清洗合并。部分数据源实际规模小于原计划目标（如 topik-output 仅含 20 词、my-ielts 538 同义实为 376 组、口语题库 62 题），属源文件本身规模限制，非脚本缺陷。

## 音频来源

- **Edge TTS（Node.js 版）**：微软神经网络语音，构建期预生成 MP3 打包进站点，保证「点击即出声、绝不静默」。
- **后端 Azure / Google Neural TTS**：本地 `npm start` 带密钥时可用（标准首尔音）。
- **Web Speech API**：浏览器原生兜底，仅当上述音频缺失时触发。

## 红线约束（数据扩展时务必遵守）

- 不修改 `src/data/*.ts` 的现有词条数据（仅追加合并，不改写）。
- 不修改 `gen-audio.mjs` 核心逻辑、不修改 `usePronunciation` 等发音 Hook。
- 不引入 `howler`、`react-router-dom` 等新增依赖（已有依赖除外）。
- 未经明确授权不执行 `git clone`、不安装 Python / Naver TTS / Azure SDK（本次已获授权克隆上述 5 个源仓库）。
- 不修改 `tailwind.config.js` 以外的样式架构；不触碰部署步骤。
