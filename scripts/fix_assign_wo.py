p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Add state for Assign Work Order form
old = "  const [restoredJobs, setRestoredJobs] = useState<Set<string>>(new Set())"
new = """  const [restoredJobs, setRestoredJobs] = useState<Set<string>>(new Set())

  // Assign Work Order form state
  const [awoReport, setAwoReport] = useState('')
  const [awoTeam, setAwoTeam] = useState('NCD Dispatch')
  const [awoOwner, setAwoOwner] = useState('')
  const [awoAction, setAwoAction] = useState('')"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Make the form controlled and functional
old2 = """                  <div>
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
                </button>"""

new2 = """                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Select Report</label>
                    <select
                      value={awoReport}
                      onChange={(e) => setAwoReport(e.target.value)}
                      className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                    >
                      <option value="">-- Select a report --</option>
                      {publicReports.map((r) => (
                        <option key={r.caseNumber} value={r.caseNumber}>{r.caseNumber} - {r.issueType}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Assign to Team</label>
                    <select
                      value={awoTeam}
                      onChange={(e) => setAwoTeam(e.target.value)}
                      className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                    >
                      <option>NCD Dispatch</option>
                      <option>Lae Field Team</option>
                      <option>Mt Hagen Center</option>
                      <option>Kokopo Regional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Accountable Owner</label>
                    <select
                      value={awoOwner}
                      onChange={(e) => setAwoOwner(e.target.value)}
                      className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                    >
                      <option value="">-- Select owner --</option>
                      {staffUsers.filter(u => u.role === 'field' || u.role === 'operations').map((u) => (
                        <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Next Action</label>
                    <input
                      value={awoAction}
                      onChange={(e) => setAwoAction(e.target.value)}
                      placeholder="e.g., Inspect transformer"
                      className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!awoReport) {
                      showToast('Please select a report', 'error')
                      return
                    }
                    const report = publicReports.find(r => r.caseNumber === awoReport)
                    const owner = staffUsers.find(u => u.id === awoOwner)
                    const woNumber = 'WO-' + Math.random().toString(36).substring(2, 6).toUpperCase()
                    setFieldJobs([...fieldJobs, {
                      id: woNumber,
                      title: awoAction || report?.issueType || 'New work order',
                      place: report ? `${report.location} (${report.province})` : 'Unknown',
                      priority: 'Normal',
                      time: 'Just assigned',
                      status: 'Assigned',
                    }])
                    showToast(`Work order ${woNumber} assigned to ${awoTeam} for ${awoReport}`, 'success')
                    setAwoReport('')
                    setAwoAction('')
                  }}
                  className="button button-primary text-xs mt-4"
                >
                  <Icon name="plus" className="size-3.5" /> Assign Work Order
                </button>"""

assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
