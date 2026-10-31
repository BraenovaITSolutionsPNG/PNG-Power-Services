p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("activeSection === 'incidents' && (")
end = s.find("activeSection === 'public-intake' && (", idx)
chunk = s[idx:end]
# Find buttons
import re
for m in re.finditer(r'button', chunk):
    ctx = chunk[max(0,m.start()-30):m.start()+60]
    print(m.start(), repr(ctx[:80]))
