p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Find the Call Centre create report form onSubmit
idx = s.find("Create Report for Caller")
print(s[idx-200:idx+100])
