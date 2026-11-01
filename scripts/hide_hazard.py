p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
old = '<div className="mt-8 flex items-center gap-3 text-xs text-white/60">'
new = '<div className="hidden sm:flex mt-8 items-center gap-3 text-xs text-white/60">'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
