p = r"D:\BraeNova_Projects\PNG Power Services\src\types.ts"
s = open(p, encoding='utf-8').read()
old = """export interface PublicReport {
  caseNumber: string
  issueType: string
  province: string
  location: string
  description: string
  phone?: string
  contactPreference: string
  status: 'Under review' | 'Crew assigned' | 'In progress' | 'Resolved'
  createdAt: string
  updatedAt: string
}"""
new = """export interface PublicReport {
  caseNumber: string
  issueType: string
  province: string
  location: string
  description: string
  phone?: string
  contactPreference: string
  status: 'Under review' | 'Crew assigned' | 'In progress' | 'Resolved'
  createdAt: string
  updatedAt: string
  polNumber?: string
  accountHolder?: string
  district?: string
  isSafetyHazard?: boolean
  preferredContactTime?: string
}"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
