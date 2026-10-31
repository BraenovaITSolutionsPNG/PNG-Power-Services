p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
for i, c in enumerate(s):
    if c == 'Â' or c == chr(183):
        print(f"pos {i}: {repr(c)} context: {repr(s[max(0,i-10):i+10])}")
