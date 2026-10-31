p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
lines = s.split('\n')
# Find activeSection references in main content (between operations and field)
for i, line in enumerate(lines):
    if 550 <= i+1 <= 745 and "activeSection ===" in line:
        print(f"{i+1}: {line.strip()}")
