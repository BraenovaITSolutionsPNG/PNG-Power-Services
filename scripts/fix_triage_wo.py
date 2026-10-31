p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

old = """                          <button onClick={() => setFieldJobs([...fieldJobs, { id: 'WO-' + Math.random().toString(36).substring(2, 6).toUpperCase(), title: report.issueType, place: `${report.location} (${report.province})`, priority: 'Normal', time: 'Just assigned', status: 'Assigned' }]); showToast(`Work order created for ${report.caseNumber}`, 'success')} className="button button-secondary text-xs">Create Work Order</button>"""

new = """                          <button onClick={() => { const woId = 'WO-' + Math.random().toString(36).substring(2, 6).toUpperCase(); setFieldJobs([...fieldJobs, { id: woId, title: report.issueType, place: report.location + ' (' + report.province + ')', priority: 'Normal', time: 'Just assigned', status: 'Assigned' }]); showToast('Work order ' + woId + ' created for ' + report.caseNumber, 'success') }} className="button button-secondary text-xs">Create Work Order</button>"""

assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
