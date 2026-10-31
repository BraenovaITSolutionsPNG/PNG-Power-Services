p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("{/* Quick Demo Sign-in selector */}")
end = s.find("{/* Or sign in with email */}", start)
print("start:", start)
print("end:", end)
print("section length:", end - start)
old = s[start:end]
print(repr(old))
