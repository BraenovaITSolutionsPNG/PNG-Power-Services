p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

old = """              <div className="card overflow-hidden">
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

new = """              <div className="card overflow-hidden">
                <div className="flex items-center justify-between border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Triage Queue</h3>
                  <span className="badge badge-blue">{publicReports.filter(r => r.status === 'Under review').length} pending</span>
                </div>
                <div className="divide-y divide-line">
                  {publicReports.filter(r => r.status === 'Under review').map((report) => (
                    <div key={report.caseNumber} className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-brand-dark bg-brand-soft px-2 py-0.5 rounded">{report.caseNumber}</span>
                            <span className="badge badge-amber">{report.issueType}</span>
                          </div>
                          <p className="text-xs text-muted mt-1">{report.location} ({report.province})</p>
                          <p className="text-xs text-muted mt-0.5">{report.description}</p>
                          {report.phone && <p className="text-xs text-brand font-semibold mt-1">Contact: {report.phone}</p>}
                        </div>
                        <div className="flex flex-wrap gap-2 shrink-0">
                          <button onClick={() => showToast(`Report ${report.caseNumber} linked to incident INC-2048`, 'success')} className="button button-primary text-xs">Link to Incident</button>
                          <button onClick={() => showToast(`Work order created for ${report.caseNumber}`, 'success')} className="button button-secondary text-xs">Create Work Order</button>
                          <button onClick={() => showToast(`${report.caseNumber} marked as duplicate`, 'info')} className="button button-secondary text-xs">Mark Duplicate</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {publicReports.filter(r => r.status === 'Under review').length === 0 && (
                    <div className="p-8 text-center text-sm text-muted">No reports pending triage.</div>
                  )}
                </div>
              </div>

              {/* Suggested Incident Links */}
              <div className="card overflow-hidden">
                <div className="border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Suggested Incident Links</h3>
                  <p className="text-xs text-muted mt-0.5">System-suggested groupings based on location and issue type</p>
                </div>
                <div className="divide-y divide-line">
                  {incidentsList.slice(0, 2).map((incident) => (
                    <div key={incident.id} className="p-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-muted">{incident.id}</span>
                          <span className="text-xs font-bold text-ink">{incident.title}</span>
                        </div>
                        <p className="text-xs text-muted mt-0.5">{incident.meta}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => showToast(`Confirmed link to ${incident.id}`, 'success')} className="button button-primary text-xs">Confirm Link</button>
                        <button onClick={() => showToast(`Link to ${incident.id} rejected`, 'info')} className="button button-secondary text-xs">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Order Assignment */}
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-4">Assign Work Order</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Select Report</label>
                    <select className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm">
                      {publicReports.map((r) => (
                        <option key={r.caseNumber} value={r.caseNumber}>{r.caseNumber} - {r.issueType}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Assign to Team</label>
                    <select className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm">
                      <option>NCD Dispatch</option>
                      <option>Lae Field Team</option>
                      <option>Mt Hagen Center</option>
                      <option>Kokopo Regional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Accountable Owner</label>
                    <select className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm">
                      {staffUsers.filter(u => u.role === 'field' || u.role === 'operations').map((u) => (
                        <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Next Action</label>
                    <input placeholder="e.g., Inspect transformer" className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm" />
                  </div>
                </div>
                <button onClick={() => showToast('Work order assigned successfully', 'success')} className="button button-primary text-xs mt-4">
                  <Icon name="plus" className="size-3.5" /> Assign Work Order
                </button>
              </div>

              {/* Overdue Reviews */}
              <div className="card p-6">
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

assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
