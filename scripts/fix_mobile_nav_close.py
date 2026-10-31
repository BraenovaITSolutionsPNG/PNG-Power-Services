p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# In the nav section, replace onClick={() => setActiveSection('xxx')} with onClick={() => { setActiveSection('xxx'); setMobileOpen(false) }}
import re
nav_start = s.find('<nav className="mt-3 space-y-1">')
nav_end = s.find('</nav>', nav_start)
before = s[:nav_start]
nav = s[nav_start:nav_end]
after = s[nav_end:]

# Replace in nav section only
nav_new = re.sub(r"onClick=\{\(\) => setActiveSection\('([^']+)'\)\}", r"onClick={() => { setActiveSection('\1'); setMobileOpen(false) }}", nav)
s = before + nav_new + after
open(p, 'w', encoding='utf-8').write(s)
print("done")
