p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Search for slider dots/indicators
import re
for m in re.finditer(r'slide', s, re.IGNORECASE):
    ctx = s[max(0,m.start()-40):m.start()+60]
    if 'dot' in ctx.lower() or 'indicator' in ctx.lower() or 'line' in ctx.lower():
        print(f"pos {m.start()}: {repr(ctx)}")
