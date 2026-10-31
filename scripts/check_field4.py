p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("role === 'field' && (\n            <div")
end = s.find("role === 'admin' && (\n            <div", start)
chunk = s[start:end]
# Find field-safety section
safety_idx = chunk.find("activeSection === 'field-safety'")
print(chunk[safety_idx:safety_idx+1500])
