p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = """      )}\n    </div>\n\n      {showNoteModal && ("""
new = """      )}\n\n      {showNoteModal && ("""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
# Now fix the closing - the note modal should be before </div>
old2 = """      )}\n  )\n}"""
new2 = """      )}\n    </div>\n  )\n}"""
# But we need to make sure the </div> is after the modal, not before
# Actually, let's just check the current structure
open(p, 'w').write(s)
print("done")
