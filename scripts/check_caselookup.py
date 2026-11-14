p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Find case lookup results display
idx = s.find("case-lookup")
print(s[idx:idx+1200])
