import re

p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

old_block = """         <div className="mt-2 space-y-1">
            <button
              onClick={() => {
                setRole('operations')
                setActiveSection('operations-overview')
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                role === 'operations' ? 'bg-brand text-white shadow-brand' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <Icon name="briefcase" className="size-4" />
              <span>Operations Hub</span>
              {role === 'operations' && <span className="ml-auto size-1.5 rounded-full bg-white" />}
            </button>

            <button
              onClick={() => {
                setRole('field')
                setActiveSection('field-assignments')
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                role === 'field' ? 'bg-brand text-white shadow-brand' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <Icon name="wrench" className="size-4" />
              <span>Field Crew Work</span>
              {role === 'field' && <span className="ml-auto size-1.5 rounded-full bg-white" />}
            </button>

            <button
              onClick={() => {
                setRole('admin')
                setActiveSection('admin-system')
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                role === 'admin' ? 'bg-brand text-white shadow-brand' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <Icon name="shield" className="size-4" />
              <span>Admin & Analytics</span>
              {role === 'admin' && <span className="ml-auto size-1.5 rounded-full bg-white" />}
            </button>
          </div>"""

new_block = """         <div className="mt-2 space-y-1">
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
          </div>"""

assert old_block in s, 'old_block not found'
s = s.replace(old_block, new_block)
open(p, 'w').write(s)
print('done')
