p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

old = '''          <div className="mt-2 space-y-1">
            {[
              { key: 'operations', label: 'Operations Hub', icon: 'briefcase', section: 'operations-overview' },
              { key: 'field', label: 'Field Crew Work', icon: 'wrench', section: 'field-assignments' },
              { key: 'admin', label: 'Admin & Analytics', icon: 'shield', section: 'admin-system' },
              { key: 'staff', label: 'Call Centre', icon: 'phone', section: 'call-centre' },
              { key: 'regional_coordinator', label: 'Regional Coord', icon: 'map', section: 'regional-triage' },
              { key: 'regional_manager', label: 'Regional Manager', icon: 'signal', section: 'regional-performance' },
              { key: 'hq_admin', label: 'HQ Admin', icon: 'info', section: 'hq-config' },
              { key: 'system_admin', label: 'System Admin', icon: 'lock', section: 'system-health' },
            ].map((r) => (
              <button
                key={r.key}
                onClick={() => {
                  setRole(r.key as AdminRole)
                  setActiveSection(r.section)
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                  role === r.key ? 'bg-brand text-white shadow-brand' : 'text-white/60 hover:bg-white/5'
                }`}
              >
                <Icon name={r.icon as any} className="size-4" />
                <span className="truncate">{r.label}</span>
                {role === r.key && <span className="ml-auto size-1.5 rounded-full bg-white shrink-0" />}
              </button>
            ))}
          </div>'''

new = '''          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-3 rounded-xl bg-brand/20 px-3 py-2.5 text-sm font-semibold text-white">
              <Icon name="user" className="size-4" />
              <span className="truncate">{role.replace('_', ' ').replace(/\\b\\w/g, c => c.toUpperCase())}</span>
            </div>
          </div>'''

assert old in s, "old not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
