p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
lines = s.split('\n')
# Find the next </section> after 551
for i in range(551, len(lines)):
    if '</section>' in lines[i]:
        print(f"</section> at line {i+1}: {lines[i]}")
        break
