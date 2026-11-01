p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
old = 'page-wrap relative flex min-h-[34rem] items-center py-14 sm:min-h-[38rem] lg:min-h-[42rem]'
new = 'page-wrap relative flex min-h-[34rem] items-center pt-8 pb-14 sm:min-h-[38rem] lg:min-h-[42rem]'
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
