p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
lines = s.split('\n')
for i in range(1233, 1240):
    print(str(i+1) + ": " + repr(lines[i]))
