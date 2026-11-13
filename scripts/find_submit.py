p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
import re
for m in re.finditer(r'Submit Report|Submit Fault Report|Submit', s):
    print(f"pos {m.start()}: {repr(s[m.start()-20:m.start()+40])}")
