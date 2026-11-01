p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("HAZARD ALERT")
start = s.rfind("<div", 0, idx)
# Find the closing of this container
end = s.find("</div>", idx) + len("</div>")
print(repr(s[start-60:start]))
print("---")
print(repr(s[start:end+10]))
