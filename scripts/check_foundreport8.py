p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("foundReport !== undefined && (")
end = s.find(")}", idx+600) + 2
print(s[idx:idx+700])
