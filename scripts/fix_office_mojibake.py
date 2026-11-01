p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
print("mojibake count:", s.count("â€“"))
s = s.replace("â€“", "-")
open(p, 'w', encoding='utf-8').write(s)
print("done")
