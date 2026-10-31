p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("24/7 Hotline")
print(repr(s[idx-80:idx+80]))
