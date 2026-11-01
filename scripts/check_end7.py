p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
lines = s.split('\n')
for i in range(len(lines)-10, len(lines)):
    print(str(i+1) + ": " + lines[i])
