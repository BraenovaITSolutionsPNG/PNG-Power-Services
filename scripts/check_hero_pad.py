p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Check the hero container padding
idx = s.find("page-wrap relative flex min-h")
print(repr(s[idx:idx+120]))
