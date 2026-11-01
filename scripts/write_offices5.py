p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("Port Moresby (HQ)")
start = s.rfind("grid gap-6", 0, idx)
print("grid at:", start)
print(repr(s[start-20:start+10]))
end = s.find("Phone: 982 9111", start)
print("end at:", end)
close = s.find("</section>", end)
print("close at:", close)
chunk = s[start:close]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\offices.txt", 'w', encoding='utf-8').write(chunk)
print("length:", len(chunk))
