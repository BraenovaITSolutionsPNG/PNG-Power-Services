p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4")
# Find the closing of this grid
end_marker = "Phone: 982 9111"
end = s.find(end_marker, idx) + len(end_marker)
# Find next </div> after that
close = s.find("</div>", end) + 6
chunk = s[idx-20:close]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\offices.txt", 'w', encoding='utf-8').write(chunk)
print("length:", len(chunk))
print(chunk[:100])
print("...")
print(chunk[-100:])
