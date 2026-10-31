p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = "              </>\n            )\n            )}\n          </nav>"
new = "              </>\n            )}\n          </nav>"
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
