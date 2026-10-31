p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
lines = s.split('\n')
for i in range(len(lines)-15, len(lines)):
    print(f"{i+1}: {lines[i]}")
