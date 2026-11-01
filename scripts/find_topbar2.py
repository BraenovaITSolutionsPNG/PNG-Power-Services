p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("hidden sm:flex items-center gap-4 text-xs")
# Go back further to find the parent container
start = s.rfind("<div", 0, idx)
print(repr(s[start:start+120]))
# Find the full top bar
topbar_end = s.find("</div>", idx) + 6
# Go up
print("---")
print(repr(s[start-100:start]))
