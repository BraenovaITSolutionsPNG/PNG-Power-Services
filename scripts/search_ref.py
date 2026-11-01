p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Search for case number or reference number
for term in ["caseNumber", "reference", "case_number", "case number"]:
    idx = s.find(term)
    if idx >= 0:
        print(f"'{term}' found at {idx}")
