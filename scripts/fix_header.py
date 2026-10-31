p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Change sticky top-8 to top-0
old = '<header className="sticky top-8 z-30 flex h-16 items-center border-b border-line bg-white/90 px-5 backdrop-blur-md sm:px-8">'
new = '<header className="sticky top-0 z-30 flex h-16 items-center border-b border-line bg-white/95 px-5 backdrop-blur-md shadow-sm sm:px-8">'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
