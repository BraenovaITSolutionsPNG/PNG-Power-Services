p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Find main content views (between <main and </main>)
start = s.find("<main")
end = s.find("</main>")
main = s[start:end]
for role in ['operations','field','admin','staff','regional_coordinator','regional_manager','hq_admin','system_admin']:
    count = main.count("role === '" + role + " && (")
    print(f"{role}: {count} view(s) in main content")
