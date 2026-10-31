p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
start = s.find("Assign Work Order")
end = s.find("Overdue Reviews", start)
chunk = s[start:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\assign_wo.txt", 'w', encoding='utf-8').write(chunk)
print("length:", len(chunk))
