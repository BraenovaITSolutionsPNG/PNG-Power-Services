p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("foundReport.location")
char = s[idx+18]
print(f"char: {repr(char)} ord: {ord(char)} hex: {ord(char):04X}")
# Show surrounding bytes
data = open(p, 'rb').read()
# Find the position in bytes
pos = data.find(b'foundReport.location')
print("bytes around:", data[pos+18:pos+22].hex())
