p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Remove the extra </section> that's right before </footer>
old = "</section>\n\n      </footer>"
new = "</footer>"
# Only replace the last occurrence
idx = s.rfind(old)
assert idx >= 0, "pattern not found"
s = s[:idx] + new + s[idx+len(old):]
open(p, 'w', encoding='utf-8').write(s)
print("done")
