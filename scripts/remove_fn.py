p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find the handleQuickLogin function
start = s.find("  async function handleQuickLogin")
end = s.find("  function handleAddStaff", start)
old = s[start:end]
s = s.replace(old, "", 1)
open(p, 'w').write(s)
print("done")
