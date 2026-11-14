p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

old = "const [assetDescription, setAssetDescription] = useState('')"
new = """const [assetDescription, setAssetDescription] = useState('')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
