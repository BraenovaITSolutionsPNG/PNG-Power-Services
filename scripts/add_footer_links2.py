p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

old = "const [mobileMenuOpen, setMobileMenuOpen] = useState(false)"
new = """const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showCustomerCharter, setShowCustomerCharter] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

old2 = '<li><span className="text-white/40">Customer Charter</span></li>'
new2 = '<li><button onClick={() => setShowCustomerCharter(true)} className="text-white/70 hover:text-white transition text-left">Customer Charter</button></li>'
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

old3 = '<li><span className="text-white/40">Privacy Policy</span></li>'
new3 = '<li><button onClick={() => setShowPrivacyPolicy(true)} className="text-white/70 hover:text-white transition text-left">Privacy Policy</button></li>'
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
