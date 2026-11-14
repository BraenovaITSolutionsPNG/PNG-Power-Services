p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("assetDescription: assetDescription || undefined")
print(repr(s[idx-20:idx+60]))
