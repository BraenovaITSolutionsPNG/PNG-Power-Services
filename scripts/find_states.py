p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
import re
for m in re.finditer(r'const \[\w+, set\w+\] = useState', s):
    print(m.group())
