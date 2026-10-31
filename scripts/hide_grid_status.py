p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
old = '<div className="flex items-center gap-2">\n            <span className="flex size-2 rounded-full bg-success animate-pulse" />\n            <span className="font-semibold text-white">National Power Grid Status:</span>'
new = '<div className="hidden sm:flex items-center gap-2">\n            <span className="flex size-2 rounded-full bg-success animate-pulse" />\n            <span className="font-semibold text-white">National Power Grid Status:</span>'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
