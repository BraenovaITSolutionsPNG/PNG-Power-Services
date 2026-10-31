p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find the incidents section
idx = s.find("activeSection === 'incidents' && (")
end = s.find("activeSection === 'public-intake' && (", idx)
chunk = s[idx:end]
# Find the button container
btn_idx = chunk.find('flex items-center gap-2')
print(chunk[btn_idx-50:btn_idx+200])
