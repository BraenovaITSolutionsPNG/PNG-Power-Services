p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
start = s.find("Field Actions & Logs")
# Find the next "</div>" after "Ensure site voltage"
end_marker = s.find("Ensure site voltage", start)
end = s.find("</div>", end_marker) + 6
chunk = s[start-100:end]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\expanded2.txt", 'w').write(chunk)
print("length:", len(chunk))
