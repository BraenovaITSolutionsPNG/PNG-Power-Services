p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
lines = s.split('\n')
# Find main content operations view
for i, line in enumerate(lines):
    if 'Operations View' in line:
        print(f"Found at line {i+1}")
        for j in range(i, min(i+15, len(lines))):
            print(f"{j+1}: {lines[j]}")
        break
