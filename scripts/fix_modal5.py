p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = "      )}\n\n      {showNoteModal && ("
new = "      )}\n\n      {showNoteModal && ("
# The issue: we need </div> before the final ). Let's find the last )}
idx = s.rfind("      )}\n  )\n}")
print("found at:", idx)
if idx >= 0:
    # Insert </div> before the final )
    s = s[:idx] + "    </div>\n" + s[idx:]
    open(p, 'w').write(s)
    print("done")
else:
    print("pattern not found")
