p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

# Replace alert calls in Operations view with showToast
old1 = """                          onClick={() => alert(`Assigned dispatch crew to Case ${report.caseNumber}`)}"""
new1 = """                          onClick={() => showToast(`Dispatch crew assigned to Case ${report.caseNumber}`, 'success')}"""
assert old1 in s, "pattern1 not found"
s = s.replace(old1, new1, 1)

old2 = """                          onClick={() => alert(`Case ${report.caseNumber} marked as under review`)}"""
new2 = """                          onClick={() => showToast(`Case ${report.caseNumber} marked as under review`, 'info')}"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w').write(s)
print("done")
