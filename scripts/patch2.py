p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find the last occurrence of the admin view closing
target = "            </div>\n          )}\n        </main>"
idx = s.rfind(target)
print("found at", idx)
# The new views to insert
new_views = '''            </div>
          )}

          {/* Call Centre View */}
          {role === 'staff' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">Call Centre</h1>
                <p className="text-xs text-muted mt-1">Create reports for callers, find cases, and explain status</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="phone" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Calls Today</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Reports Created</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="search" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Case Lookups</p>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => { setShowReportForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="button button-primary text-xs">
                    <Icon name="plus" className="size-3.5" /> Create Report for Caller
                  </button>
                  <button className="button button-secondary text-xs">
                    <Icon name="search" className="size-3.5" /> Find Case by Number
                  </button>
                  <button className="button button-secondary text-xs">
                    <Icon name="document" className="size-3.5" /> Record Feedback
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Regional Coordinator View */}
          {role === 'regional_coordinator' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">Regional Triage</h1>
                <p className="text-xs text-muted mt-1">Review incoming work, confirm incident links, assign work orders</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Pending Triage</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Suggested Links</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="team" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Work Orders Assigned</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Overdue Reviews</p>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Pending Actions</h3>
                <p className="text-sm text-muted">Review suggested report-to-incident links and confirm or correct groupings.</p>
              </div>
            </div>
          )}

          {/* Regional Manager View */}
          {role === 'regional_manager' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">Regional Performance</h1>
                <p className="text-xs text-muted mt-1">Service performance, recurring issues, resource blockers</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Total Reports</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="check" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Resolved</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Overdue</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Recurring Issues</p>
                </div>
              </div>
            </div>
          )}

          {/* HQ Admin View */}
          {role === 'hq_admin' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">HQ Configuration</h1>
                <p className="text-xs text-muted mt-1">Manage reference data, access, and national trends</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="user" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Active Users</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Reference Data Items</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="signal" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">National Trends</p>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Configuration</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="button button-secondary text-xs">
                    <Icon name="settings" className="size-3.5" /> Manage Issue Categories
                  </button>
                  <button className="button button-secondary text-xs">
                    <Icon name="map" className="size-3.5" /> Manage Regions
                  </button>
                  <button className="button button-secondary text-xs">
                    <Icon name="team" className="size-3.5" /> Manage Teams
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* System Admin View */}
          {role === 'system_admin' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">System Health</h1>
                <p className="text-xs text-muted mt-1">Maintain configuration and service health</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="check" /></span>
                  <p className="mt-4 text-3xl font-extrabold">99.9%</p>
                  <p className="mt-1 text-xs font-medium text-muted">API Uptime</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">DB Connections</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0ms</p>
                  <p className="mt-1 text-xs font-medium text-muted">Avg Response Time</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Errors Today</p>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">System Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> View Logs
                  </button>
                  <button className="button button-secondary text-xs">
                    <Icon name="lock" className="size-3.5" /> Manage Access
                  </button>
                  <button className="button button-secondary text-xs">
                    <Icon name="settings" className="size-3.5" /> Configuration
                  </button>
                </div>
              </div>
            </div>
          )}

'''
s = s.replace(target, new_views + target, 1)
open(p, 'w').write(s)
print("done")
