p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("<header")
end = s.find("</header>", idx) + len("</header>")
print(repr(s[end:end+60]))
