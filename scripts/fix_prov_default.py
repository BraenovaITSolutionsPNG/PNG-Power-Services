p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
s = s.replace("const [ccProvince, setCcProvince] = useState('NCD')", "const [ccProvince, setCcProvince] = useState('National Capital District (NCD)')")
open(p, 'w').write(s)
print("done")
