# 韩语 + 雅思双轨学习工作台

一个面向韩语（延世韩国语体系）与雅思（IELTS）备考的网页学习应用，技术栈为 **Vite + React 18 + TypeScript + Tailwind + Zustand**。

## 功能概览

- **韩语词汇学习**：词汇预览（按主题 + TOPIK 等级）、学习模式（翻卡自测）、每日刷新（按日期确定性选词）、单词总汇（滑卡刷词），支持三套词库一键切换（核心词库 / Korean Flashcards / TOPIK）。
- **延世韩国语 1-6（独立教材页）**：按教材册次 / 主题 / 词源筛选的表格学习页，列示「한국어（含词性）· 中文 · English · 词源 / 发音」，支持点击韩语 / 英文单词朗读；词源按「汉 / 固 / 外 / 混 / 搭 / 法 / 待核」分类着色。
- **雅思词汇学习**：场景词库 / 话题词浏览（内置精选 ↔ 词汇真经全量切换）、学习模式、同义替换、词根词缀、口语题库（Part 1–3）等多种练习模式。
- **发音引擎（黄金标准）**：点击即出声，优先级为 `预生成本地 MP3（Edge TTS 标准首尔音）→ 后端 Azure/Google 神经网络 TTS → Edge 在线 TTS → 浏览器 Web Speech API 兜底`，保证绝不静默。
- 单词本 / 错题本、每日一句、发音测评等辅助模块。
- **今日学习任务**：韩语句子与雅思听力示例共用 FSRS 复习队列，按「重来 / 困难 / 正常 / 简单」安排下一次复习。
- **影子跟读 MVP**：逐句 TTS、变速、中文/罗马音开关、麦克风录音和原音/本人录音回听；录音默认只保存在当前浏览器。

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
npm run typecheck # TypeScript 类型检查
npm test         # 数据、UI 与 TTS API 安全自测
npm run build    # 类型检查通过后执行生产构建
npm run check    # 完整质量检查：测试 + 类型检查 + 构建
npm start        # 启动后端 API 服务（含 Azure/Google TTS 时需 .env 配置密钥）
```

### 高效使用路径

1. 第一次使用先打开「今日任务」，按顺序处理到期内容，不要一开始只刷新词。
2. 看到句子后先盲听，再显示中文；能听懂后进入「影子跟读」，用 0.75x 或 0.9x 练两遍，再用 1x 录音回听。
3. 每张卡选择真实掌握程度：「重来」代表现在仍不会，「困难」代表需要短间隔复习，「正常」代表按计划复习，「简单」才会拉长间隔。
4. 韩语初学阶段可以打开罗马音；熟悉韩文后建议关闭罗马音，只保留韩文和实际发音。
5. 雅思听力先用示例文本熟悉流程，再使用「听写练习」和「影子跟读」巩固；如需加入自己的音频，请只使用有授权的本地资源，不要把受版权保护的文件上传到公共仓库。

### 本轮优化完成情况

- [x] 统一复习卡片模型：句子、听力、单词和语法可共用队列。
- [x] 接入 `ts-fsrs`，复习状态持久化到当前浏览器。
- [x] 新增「今日任务」页面和首页入口。
- [x] 新增「影子跟读」页面：逐句播放、变速、显示控制、录音回听和前后句导航。
- [x] 将韩语导航中的「四十音图」修正为「韩文字母」。
- [x] 增加首页到期复习提醒。
- [x] 单词本与错题本自动接入 FSRS 复习队列，历史本地数据也会在打开「今日任务」时补齐。
- [x] 新增「听写练习」：播放音频、输入答案、自动判定并把结果回写 FSRS。
- [x] 移除教材中心、PDF 阅读器、教材词书、教材音频索引和对应占位目录，避免无授权教材内容进入应用。
- [x] 增加本地开发页面验证、类型检查、数据/UI/API 自测和生产构建检查。

后续建议按以下顺序继续：授权音频与本地音频导入 → 韩语音变规则训练 → 雅思长难句逐层分析 → Whisper 转写和可懂度反馈。发音评分不应直接把语音转写正确率当成音素准确率。

### TTS 服务安全配置

复制 `.env.example` 为 `.env` 后再填写服务端密钥。生产环境务必设置 `ALLOWED_ORIGINS`，并根据部署流量调整 `TTS_RATE_LIMIT`。`/api/tts` 仅接受 POST，请求文本最多 500 个字符，语速范围为 0.5–2；服务端会执行限流、上游超时和短时内存缓存。

开发服务器默认只监听本机 `127.0.0.1`。需要同一可信 Wi-Fi 下的手机访问时，临时设置 `LAN_DEV=1`，并把对应的局域网来源加入 `ALLOWED_ORIGINS`；测试结束后应恢复为 `0`。

第三方平台的 `client_secret` 不应保存在 LocalStorage 或任何前端代码中。需要接入带签名的第三方音频 API 时，应由服务端读取环境变量并代理请求。

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
- 不引入未评估的音频依赖；本轮新增的 `ts-fsrs` 用于复习调度，许可证和 Node 版本要求已记录在 package lock 与提交说明中。
- 未经明确授权不执行 `git clone`、不安装 Python / Naver TTS / Azure SDK（本次已获授权克隆上述 5 个源仓库）。
- 不修改 `tailwind.config.js` 以外的样式架构；不触碰部署步骤。
