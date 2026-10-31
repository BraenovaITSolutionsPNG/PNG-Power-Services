p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = '''              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">Access Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminRole)}
                  className="w-full rounded-lg border border-white/15 bg-sidebar px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
                >
                  <option value="operations">Operations Center (Triage & Dispatch)</option>
                  <option value="field">Field Technician / Crew</option>
                  <option value="admin">System Administration & Oversight</option>
                </select>
              </div>

'''
new = ""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
