p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
data = open(p, 'rb').read()
# The replacement char U+FFFD in UTF-8 is EF BF BD
count = data.count(b'\xef\xbf\xbd')
print("replacement char count:", count)
# Replace all EF BF BD with " - " (2D 20)
data = data.replace(b'\xef\xbf\xbd', b' - ')
open(p, 'wb').write(data)
print("done")
