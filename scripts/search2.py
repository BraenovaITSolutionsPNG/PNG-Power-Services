p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
lines = s.split('\n')
for i, line in enumerate(lines):
    if 'Access Role' in line or 'access.*role' in line.lower() or 'role' in line.lower() and 'select' in line.lower():
        print(f"{i+1}: {line}")
