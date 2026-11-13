p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("{assetType && (")
# Find ")}" after idx
end = s.find(")}", idx)
print("end at:", end)
print(s[idx+950:end+5])
