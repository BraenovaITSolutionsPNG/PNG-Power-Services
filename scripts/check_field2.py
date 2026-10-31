p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find field view in main content
import re
matches = [(m.start(), m.group()) for m in re.finditer(r"role === 'field' &&", s)]
print("occurrences:", len(matches))
for start, m in matches:
    end = s.find("role === 'admin' &&", start)
    if end == -1:
        end = s.find("role === 'staff' &&", start)
    print(f"\n--- Field view at {start} ---")
    print(s[start:start+200])
    print("...")
    print(s[end-100:end])
