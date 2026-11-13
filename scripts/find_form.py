p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Find the form
idx = s.find("Report a power issue")
# Find the form element
form_idx = s.find("<form", idx)
print(s[form_idx:form_idx+600])
