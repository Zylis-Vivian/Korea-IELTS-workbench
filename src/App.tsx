import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import PetalBackground from './components/PetalBackground'
import Layout from './components/Layout'
import PronunciationStatus from './components/PronunciationStatus'
import { useStore } from './stores/useStore'
import { runPronunciationTest } from './utils/pronunciationTest'
import KoreanAlphabet from './modules/korean-alphabet'
import KoreanGrammar from './modules/korean-grammar'
import KoreanDialogue from './modules/korean-dialogue'
import KoreanPronunciation from './modules/korean-pronunciation'
import KoreanCulture from './modules/korean-culture'
import KoreanPractice from './modules/korean-practice'
import KoreanVideo from './modules/korean-video'
import KoreanDaily from './modules/korean-daily'
import IeltsListening from './modules/ielts-listening'
import IeltsReading from './modules/ielts-reading'
import IeltsSpeaking from './modules/ielts-speaking'
import IeltsWriting from './modules/ielts-writing'
// 雅思词汇模块含 ~1.4MB 词汇真经 JSON，按需懒加载以移出首屏主包
const IeltsVocab = lazy(() => import('./modules/ielts-vocab'))
import IeltsGrammar from './modules/ielts-grammar'
import IeltsScoring from './modules/ielts-scoring'
import Dashboard from './modules/dashboard'
import Checkin from './modules/checkin'
import Settings from './modules/settings'
import BoardView from './modules/board/BoardView'
import BookCenter from './modules/book-center'
import PDFReader from './modules/book-center/PDFReader'

// 韩语词汇模块含 ~1.5MB 延世词库 JSON，按需懒加载以移出首屏主包
const KoreanVocab = lazy(() => import('./modules/korean-vocab'))

export default function App() {
  const setPronStatus = useStore((s) => s.setPronStatus)

  // 启动即异步运行发音方案测试（不阻塞 UI），更新右下角指示器
  useEffect(() => {
    let alive = true
    runPronunciationTest().then((report) => {
      if (!alive) return
      const premium = report.azure.ok || report.google.ok || report.edge.ok
      const level = premium ? 'green' : report.web.koVoice ? 'yellow' : 'red'
      const active = report.azure.ok
        ? 'Azure TTS'
        : report.google.ok
          ? 'Google TTS'
          : report.edge.ok
            ? 'Edge TTS'
            : report.web.koVoice
              ? 'Web Speech'
              : '无可用韩文语音'
      setPronStatus({ level, activeEngine: active, webVoices: report.web.voices, report, lastTest: report.timestamp })
    })
    return () => {
      alive = false
    }
  }, [setPronStatus])

  return (
    <div className="flex h-full">
      <PetalBackground />
      <Sidebar />
      <div className="relative z-10 flex-1 h-full overflow-y-auto">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/korean/alphabet" element={<KoreanAlphabet />} />
            <Route
              path="/korean/vocab"
              element={
                <Suspense fallback={<div className="p-8 text-center text-gray-400">加载中…</div>}>
                  <KoreanVocab />
                </Suspense>
              }
            />
            <Route path="/korean/grammar" element={<KoreanGrammar />} />
            <Route path="/korean/dialogue" element={<KoreanDialogue />} />
            <Route path="/korean/pronunciation" element={<KoreanPronunciation />} />
            <Route path="/korean/culture" element={<KoreanCulture />} />
            <Route path="/korean/practice" element={<KoreanPractice />} />
            <Route path="/korean/video" element={<KoreanVideo />} />
            <Route path="/korean/daily" element={<KoreanDaily />} />
            <Route
              path="/ielts/vocab"
              element={
                <Suspense fallback={<div className="p-8 text-center text-gray-400">加载中…</div>}>
                  <IeltsVocab />
                </Suspense>
              }
            />
            <Route path="/ielts/grammar" element={<IeltsGrammar />} />
            <Route path="/ielts/listening" element={<IeltsListening />} />
            <Route path="/ielts/reading" element={<IeltsReading />} />
            <Route path="/ielts/speaking" element={<IeltsSpeaking />} />
            <Route path="/ielts/writing" element={<IeltsWriting />} />
            <Route path="/ielts/scoring" element={<IeltsScoring />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/korean/wordbook" element={<BoardView category="korean" kind="word" />} />
            <Route path="/korean/wrong" element={<BoardView category="korean" kind="wrong" />} />
            <Route path="/ielts/wordbook" element={<BoardView category="ielts" kind="word" />} />
            <Route path="/ielts/wrong" element={<BoardView category="ielts" kind="wrong" />} />
            <Route path="/wordbook" element={<BoardView category="korean" kind="word" />} />
            <Route path="/checkin" element={<Checkin />} />
            <Route path="/books" element={<BookCenter />} />
            <Route path="/books/reader/:id" element={<PDFReader />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </div>
      <PronunciationStatus />
    </div>
  )
}
