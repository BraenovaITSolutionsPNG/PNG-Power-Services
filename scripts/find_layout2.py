p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Find the dashboard layout (after isAuthenticated)
idx = s.find("return (", s.find("isAuthenticated"))
print(s[idx:idx+400])
