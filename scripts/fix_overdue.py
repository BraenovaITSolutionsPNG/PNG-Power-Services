p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Find the Overdue Reviews section
old = """              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Overdue Reviews</h3>
                <div className="space-y-2">
                  {publicReports.filter(r => r.status === 'Under review').slice(0, 3).map((r) => (
                    <div key={r.caseNumber} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                      <div>
                        <p className="text-xs font-bold text-ink">{r.caseNumber}</p>
                        <p className="text-[0.7rem] text-muted">{r.issueType} · {r.location}</p>
                      </div>
                      <span className="badge badge-red">Overdue</span>
                    </div>
                  ))}
                  {publicReports.filter(r => r.status === 'Under review').length === 0 && (
                    <p className="text-xs text-muted">No overdue reviews.</p>
                  )}
                </div>
              </div>"""

new = """              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Overdue Reviews</h3>
                <div className="space-y-2">
                  {publicReports.filter(r => r.status === 'Under review').slice(0, 5).map((r) => (
                    <div key={r.caseNumber} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                      <div>
                        <p className="text-xs font-bold text-ink">{r.caseNumber}</p>
                        <p className="text-[0.7rem] text-muted">{r.issueType} · {r.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge badge-red">Overdue</span>
                        <button onClick={() => { onUpdateReportStatus?.(r.caseNumber, 'Crew assigned'); showToast(`${r.caseNumber} reviewed and assigned`, 'success') }} className="button button-primary text-xs">Review Now</button>
                        <button onClick={() => showToast(`${r.caseNumber} escalated to regional manager`, 'info')} className="button button-secondary text-xs">Escalate</button>
                        <button onClick={() => showToast(`${r.caseNumber} dismissed`, 'info')} className="button button-secondary text-xs">Dismiss</button>
                      </div>
                    </div>
                  ))}
                  {publicReports.filter(r => r.status === 'Under review').length === 0 && (
                    <p className="text-xs text-muted">No overdue reviews. All reports are being processed.</p>
                  )}
                </div>
              </div>"""

assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
