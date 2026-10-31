p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Add state for System Admin modals
old = "  const [newTeamName, setNewTeamName] = useState('')"
new = """  const [newTeamName, setNewTeamName] = useState('')

  // System Admin modal state
  const [showLogsModal, setShowLogsModal] = useState(false)
  const [showAccessModal, setShowAccessModal] = useState(false)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [logFilter, setLogFilter] = useState('ALL')"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Update View Logs button
old2 = """                  <button onClick={() => showToast('System logs opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> View Logs
                  </button>"""
new2 = """                  <button onClick={() => setShowLogsModal(true)} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> View Logs
                  </button>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

# Update Manage Access button
old3 = """                  <button onClick={() => showToast('Access management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="lock" className="size-3.5" /> Manage Access
                  </button>"""
new3 = """                  <button onClick={() => setShowAccessModal(true)} className="button button-secondary text-xs">
                    <Icon name="lock" className="size-3.5" /> Manage Access
                  </button>"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

# Update Configuration button
old4 = """                  <button onClick={() => showToast('System configuration opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Configuration
                  </button>"""
new4 = """                  <button onClick={() => setShowConfigModal(true)} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Configuration
                  </button>"""
assert old4 in s, "pattern4 not found"
s = s.replace(old4, new4, 1)

# Make Service Status interactive - add restart button to each service
old5 = """                  {[
                    { name: 'API Server', status: 'Online', color: 'badge-green' },
                    { name: 'Database (MySQL)', status: 'Online', color: 'badge-green' },
                    { name: 'Auth Service', status: 'Online', color: 'badge-green' },
                    { name: 'File Storage', status: 'Online', color: 'badge-green' },
                    { name: 'Email Service', status: 'Degraded', color: 'badge-amber' },
                  ].map((svc) => (
                    <div key={svc.name} className="p-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-ink">{svc.name}</span>
                      <span className={`badge ${svc.color}`}>{svc.status}</span>
                    </div>
                  ))}"""
new5 = """                  {[
                    { name: 'API Server', status: 'Online', color: 'badge-green' },
                    { name: 'Database (MySQL)', status: 'Online', color: 'badge-green' },
                    { name: 'Auth Service', status: 'Online', color: 'badge-green' },
                    { name: 'File Storage', status: 'Online', color: 'badge-green' },
                    { name: 'Email Service', status: 'Degraded', color: 'badge-amber' },
                  ].map((svc) => (
                    <div key={svc.name} className="p-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-ink">{svc.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`badge ${svc.color}`}>{svc.status}</span>
                        <button onClick={() => showToast(`${svc.name} restarted`, 'success')} className="button button-secondary text-xs">Restart</button>
                      </div>
                    </div>
                  ))}"""
assert old5 in s, "pattern5 not found"
s = s.replace(old5, new5, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
