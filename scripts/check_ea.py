p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
lines = s.split('\n')
for i in range(2258, 2270):
    print(str(i+1) + ": " + lines[i])
