p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

old = """                          <button onClick={() => { const woId = 'WO-' + Math.random().toString(36).substring(2, 6).toUpperCase(); setFieldJobs([...fieldJobs, { id: woId, title: report.issueType, place: report.location + ' (' + report.province + ')', priority: 'Normal', time: 'Just assigned', status: 'Assigned' }]); showToast('Work order ' + woId + ' created for ' + report.caseNumber, 'success') }} className="button button-secondary text-xs">Create Work Order</button>"""

new = """                          <button onClick={() => createWorkOrder(report)} className="button button-secondary text-xs">Create Work Order</button>"""

assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Add the helper function before the return statement
# Find "if (!isAuthenticated)" and add helper before it
helper = """  function createWorkOrder(report: any) {
    const woId = 'WO-' + Math.random().toString(36).substring(2, 6).toUpperCase()
    setFieldJobs([...fieldJobs, {
      id: woId,
      title: report.issueType,
      place: report.location + ' (' + report.province + ')',
      priority: 'Normal',
      time: 'Just assigned',
      status: 'Assigned',
    }])
    showToast('Work order ' + woId + ' created for ' + report.caseNumber, 'success')
  }

"""
old2 = "  // If not logged in, render the clean Staff Login Gate"
assert old2 in s, "pattern2 not found"
s = s.replace(old2, helper + old2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
