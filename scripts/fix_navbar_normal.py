p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Remove sticky/fixed - make it normal flow
old = '<header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">'
new = '<header className="relative z-30 border-b border-line bg-white/95 backdrop-blur-md">'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
