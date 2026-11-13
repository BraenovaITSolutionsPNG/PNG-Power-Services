p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
form_start = s.find("<form onSubmit={handleFormSubmit}")
form_end = s.find("</form>", form_start) + len("</form>")
form = s[form_start:form_end]
asset_idx = form.find("{assetType && (")
# Find the closing of this block
frag_end = form.find("</>", asset_idx)
cond_end = form.find(")}", frag_end)
block = form[asset_idx:cond_end+2]
print(block)
