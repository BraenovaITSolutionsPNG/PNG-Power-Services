p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find the very end
idx = s.rfind("    </div>\n  )\n}")
print(repr(s[idx:]))
