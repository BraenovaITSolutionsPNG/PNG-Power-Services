p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
old = '<div className="flex gap-2">\n              <button\n                className="hero-control"\n                onClick={() => changeHeroSlide(-1)}'
new = '<div className="hidden sm:flex gap-2">\n              <button\n                className="hero-control"\n                onClick={() => changeHeroSlide(-1)}'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
