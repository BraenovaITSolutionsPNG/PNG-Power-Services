p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
# Check the sidebar
idx = s.find("<aside")
end = s.find("</aside>", idx) + len("</aside>")
print(s[idx:idx+200])
