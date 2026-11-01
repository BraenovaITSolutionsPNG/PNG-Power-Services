p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Change header to fixed on mobile
old = '<header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">'
new = '<header className="fixed top-0 left-0 right-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
