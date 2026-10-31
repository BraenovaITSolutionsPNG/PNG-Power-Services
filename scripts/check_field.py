p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("role === 'field' && (")
end = s.find("role === 'admin' && (", start)
print(s[start:end][:3000])
