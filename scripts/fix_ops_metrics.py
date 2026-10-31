p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

# Make metrics use real data
old1 = """                  <p className="mt-4 text-3xl font-extrabold tracking-tight">186</p>
                  <p className="mt-1 text-xs font-medium text-muted">Open Resident Tickets</p>"""
new1 = """                  <p className="mt-4 text-3xl font-extrabold tracking-tight">{publicReports.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Open Resident Tickets</p>"""
assert old1 in s, "pattern1 not found"
s = s.replace(old1, new1, 1)

old2 = """                  <p className="mt-4 text-3xl font-extrabold tracking-tight">42</p>
                  <p className="mt-1 text-xs font-medium text-muted">Active Feeder Incidents</p>"""
new2 = """                  <p className="mt-4 text-3xl font-extrabold tracking-tight">{incidentsList.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Active Feeder Incidents</p>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

old3 = """                  <p className="mt-4 text-3xl font-extrabold tracking-tight">17</p>
                  <p className="mt-1 text-xs font-medium text-muted">Field Crews Deployed</p>"""
new3 = """                  <p className="mt-4 text-3xl font-extrabold tracking-tight">{staffUsers.filter(u => u.role === 'field').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Field Crews Deployed</p>"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

old4 = """                  <p className="mt-4 text-3xl font-extrabold tracking-tight">19</p>
                  <p className="mt-1 text-xs font-medium text-muted">Awaiting Triage</p>"""
new4 = """                  <p className="mt-4 text-3xl font-extrabold tracking-tight">{publicReports.filter(r => r.status === 'Under review').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Awaiting Triage</p>"""
assert old4 in s, "pattern4 not found"
s = s.replace(old4, new4, 1)

open(p, 'w').write(s)
print("done")
