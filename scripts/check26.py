p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("{/* Quick Demo Sign-in selector */}")
end = s.find("sign in with email", start)
print("start:", start)
print("end:", end)
old = s[start:end]
print("length to remove:", len(old))
# Show what's around end
print(repr(s[end-20:end+40]))
