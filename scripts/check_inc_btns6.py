p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("activeSection === 'incidents' && (")
end = s.find("activeSection === 'public-intake' && (", idx)
chunk = s[idx:end]
# Find the buttons area
btn_start = chunk.find('Assign Crew</button>')
print(chunk[btn_start-200:btn_start+300])
