p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Find the main layout structure
idx = s.find("min-h-screen")
print(s[idx:idx+300])
