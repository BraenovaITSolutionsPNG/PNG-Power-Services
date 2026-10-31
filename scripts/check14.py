p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("Quick Navigation")
end = s.find("</nav>", idx)
chunk = s[idx:end+6]
admin_idx = chunk.find("role === 'admin'")
# Find the end of admin section
admin_end = chunk.find(")}", admin_idx + 200) + 2
print(chunk[admin_idx:admin_end+50])
print("---END---")
