p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
for i, c in enumerate(s):
    if c == '\ufffd':
        print(f"pos {i}: context: {repr(s[max(0,i-20):i+20])}")
