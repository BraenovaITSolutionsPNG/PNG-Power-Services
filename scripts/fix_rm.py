p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

# Fix Regional Manager metrics
old1 = """                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="check" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Resolved</p>
                </div>"""
new1 = """                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="check" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.filter(r => r.status === 'Resolved').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Resolved</p>
                </div>"""
assert old1 in s, "pattern1 not found"
s = s.replace(old1, new1, 1)

old2 = """                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Overdue</p>
                </div>"""
new2 = """                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.filter(r => r.status !== 'Resolved' && r.status !== 'Closed').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Open / Pending</p>
                </div>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

old3 = """                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Recurring Issues</p>
                </div>"""
new3 = """                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{incidentsList.filter(i => i.priority === 'Critical' || i.priority === 'High').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">High Priority Incidents</p>
                </div>"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

open(p, 'w').write(s)
print("done")
