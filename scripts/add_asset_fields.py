p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Add asset fields after the issue type select, before province
old = """                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Province *
                      </label>"""
new = """                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Affected Infrastructure (Optional)
                      </label>
                      <select
                        className="control"
                        value={assetType}
                        onChange={(e) => setAssetType(e.target.value)}
                      >
                        <option value="">Select if known</option>
                        <option>Power Pole</option>
                        <option>Transformer</option>
                        <option>Service Wire / Line</option>
                        <option>Streetlight</option>
                        <option>Switchgear / Fuse</option>
                        <option>Meter Box</option>
                        <option>Other Asset</option>
                      </select>
                    </div>

                    {assetType && (
                      <>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            {assetType} Number / ID
                          </label>
                          <input
                            className="control"
                            placeholder={`e.g. Pole #1234, Transformer T-567`}
                            value={assetNumber}
                            onChange={(e) => setAssetNumber(e.target.value)}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Asset Description (Condition, Damage, etc.)
                          </label>
                          <textarea
                            className="control min-h-16 resize-y"
                            placeholder="Describe the condition of the asset, visible damage, sparks, etc."
                            value={assetDescription}
                            onChange={(e) => setAssetDescription(e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Province *
                      </label>"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Update handleFormSubmit to include asset fields
old2 = """      location,
      description,
      phone: phone || undefined,
      contactPreference,
      status: 'Under review',"""
new2 = """      location,
      description,
      phone: phone || undefined,
      contactPreference,
      status: 'Under review',
      assetType: assetType || undefined,
      assetNumber: assetNumber || undefined,
      assetDescription: assetDescription || undefined,"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

# Reset asset fields on submit
old3 = """    setPreferredContactTime('Anytime')
  }"""
new3 = """    setPreferredContactTime('Anytime')
    setAssetType('')
    setAssetNumber('')
    setAssetDescription('')
  }"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
