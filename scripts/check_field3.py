p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("role === 'field' && (\n            <div")
end = s.find("role === 'admin' && (\n            <div", start)
print(s[start:end][:4000])
