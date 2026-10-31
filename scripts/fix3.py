p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = "                  <button onClick={() => { setShowReportForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className=\"button button-primary text-xs\">\n                    <Icon name=\"plus\" className=\"size-3.5\" /> Create Report for Caller\n                  </button>"
new = "                  <button className=\"button button-primary text-xs\">\n                    <Icon name=\"plus\" className=\"size-3.5\" /> Create Report for Caller\n                  </button>"
assert old in s, "pattern not found"
s = s.replace(old, new)
open(p, 'w').write(s)
print("done")
