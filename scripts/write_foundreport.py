p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("foundReport !== undefined && (")
end = s.find(")}", idx+600) + 2
chunk = s[idx:end+100]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\foundreport.txt", 'w', encoding='utf-8').write(chunk)
print("length:", len(chunk))
