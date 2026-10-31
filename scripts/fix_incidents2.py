p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = """                        <div key={incident.id} className="p-5">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-muted">{incident.id}</span>
                                <span className={`badge ${incident.priority === 'Critical' ? 'badge-red' : incident.priority === 'High' ? 'badge-amber' : 'badge-blue'}`}>{incident.priority}</span>
                              </div>
                              <p className="font-bold text-sm mt-1">{incident.title}</p>
                              <p className="text-xs text-muted">{incident.meta} · {incident.time}</p>
                            </div>
                            <span className="text-xs font-bold text-brand-dark bg-brand-soft px-2.5 py-1 rounded-full">{incident.status}</span>
                          </div>
                        </div>
                      ))}"""
new = """                        <div key={incident.id} className="p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-muted">{incident.id}</span>
                                <span className={`badge ${incident.priority === 'Critical' ? 'badge-red' : incident.priority === 'High' ? 'badge-amber' : 'badge-blue'}`}>{incident.priority}</span>
                              </div>
                              <p className="font-bold text-sm mt-1">{incident.title}</p>
                              <p className="text-xs text-muted">{incident.meta} · {incident.time}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-brand-dark bg-brand-soft px-2.5 py-1 rounded-full">{incident.status}</span>
                              <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'Crew assigned' } : i)); showToast(`Crew assigned to ${incident.id}`, 'success') }} className="button button-primary text-xs">Assign Crew</button>
                              <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'In progress' } : i)); showToast(`${incident.id} marked in progress`, 'info') }} className="button button-secondary text-xs">In Progress</button>
                              <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'Resolved' } : i)); showToast(`${incident.id} resolved`, 'success') }} className="button button-secondary text-xs">Resolve</button>
                            </div>
                          </div>
                        </div>
                      ))}"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
