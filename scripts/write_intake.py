p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find the Live Public Fault Intake section
start = s.find("Live Public Fault Intake Box")
end = s.find("activeSection === 'incidents'", start)
chunk = s[start:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\intake_view.txt", 'w').write(chunk)
print("length:", len(chunk))
