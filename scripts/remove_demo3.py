p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("{/* Quick Demo Sign-in selector */}")
# Find the divider div
divider = s.find('<div className="my-5 flex', start)
print("divider at:", divider)
# Remove from start to divider
old = s[start:divider]
s2 = s.replace(old, "", 1)
open(p, 'w').write(s2)
print("removed", len(old), "chars")
