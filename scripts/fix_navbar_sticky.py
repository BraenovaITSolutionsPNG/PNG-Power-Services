p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Change header from fixed back to sticky
old = '<header className="fixed top-0 left-0 right-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">'
new = '<header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Remove the pt-20/pt-28 from hero section since header is no longer fixed
old2 = '      <section className="pt-20 sm:pt-28 hero-slider relative overflow-hidden bg-hero scroll-mt-20"'
new2 = '      <section className="hero-slider relative overflow-hidden bg-hero scroll-mt-20"'
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
