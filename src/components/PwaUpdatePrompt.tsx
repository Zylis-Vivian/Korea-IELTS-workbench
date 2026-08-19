import { useEffect, useRef, useState } from 'react'
import { Download, WifiOff, X } from 'lucide-react'

export default function PwaUpdatePrompt() {
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null)
  const [updateReady, setUpdateReady] = useState(false)
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine))

  useEffect(() => {
    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    if (!import.meta.env.PROD || !('serviceWorker' in navigator)) {
      return () => {
        window.removeEventListener('online', onOnline)
        window.removeEventListener('offline', onOffline)
      }
    }

    let refreshing = false
    const onControllerChange = () => {
      if (refreshing) return
      refreshing = true
      window.location.reload()
    }
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange)

    void navigator.serviceWorker.register('/sw.js', { scope: '/' }).then((registration) => {
      registrationRef.current = registration
      if (registration.waiting && navigator.serviceWorker.controller) setUpdateReady(true)

      registration.addEventListener('updatefound', () => {
        const worker = registration.installing
        if (!worker) return
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) setUpdateReady(true)
        })
      })
    }).catch(() => {
      // PWA 是增强能力，注册失败不应影响正常网页使用。
    })

    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange)
    }
  }, [])

  const applyUpdate = () => {
    registrationRef.current?.waiting?.postMessage({ type: 'SKIP_WAITING' })
  }

  return (
    <>
      {!online ? (
        <div className="pwa-offline" role="status" aria-live="polite">
          <WifiOff size={15} />当前离线：已缓存内容仍可使用
        </div>
      ) : null}
      {updateReady ? (
        <div className="pwa-update" role="status" aria-live="polite">
          <div className="flex items-center gap-2">
            <Download size={16} />
            <span>工作台有新版本</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={applyUpdate} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-lavender-deep">
              立即更新
            </button>
            <button type="button" onClick={() => setUpdateReady(false)} className="rounded-full p-1 text-white/80 hover:text-white" aria-label="稍后更新">
              <X size={15} />
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
