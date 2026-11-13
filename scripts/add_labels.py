p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Update Issue Type label
old = """                        Issue Type *
                      </label>"""
new = """                        {t('issueType')}
                      </label>"""
assert old in s, "pattern1 not found"
s = s.replace(old, new, 1)

# Update Province label
old2 = """                        Province *
                      </label>"""
new2 = """                        {t('province')}
                      </label>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

# Update Location label
old3 = """                        Location / Community / Landmark *
                      </label>"""
new3 = """                        {t('location')} *
                      </label>"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

# Update Location placeholder
old4 = 'placeholder="e.g. Gerehu Stage 3 near Market, or Cassowary Rd Section 12"'
new4 = 'placeholder={t(\'locationPlaceholder\')}'
assert old4 in s, "pattern4 not found"
s = s.replace(old4, new4, 1)

# Update Description label
old5 = """                        Description of Problem *
                      </label>"""
new5 = """                        {t('description')} *
                      </label>"""
assert old5 in s, "pattern5 not found"
s = s.replace(old5, new5, 1)

# Update Description placeholder
old6 = 'placeholder="Describe what happened, any sparks, visible damage, or affected area..."'
new6 = 'placeholder={t(\'descriptionPlaceholder\')}'
assert old6 in s, "pattern6 not found"
s = s.replace(old6, new6, 1)

# Update Phone label
old7 = """                        Your Mobile Phone (Optional)
                      </label>"""
new7 = """                        {t('phone')}
                      </label>"""
assert old7 in s, "pattern7 not found"
s = s.replace(old7, new7, 1)

# Update Phone placeholder
old8 = 'placeholder="e.g. 7123 4567"'
new8 = 'placeholder={t(\'phonePlaceholder\')}'
assert old8 in s, "pattern8 not found"
s = s.replace(old8, new8, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
