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

# Update description label
old3 = """                        Description of Problem *
                      </label>"""
new3 = """                        {t('description')} *
                      </label>"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

# Update description placeholder
old4 = 'placeholder="Describe what happened, any sparks, visible damage, or affected area..."'
new4 = 'placeholder={t(\'descriptionPlaceholder\')}'
assert old4 in s, "pattern4 not found"
s = s.replace(old4, new4, 1)

# Update phone label
old5 = """                        Your Mobile Phone (Optional)
                      </label>"""
new5 = """                        {t('phone')}
                      </label>"""
assert old5 in s, "pattern5 not found"
s = s.replace(old5, new5, 1)

# Update phone placeholder
old6 = 'placeholder="e.g. 7123 4567"'
new6 = 'placeholder={t(\'phonePlaceholder\')}'
assert old6 in s, "pattern6 not found"
s = s.replace(old6, new6, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
