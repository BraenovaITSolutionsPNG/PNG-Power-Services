p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
for term in ["Customer Charter", "Privacy Policy"]:
    idx = s.find(term)
    print(f"'{term}' found at {idx}")
    if idx >= 0:
        print(repr(s[idx-80:idx+80]))
        print("---")
