p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Look at the previous/next slide buttons
for pos in [14476, 14738]:
    print(f"--- pos {pos} ---")
    print(s[pos-120:pos+80])
    print()
