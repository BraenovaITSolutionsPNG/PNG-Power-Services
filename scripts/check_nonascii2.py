p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
non_ascii = [c for c in set(s) if ord(c) > 127]
print("non-ascii chars:", non_ascii)
