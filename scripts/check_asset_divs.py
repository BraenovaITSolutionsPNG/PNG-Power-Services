p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("{assetType && (")
# Find the closing
frag_start = idx
frag_end = s.find("</>", frag_start)
cond_end = s.find(")}", frag_end)
print("assetType block from", idx, "to", cond_end)
print(repr(s[frag_end:cond_end+5]))
print("---")
# Count opening and closing divs in the block
block = s[idx:cond_end+2]
print("open divs:", block.count("<div"))
print("close divs:", block.count("</div>"))
print("open fragments:", block.count("<>"))
print("close fragments:", block.count("</>"))
