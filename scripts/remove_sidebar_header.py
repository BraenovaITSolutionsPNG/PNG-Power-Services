p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Find the sidebar header block
start = s.find('<div className="flex items-center gap-2">\n          <span className="grid size-4 place-items-center rounded bg-white text-brand-dark font-bold text-[0.65rem]">')
# Find the end - the closing of the header flex container
end_marker = "Sign Out\n          </button>\n"
end = s.find(end_marker, start) + len(end_marker)
# Include the closing </div> and whitespace
old = s[start:end+5]
print(repr(old[-30:]))
# Remove it
s2 = s.replace(old, "", 1)
open(p, 'w', encoding='utf-8').write(s2)
print("removed", len(old), "chars")
