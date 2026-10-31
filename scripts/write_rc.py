p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("role === 'regional_coordinator' && (\n            <div")
end = s.find("role === 'regional_manager' && (\n            <div", start)
chunk = s[start:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\rc_view.txt", 'w').write(chunk)
print("length:", len(chunk))
