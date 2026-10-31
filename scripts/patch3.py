p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

old = '''                  <Icon name="team" className="size-3.5" /> Crew Rosters & Personnel
                </button>
              </>'''

new = '''                  <Icon name="team" className="size-3.5" /> Crew Rosters & Personnel
                </button>
              </>

            {role === 'staff' && (
              <>
                <button
                  onClick={() => setActiveSection('call-centre')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'call-centre' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="phone" className="size-3.5" /> Call Centre
                </button>
              </>
            )}

            {role === 'regional_coordinator' && (
              <>
                <button
                  onClick={() => setActiveSection('regional-triage')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'regional-triage' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="map" className="size-3.5" /> Regional Triage
                </button>
              </>
            )}

            {role === 'regional_manager' && (
              <>
                <button
                  onClick={() => setActiveSection('regional-performance')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'regional-performance' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="signal" className="size-3.5" /> Performance Dashboard
                </button>
              </>
            )}

            {role === 'hq_admin' && (
              <>
                <button
                  onClick={() => setActiveSection('hq-config')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'hq-config' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="info" className="size-3.5" /> HQ Configuration
                </button>
              </>
            )}

            {role === 'system_admin' && (
              <>
                <button
                  onClick={() => setActiveSection('system-health')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'system-health' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="lock" className="size-3.5" /> System Health
                </button>
              </>
            )'''

assert old in s, 'pattern not found'
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print('done')
