p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

old = """              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Pending Actions</h3>
                <p className="text-sm text-muted">Review suggested report-to-incident links and confirm or correct groupings.</p>
              </div>"""

new = """              <div className="card overflow-hidden">
                <div className="flex items-center justify-between border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Triage Queue</h3>
                  <span className="badge badge-blue">{publicReports.filter(r => r.status === 'Under review').length} pending</span>
                </div>
                <div className="divide-y divide-line">
                  {publicReports.filter(r => r.status === 'Under review').map((report) => (
                    <div key={report.caseNumber} className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-dark bg-brand-soft px-2 py-0.5 rounded">{report.caseNumber}</span>
                          <span className="badge badge-amber">{report.issueType}</span>
                        </div>
                        <p className="text-xs text-muted mt-1">{report.location} ({report.province})</p>
                        <p className="text-xs text-muted mt-0.5">{report.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => showToast(`Report ${report.caseNumber} assigned to incident`, 'success')} className="button button-primary text-xs">Link to Incident</button>
                        <button onClick={() => showToast(`Work order created for ${report.caseNumber}`, 'success')} className="button button-secondary text-xs">Create Work Order</button>
                      </div>
                    </div>
                  ))}
                  {publicReports.filter(r => r.status === 'Under review').length === 0 && (
                    <div className="p-8 text-center text-sm text-muted">No reports pending triage.</div>
                  )}
                </div>
              </div>"""

assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
