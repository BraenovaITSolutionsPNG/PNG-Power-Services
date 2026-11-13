p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
form_start = s.find("<form onSubmit={handleFormSubmit}")
form_end = s.find("</form>", form_start) + len("</form>")
form = s[form_start:form_end]
import re
for m in re.finditer(r'</textarea>', form):
    print(f"Found </textarea> at position {m.start()}")
print("Total </textarea> in form:", form.count("</textarea>"))
