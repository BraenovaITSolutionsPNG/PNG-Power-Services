p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4")
end = s.find("982 9111", idx) + len("982 9111")
close = s.find("</div>", end) + 6
chunk = s[idx-20:close]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\offices.txt", 'w', encoding='utf-8').write(chunk)
print("length:", len(chunk))
