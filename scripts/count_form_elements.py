p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
form_start = s.find("<form onSubmit={handleFormSubmit}")
form_end = s.find("</form>", form_start) + len("</form>")
form = s[form_start:form_end]
print("open divs:", form.count("<div"))
print("close divs:", form.count("</div>"))
print("open selects:", form.count("<select"))
print("close selects:", form.count("</select>"))
print("open inputs:", form.count("<input"))
print("open textareas:", form.count("<textarea"))
print("close textareas:", form.count("</textarea>"))
print("open labels:", form.count("<label"))
print("close labels:", form.count("</label>"))
