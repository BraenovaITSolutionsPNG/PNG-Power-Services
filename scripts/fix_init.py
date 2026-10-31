p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = """      if (user.role === 'operations') setActiveSection('operations-overview')
      else if (user.role === 'field') setActiveSection('field-assignments')
      else if (user.role === 'admin') setActiveSection('admin-system')
      else setActiveSection('operations-overview')"""
new = """      if (user.role === 'operations') setActiveSection('operations-overview')
      else if (user.role === 'field') setActiveSection('field-assignments')
      else if (user.role === 'admin') setActiveSection('admin-system')
      else if (user.role === 'staff') setActiveSection('call-centre')
      else if (user.role === 'regional_coordinator') setActiveSection('regional-triage')
      else if (user.role === 'regional_manager') setActiveSection('regional-performance')
      else if (user.role === 'hq_admin') setActiveSection('hq-config')
      else if (user.role === 'system_admin') setActiveSection('system-health')
      else setActiveSection('operations-overview')"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
