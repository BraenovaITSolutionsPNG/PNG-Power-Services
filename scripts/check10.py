p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find the Quick Navigation section
idx = s.find("Quick Navigation")
print(repr(s[idx-100:idx+200]))
