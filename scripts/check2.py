p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
lines = s.split('\n')
# Find the end of operations view
idx = s.find("role === 'operations' && (")
end = s.find("role === 'field' && (", idx)
print("operations view section:")
for i in range(idx, min(idx+20, len(lines))):
    pass
# Print lines around the transition
for i, line in enumerate(lines):
    if "role === 'field' && (" in line:
        print(f"--- transition at line {i+1} ---")
        for j in range(max(0,i-15), i+3):
            print(f"{j+1}: {lines[j]}")
        break
