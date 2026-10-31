p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Remove the premature </div> after showAddStaff modal
old = "      )}\n    </div>\n\n      {/* Issue Categories Modal */}"
new = "      )}\n\n      {/* Issue Categories Modal */}"
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Now add </div> before the final )
old2 = "    </div>\n  )\n}"
# Find the last occurrence
idx = s.rfind(old2)
assert idx >= 0, "pattern not found"
s = s[:idx] + "    </div>\n  )\n}"  # keep as is, but we need </div> before )
# Actually, the modals are now inside the root div (since we removed the premature </div>)
# But we need to make sure the root </div> is after all modals
# Let's check the end
open(p, 'w', encoding='utf-8').write(s)
print("done")
