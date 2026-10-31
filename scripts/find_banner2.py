p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("Top Banner")
end = s.find("Main Sidebar", idx)
print(repr(s[idx-10:end+20]))
