p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find all role-based view conditions
import re
for m in re.finditer(r"role === '(\w+)' &&", s):
    print(m.group(1))
