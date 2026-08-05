# 🌸 Lavender Study · 韩语 + 雅思双轨学习工作台

一个纯前端的双轨语言学习 Web 应用（韩语四十音 / 词汇 / 语法 / 对话 / 文化 / 发音规则 + 雅思听读说写）。薰衣草紫主题，左侧固定任务栏 + 右侧内容区，数据保存在浏览器本地（LocalStorage），无需后端、无需任何付费 API。

## 技术栈
- React 18 + TypeScript + Vite
- Tailwind CSS（薰衣草紫主题）
- Zustand（状态 / 本地持久化）
- React Router v6（路由）
- Framer Motion（微动画）
- Recharts（数据可视化）
- Web Speech API（兜底 TTS 发音）+ Node 后端多方案 TTS（Azure / Google 择优）
- 韩语音变预处理（연음/비음/격음/구개/된소리/ㅎ탈락）
- IndexedDB 音频缓存（50MB / 7 天）
- Canvas（手写板 + 字形相似度评分）

## 本地运行
```bash
npm install      # 安装依赖
npm run dev      # 同时启动前端(5173)与 TTS 后端(8787)，默认 http://localhost:5173
npm run build    # 打包生产版本到 dist/
npm start        # 以「生产模式」启动：Express 同时托管 dist 与 /api/tts，默认 http://localhost:8787
```

### 发音引擎（可选配置环境变量）
应用支持多方案发音，优先级：**Azure Neural TTS → Google Cloud TTS → 浏览器 Web Speech API**。
后端密钥仅通过环境变量传入（不硬编码）。在项目根目录创建 `.env` 并按需填写：
```env
# Azure Neural TTS（首选，女声 SunHi / 男声 InJoon）
AZURE_SPEECH_KEY=你的key
AZURE_SPEECH_REGION=eastasia
# Google Cloud TTS（备选，Neural2-A）
GOOGLE_TTS_API_KEY=你的key
```
- 未配置时：自动跳过对应方案，最终用浏览器 Web Speech API 朗读（手机/桌面浏览器原生支持）。
- 在「设置 → 发音引擎」中可手动切换：自动 / Azure / Google / Web Speech，并查看右下角状态指示器。
- 应用启动会自动跑三方案探测测试（控制台 F12 可见报告），无需密钥即可使用。

> 开发模式 `npm run dev` 已设置 `server.host=true` 并代理 `/api` 到后端；终端会显示
> `Network: http://<你的局域网IP>:5173/`，手机连同一个 WiFi 即可直接打开。

## 如何在手机上使用（接到手机上）
有两种方式：

### 方式一：同一 WiFi 局域网直接访问（最简单，无需部署）
1. 电脑上启动 `npm run dev`；
2. 查看终端里 `Network:` 那行的 IP（如 `http://172.20.10.3:5173/`）；
3. 手机连同一个 WiFi，浏览器打开该地址即可。
   - 手机端会自动显示底部 Tab 导航，手写板支持手指触屏书写。

### 方式二：部署到静态托管，随时随地用手机访问
把 `dist/` 目录部署到任意静态托管（Vercel / Netlify / CloudStudio / GitHub Pages 等），
得到一个公网链接，手机随时随地可打开：
```bash
npm run build      # 生成 dist/
# 然后把 dist/ 上传到托管平台
```

## 目录结构
```
server/
  index.js        # Express 服务：/api/tts（GET+POST）与生产环境托管 dist
  tts.js          # Azure / Google 神经 TTS 合成（环境变量密钥，无密钥跳过）
src/
  components/      # 通用组件（Sidebar / Card / SpeakerButton / HandwritingPad / AddWordButton / Layout / PronunciationStatus / PronunciationSettings）
  hooks/           # usePronunciation.ts（调后端→失败降级 Web Speech）
  utils/           # koreanPhonetics.ts（音变） / pronunciationCache.ts（IndexedDB） / pronunciationTest.ts（方案探测）
  modules/         # 各学习模块（korean-* 韩语，ielts-* 雅思，board 单词/错题四合一，dashboard / checkin / settings）
  data/            # 本地内容数据（alphabet / vocab / grammar / dialogue / pronunciation / culture / ielts / ieltsVocab）
  stores/          # Zustand 状态与 LocalStorage 持久化
  types.ts         # 数据类型定义
```

