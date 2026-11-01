p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
old = '<div className="absolute bottom-10 left-0 right-0 flex items-center justify-between">'
new = '<div className="hidden sm:flex absolute bottom-10 left-0 right-0 items-center justify-between">'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
