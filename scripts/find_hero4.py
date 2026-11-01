p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("hero-copy max-w-2xl")
print(s[idx+1200:idx+2000])
