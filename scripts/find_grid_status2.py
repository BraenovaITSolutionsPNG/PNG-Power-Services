p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("National Power Grid Status")
# Go back to find the container
start = s.rfind("<div", 0, idx)
# Find the end of this container
end = s.find("</div>", idx) + len("</div>")
print(repr(s[start:end+5]))
