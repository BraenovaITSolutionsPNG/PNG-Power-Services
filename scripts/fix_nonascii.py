p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Replace non-ASCII with safe alternatives
s = s.replace('\u20ac', '')  # euro sign
s = s.replace('\u0153', '')  # oe ligature
s = s.replace('\u201c', '"')  # left double quote
s = s.replace('\u201d', '"')  # right double quote
s = s.replace('\u00e2', '')  # a with circumflex
s = s.replace('\u00a2', '')  # cent sign
s = s.replace('\u00b7', ' - ')  # middle dot
open(p, 'w', encoding='utf-8').write(s)
print("done")
