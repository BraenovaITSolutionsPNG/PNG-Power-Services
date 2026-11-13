p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Add POL number and account holder fields to Call Centre create report form
# Find the Location field in CC form
old = """                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">Location</label>
                      <input
                        value={ccLocation}
                        onChange={(e) => setCcLocation(e.target.value)}
                        placeholder="Specific location / address"
                        className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        required
                      />
                    </div>"""
new = """                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">POL / Meter Number (Optional)</label>
                      <input
                        value={ccPolNumber || ''}
                        onChange={(e) => setCcPolNumber(e.target.value)}
                        placeholder="e.g. 1234567890"
                        className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">Account Holder (Optional)</label>
                      <input
                        value={ccAccountHolder || ''}
                        onChange={(e) => setCcAccountHolder(e.target.value)}
                        placeholder="Name on account"
                        className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">Location</label>
                      <input
                        value={ccLocation}
                        onChange={(e) => setCcLocation(e.target.value)}
                        placeholder="Specific location / address"
                        className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        required
                      />
                    </div>"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Add state variables for ccPolNumber and ccAccountHolder
old2 = "  const [ccLocation, setCcLocation] = useState('')"
new2 = """  const [ccLocation, setCcLocation] = useState('')
  const [ccPolNumber, setCcPolNumber] = useState('')
  const [ccAccountHolder, setCcAccountHolder] = useState('')"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

# Reset new fields on submit
old3 = """                      setCcLocation('')
                      setCcDescription('')"""
new3 = """                      setCcLocation('')
                      setCcDescription('')
                      setCcPolNumber('')
                      setCcAccountHolder('')"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
