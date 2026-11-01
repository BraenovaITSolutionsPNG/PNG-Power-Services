p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Search for any input that might be for reference/case number
import re
for m in re.finditer(r'<input[^>]*>', s):
    ctx = m.group()
    if 'ref' in ctx.lower() or 'case' in ctx.lower() or 'number' in ctx.lower():
        print(repr(ctx[:120]))
