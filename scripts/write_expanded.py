p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("selectedJob === job.id && (")
end = s.find(")}", start)
chunk = s[start:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\expanded.txt", 'w').write(chunk)
print("written", len(chunk))
