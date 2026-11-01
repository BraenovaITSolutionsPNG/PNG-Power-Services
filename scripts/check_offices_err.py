p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
lines = s.split('\n')
for i in range(1000, 1015):
    print(str(i+1) + ": " + lines[i])
