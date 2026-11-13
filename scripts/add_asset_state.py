p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

old = "const [preferredContactTime, setPreferredContactTime] = useState('Anytime')"
new = """const [preferredContactTime, setPreferredContactTime] = useState('Anytime')
  const [assetType, setAssetType] = useState('')
  const [assetNumber, setAssetNumber] = useState('')
  const [assetDescription, setAssetDescription] = useState('')"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
