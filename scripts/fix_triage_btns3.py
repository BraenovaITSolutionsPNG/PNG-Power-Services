p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Find and replace the Link to Incident button's onClick
old1 = "showToast(`Report ${report.caseNumber} linked to incident INC-2048`, 'success')"
new1 = "onUpdateReportStatus?.(report.caseNumber, 'Crew assigned'); showToast(`Report ${report.caseNumber} linked to incident`, 'success')"
assert old1 in s, "pattern1 not found"
s = s.replace(old1, new1, 1)

# Find and replace the Create Work Order button's onClick
old2 = "showToast(`Work order created for ${report.caseNumber}`, 'success')"
new2 = "setFieldJobs([...fieldJobs, { id: 'WO-' + Math.random().toString(36).substring(2, 6).toUpperCase(), title: report.issueType, place: `${report.location} (${report.province})`, priority: 'Normal', time: 'Just assigned', status: 'Assigned' }]); showToast(`Work order created for ${report.caseNumber}`, 'success')"
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
