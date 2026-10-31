p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Check if modals have max-height for mobile
import re
modals = re.findall(r'fixed inset-0 z-50 flex items-center justify-center bg-black/\d+ px-4', s)
print(f"Found {len(modals)} modals")
# Check for overflow-y-auto in modals
overflow_count = s.count('overflow-y-auto')
print(f"overflow-y-auto count: {overflow_count}")
