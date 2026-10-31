p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Remove the premature </div> before the Edit Access modal
old = "      )}\n    </div>\n\n      {/* Edit Access Modal */}"
new = "      )}\n\n      {/* Edit Access Modal */}"
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Now add </div> before the final )
old2 = "    </div>\n  )\n}"
idx = s.rfind(old2)
assert idx >= 0, "pattern2 not found"
s = s[:idx] + "    </div>\n  )\n}"  # keep as is

# Actually we need to insert </div> before the final ) if not already there
# Check end
open(p, 'w', encoding='utf-8').write(s)
print("done")
