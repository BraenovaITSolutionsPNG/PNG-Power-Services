p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Add setMobileOpen(false) to Quick Navigation buttons
# Find the pattern: onClick={() => setActiveSection(
old = "onClick={() => setActiveSection("
new = "onClick={() => { setActiveSection("
count = s.count(old)
print(f"Found {count} occurrences")
# We need to be careful - only replace in Quick Navigation (inside nav element)
# Actually, let's just add mobileOpen close to all setActiveSection calls in the sidebar
# The sidebar nav buttons are inside <nav className="mt-3 space-y-1">
nav_start = s.find('<nav className="mt-3 space-y-1">')
nav_end = s.find('</nav>', nav_start)
nav_section = s[nav_start:nav_end]
# Count setActiveSection in nav
nav_count = nav_section.count("onClick={() => setActiveSection(")
print(f"Nav section has {nav_count} setActiveSection calls")
