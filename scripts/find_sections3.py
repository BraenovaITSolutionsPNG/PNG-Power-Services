p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Check sections
import re
for m in re.finditer(r'<section[^>]*>|</section>', s):
    line_num = s[:m.start()].count('\n') + 1
    print(f"line {line_num}: {m.group()[:60]}")
