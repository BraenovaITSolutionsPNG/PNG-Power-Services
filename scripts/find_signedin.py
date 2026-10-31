p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Find the header area with "Signed in as"
idx = s.find("Signed in as")
print(s[idx-300:idx+200])
