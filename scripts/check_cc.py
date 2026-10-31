p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("role === 'staff' && (\n            <div")
end = s.find("role === 'regional_coordinator' && (\n            <div", start)
print(s[start:end][:500])
