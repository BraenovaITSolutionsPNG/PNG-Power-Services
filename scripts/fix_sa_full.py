p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

old = """              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">System Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => showToast('System logs opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> View Logs
                  </button>
                  <button onClick={() => showToast('Access management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="lock" className="size-3.5" /> Manage Access
                  </button>
                  <button onClick={() => showToast('System configuration opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Configuration
                  </button>
                </div>
              </div>"""
new = """              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">System Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => showToast('System logs opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> View Logs
                  </button>
                  <button onClick={() => showToast('Access management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="lock" className="size-3.5" /> Manage Access
                  </button>
                  <button onClick={() => showToast('System configuration opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Configuration
                  </button>
                </div>
              </div>

              {/* Service Status */}
              <div className="card overflow-hidden">
                <div className="border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Service Status</h3>
                </div>
                <div className="divide-y divide-line">
                  {[
                    { name: 'API Server', status: 'Online', color: 'badge-green' },
                    { name: 'Database (MySQL)', status: 'Online', color: 'badge-green' },
                    { name: 'Auth Service', status: 'Online', color: 'badge-green' },
                    { name: 'File Storage', status: 'Online', color: 'badge-green' },
                    { name: 'Email Service', status: 'Degraded', color: 'badge-amber' },
                  ].map((svc) => (
                    <div key={svc.name} className="p-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-ink">{svc.name}</span>
                      <span className={`badge ${svc.color}`}>{svc.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent System Logs */}
              <div className="card overflow-hidden">
                <div className="border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Recent System Logs</h3>
                </div>
                <div className="divide-y divide-line font-mono text-xs">
                  {[
                    { time: '10:42 AM', level: 'INFO', msg: 'User login: admin.hq@pngpower.com.pg' },
                    { time: '10:38 AM', level: 'INFO', msg: 'Report created: PNG-6K8R-24' },
                    { time: '10:35 AM', level: 'WARN', msg: 'High latency detected on /api/reports' },
                    { time: '10:30 AM', level: 'INFO', msg: 'Database connection pool refreshed' },
                    { time: '10:25 AM', level: 'ERROR', msg: 'Email service timeout (retry 2/3)' },
                  ].map((log, idx) => (
                    <div key={idx} className="p-3 flex items-start gap-3">
                      <span className="text-muted shrink-0">{log.time}</span>
                      <span className={`badge ${log.level === 'ERROR' ? 'badge-red' : log.level === 'WARN' ? 'badge-amber' : 'badge-blue'}`}>{log.level}</span>
                      <span className="text-ink">{log.msg}</span>
                    </div>
                  ))}
                </div>
              </div>"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
