p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Find where foundReport is used in JSX (not useState)
import re
for m in re.finditer(r'foundReport', s):
    line = s[:m.start()].count('\n') + 1
    ctx = s[m.start():m.start()+40]
    print(f"line {line}: {ctx}")
