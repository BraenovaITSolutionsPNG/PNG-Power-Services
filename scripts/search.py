p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Search for various patterns
for pat in ["Or sign in", "sign in with email", "Or sign", "my-5 flex"]:
    idx = s.find(pat)
    print(repr(pat), "->", idx)
