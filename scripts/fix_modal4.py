p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# The note modal is currently after </div> (root close). Move it inside.
old = """      )}\n    </div>\n\n      {showNoteModal && ("""
new = """      )}\n\n      {showNoteModal && ("""
assert old in s, "pattern1 not found"
s = s.replace(old, new, 1)

# Now the structure ends with modal, then </div> needs to be after modal
old2 = """      )}\n  )\n}"""
new2 = """      )}\n    </div>\n  )\n}"""
# Only replace the last occurrence
idx = s.rfind(old2)
assert idx >= 0, "pattern2 not found"
s = s[:idx] + new2 + s[idx+len(old2):]
open(p, 'w').write(s)
print("done")
