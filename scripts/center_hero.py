p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Center the hero copy on mobile
old = '<div key={heroSlide} className="hero-copy max-w-2xl">'
new = '<div key={heroSlide} className="hero-copy max-w-2xl text-center sm:text-left">'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Also center the buttons on mobile
old2 = '<div className="mt-8 flex flex-col gap-3 sm:flex-row">'
new2 = '<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start">'
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
