p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("{assetType && (")
# Find the closing of the fragment and conditional
# Look for "</>" after idx
frag_end = s.find("</>", idx)
print("fragment end at:", frag_end)
print(s[frag_end:frag_end+10])
# Find )} after fragment end
cond_end = s.find(")}", frag_end)
print("conditional end at:", cond_end)
print(s[cond_end-20:cond_end+5])
