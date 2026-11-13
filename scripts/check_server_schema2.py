p = r"D:\BraeNova_Projects\PNG Power Services\server\index.js"
s = open(p, encoding='utf-8').read()
idx = s.find("const reportSchema")
end = s.find("})", idx) + 2
print(repr(s[idx:end]))
