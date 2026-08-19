import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import PetalBackground from './components/PetalBackground'
import Layout from './components/Layout'
import PronunciationStatus from './components/PronunciationStatus'
import { useStore } from './stores/useStore'

const Dashboard = lazy(() => import('./modules/dashboard'))
const KoreanAlphabet = lazy(() => import('./modules/korean-alphabet'))
const KoreanGrammar = lazy(() => import('./modules/korean-grammar'))
const KoreanDialogue = lazy(() => import('./modules/korean-dialogue'))
const KoreanPronunciation = lazy(() => import('./modules/korean-pronunciation'))
const KoreanCulture = lazy(() => import('./modules/korean-culture'))
const KoreanPractice = lazy(() => import('./modules/korean-practice'))
const KoreanVideo = lazy(() => import('./modules/korean-video'))
const KoreanDaily = lazy(() => import('./modules/korean-daily'))
const KoreanVocab = lazy(() => import('./modules/korean-vocab'))
const KoreanYonsei = lazy(() => import('./modules/korean-yonsei'))
const IeltsVocab = lazy(() => import('./modules/ielts-vocab'))
const IeltsGrammar = lazy(() => import('./modules/ielts-grammar'))
const IeltsListening = lazy(() => import('./modules/ielts-listening'))
const IeltsReading = lazy(() => import('./modules/ielts-reading'))
const IeltsSpeaking = lazy(() => import('./modules/ielts-speaking'))
const IeltsWriting = lazy(() => import('./modules/ielts-writing'))
const IeltsScoring = lazy(() => import('./modules/ielts-scoring'))
const Checkin = lazy(() => import('./modules/checkin'))
const Settings = lazy(() => import('./modules/settings'))
const BoardView = lazy(() => import('./modules/board/BoardView'))
const BookCenter = lazy(() => import('./modules/book-center'))
const PDFReader = lazy(() => import('./modules/book-center/PDFReader'))

const pageFallback = <div className="p-8 text-center text-gray-400">加载中…</div>

function NotFound() {
  return <div className="p-8 text-center text-gray-500">页面不存在，请从左侧导航重新选择。</div>
}

export default function App() {
  const setPronStatus = useStore((s) => s.setPronStatus)

  // 启动时只做轻量能力检查（不合成音频、不产生付费调用），更新右下角指示器。
  useEffect(() => {
    let alive = true
    void import('./utils/pronunciationTest')
      .then(({ runPronunciationTest }) => runPronunciationTest())
      .then((report) => {
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
      .catch(() => {
        if (alive) setPronStatus({ level: 'unknown', activeEngine: '检测失败' })
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
          <Suspense fallback={pageFallback}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/korean/alphabet" element={<KoreanAlphabet />} />
              <Route path="/korean/vocab" element={<KoreanVocab />} />
              <Route path="/korean/yonsei" element={<KoreanYonsei />} />
              <Route path="/korean/grammar" element={<KoreanGrammar />} />
              <Route path="/korean/dialogue" element={<KoreanDialogue />} />
              <Route path="/korean/pronunciation" element={<KoreanPronunciation />} />
              <Route path="/korean/culture" element={<KoreanCulture />} />
              <Route path="/korean/practice" element={<KoreanPractice />} />
              <Route path="/korean/video" element={<KoreanVideo />} />
              <Route path="/korean/daily" element={<KoreanDaily />} />
              <Route path="/ielts/vocab" element={<IeltsVocab />} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </div>
      <PronunciationStatus />
    </div>
  )
}
