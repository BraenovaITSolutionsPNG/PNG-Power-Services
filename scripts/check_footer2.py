p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Check if footer opening tag exists
print("footer opening:", s.count("<footer"))
print("footer closing:", s.count("</footer>"))
# Find footer
idx = s.find("footer")
print(repr(s[idx-20:idx+60]))
