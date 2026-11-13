p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
form_start = s.find("<form onSubmit={handleFormSubmit}")
form_end = s.find("</form>", form_start) + len("</form>")
form = s[form_start:form_end]
# Find textarea openings
import re
for m in re.finditer(r'<textarea', form):
    pos = m.start()
    print(f"textarea at {pos}: {repr(form[pos:pos+120])}")
    print()
