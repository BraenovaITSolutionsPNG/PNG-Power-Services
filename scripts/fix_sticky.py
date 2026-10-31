p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Fix sidebar top-8 to top-0
old1 = "        } top-8`}"
new1 = "        } top-0`}"
assert old1 in s, "pattern1 not found"
s = s.replace(old1, new1, 1)

# Fix main content pt-8 to pt-0 (or remove)
old2 = '<div className="lg:pl-72 pt-8">'
new2 = '<div className="lg:pl-72">'
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
