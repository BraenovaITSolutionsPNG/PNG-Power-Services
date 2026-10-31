p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Check for replacement char differently
count = s.count('\ufffd')
print("replacement char count:", count)
# Also check for other suspicious chars
for c in set(s):
    if ord(c) > 127:
        print(f"non-ascii: {repr(c)} (U+{ord(c):04X})")
