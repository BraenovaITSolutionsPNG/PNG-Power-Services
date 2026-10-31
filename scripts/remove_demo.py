p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("{/* Quick Demo Sign-in selector */}")
end = s.find("{/* Or sign in with email */}", start)
# Remove from Quick Demo to the divider (keep the divider)
old = s[start:end]
new = ""
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
