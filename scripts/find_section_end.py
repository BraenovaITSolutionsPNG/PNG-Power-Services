p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Find the end of the offices scroll container (the last </div> before footer)
idx = s.find("</footer>")
# Go back to find the last </div> before footer
last_div = s.rfind("</div>", 0, idx)
print(repr(s[last_div-20:last_div+20]))
