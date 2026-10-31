p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find('main className')
end = s.find('/main>', start)
print("main start:", start)
print("main end:", end)
main = s[start:end]
for role in ['operations','field','admin','staff','regional_coordinator','regional_manager','hq_admin','system_admin']:
    count = main.count("role === '" + role + " && (")
    print(f"{role}: {count} view(s) in main content")
