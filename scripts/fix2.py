p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Remove the extra closing tags
old = "          )}\n\n            </div>\n          )}\n        </main>"
new = "          )}\n        </main>"
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
