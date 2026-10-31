p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Enhance HQ Admin - add user management table
old = """              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Configuration</h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => showToast('Issue categories management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Manage Issue Categories
                  </button>
                  <button onClick={() => showToast('Regions management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="map" className="size-3.5" /> Manage Regions
                  </button>
                  <button onClick={() => showToast('Teams management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="team" className="size-3.5" /> Manage Teams
                  </button>
                </div>
              </div>"""
new = """              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Configuration</h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => showToast('Issue categories management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Manage Issue Categories
                  </button>
                  <button onClick={() => showToast('Regions management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="map" className="size-3.5" /> Manage Regions
                  </button>
                  <button onClick={() => showToast('Teams management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="team" className="size-3.5" /> Manage Teams
                  </button>
                </div>
              </div>

              {/* User Access Management */}
              <div className="card overflow-hidden">
                <div className="border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">User Access Management</h3>
                </div>
                <div className="divide-y divide-line">
                  {staffUsers.map((staff) => (
                    <div key={staff.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-ink">{staff.name}</p>
                        <p className="text-xs text-muted">{staff.email} · {staff.department}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge">{staff.role}</span>
                        <span className={`badge ${staff.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{staff.status}</span>
                        <button onClick={() => showToast(`Access updated for ${staff.name}`, 'success')} className="button button-secondary text-xs">Edit Access</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* National Trends */}
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">National Trends</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-line">
                    <span className="text-xs text-muted">Most reported issue</span>
                    <span className="text-xs font-bold text-ink">Power outage (Area blackout)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-line">
                    <span className="text-xs text-muted">Highest incident province</span>
                    <span className="text-xs font-bold text-ink">NCD</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-line">
                    <span className="text-xs text-muted">Average resolution time</span>
                    <span className="text-xs font-bold text-ink">4.2 hours</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-muted">Resolution rate</span>
                    <span className="text-xs font-bold text-ink">{publicReports.length > 0 ? Math.round((publicReports.filter(r => r.status === 'Resolved').length / publicReports.length) * 100) : 0}%</span>
                  </div>
                </div>
              </div>"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
