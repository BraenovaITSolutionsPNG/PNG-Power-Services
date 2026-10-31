p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("role === 'regional_manager' && (\n            <div")
end = s.find("role === 'hq_admin' && (\n            <div", start)
chunk = s[start:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\rm_current.txt", 'w').write(chunk)
print("length:", len(chunk))
