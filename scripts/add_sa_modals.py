p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

old = "    </div>\n  )\n}"
new = """    </div>

      {/* View Logs Modal */}
      {showLogsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white border border-gray-200 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">System Logs</h3>
              <div className="flex items-center gap-2">
                <select value={logFilter} onChange={(e) => setLogFilter(e.target.value)} className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-1 text-xs text-gray-900">
                  <option value="ALL">All</option>
                  <option value="INFO">Info</option>
                  <option value="WARN">Warn</option>
                  <option value="ERROR">Error</option>
                </select>
                <button onClick={() => setShowLogsModal(false)} className="text-gray-500 hover:text-gray-900">
                  <Icon name="close" className="size-4" />
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto divide-y divide-gray-200 font-mono text-xs">
              {[
                { time: '10:42 AM', level: 'INFO', msg: 'User login: admin.hq@pngpower.com.pg' },
                { time: '10:38 AM', level: 'INFO', msg: 'Report created: PNG-6K8R-24' },
                { time: '10:35 AM', level: 'WARN', msg: 'High latency detected on /api/reports' },
                { time: '10:30 AM', level: 'INFO', msg: 'Database connection pool refreshed' },
                { time: '10:25 AM', level: 'ERROR', msg: 'Email service timeout (retry 2/3)' },
                { time: '10:20 AM', level: 'INFO', msg: 'User login: ops.lead@pngpower.com.pg' },
                { time: '10:15 AM', level: 'INFO', msg: 'Report created: PNG-4T9J-25' },
                { time: '10:10 AM', level: 'WARN', msg: 'Memory usage at 85%' },
                { time: '10:05 AM', level: 'INFO', msg: 'Scheduled backup completed' },
                { time: '10:00 AM', level: 'ERROR', msg: 'Failed to send notification email' },
              ].filter(l => logFilter === 'ALL' || l.level === logFilter).map((log, idx) => (
                <div key={idx} className="p-3 flex items-start gap-3">
                  <span className="text-gray-500 shrink-0">{log.time}</span>
                  <span className={`badge ${log.level === 'ERROR' ? 'badge-red' : log.level === 'WARN' ? 'badge-amber' : 'badge-blue'}`}>{log.level}</span>
                  <span className="text-gray-900">{log.msg}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button onClick={() => setShowLogsModal(false)} className="button button-secondary w-full">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Access Modal */}
      {showAccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white border border-gray-200 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">Manage User Access</h3>
              <button onClick={() => setShowAccessModal(false)} className="text-gray-500 hover:text-gray-900">
                <Icon name="close" className="size-4" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-200">
              {staffUsers.map((staff) => (
                <div key={staff.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{staff.name}</p>
                    <p className="text-xs text-gray-500">{staff.email} - {staff.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${staff.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{staff.status}</span>
                    <button onClick={() => { setStaffUsers(staffUsers.map(u => u.id === staff.id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u)); showToast(`Access ${staff.status === 'Active' ? 'revoked' : 'granted'} for ${staff.name}`, 'info') }} className="button button-secondary text-xs">
                      {staff.status === 'Active' ? 'Revoke' : 'Grant'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button onClick={() => setShowAccessModal(false)} className="button button-secondary w-full">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* System Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-gray-200 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">System Configuration</h3>
              <button onClick={() => setShowConfigModal(false)} className="text-gray-500 hover:text-gray-900">
                <Icon name="close" className="size-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-700">API Rate Limit (req/min)</label>
                <input type="number" defaultValue={100} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-700">Session Timeout (minutes)</label>
                <input type="number" defaultValue={480} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-700">Max Upload Size (MB)</label>
                <input type="number" defaultValue={10} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <label className="text-sm text-gray-700">Enable email notifications</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <label className="text-sm text-gray-700">Enable SMS alerts</label>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <button onClick={() => { showToast('Configuration saved', 'success'); setShowConfigModal(false) }} className="button button-primary flex-1">Save</button>
              <button onClick={() => setShowConfigModal(false)} className="button button-secondary flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
