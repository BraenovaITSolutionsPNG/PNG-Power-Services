p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Search for input fields related to reference/case
import re
for m in re.finditer(r'input[^>]*', s):
    ctx = m.group()
    if 'reference' in ctx.lower() or 'case' in ctx.lower() or 'number' in ctx.lower():
        print(repr(ctx[:100]))
