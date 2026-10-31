p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("Edit Access Modal")
print(repr(s[idx-60:idx+20]))
