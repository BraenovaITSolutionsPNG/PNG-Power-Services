p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Make header fixed
old = '<header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">'
new = '<header className="fixed top-0 left-0 right-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Add top padding to hero section (responsive: 20 on mobile, 28 on desktop for top bar)
old2 = '      {/* Hero Carousel Section */}\n      <section\n       '
new2 = '      {/* Hero Carousel Section */}\n      <section className="pt-20 sm:pt-28"\n       '
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
