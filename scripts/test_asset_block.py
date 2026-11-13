p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Find the assetType block
start = s.find("{assetType && (")
end = s.find(")}", s.find("</>", start)) + 2
block = s[start:end]
print("block length:", len(block))
# Replace with empty string temporarily
s2 = s.replace(block, "", 1)
open(p + ".tmp", 'w', encoding='utf-8').write(s2)
print("written")
