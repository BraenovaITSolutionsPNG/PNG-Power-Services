p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("<header")
# Go back to find the top bar
top_bar = s.rfind("<div", 0, idx)
print(repr(s[top_bar:top_bar+120]))
