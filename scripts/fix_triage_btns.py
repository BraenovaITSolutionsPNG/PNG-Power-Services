p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

old1 = """                        <button onClick={() => showToast(`Report ${report.caseNumber} assigned to incident`, 'success')} className="button button-primary text-xs">Link to Incident</button>"""
new1 = """                        <button onClick={() => { onUpdateReportStatus?.(report.caseNumber, 'Crew assigned'); showToast(`Report ${report.caseNumber} linked to incident`, 'success') }} className="button button-primary text-xs">Link to Incident</button>"""
assert old1 in s, "pattern1 not found"
s = s.replace(old1, new1, 1)

old2 = """                        <button onClick={() => showToast(`Work order created for ${report.caseNumber}`, 'success')} className="button button-secondary text-xs">Create Work Order</button>"""
new2 = """                        <button onClick={() => { setFieldJobs([...fieldJobs, { id: 'WO-' + Math.random().toString(36).substring(2, 6).toUpperCase(), title: report.issueType, place: `${report.location} (${report.province})`, priority: 'Normal', time: 'Just assigned', status: 'Assigned' }]); showToast(`Work order created for ${report.caseNumber}`, 'success') }} className="button button-secondary text-xs">Create Work Order</button>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
