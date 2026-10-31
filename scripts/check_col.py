p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
lines = s.split('\n')
line = lines[1454]
print("length:", len(line))
print("col 100-120:", repr(line[95:125]))
