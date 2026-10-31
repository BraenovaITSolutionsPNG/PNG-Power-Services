p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("location} ")
print(repr(s[idx:idx+40]))
idx2 = s.find("<span>")
print(repr(s[idx2:idx2+20]))
