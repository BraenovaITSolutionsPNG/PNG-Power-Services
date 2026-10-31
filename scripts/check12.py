p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
idx = s.find("Quick Navigation")
end = s.find("</nav>", idx)
print(s[idx+200:end+6])
