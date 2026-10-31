p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Find mojibake
import re
for m in re.finditer(r'Â.', s):
    print(repr(m.group()), "at", m.start())
