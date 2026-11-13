p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Find </form> after the form start
form_start = s.find("<form onSubmit={handleFormSubmit}")
form_end = s.find("</form>", form_start)
print("form_start:", form_start)
print("form_end:", form_end)
print("chars between:", form_end - form_start)
# Show the last 200 chars before </form>
print(repr(s[form_end-200:form_end+10]))
