p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("role === 'admin' && (\n            <div")
end = s.find("role === 'staff' && (\n            <div", start)
chunk = s[start:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\admin_view.txt", 'w').write(chunk)
print("length:", len(chunk))
