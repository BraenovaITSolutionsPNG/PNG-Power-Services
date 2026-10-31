p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Change main content to have top padding for fixed header
old = '<div className="lg:pl-72">'
new = '<div className="lg:pl-72 pt-16">'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Change header to fixed positioning
old2 = '<header className="sticky top-0 z-30 flex h-16 items-center border-b border-line bg-white/95 px-5 backdrop-blur-md shadow-sm sm:px-8">'
new2 = '<header className="fixed top-0 right-0 left-0 lg:left-72 z-30 flex h-16 items-center border-b border-line bg-white/95 px-5 backdrop-blur-md shadow-sm sm:px-8">'
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
