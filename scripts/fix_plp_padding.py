p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Find the hero section and add pt-20
old = '      {/* Hero Carousel Section */}\n      <section\n       '
new = '      {/* Hero Carousel Section */}\n      <section className="pt-20 sm:pt-0"\n       '
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
