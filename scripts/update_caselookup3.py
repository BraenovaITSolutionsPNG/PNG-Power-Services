p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Replace the replacement char in the case lookup
s = s.replace("foundReport.location} \ufffd {foundReport.province}", "foundReport.location} - {foundReport.province}")

# Add new fields to case lookup display
old = """                          <p className="text-sm font-bold text-ink">{foundReport.issueType}</p>
                          <p className="text-xs text-muted mt-0.5">{foundReport.location} - {foundReport.province}</p>
                        </div>"""
new = """                          <p className="text-sm font-bold text-ink">{foundReport.issueType}</p>
                          <p className="text-xs text-muted mt-0.5">{foundReport.location} - {foundReport.province}</p>
                          {foundReport.district && <p className="text-xs text-muted mt-0.5">District: {foundReport.district}</p>}
                          {foundReport.polNumber && <p className="text-xs text-muted mt-0.5">POL/Meter: {foundReport.polNumber}</p>}
                          {foundReport.accountHolder && <p className="text-xs text-muted mt-0.5">Account: {foundReport.accountHolder}</p>}
                          {foundReport.assetType && <p className="text-xs text-muted mt-0.5">Asset: {foundReport.assetType}{foundReport.assetNumber ? ' #' + foundReport.assetNumber : ''}</p>}
                          {foundReport.isSafetyHazard && <p className="text-xs text-red-600 font-semibold mt-0.5">SAFETY HAZARD</p>}
                          {foundReport.preferredContactTime && <p className="text-xs text-muted mt-0.5">Preferred contact: {foundReport.preferredContactTime}</p>}
                        </div>"""
assert old in s, "pattern2 not found"
s = s.replace(old, new, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
