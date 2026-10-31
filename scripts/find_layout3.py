p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Find "lg:pl-72" which is the main content area
idx = s.find("lg:pl-72")
print(s[idx-200:idx+200])
