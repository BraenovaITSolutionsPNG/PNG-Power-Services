p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("Quick Navigation")
end = s.find("</nav>", idx)
chunk = s[idx:end+6]
admin_idx = chunk.find("role === 'admin'")
close = chunk.find("</>", admin_idx) + 3
# Get the exact text from admin section start to close
admin_section = chunk[admin_idx:close+10]
print(repr(admin_section))
