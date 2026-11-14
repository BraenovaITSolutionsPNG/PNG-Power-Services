p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

old = """                          {foundReport.preferredContactTime && <p className="text-xs text-muted mt-0.5">Preferred contact: {foundReport.preferredContactTime}</p>}
                        </div>"""
new = """                          {foundReport.preferredContactTime && <p className="text-xs text-muted mt-0.5">Preferred contact: {foundReport.preferredContactTime}</p>}
                          {foundReport.photoUrl && <img src={foundReport.photoUrl} alt="Fault photo" className="mt-2 h-20 w-20 object-cover rounded-lg border border-line" />}
                        </div>"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
