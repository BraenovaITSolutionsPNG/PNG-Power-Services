p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Check the mobile overlay
idx = s.find("mobileOpen && (")
print(s[idx:idx+120])
