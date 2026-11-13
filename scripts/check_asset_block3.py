p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("{assetType && (")
# Find the closing of this block
end = s.find(")}", idx) + 2
print(s[idx+900:end+10])
