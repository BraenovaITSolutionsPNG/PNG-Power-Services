p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Add max-height and overflow to modal cards
# Pattern 1: bg-white modal cards
s = s.replace('rounded-2xl bg-white border border-gray-200 shadow-2xl p-6', 'rounded-2xl bg-white border border-gray-200 shadow-2xl p-6 max-h-[90vh] overflow-y-auto')
# Pattern 2: bg-surface modal cards (note modal)
s = s.replace('rounded-2xl bg-surface border border-line shadow-2xl p-6', 'rounded-2xl bg-surface border border-line shadow-2xl p-6 max-h-[90vh] overflow-y-auto')

open(p, 'w', encoding='utf-8').write(s)
print("done")
