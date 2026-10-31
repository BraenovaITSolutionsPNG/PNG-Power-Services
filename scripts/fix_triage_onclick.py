p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Simplify the Link to Incident onClick to avoid template literal issues
old = """<button onClick={() => onUpdateReportStatus?.(report.caseNumber, 'Crew assigned'); showToast(`Report ${report.caseNumber} linked to incident`, 'success')} className="button button-primary text-xs">Link to Incident</button>"""
new = """<button onClick={() => { onUpdateReportStatus?.(report.caseNumber, 'Crew assigned'); showToast('Report ' + report.caseNumber + ' linked to incident', 'success') }} className="button button-primary text-xs">Link to Incident</button>"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Simplify Mark Duplicate onClick
old2 = """<button onClick={() => showToast(`${report.caseNumber} marked as duplicate`, 'info')} className="button button-secondary text-xs">Mark Duplicate</button>"""
new2 = """<button onClick={() => showToast(report.caseNumber + ' marked as duplicate', 'info')} className="button button-secondary text-xs">Mark Duplicate</button>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
