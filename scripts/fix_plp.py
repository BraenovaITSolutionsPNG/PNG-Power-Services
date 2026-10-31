p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Replace replacement characters with safe alternatives
s = s.replace("location} \ufffd {foundReport.province}", "location} - {foundReport.province}")
# The second one is in a span, likely a bullet - replace with a bullet char
s = s.replace("<span>\ufffd</span>", "<span>-</span>")
open(p, 'w', encoding='utf-8').write(s)
print("done")
