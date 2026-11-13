p = r"D:\BraeNova_Projects\PNG Power Services\src\utils\offlineSync.ts"
s = open(p, encoding='utf-8').read()
s = s.replace("export async function syncPendingActions(apiBase) {", "export async function syncPendingActions(apiBase: string) {")
s = s.replace("for (const action of pending) {", "for (const action of pending as any[]) {")
s = s.replace("results.push({ id: action.id, status: 'failed', error: await res.text() })", "results.push({ id: action.id, status: 'failed', error: await res.text() })")
s = s.replace("results.push({ id: action.id, status: 'offline', error: err.message })", "results.push({ id: action.id, status: 'offline', error: (err as Error).message })")
s = s.replace("export function setupOfflineSync(apiBase, onSync) {", "export function setupOfflineSync(apiBase: string, onSync: (results: any[]) => void) {")
open(p, 'w', encoding='utf-8').write(s)
print("done")
