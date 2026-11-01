p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
lines = s.split('\n')
for i in range(1190, 1200):
    print(str(i+1) + ": " + lines[i])
