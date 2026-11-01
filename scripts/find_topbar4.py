p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("National Power Grid Status")
# Go back to find a div with "page-wrap" or similar
start = s.rfind("page-wrap", 0, idx)
print(repr(s[start-80:start+50]))
