p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("function handleFormSubmit")
end = s.find("setSubmittedCase", idx) + 50
print(s[idx:end])
