p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("{/* Overdue Reviews */}")
end = s.find("{/* ", idx + 10)
chunk = s[idx:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\overdue_section.txt", 'w', encoding='utf-8').write(chunk)
print("length:", len(chunk))
