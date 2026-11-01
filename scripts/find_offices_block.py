p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Find the SECOND occurrence of the grid (the offices section)
first = s.find("mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4")
second = s.find("mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", first + 1)
print("first:", first, "second:", second)

# The offices section starts at the second occurrence
start = second
# Find the offices content (ends at "Phone: 982 9111")
end = s.find("Phone: 982 9111", start) + len("Phone: 982 9111")
# Find the closing </div> after that
close = s.find("</div>", end) + 6
# But we want to replace the entire grid container, so find the opening <div
grid_open = s.rfind('<div', 0, start+5)
# Actually, start already points to "mt-10..." which is inside the className
# Let's find the <div that contains this className
div_start = s.rfind('<div', 0, start)
print("div_start:", div_start, repr(s[div_start:div_start+60]))

old_block = s[div_start:close]
open(r"D:\BraeNova_Projects\PNG Power Services\scripts\offices_block.txt", 'w', encoding='utf-8').write(old_block)
print("old_block length:", len(old_block))
