p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Replace middle dot (U+00B7) with " - "
s = s.replace(chr(183), " - ")
open(p, 'w', encoding='utf-8').write(s)
print("done")
