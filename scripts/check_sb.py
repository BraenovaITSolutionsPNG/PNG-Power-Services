p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find the sidebar role switcher
start = s.find('          <div className="mt-2 space-y-1">')
end = s.find('          </div>', start) + len('          </div>')
print(s[start:end][:500])
