p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Find the header
idx = s.find("PNG Power Internal Systems")
print(repr(s[idx-200:idx+300]))
