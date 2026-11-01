p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find('bg-sidebar px-4 py-2 text-xs text-white/80')
print(repr(s[idx-40:idx+60]))
