p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Add state for Edit Access modal
old = "  const [newTeamName, setNewTeamName] = useState('')"
new = """  const [newTeamName, setNewTeamName] = useState('')

  // Edit Access modal state
  const [showEditAccessModal, setShowEditAccessModal] = useState(false)
  const [editAccessUser, setEditAccessUser] = useState<any>(null)
  const [editAccessRole, setEditAccessRole] = useState('')
  const [editAccessDept, setEditAccessDept] = useState('')
  const [editAccessStatus, setEditAccessStatus] = useState('Active')"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Replace Edit Access button with modal trigger
old2 = """                        <button onClick={() => showToast(`Access updated for ${staff.name}`, 'success')} className="button button-secondary text-xs">Edit Access</button>"""
new2 = """                        <button onClick={() => { setEditAccessUser(staff); setEditAccessRole(staff.role); setEditAccessDept(staff.department); setEditAccessStatus(staff.status); setShowEditAccessModal(true) }} className="button button-secondary text-xs">Edit Access</button>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

# Fix National Trends - most reported issue and highest incident province
old3 = """                  <div className="flex items-center justify-between py-2 border-b border-line">
                    <span className="text-xs text-muted">Most reported issue</span>
                    <span className="text-xs font-bold text-ink">Power outage (Area blackout)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-line">
                    <span className="text-xs text-muted">Highest incident province</span>
                    <span className="text-xs font-bold text-ink">NCD</span>
                  </div>"""
new3 = """                  <div className="flex items-center justify-between py-2 border-b border-line">
                    <span className="text-xs text-muted">Most reported issue</span>
                    <span className="text-xs font-bold text-ink">{(() => {
                      if (publicReports.length === 0) return 'N/A'
                      const counts: Record<string, number> = {}
                      publicReports.forEach(r => { counts[r.issueType] = (counts[r.issueType] || 0) + 1 })
                      return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
                    })()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-line">
                    <span className="text-xs text-muted">Highest incident province</span>
                    <span className="text-xs font-bold text-ink">{(() => {
                      if (publicReports.length === 0) return 'N/A'
                      const counts: Record<string, number> = {}
                      publicReports.forEach(r => { counts[r.province] = (counts[r.province] || 0) + 1 })
                      return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
                    })()}</span>
                  </div>"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
