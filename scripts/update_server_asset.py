p = r"D:\BraeNova_Projects\PNG Power Services\server\index.js"
s = open(p, encoding='utf-8').read()

# Update reportSchema
old = "  preferredContactTime: z.string().max(50).optional(),\n})"
new = """  preferredContactTime: z.string().max(50).optional(),
  assetType: z.string().max(50).optional(),
  assetNumber: z.string().max(50).optional(),
  assetDescription: z.string().max(500).optional(),
})"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Update INSERT query
old2 = """    const { issueType, province, location, description, phone, contactPreference, reporterName, polNumber, accountHolder, district, isSafetyHazard, preferredContactTime } = parsed.data
    const caseNumber = 'PNG-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + new Date().getFullYear().toString().slice(-2)
    const [result] = await pool.query(
      'INSERT INTO reports (case_number, issue_type, province, location, description, reporter_phone, contact_preference, reporter_name, status, pol_number, account_holder, district, is_safety_hazard, preferred_contact_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [caseNumber, issueType, province || null, location, description, phone || null, contactPreference || null, reporterName || null, 'Recorded', polNumber || null, accountHolder || null, district || null, isSafetyHazard || false, preferredContactTime || null]
    )"""
new2 = """    const { issueType, province, location, description, phone, contactPreference, reporterName, polNumber, accountHolder, district, isSafetyHazard, preferredContactTime, assetType, assetNumber, assetDescription } = parsed.data
    const caseNumber = 'PNG-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + new Date().getFullYear().toString().slice(-2)
    const [result] = await pool.query(
      'INSERT INTO reports (case_number, issue_type, province, location, description, reporter_phone, contact_preference, reporter_name, status, pol_number, account_holder, district, is_safety_hazard, preferred_contact_time, asset_type, asset_number, asset_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [caseNumber, issueType, province || null, location, description, phone || null, contactPreference || null, reporterName || null, 'Recorded', polNumber || null, accountHolder || null, district || null, isSafetyHazard || false, preferredContactTime || null, assetType || null, assetNumber || null, assetDescription || null]
    )"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
