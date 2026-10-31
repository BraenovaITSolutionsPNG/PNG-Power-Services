p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("showAddStaff && (")
end = s.find(")}\n    </div>", idx) + 3
chunk = s[idx:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\addstaff_full.txt", 'w').write(chunk)
print("length:", len(chunk))
