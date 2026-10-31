p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("activeSection === 'incidents' && (")
end = s.find("activeSection === 'public-intake' && (", idx)
chunk = s[idx:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\incidents_current2.txt", 'w').write(chunk)
print("length:", len(chunk))
