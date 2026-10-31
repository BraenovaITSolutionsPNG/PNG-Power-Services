p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

# Fix HQ Admin metrics
old1 = """                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="user" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Active Users</p>
                </div>"""
new1 = """                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="user" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{staffUsers.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Active Users</p>
                </div>"""
assert old1 in s, "pattern1 not found"
s = s.replace(old1, new1, 1)

old2 = """                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Reference Data Items</p>
                </div>"""
new2 = """                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.length + incidentsList.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Total Reports & Incidents</p>
                </div>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

old3 = """                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="signal" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">National Trends</p>
                </div>"""
new3 = """                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="signal" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.filter(r => r.status === 'Resolved').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Resolved Cases</p>
                </div>"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

# Add onClick handlers to config buttons
old4 = """                  <button className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Manage Issue Categories
                  </button>"""
new4 = """                  <button onClick={() => showToast('Issue categories management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Manage Issue Categories
                  </button>"""
assert old4 in s, "pattern4 not found"
s = s.replace(old4, new4, 1)

old5 = """                  <button className="button button-secondary text-xs">
                    <Icon name="map" className="size-3.5" /> Manage Regions
                  </button>"""
new5 = """                  <button onClick={() => showToast('Regions management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="map" className="size-3.5" /> Manage Regions
                  </button>"""
assert old5 in s, "pattern5 not found"
s = s.replace(old5, new5, 1)

old6 = """                  <button className="button button-secondary text-xs">
                    <Icon name="team" className="size-3.5" /> Manage Teams
                  </button>"""
new6 = """                  <button onClick={() => showToast('Teams management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="team" className="size-3.5" /> Manage Teams
                  </button>"""
assert old6 in s, "pattern6 not found"
s = s.replace(old6, new6, 1)

open(p, 'w').write(s)
print("done")
