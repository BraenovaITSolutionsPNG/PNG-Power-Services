p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.rfind("mobileOpen")
print(repr(s[idx:idx+250]))
