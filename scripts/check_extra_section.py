p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Find the extra </section> at line 1245
lines = s.split('\n')
# Line 1245 is index 1244
# Remove that specific </section>
old = lines[1244]  # 0-indexed
print(repr(old))
# Replace the last occurrence of </section> before </footer>
idx = s.rfind("</section>")
# Check if the next non-empty line after is </footer> or similar
after = s[idx+len("</section>"):idx+len("</section>")+50]
print(repr(after))
