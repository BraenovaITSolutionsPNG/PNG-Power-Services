p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Find submit button
import re
for m in re.finditer(r'Submit (Report|Fault Report)', s):
    ctx = s[m.start()-40:m.start()+40]
    print(f"pos {m.start()}: {repr(ctx)}")
