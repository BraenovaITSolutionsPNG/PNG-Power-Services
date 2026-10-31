p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("showAddStaff && (")
end = s.find(")}", idx) + 2
chunk = s[idx:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\addstaff_modal.txt", 'w').write(chunk)
print("length:", len(chunk))
