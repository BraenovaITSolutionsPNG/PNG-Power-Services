// Offline sync utility for field crews
const DB_NAME = 'png_power_offline'
const STORE_NAME = 'pending_actions'

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = (e: any) => {
      const db = e.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
    request.onsuccess = (e: any) => resolve(e.target.result)
    request.onerror = (e: any) => reject(e.target.error)
  })
}

export async function queueAction(action: any) {
  const db: any = await openDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  store.add({ ...action, timestamp: Date.now(), synced: false })
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true)
    tx.onerror = () => reject(tx.error)
  })
}

export async function getPendingActions() {
  const db: any = await openDB()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  const request = store.getAll()
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result.filter((a: any) => !a.synced))
    request.onerror = () => reject(request.error)
  })
}

export async function markSynced(id: any) {
  const db: any = await openDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  const request = store.get(id)
  request.onsuccess = () => {
    const record = request.result
    if (record) {
      record.synced = true
      store.put(record)
    }
  }
  return new Promise((resolve) => { tx.oncomplete = () => resolve(true) })
}

export async function syncPendingActions(apiBase: string) {
  const pending = await getPendingActions()
  const results = []
  for (const action of pending as any[]) {
    try {
      const res = await fetch(apiBase + action.endpoint, {
        method: action.method,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + action.token },
        body: JSON.stringify(action.payload),
      })
      if (res.ok) {
        await markSynced(action.id)
        results.push({ id: action.id, status: 'synced' })
      } else {
        results.push({ id: action.id, status: 'failed', error: await res.text() })
      }
    } catch (err) {
      results.push({ id: action.id, status: 'offline', error: (err as Error).message })
    }
  }
  return results
}

export function isOnline() {
  return navigator.onLine
}

export function setupOfflineSync(apiBase: string, onSync: (results: any[]) => void) {
  window.addEventListener('online', async () => {
    const results = await syncPendingActions(apiBase)
    if (onSync) onSync(results)
  })
}
