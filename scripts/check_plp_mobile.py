p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Check for responsive classes
import re
responsive = len(re.findall(r'\bsm:|\bmd:|\blg:|\bxl:', s))
print(f"Responsive classes found: {responsive}")
# Check for viewport-dependent widths
print("has max-w-7xl:", "max-w-7xl" in s)
print("has px-4:", "px-4" in s)
print("has py-:", "py-" in s)
