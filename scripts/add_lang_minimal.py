p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Add language state
old = "const [contactPreference, setContactPreference] = useState('SMS update')"
new = """const [contactPreference, setContactPreference] = useState('SMS update')
  const [language, setLanguage] = useState<'en' | 'tp'>('en')"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Add t() helper
old2 = "const [language, setLanguage] = useState<'en' | 'tp'>('en')"
new2 = """const [language, setLanguage] = useState<'en' | 'tp'>('en')
  const t = (key: string) => (translations as any)[language]?.[key] || (translations as any).en?.[key] || key"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

# Add translations before component
old3 = "export function PublicLandingPage({"
new3 = """const translations = {
  en: { reportTitle: 'Tell us about the power fault', issueType: 'Issue Type *', selectFault: 'Select fault type', province: 'Province *', selectProvince: 'Select province', location: 'Location / Community / Landmark *', locationPlaceholder: 'e.g. Gerehu Stage 3 near Market', description: 'Description of Problem *', descriptionPlaceholder: 'Describe what happened...', phone: 'Your Mobile Phone (Optional)', phonePlaceholder: 'e.g. 7123 4567', submit: 'Submit Report', gpsButton: 'Use My Location' },
  tp: { reportTitle: 'Tok save long faul bilong lait', issueType: 'Kain faul *', selectFault: 'Sailem kain faul', province: 'Provins *', selectProvince: 'Sailem provins', location: 'Ples / Komuniti / Mak *', locationPlaceholder: 'sampela Gerehu Stage 3 klostu maket', description: 'Tok save long faul *', descriptionPlaceholder: 'Tok save long wanem i kamap...', phone: 'Namba bilong yu (Optional)', phonePlaceholder: 'sampela 7123 4567', submit: 'Salim ripot', gpsButton: 'Yusim ples bilong mi' },
}

export function PublicLandingPage({"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
