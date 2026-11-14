p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
import re
for m in re.finditer(r'Submit', s):
    ctx = s[m.start()-15:m.start()+30]
    if 'Fault' in ctx or 'Report' in ctx:
        print(f"pos {m.start()}: {repr(ctx)}")
