p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
s = s.replace('name="settings"', 'name="info"')
open(p, 'w').write(s)
print('done')
