p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

old = """              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Total Reports</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="check" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.filter(r => r.status === 'Resolved').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Resolved</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.filter(r => r.status !== 'Resolved').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Open / Pending</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{incidentsList.filter(i => i.priority === 'Critical' || i.priority === 'High').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">High Priority Incidents</p>
                </div>
              </div>
            </div>
          )}"""

new = """              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Total Reports</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="check" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.filter(r => r.status === 'Resolved').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Resolved</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.filter(r => r.status !== 'Resolved').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Open / Pending</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{incidentsList.filter(i => i.priority === 'Critical' || i.priority === 'High').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">High Priority Incidents</p>
                </div>
              </div>

              {/* Reports by Province */}
              <div className="card overflow-hidden">
                <div className="border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Reports by Province</h3>
                </div>
                <div className="divide-y divide-line">
                  {Array.from(new Set(publicReports.map(r => r.province))).map((prov) => {
                    const count = publicReports.filter(r => r.province === prov).length
                    const resolved = publicReports.filter(r => r.province === prov && r.status === 'Resolved').length
                    return (
                      <div key={prov} className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-sm text-ink">{prov}</p>
                          <p className="text-xs text-muted">{count} total · {resolved} resolved</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 rounded-full bg-surface-raised overflow-hidden">
                            <div className="h-full bg-success rounded-full" style={{ width: `${count > 0 ? (resolved / count) * 100 : 0}%` }} />
                          </div>
                          <span className="text-xs font-bold text-muted">{count > 0 ? Math.round((resolved / count) * 100) : 0}%</span>
                        </div>
                      </div>
                    )
                  })}
                  {publicReports.length === 0 && (
                    <div className="p-8 text-center text-sm text-muted">No reports to display.</div>
                  )}
                </div>
              </div>

              {/* Open Reports Requiring Attention */}
              <div className="card overflow-hidden">
                <div className="border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Open Reports Requiring Attention</h3>
                </div>
                <div className="divide-y divide-line">
                  {publicReports.filter(r => r.status !== 'Resolved').map((report) => (
                    <div key={report.caseNumber} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-brand-dark bg-brand-soft px-2 py-0.5 rounded">{report.caseNumber}</span>
                          <span className="badge badge-amber">{report.status}</span>
                        </div>
                        <p className="text-xs text-muted mt-1">{report.issueType} · {report.location} ({report.province})</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => showToast(`Escalated ${report.caseNumber} to regional coordinator`, 'success')} className="button button-primary text-xs">Escalate</button>
                        <button onClick={() => showToast(`Reassigned ${report.caseNumber}`, 'info')} className="button button-secondary text-xs">Reassign</button>
                        <button onClick={() => showToast(`Resource request sent for ${report.caseNumber}`, 'info')} className="button button-secondary text-xs">Request Resources</button>
                      </div>
                    </div>
                  ))}
                  {publicReports.filter(r => r.status !== 'Resolved').length === 0 && (
                    <div className="p-8 text-center text-sm text-muted">All reports resolved.</div>
                  )}
                </div>
              </div>

              {/* Recurring Issues & Resource Blockers */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="card p-5">
                  <h3 className="font-extrabold text-base mb-3">Recurring Issues</h3>
                  <div className="space-y-2">
                    {incidentsList.filter(i => i.priority === 'High' || i.priority === 'Critical').map((inc) => (
                      <div key={inc.id} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                        <div>
                          <p className="text-xs font-bold text-ink">{inc.title}</p>
                          <p className="text-[0.7rem] text-muted">{inc.meta}</p>
                        </div>
                        <span className={`badge ${inc.priority === 'Critical' ? 'badge-red' : 'badge-amber'}`}>{inc.priority}</span>
                      </div>
                    ))}
                    {incidentsList.filter(i => i.priority === 'High' || i.priority === 'Critical').length === 0 && (
                      <p className="text-xs text-muted">No recurring issues.</p>
                    )}
                  </div>
                </div>
                <div className="card p-5">
                  <h3 className="font-extrabold text-base mb-3">Resource Blockers</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b border-line">
                      <p className="text-xs text-muted">Crew availability in Morobe region</p>
                      <span className="badge badge-amber">2 teams</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-line">
                      <p className="text-xs text-muted">Transformer parts shortage (Lae)</p>
                      <span className="badge badge-red">Critical</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <p className="text-xs text-muted">Vehicle maintenance backlog</p>
                      <span className="badge badge-blue">3 vehicles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}"""

assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
