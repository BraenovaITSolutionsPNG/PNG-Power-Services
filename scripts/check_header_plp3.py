p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("<header")
# Check 50 chars before
print(repr(s[idx-50:idx]))
