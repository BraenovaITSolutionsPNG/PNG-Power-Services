p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Check the triage queue buttons
idx = s.find("Link to Incident")
print(repr(s[idx-80:idx+120]))
