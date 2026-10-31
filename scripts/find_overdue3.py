p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("Overdue Reviews")
# Find all occurrences
i = 0
while True:
    pos = s.find("Overdue Reviews", i)
    if pos == -1:
        break
    print(f"pos {pos}: {repr(s[pos-30:pos+40])}")
    i = pos + 1
