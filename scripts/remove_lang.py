p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Remove language toggle from form header
old = """                      <div className="flex items-center justify-between">
                        <div>
                          <p className="eyebrow">Public Fault Report</p>
                          <h3 className="mt-1 text-2xl font-extrabold tracking-tight">
                            {t('reportTitle')}
                          </h3>
                        </div>
                        <div className="flex gap-1">
                          <button type="button" onClick={() => setLanguage('en')} className={`px-2 py-1 text-xs rounded ${language === 'en' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'}`}>EN</button>
                          <button type="button" onClick={() => setLanguage('tp')} className={`px-2 py-1 text-xs rounded ${language === 'tp' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'}`}>TP</button>
                        </div>
                      </div>"""
new = """                      <p className="eyebrow">Public Fault Report</p>
                      <h3 className="mt-1 text-2xl font-extrabold tracking-tight">
                        Tell us about the power fault
                      </h3>"""
assert old in s, "pattern1 not found"
s = s.replace(old, new, 1)

# Revert t() calls back to English
s = s.replace("{t('issueType')}", "Issue Type *")
s = s.replace("{t('province')}", "Province *")
s = s.replace("{t('location')} *", "Location / Community / Landmark *")
s = s.replace("placeholder={t('locationPlaceholder')}", 'placeholder="e.g. Gerehu Stage 3 near Market, or Cassowary Rd Section 12"')
s = s.replace("{t('description')} *", "Description of Problem *")
s = s.replace("placeholder={t('descriptionPlaceholder')}", 'placeholder="Describe what happened, any sparks, visible damage, or affected area..."')
s = s.replace("{t('phone')}", "Your Mobile Phone (Optional)")
s = s.replace("placeholder={t('phonePlaceholder')}", 'placeholder="e.g. 7123 4567"')
s = s.replace("{t('submit')}", "Submit Fault Report")
s = s.replace("{t('gpsButton')}", "Use My Location")

# Remove language state
old2 = """const [contactPreference, setContactPreference] = useState('SMS update')
  const [language, setLanguage] = useState<'en' | 'tp'>('en')
  const t = (key: string) => (translations as any)[language]?.[key] || (translations as any).en?.[key] || key"""
new2 = "const [contactPreference, setContactPreference] = useState('SMS update')"
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

# Remove translations object
old3 = """const translations = {
  en: { reportTitle: 'Tell us about the power fault', issueType: 'Issue Type *', selectFault: 'Select fault type', province: 'Province *', selectProvince: 'Select province', location: 'Location / Community / Landmark *', locationPlaceholder: 'e.g. Gerehu Stage 3 near Market', description: 'Description of Problem *', descriptionPlaceholder: 'Describe what happened, any sparks, visible damage, or affected area...', phone: 'Your Mobile Phone (Optional)', phonePlaceholder: 'e.g. 7123 4567', submit: 'Submit Report', gpsButton: 'Use My Location' },
  tp: { reportTitle: 'Tok save long faul bilong lait', issueType: 'Kain faul *', selectFault: 'Sailem kain faul', province: 'Provins *', selectProvince: 'Sailem provins', location: 'Ples / Komuniti / Mak *', locationPlaceholder: 'sampela Gerehu Stage 3 klostu maket', description: 'Tok save long faul *', descriptionPlaceholder: 'Tok save long wanem i kamap, spark, bagarap, o eria i karamap...', phone: 'Namba bilong yu (Optional)', phonePlaceholder: 'sampela 7123 4567', submit: 'Salim ripot', gpsButton: 'Yusim ples bilong mi' },
}

"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, "", 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
