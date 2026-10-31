p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
end = s.find("</main>")
# Show last 80 chars before </main>
print(repr(s[end-80:end+10]))
