p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("activeSection === 'incidents' && (")
end = s.find("activeSection === 'public-intake' && (", idx)
chunk = s[idx:end]
# Find the buttons div
btn_div = chunk.find('<div className="flex items-center gap-2">')
print(chunk[btn_div:btn_div+400])
