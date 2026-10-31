p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find the Quick Demo Sign-in section
start = s.find("{/* Quick Demo Sign-in selector */}")
end = s.find("{/* Or sign in with email */}", start)
# Remove everything from Quick Demo to the "Or sign in" divider
old = s[start:end]
print(repr(old[:200]))
