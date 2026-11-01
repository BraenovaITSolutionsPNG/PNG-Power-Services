p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find('min-h-screen bg-canvas')
end = s.find('<header', idx)
print(repr(s[idx:end]))
