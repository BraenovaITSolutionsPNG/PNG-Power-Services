p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find('main className')
end = s.find('/main>', start)
main = s[start:end]
# Find role === patterns
import re
roles = re.findall(r"role === '(\w+)'", main)
print("Roles found in main content:", roles)
