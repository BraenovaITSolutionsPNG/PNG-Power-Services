p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Replace the replacement character (U+FFFD)
s = s.replace('\ufffd', '-')
# Now check
idx = s.find("foundReport.location")
print(repr(s[idx:idx+60]))
open(p, 'w', encoding='utf-8').write(s)
print("done")
