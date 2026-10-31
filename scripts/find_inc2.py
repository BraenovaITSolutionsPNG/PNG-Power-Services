p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("incidentsList.map((incident)")
# Get the full block
end = s.find("))}", idx) + 3
chunk = s[idx-30:end+10]
print(repr(chunk))
