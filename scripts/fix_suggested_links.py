p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Add state for tracking suggested link actions
old = "  const [restoredJobs, setRestoredJobs] = useState<Set<string>>(new Set())"
new = """  const [restoredJobs, setRestoredJobs] = useState<Set<string>>(new Set())

  // Track suggested link confirmations/rejections
  const [confirmedLinks, setConfirmedLinks] = useState<Set<string>>(new Set())
  const [rejectedLinks, setRejectedLinks] = useState<Set<string>>(new Set())"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Replace the suggested links section buttons with toggle logic
old2 = """                  {incidentsList.slice(0, 2).map((incident) => (
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
                  ))}"""
new2 = """                  {incidentsList.slice(0, 2).map((incident) => {
                    const isConfirmed = confirmedLinks.has(incident.id)
                    const isRejected = rejectedLinks.has(incident.id)
                    if (isRejected) return null
                    return (
                    <div key={incident.id} className="p-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-muted">{incident.id}</span>
                          <span className="text-xs font-bold text-ink">{incident.title}</span>
                          {isConfirmed && <span className="badge badge-green">Confirmed</span>}
                        </div>
                        <p className="text-xs text-muted mt-0.5">{incident.meta}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setConfirmedLinks((prev) => {
                              const next = new Set(prev)
                              if (next.has(incident.id)) {
                                next.delete(incident.id)
                                showToast(`Link to ${incident.id} unconfirmed`, 'info')
                              } else {
                                next.add(incident.id)
                                showToast(`Confirmed link to ${incident.id}`, 'success')
                              }
                              return next
                            })
                          }}
                          className={`button text-xs ${isConfirmed ? 'bg-brand/20 text-brand border border-brand/40 hover:bg-brand/30' : 'button-primary'}`}
                        >
                          {isConfirmed ? 'Unconfirm' : 'Confirm Link'}
                        </button>
                        <button
                          onClick={() => {
                            setRejectedLinks((prev) => {
                              const next = new Set(prev)
                              next.add(incident.id)
                              showToast(`Link to ${incident.id} rejected`, 'info')
                              return next
                            })
                            // Also remove from confirmed if it was confirmed
                            setConfirmedLinks((prev) => {
                              const next = new Set(prev)
                              next.delete(incident.id)
                              return next
                            })
                          }}
                          className="button button-secondary text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                    )
                  })}
                  {incidentsList.slice(0, 2).filter(i => !rejectedLinks.has(i.id)).length === 0 && (
                    <div className="p-8 text-center text-sm text-muted">All suggested links processed.</div>
                  )}"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
