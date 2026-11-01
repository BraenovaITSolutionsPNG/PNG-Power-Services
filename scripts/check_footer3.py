p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("<footer")
print("footer at:", idx)
# Check what's between offices end and footer
offices_end = s.find("</section>", s.find("Phone: 982 9111"))
print("offices section end at:", offices_end)
print(repr(s[offices_end:offices_end+80]))
