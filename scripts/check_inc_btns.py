p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find the incidents section buttons
idx = s.find('Assign Crew')
# Find the incidents section context
inc_idx = s.find("activeSection === 'incidents' && (")
print(s[inc_idx:inc_idx+200])
