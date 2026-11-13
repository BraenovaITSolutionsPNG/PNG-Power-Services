p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

old = """    const newReport: PublicReport = {
      caseNumber: newCaseNumber,
      issueType: issueType || 'Power outage',
      province: province || 'National Capital District',
      location,
      description,
      phone: phone || undefined,
      contactPreference,
      status: 'Under review',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedAt: 'Just now',
    }"""
new = """    const newReport: PublicReport = {
      caseNumber: newCaseNumber,
      issueType: issueType || 'Power outage',
      province: province || 'National Capital District',
      location,
      description,
      phone: phone || undefined,
      contactPreference,
      status: 'Under review',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedAt: 'Just now',
      polNumber: polNumber || undefined,
      accountHolder: accountHolder || undefined,
      district: district || undefined,
      isSafetyHazard,
      preferredContactTime,
    }"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Reset new fields on submit
old2 = """    setPhone('')
  }"""
new2 = """    setPhone('')
    setPolNumber('')
    setAccountHolder('')
    setDistrict('')
    setIsSafetyHazard(false)
    setPreferredContactTime('Anytime')
  }"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
