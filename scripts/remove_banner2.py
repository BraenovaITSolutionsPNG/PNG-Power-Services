p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

old = """      {/* Top Banner reminding user this is internal staff mode */}
      <div className="bg-brand-dark px-4 py-2 text-xs text-white flex items-center justify-between z-50 relative">
           </div>
      </div>

"""
assert old in s, "pattern not found"
s = s.replace(old, "", 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
