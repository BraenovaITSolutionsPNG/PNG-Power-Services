p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Update the public intake report display to show new fields
old = """                              <p className="text-xs text-muted mt-0.5"><strong>Location:</strong> {report.location} ({report.province})</p>
                              <p className="text-xs text-muted mt-0.5">{report.description}</p>
                              {report.phone && <p className="text-xs text-brand font-semibold mt-1">Contact: {report.phone} ({report.contactPreference})</p>}"""
new = """                              <p className="text-xs text-muted mt-0.5"><strong>Location:</strong> {report.location} ({report.province})</p>
                              {report.district && <p className="text-xs text-muted mt-0.5"><strong>District:</strong> {report.district}</p>}
                              <p className="text-xs text-muted mt-0.5">{report.description}</p>
                              {report.polNumber && <p className="text-xs text-muted mt-0.5"><strong>POL/Meter:</strong> {report.polNumber}</p>}
                              {report.accountHolder && <p className="text-xs text-muted mt-0.5"><strong>Account Holder:</strong> {report.accountHolder}</p>}
                              {report.isSafetyHazard && <p className="text-xs text-red-600 font-semibold mt-1">SAFETY HAZARD REPORTED</p>}
                              {report.phone && <p className="text-xs text-brand font-semibold mt-1">Contact: {report.phone} ({report.contactPreference}){report.preferredContactTime ? ` - ${report.preferredContactTime}` : ''}</p>}"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
