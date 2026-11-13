p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

old = """                              {report.polNumber && <p className="text-xs text-muted mt-0.5"><strong>POL/Meter:</strong> {report.polNumber}</p>}
                              {report.accountHolder && <p className="text-xs text-muted mt-0.5"><strong>Account Holder:</strong> {report.accountHolder}</p>}"""
new = """                              {report.polNumber && <p className="text-xs text-muted mt-0.5"><strong>POL/Meter:</strong> {report.polNumber}</p>}
                              {report.accountHolder && <p className="text-xs text-muted mt-0.5"><strong>Account Holder:</strong> {report.accountHolder}</p>}
                              {report.assetType && <p className="text-xs text-muted mt-0.5"><strong>Asset:</strong> {report.assetType}{report.assetNumber ? ` #${report.assetNumber}` : ''}</p>}
                              {report.assetDescription && <p className="text-xs text-muted mt-0.5"><strong>Asset Condition:</strong> {report.assetDescription}</p>}"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
