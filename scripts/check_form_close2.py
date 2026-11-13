p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
form_start = s.find("<form onSubmit={handleFormSubmit}")
form_end = s.find("</form>", form_start)
print("form_start line:", s[:form_start].count('\n')+1)
print("form_end line:", s[:form_end].count('\n')+1)
# Check what's between form_end and the next </div>
print(repr(s[form_end:form_end+30]))
