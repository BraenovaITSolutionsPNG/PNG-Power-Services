p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
print("middle dot count:", s.count(chr(183)))
print("mojibake count:", s.count("Â·"))
