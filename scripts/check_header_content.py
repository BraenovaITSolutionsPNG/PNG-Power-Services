p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("<header")
end = s.find("</header>", idx) + len("</header>")
header = s[idx:end]
print("Exit to Public Site" in header)
print("Sign Out" in header)
print("Public Website" in header)
