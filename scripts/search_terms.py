p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
for term in ["PNG Power Internal Workspace", "Signed in as", "Public Website", "Sign Out"]:
    idx = s.find(term)
    print(f"{term}: {idx}")
