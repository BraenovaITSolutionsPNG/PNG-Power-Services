p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("Quick Navigation")
end = s.find("</nav>", idx)
chunk = s[idx:end+6]
# Find the admin section
admin_idx = chunk.find("role === 'admin'")
print(chunk[admin_idx:admin_idx+400])
