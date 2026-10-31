p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Fix RC metrics
old1 = """                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Suggested Links</p>
                </div>"""
new1 = """                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{incidentsList.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Suggested Links</p>
                </div>"""
assert old1 in s, "pattern1 not found"
s = s.replace(old1, new1, 1)

old2 = """                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="team" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Work Orders Assigned</p>
                </div>"""
new2 = """                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="team" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{fieldJobs.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Work Orders Assigned</p>
                </div>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

old3 = """                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Overdue Reviews</p>
                </div>"""
new3 = """                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.filter(r => r.status === 'Under review').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Overdue Reviews</p>
                </div>"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
