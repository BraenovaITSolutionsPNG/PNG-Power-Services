p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

old = '<header className="fixed top-0 sm:top-8 left-0 right-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">'
new = '<header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">'
assert old in s, "pattern1 not found"
s = s.replace(old, new, 1)

old2 = '      <section className="pt-16 sm:pt-24 hero-slider relative overflow-hidden bg-hero scroll-mt-20"'
new2 = '      <section className="hero-slider relative overflow-hidden bg-hero scroll-mt-20"'
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
