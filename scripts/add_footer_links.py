p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Add state for charter and privacy modals (find useState declarations)
old = "  const [mobileOpen, setMobileOpen] = useState(false)"
new = """  const [mobileOpen, setMobileOpen] = useState(false)
  const [showCustomerCharter, setShowCustomerCharter] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Replace the plain spans with clickable buttons
old2 = """                <li><span className="text-white/40">Customer Charter</span></li>
                <li><span className="text-white/40">Privacy Policy</span></li>"""
new2 = """                <li><button onClick={() => setShowCustomerCharter(true)} className="text-white/70 hover:text-white transition text-left">Customer Charter</button></li>
                <li><button onClick={() => setShowPrivacyPolicy(true)} className="text-white/70 hover:text-white transition text-left">Privacy Policy</button></li>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
