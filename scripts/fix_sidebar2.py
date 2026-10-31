p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = '''            <div className="flex items-center gap-3 rounded-xl bg-brand/20 px-3 py-2.5 text-sm font-semibold text-white">
              <Icon name="user" className="size-4" />
              <span className="truncate">{role.replace('_', ' ').replace(/\\b\\w/g, c => c.toUpperCase())}</span>
            </div>'''
new = '''            <div className="flex items-center gap-3 rounded-xl bg-brand/20 px-3 py-2.5 text-sm font-semibold text-white">
              <Icon name="user" className="size-4" />
              <span className="truncate capitalize">{role.replace(/_/g, ' ')}</span>
            </div>'''
# Actually, let's just use a simpler approach
new = '''            <div className="flex items-center gap-3 rounded-xl bg-brand/20 px-3 py-2.5 text-sm font-semibold text-white">
              <Icon name="user" className="size-4" />
              <span className="truncate">{role.replace('_', ' ')}</span>
            </div>'''
assert old in s, "old not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
