p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("role === 'hq_admin' && (\n            <div")
end = s.find("role === 'system_admin' && (\n            <div", start)
chunk = s[start:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\hq_view.txt", 'w').write(chunk)
print("length:", len(chunk))
