p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("PNG POWER INTERNAL WORKSPACE")
print(s[idx-50:idx+700])
