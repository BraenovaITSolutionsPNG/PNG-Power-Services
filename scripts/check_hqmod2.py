p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
lines = s.split('\n')
# Find the last </div> before the modals
for i in range(2083, 2090):
    print(str(i+1) + ": " + repr(lines[i]))
