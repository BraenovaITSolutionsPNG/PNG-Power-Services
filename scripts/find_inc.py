p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("incidentsList.map((incident)")
print(repr(s[idx-50:idx+100]))
