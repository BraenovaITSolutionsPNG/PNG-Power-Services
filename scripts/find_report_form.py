p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Find the report form
idx = s.find("report-section")
print(s[idx:idx+200])
