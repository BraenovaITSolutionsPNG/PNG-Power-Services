p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("selectedJob === job.id && (")
end = s.find(")}", start)
print("length:", end - start)
chunk = s[start:end]
# Print last 500 chars
print(chunk[-500:])
