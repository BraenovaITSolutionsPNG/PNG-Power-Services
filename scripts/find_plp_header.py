p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Search for header
idx = s.find("<header")
if idx >= 0:
    end = s.find("</header>", idx) + len("</header>")
    print(s[idx:idx+300])
else:
    print("no header found")
    # search for nav
    idx = s.find("<nav")
    print("nav at:", idx)
    print(s[idx:idx+200] if idx >= 0 else "no nav")
