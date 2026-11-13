p = r"D:\BraeNova_Projects\PNG Power Services\src\types.ts"
s = open(p, encoding='utf-8').read()

old = """  polNumber?: string
  accountHolder?: string
  district?: string
  isSafetyHazard?: boolean
  preferredContactTime?: string
}"""
new = """  polNumber?: string
  accountHolder?: string
  district?: string
  isSafetyHazard?: boolean
  preferredContactTime?: string
  assetType?: string
  assetNumber?: string
  assetDescription?: string
}"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
