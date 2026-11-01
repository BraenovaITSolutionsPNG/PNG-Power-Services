p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("onSubmit={(e) => {")
end = s.find("className=\"space-y-4\"", idx)
print(s[idx:end+30])
