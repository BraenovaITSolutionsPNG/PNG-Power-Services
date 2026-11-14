p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# First, do the label replacements
replacements = [
    ("{t('issueType')}", "Issue Type *"),
    ("{t('province')}", "Province *"),
    ("{t('location')} *", "Location / Community / Landmark *"),
    ("placeholder={t('locationPlaceholder')}", 'placeholder="e.g. Gerehu Stage 3 near Market, or Cassowary Rd Section 12"'),
    ("{t('description')} *", "Description of Problem *"),
    ("placeholder={t('descriptionPlaceholder')}", 'placeholder="Describe what happened, any sparks, visible damage, or affected area..."'),
    ("{t('phone')}", "Your Mobile Phone (Optional)"),
    ("placeholder={t('phonePlaceholder')}", 'placeholder="e.g. 7123 4567"'),
    ("{t('submit')}", "Submit Fault Report"),
    ("{t('gpsButton')}", "Use My Location"),
    ("{t('reportTitle')}", "Tell us about the power fault"),
]

for old, new in replacements:
    if old in s:
        s = s.replace(old, new, 1)
        print(f"Replaced: {old[:30]}")
    else:
        print(f"NOT FOUND: {old[:30]}")

# Remove language toggle from form header
old_toggle = """                      <div className="flex items-center justify-between">
                        <div>
                          <p className="eyebrow">Public Fault Report</p>
                          <h3 className="mt-1 text-2xl font-extrabold tracking-tight">
                            Tell us about the power fault
                          </h3>
                        </div>
                        <div className="flex gap-1">
                          <button type="button" onClick={() => setLanguage('en')} className={`px-2 py-1 text-xs rounded ${language === 'en' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'}`}>EN</button>
                          <button type="button" onClick={() => setLanguage('tp')} className={`px-2 py-1 text-xs rounded ${language === 'tp' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'}`}>TP</button>
                        </div>
                      </div>"""
new_toggle = """                      <p className="eyebrow">Public Fault Report</p>
                      <h3 className="mt-1 text-2xl font-extrabold tracking-tight">
                        Tell us about the power fault
                      </h3>"""
assert old_toggle in s, "toggle not found"
s = s.replace(old_toggle, new_toggle, 1)

# Remove language state
old_state = """  const [contactPreference, setContactPreference] = useState('SMS update')
  const [language, setLanguage] = useState<'en' | 'tp'>('en')
  const t = (key: string) => (translations as any)[language]?.[key] || (translations as any).en?.[key] || key"""
new_state = "  const [contactPreference, setContactPreference] = useState('SMS update')"
assert old_state in s, "state not found"
s = s.replace(old_state, new_state, 1)

# Remove translations object (everything from "const translations = {" to "export function")
import re
start = s.find("const translations = {")
end = s.find("export function PublicLandingPage")
assert start >= 0 and end >= 0, "translations not found"
s = s[:start] + s[end:]

open(p, 'w', encoding='utf-8').write(s)
print("done")
