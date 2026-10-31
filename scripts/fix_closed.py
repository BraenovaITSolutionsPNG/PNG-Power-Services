p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
s = s.replace("publicReports.filter(r => r.status !== 'Resolved' && r.status !== 'Closed').length", "publicReports.filter(r => r.status !== 'Resolved').length")
open(p, 'w').write(s)
print("done")
