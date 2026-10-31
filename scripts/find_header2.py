p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("PNG Power Internal Systems")
# Go back to find the header element
header_start = s.rfind("<header", 0, idx)
header_end = s.find("</header>", idx) + len("</header>")
print(s[header_start:header_end])
