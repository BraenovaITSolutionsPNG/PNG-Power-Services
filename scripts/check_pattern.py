p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
old = """                      <p className="eyebrow">Public Fault Report</p>
                      <h3 className="mt-1 text-2xl font-extrabold tracking-tight">
                        Tell us about the power fault
                      </h3>"""
print("pattern1 found:", old in s)
