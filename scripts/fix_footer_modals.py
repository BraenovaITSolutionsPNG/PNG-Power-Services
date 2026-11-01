p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Remove the premature </div> before the modals
old = "    </div>\n\n      {/* Customer Charter Modal */}"
new = "    </div>\n\n      {/* Customer Charter Modal */}"
# Actually, the issue is that </div> (root close) is at 1248, before the modals
# Let's check the structure
old2 = "      </footer>\n    </div>\n\n      {/* Customer Charter Modal */}"
new2 = "      </footer>\n\n      {/* Customer Charter Modal */}"
assert old2 in s, "pattern not found"
s = s.replace(old2, new2, 1)

# Now add </div> before the final )
old3 = "    </div>\n  )\n}"
# Find the last occurrence
idx = s.rfind(old3)
assert idx >= 0, "pattern3 not found"
s = s[:idx] + "    </div>\n  )\n}"  # keep as is (the </div> is already before modals? No...)

# Actually, we need </div> AFTER the modals. Let me check the end
open(p, 'w', encoding='utf-8').write(s)
print("done")
