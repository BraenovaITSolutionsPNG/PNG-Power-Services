p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("<header")
# Go back to find parent
parent = s.rfind("<", 0, idx)
while parent > 0 and s[parent] != '\n':
    parent -= 1
print(repr(s[parent:idx]))
