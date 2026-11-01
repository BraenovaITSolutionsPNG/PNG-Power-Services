p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = 0
while True:
    pos = s.find("</section>", idx)
    if pos == -1:
        break
    line_num = s[:pos].count('\n') + 1
    print(f"</section> at line {line_num}")
    idx = pos + 1
