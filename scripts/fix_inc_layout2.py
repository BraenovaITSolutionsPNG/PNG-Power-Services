p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

# Use a simpler replacement targeting just the layout div
old = '''                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-muted">{incident.id}</span>
                                <span className={`badge ${incident.priority === 'Critical' ? 'badge-red' : incident.priority === 'High' ? 'badge-amber' : 'badge-blue'}`}>{incident.priority}</span>
                              </div>
                              <p className="font-bold text-sm mt-1">{incident.title}</p>
                              <p className="text-xs text-muted">{incident.meta}'''
new = '''                          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-xs font-bold text-muted">{incident.id}</span>
                                <span className={`badge ${incident.priority === 'Critical' ? 'badge-red' : incident.priority === 'High' ? 'badge-amber' : 'badge-blue'}`}>{incident.priority}</span>
                                <span className="text-xs font-bold text-brand-dark bg-brand-soft px-2.5 py-1 rounded-full">{incident.status}</span>
                              </div>
                              <p className="font-bold text-sm mt-1.5 text-ink">{incident.title}</p>
                              <p className="text-xs text-muted mt-0.5">{incident.meta}'''
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Remove the duplicate status span and close div properly
old2 = """                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-brand-dark bg-brand-soft px-2.5 py-1 rounded-full">{incident.status}</span>
                              <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'Crew assigned' } : i)); showToast(`Crew assigned to ${incident.id}`, 'success') }} className="button button-primary text-xs">Assign Crew</button>"""
new2 = """                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'Crew assigned' } : i)); showToast(`Crew assigned to ${incident.id}`, 'success') }} className="button button-primary text-xs">Assign Crew</button>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w').write(s)
print("done")
