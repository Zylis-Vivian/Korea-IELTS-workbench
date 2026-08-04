// src/utils/pronunciationCache.ts
// 发音音频缓存：IndexedDB，单条上限占用 50MB，缓存有效期 7 天。
// 键格式： `${engine}:${voice}:${speed}:${text}`

const DB_NAME = 'lavender-tts-cache'
const STORE = 'audio'
const MAX_BYTES = 50 * 1024 * 1024 // 50MB
const TTL = 7 * 24 * 60 * 60 * 1000 // 7 天
const MAX_ENTRIES = 600 // 防止无限增长

interface Entry {
  key: string
  blob: Blob
  ts: number
  size: number
  engine?: string
}

export interface CacheHit {
  blob: Blob
  engine?: string
}

function hasIDB(): boolean {
  return typeof indexedDB !== 'undefined'
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'key' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function tx(db: IDBDatabase, mode: IDBTransactionMode) {
  return db.transaction(STORE, mode).objectStore(STORE)
}

function reqToPromise<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

// 读取缓存；过期则删除并返回 null
export async function getCachedAudio(key: string): Promise<Blob | null> {
  if (!hasIDB()) return null
  try {
    const db = await openDB()
    const store = tx(db, 'readonly')
    const entry = (await reqToPromise(store.get(key))) as Entry | undefined
    db.close()
    if (!entry) return null
    if (Date.now() - entry.ts > TTL) {
      // 过期，异步清理
      void deleteAudio(key)
      return null
    }
    return { blob: entry.blob, engine: entry.engine }
  } catch {
    return null
  }
}

export async function cacheAudio(key: string, blob: Blob, engine?: string): Promise<void> {
  if (!hasIDB()) return
  try {
    const db = await openDB()
    const store = tx(db, 'readwrite')
    const entry: Entry = { key, blob, ts: Date.now(), size: blob.size, engine }
    await reqToPromise(store.put(entry))
    db.close()
    void enforceQuota()
  } catch {
    /* 缓存失败不影响播放 */
  }
}

export async function deleteAudio(key: string): Promise<void> {
  if (!hasIDB()) return
  try {
    const db = await openDB()
    const store = tx(db, 'readwrite')
    await reqToPromise(store.delete(key))
    db.close()
  } catch {
    /* ignore */
  }
}

// 超过 50MB 时按时间从旧到新清理，直至低于上限
async function enforceQuota(): Promise<void> {
  if (!hasIDB()) return
  try {
    const db = await openDB()
    const store = tx(db, 'readonly')
    const all = (await reqToPromise(store.getAll())) as Entry[]
    db.close()
    let total = all.reduce((s, e) => s + e.size, 0)
    if (total <= MAX_BYTES && all.length <= MAX_ENTRIES) return
    const sorted = all.sort((a, b) => a.ts - b.ts)
    for (const e of sorted) {
      if (total <= MAX_BYTES && all.length - sorted.indexOf(e) <= MAX_ENTRIES) break
      await deleteAudio(e.key)
      total -= e.size
    }
  } catch {
    /* ignore */
  }
}

// 清空全部缓存（设置面板可调用）
export async function clearTtsCache(): Promise<void> {
  if (!hasIDB()) return
  try {
    const db = await openDB()
    const store = tx(db, 'readwrite')
    await reqToPromise(store.clear())
    db.close()
  } catch {
    /* ignore */
  }
}
