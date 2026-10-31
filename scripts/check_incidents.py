p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("activeSection === 'incidents' && (")
end = s.find("activeSection === 'public-intake' && (", start)
chunk = s[start:end]
print(chunk[:1500])
