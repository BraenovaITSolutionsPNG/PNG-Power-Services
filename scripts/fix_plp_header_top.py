p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Fix header positioning: top-0 on mobile, top-8 on desktop (below top bar)
old = '<header className="fixed top-0 left-0 right-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">'
new = '<header className="fixed top-0 sm:top-8 left-0 right-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Adjust hero padding: 20 on mobile (header only), 28 on desktop (top bar + header)
# Already pt-20 sm:pt-28, which is correct

open(p, 'w', encoding='utf-8').write(s)
print("done")
