p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("role === 'operations' && (\n            <div")
end = s.find("role === 'field' && (\n            <div", start)
chunk = s[start:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\ops_view.txt", 'w').write(chunk)
print("length:", len(chunk))
