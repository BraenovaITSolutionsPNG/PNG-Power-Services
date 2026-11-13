p = r"D:\BraeNova_Projects\PNG Power Services\server\index.js"
s = open(p, encoding='utf-8').read()

old = "  reporterName: z.string().max(100).optional(),\n})"
new = """  reporterName: z.string().max(100).optional(),
  polNumber: z.string().max(50).optional(),
  accountHolder: z.string().max(100).optional(),
  district: z.string().max(100).optional(),
  isSafetyHazard: z.boolean().optional(),
  preferredContactTime: z.string().max(50).optional(),
})"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Update the INSERT query
old2 = """    const { issueType, province, location, description, phone, contactPreference, reporterName } = parsed.data
    const caseNumber = 'PNG-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + new Date().getFullYear().toString().slice(-2)
    const [result] = await pool.query(
      'INSERT INTO reports (case_number, issue_type, province, location, description, reporter_phone, contact_preference, reporter_name, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [caseNumber, issueType, province || null, location, description, phone || null, contactPreference || null, reporterName || null, 'Recorded']
    )"""
new2 = """    const { issueType, province, location, description, phone, contactPreference, reporterName, polNumber, accountHolder, district, isSafetyHazard, preferredContactTime } = parsed.data
    const caseNumber = 'PNG-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + new Date().getFullYear().toString().slice(-2)
    const [result] = await pool.query(
      'INSERT INTO reports (case_number, issue_type, province, location, description, reporter_phone, contact_preference, reporter_name, status, pol_number, account_holder, district, is_safety_hazard, preferred_contact_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [caseNumber, issueType, province || null, location, description, phone || null, contactPreference || null, reporterName || null, 'Recorded', polNumber || null, accountHolder || null, district || null, isSafetyHazard || false, preferredContactTime || null]
    )"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
