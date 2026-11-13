p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

old = "const [contactPreference, setContactPreference] = useState('SMS update')"
new = """const [contactPreference, setContactPreference] = useState('SMS update')
  const [polNumber, setPolNumber] = useState('')
  const [accountHolder, setAccountHolder] = useState('')
  const [district, setDistrict] = useState('')
  const [isSafetyHazard, setIsSafetyHazard] = useState(false)
  const [preferredContactTime, setPreferredContactTime] = useState('Anytime')"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
