p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
form_start = s.find("<form onSubmit={handleFormSubmit}")
form_end = s.find("</form>", form_start) + len("</form>")
form = s[form_start:form_end]
# Find all div tags with their positions
import re
for m in re.finditer(r'</?div[^>]*>', form):
    print(f"{m.start():6d}: {m.group()[:60]}")
