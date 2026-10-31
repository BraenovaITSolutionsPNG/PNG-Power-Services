p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

# Find the incidents buttons area and wrap in flex container with smaller gap
old = '''                            <span className="text-xs font-bold text-brand-dark bg-brand-soft px-2.5 py-1 rounded-full">{incident.status}</span>
                            <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'Crew assigned' } : i)); showToast(`Crew assigned to ${incident.id}`, 'success') }} className="button button-primary text-xs ml-2">Assign Crew</button>
                            <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'In progress' } : i)); showToast(`${incident.id} marked in progress`, 'info') }} className="button button-secondary text-xs">In Progress</button>
                            <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'Resolved' } : i)); showToast(`${incident.id} resolved`, 'success') }} className="button button-secondary text-xs">Resolve</button>'''

new = '''                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-brand-dark bg-brand-soft px-2.5 py-1 rounded-full">{incident.status}</span>
                              <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'Crew assigned' } : i)); showToast(`Crew assigned to ${incident.id}`, 'success') }} className="button button-primary text-xs">Assign Crew</button>
                              <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'In progress' } : i)); showToast(`${incident.id} marked in progress`, 'info') }} className="button button-secondary text-xs">In Progress</button>
                              <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'Resolved' } : i)); showToast(`${incident.id} resolved`, 'success') }} className="button button-secondary text-xs">Resolve</button>
                            </div>'''

assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
