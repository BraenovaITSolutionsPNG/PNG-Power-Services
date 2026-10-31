p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Replace mojibake em-dash
s = s.replace("â€”", " - ")
open(p, 'w', encoding='utf-8').write(s)
print("done")
