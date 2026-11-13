p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
form_start = s.find("<form onSubmit={handleFormSubmit}")
form_end = s.find("</form>", form_start) + len("</form>")
form = s[form_start:form_end]
# Find the asset block
asset_idx = form.find("{assetType && (")
print("asset block starts at:", asset_idx)
# Show the block
block = form[asset_idx:asset_idx+700]
print(block)
