p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = "        </div>\n    </div>\n  )\n}"
new = "        </div>\n      )}\n    </div>\n  )\n}"
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
