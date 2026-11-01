p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Check for mobileOpen state
old = "const [mobileOpen, setMobileOpen] = useState(false)"
print("mobileOpen found:", old in s)

# Find the exact Customer Charter text
old2 = '<li><span className="text-white/40">Customer Charter</span></li>'
print("old2 found:", old2 in s)
old3 = '<li><span className="text-white/40">Privacy Policy</span></li>'
print("old3 found:", old3 in s)
