p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("  async function handleQuickLogin")
end = s.find("  function handleAddStaff", start)
if start >= 0 and end >= 0:
    old = s[start:end]
    s2 = s.replace(old, "", 1)
    open(p, 'w').write(s2)
    print("removed handleQuickLogin")
else:
    print("not found", start, end)
