p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
lines = s.split('\n')
for i in range(1228, 1238):
    print(str(i+1) + ": " + repr(lines[i]))
