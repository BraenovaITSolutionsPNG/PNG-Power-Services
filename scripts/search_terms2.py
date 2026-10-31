p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
for term in ["Workspace", "Internal", "Sign Out", "Public Website", "Signed in"]:
    idx = s.find(term)
    if idx >= 0:
        print(f"{term}: found at {idx}")
        print(repr(s[max(0,idx-80):idx+80]))
        print("---")
