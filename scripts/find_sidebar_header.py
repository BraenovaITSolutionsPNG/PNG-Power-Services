p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("PNG POWER INTERNAL WORKSPACE")
start = s.rfind("<div", 0, idx-50)
# Find the end - look for the closing of this header block
end_marker = "Sign Out"
end = s.find(end_marker, idx) + len(end_marker)
# Find the closing tags after Sign Out
close = s.find("</button>", end) + len("</button>")
print(repr(s[start:close+10]))
