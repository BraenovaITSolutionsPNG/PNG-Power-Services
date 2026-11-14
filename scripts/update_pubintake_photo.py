p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Add photo display in public intake
old = """                              {report.assetDescription && <p className="text-xs text-muted mt-0.5"><strong>Asset Condition:</strong> {report.assetDescription}</p>}"""
new = """                              {report.assetDescription && <p className="text-xs text-muted mt-0.5"><strong>Asset Condition:</strong> {report.assetDescription}</p>}
                              {report.photoUrl && <img src={report.photoUrl} alt="Fault photo" className="mt-2 h-24 w-24 object-cover rounded-lg border border-line" />}"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
