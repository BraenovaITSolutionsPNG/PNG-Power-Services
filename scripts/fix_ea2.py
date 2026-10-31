p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Remove the premature root </div> before Edit Access Modal
old = "      )}\n\n    </div>\n\n      {/* Edit Access Modal */}"
new = "      )}\n\n      {/* Edit Access Modal */}"
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Now add </div> before the final ) if not there
# Check end
lines = s.split('\n')
for i in range(len(lines)-6, len(lines)):
    print(str(i+1) + ": " + repr(lines[i]))

open(p, 'w', encoding='utf-8').write(s)
print("done")
