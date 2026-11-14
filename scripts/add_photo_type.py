p = r"D:\BraeNova_Projects\PNG Power Services\src\types.ts"
s = open(p, encoding='utf-8').read()
old = """  assetType?: string
  assetNumber?: string
  assetDescription?: string
}"""
new = """  assetType?: string
  assetNumber?: string
  assetDescription?: string
  photoUrl?: string
}"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
