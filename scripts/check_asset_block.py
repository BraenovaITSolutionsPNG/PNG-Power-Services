p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Find the asset type conditional
idx = s.find("{assetType && (")
print(s[idx:idx+900])
