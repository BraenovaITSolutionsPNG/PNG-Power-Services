p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
form_idx = s.find("<form onSubmit={handleFormSubmit}")
print(s[form_idx+4800:form_idx+6000])
