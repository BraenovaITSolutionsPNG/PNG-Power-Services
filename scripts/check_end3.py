p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
lines = s.split('\n')
for i in range(len(lines)-12, len(lines)):
    print(str(i+1) + ": " + repr(lines[i]))
