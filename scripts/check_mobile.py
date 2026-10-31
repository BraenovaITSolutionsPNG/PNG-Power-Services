p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find the last occurrence of mobileOpen
idx = s.rfind("mobileOpen")
print(repr(s[idx-50:idx+200]))
