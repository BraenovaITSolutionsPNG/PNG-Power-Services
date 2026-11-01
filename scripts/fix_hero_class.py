p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
old = '      <section className="pt-20 sm:pt-28"\n        className="hero-slider relative overflow-hidden bg-hero scroll-mt-20"'
new = '      <section className="pt-20 sm:pt-28 hero-slider relative overflow-hidden bg-hero scroll-mt-20"'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
