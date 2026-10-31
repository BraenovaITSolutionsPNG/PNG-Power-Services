p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Search for arrow-related classes
import re
for m in re.finditer(r'arrow', s, re.IGNORECASE):
    ctx = s[max(0,m.start()-60):m.start()+60]
    print(f"pos {m.start()}: {repr(ctx)}")
