p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("foundReport.location")
# Find the replacement char after idx
for i in range(idx, idx+40):
    c = s[i]
    if ord(c) > 127:
        print(f"pos {i}: {repr(c)} ord: {ord(c)} hex: {ord(c):04X}")
        break
else:
    print("no non-ascii found in range")
