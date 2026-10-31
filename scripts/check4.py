p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
lines = s.split('\n')
# Find all occurrences of "role === 'field' && ("
for i, line in enumerate(lines):
    if "role === 'field' && (" in line:
        print(f"Found at line {i+1}")
