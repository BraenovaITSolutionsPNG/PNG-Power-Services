p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("Quick Navigation")
end = s.find("</nav>", idx)
chunk = s[idx:end+6]
admin_idx = chunk.find("role === 'admin'")
# Find the closing of admin section (the </> and ))
close = chunk.find("</>", admin_idx) + 3
print(chunk[admin_idx:close+5])
