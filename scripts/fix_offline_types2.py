p = r"D:\BraeNova_Projects\PNG Power Services\src\utils\offlineSync.ts"
s = open(p, encoding='utf-8').read()

# Fix openDB
s = s.replace("    request.onupgradeneeded = (e) => {", "    request.onupgradeneeded = (e: any) => {")
s = s.replace("    request.onsuccess = (e) => resolve(e.target.result)", "    request.onsuccess = (e: any) => resolve(e.target.result)")
s = s.replace("    request.onerror = (e) => reject(e.target.error)", "    request.onerror = (e: any) => reject(e.target.error)")

# Fix queueAction
s = s.replace("export async function queueAction(action) {", "export async function queueAction(action: any) {")
s = s.replace("  const db = await openDB()\n  const tx = db.transaction(STORE_NAME, 'readwrite')", "  const db: any = await openDB()\n  const tx = db.transaction(STORE_NAME, 'readwrite')")

# Fix getPendingActions
s = s.replace("  const db = await openDB()\n  const tx = db.transaction(STORE_NAME, 'readonly')", "  const db: any = await openDB()\n  const tx = db.transaction(STORE_NAME, 'readonly')")
s = s.replace("  return new Promise((resolve, reject) => {\n    request.onsuccess = () => resolve(request.result.filter(a => !a.synced))", "  return new Promise((resolve, reject) => {\n    request.onsuccess = () => resolve(request.result.filter((a: any) => !a.synced))")

# Fix markSynced
s = s.replace("export async function markSynced(id) {", "export async function markSynced(id: any) {")
s = s.replace("  const db = await openDB()\n  const tx = db.transaction(STORE_NAME, 'readwrite')\n  const store = tx.objectStore(STORE_NAME)\n  const request = store.get(id)", "  const db: any = await openDB()\n  const tx = db.transaction(STORE_NAME, 'readwrite')\n  const store = tx.objectStore(STORE_NAME)\n  const request = store.get(id)")

open(p, 'w', encoding='utf-8').write(s)
print("done")
