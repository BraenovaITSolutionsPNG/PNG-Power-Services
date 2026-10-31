p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("activeSection === 'incidents' && (")
end = s.find("activeSection === 'public-intake' && (", idx)
chunk = s[idx:end]
# Find the buttons container (the second flex gap-2)
import re
for m in re.finditer(r'<div className="flex items-center gap-2">', chunk):
    print(m.start(), chunk[m.start():m.start()+80])
