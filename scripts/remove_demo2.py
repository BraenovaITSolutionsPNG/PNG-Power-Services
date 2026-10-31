p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("{/* Quick Demo Sign-in selector */}")
end = s.find("{/* Or sign in with email */}", start)
old = s[start:end]
# Replace with empty string
s2 = s.replace(old, "", 1)
open(p, 'w').write(s2)
# Verify
new_s = open(p).read()
print("old length:", len(s))
print("new length:", len(new_s))
print("diff:", len(s) - len(new_s))
