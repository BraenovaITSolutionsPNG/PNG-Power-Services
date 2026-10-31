p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Search for "No overdue reviews"
idx = s.find("No overdue reviews")
print(repr(s[idx-200:idx+100]))
