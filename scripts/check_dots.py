p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Count occurrences of the middle dot
print("middle dot count:", s.count("·"))
print("mojibake count:", s.count("Â·"))
