p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Remove the premature </div> before View Logs Modal
old = "      )}\n\n    </div>\n\n      {/* View Logs Modal */}"
new = "      )}\n\n      {/* View Logs Modal */}"
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
