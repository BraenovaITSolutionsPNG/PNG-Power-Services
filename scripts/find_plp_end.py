p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Find the end of the component
idx = s.rfind("export function PublicLandingPage")
# Find the last return statement's closing
last_brace = s.rfind("}")
print(repr(s[last_brace-20:last_brace+5]))
