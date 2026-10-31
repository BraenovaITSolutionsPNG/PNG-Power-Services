p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("function createWorkOrder")
print(repr(s[idx-100:idx+50]))