## 核心功能说明
- **四十音图**：21 元音 + 19 辅音 + 27 收音，点击听发音、描摹虚线轮廓书写、字形相似度自动评分（满分 100）。
- **词汇 / 语法 / 对话 / 发音 / 文化**：均为完整文字讲解，可点击 🔊 听发音、一键收藏到单词本。
- **发音引擎**：每个 🔊 按钮统一走 `usePronunciation`——韩语先应用音变规则，再调后端 `/api/tts`（Azure→Google），失败自动降级浏览器 Web Speech；音频按文本缓存到 IndexedDB（7 天）。
- **综合练习**：词汇抽查小测验，错题自动进入「韩语错题本」。
- **雅思四模块**：听力文本 + 理解题、阅读 + 长难句、口语题库 + 高分参考答案、写作题库 + 大纲 + 练笔区。
- **单词本 / 错题本（按语言拆分）**：韩语与雅思已彻底分离为 4 个独立板块——
  - 🇰🇷 **韩语单词本**（`/korean/wordbook`）：词汇/语法/对话模块一键收藏的韩文词，支持掌握度（未学/学习中/已掌握）点击切换。
  - 🇰🇷 **韩语错题本**（`/korean/wrong`）：综合练习答错自动归档，也支持手动录入。
  - 🇬🇧 **雅思单词本**（`/ielts/wordbook`）：内置雅思高频词库浏览器一键收藏，也支持手动添加英文词（音标/词性）。
  - 🇬🇧 **雅思错题本**（`/ielts/wrong`）：支持手动录入题目/答案/正确答案。
  - 四个板块均具备：搜索、按来源筛选、排序（最新/最早/字母）、导入 / 导出 CSV（或 JSON）、按分类清空；页面顶部还有 4 宫格快速切换。
  - **导入**：点「导入」选择 CSV 或 JSON 文件，自动识别表头（支持中文/英文键名），预览解析结果后选择「追加（跳过重复）」或「覆盖当前板块」写入；缺字段可留空，按当前板块自动归属分类。CSV 与「导出」格式完全互通（带 BOM、引号转义、字段内逗号均正确解析）。
- **仪表盘 / 每日打卡 / 设置**：学习数据可视化与个性化（仪表盘单词/错题统计按韩语·雅思拆分显示）。
- **📚 教材中心**（`/books`）：23 本教材元数据书架（韩语 17 + 雅思 10-19 共 10 本）；PDF 阅读器（PDF.js，翻页/缩放/进度保存，PDF 放入 `public/books/` 即用）；本地音频播放器（播放/倍速/A-B 循环，MP3 放 `public/audio/`）；教材词书（延世/标准/剑桥种子词汇，一键入对应单词本）；在线音频（喜马拉雅专辑占位，设置填 app_key 解锁）。
- **雅思词汇学习**（`/ielts/vocab`）：场景词库 + 话题词库 + 同义替换（34 组）+ 词根词缀（15 组）+ 闪卡学习模式，一键存入雅思单词本。
- **雅思语法大全**（`/ielts/grammar`）：8 条核心语法精讲（讲解/例句/易错/口诀/测验）+ 长难句拆解引擎（真题库 + 粘贴句连接词标注）。
- **雅思评分标准**（`/ielts/scoring`）：听力/阅读分数对照表、写作/口语四项评分细则、Band 自测对照、5.5→7.5 提分路径。
- **雅思错题自动归档**：听力/阅读/口语/写作四模块各内置自测，提交判分后错题自动进入「雅思错题本」。

## 说明与可扩展点
- 数据目前为「真实种子内容 + 可扩展结构」：韩语词汇、语法、对话等已填充可用样例，便于随时扩充到文档要求的体量。
- 发音已达到多方案择优 + 音变预处理 + 缓存；AI 批改 / 口语评分 / 长难句分析等其余需要后端或 API 的部分，已预留界面与降级文案，接入服务即可启用。
- B 站视频需填入有效 BV 号；无视频时文字讲解完全兜底，不影响使用。
- 所有进度保存在本机浏览器，清除浏览器数据会丢失记录。
