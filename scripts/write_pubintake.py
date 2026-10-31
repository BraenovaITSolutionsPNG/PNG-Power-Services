p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("activeSection === 'public-intake' && (")
end = s.find("role === 'field' && (", start)
chunk = s[start:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\pubintake.txt", 'w').write(chunk)
print("length:", len(chunk))
