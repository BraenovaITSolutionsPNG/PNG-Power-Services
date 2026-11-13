p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("{assetType && (")
# Find the first ")}" after idx that closes the block
# The block should close after the assetDescription textarea
pos = s.find("Asset Description", idx)
end = s.find(")}", pos)
print("block end at:", end)
print(s[end-50:end+5])
