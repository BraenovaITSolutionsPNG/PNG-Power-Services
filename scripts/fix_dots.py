p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Replace mojibake and middle dot with a safe separator
s = s.replace("Â·", " - ")
s = s.replace("·", " - ")
open(p, 'w', encoding='utf-8').write(s)
print("done")
