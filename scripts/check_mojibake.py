p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Check for common mojibake
for bad in ["â", "Â", "Ã", "ð"]:
    if bad in s:
        print(f"Found '{bad}' in file")
print("done")
