p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
old = 'className="bg-sidebar px-4 py-2 text-xs text-white/80">'
new = 'className="hidden sm:block bg-sidebar px-4 py-2 text-xs text-white/80">'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
