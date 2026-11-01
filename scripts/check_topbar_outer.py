p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find('bg-sidebar px-4 py-2 text-xs text-white/80')
# Go back to find the outermost container of the top bar
start = s.rfind("<div", 0, idx - 50)
print(repr(s[start:start+120]))
