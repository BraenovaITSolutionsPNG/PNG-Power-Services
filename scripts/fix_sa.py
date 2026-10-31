p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

# Add onClick to System Admin buttons
old1 = """                  <button className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> View Logs
                  </button>"""
new1 = """                  <button onClick={() => showToast('System logs opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> View Logs
                  </button>"""
assert old1 in s, "pattern1 not found"
s = s.replace(old1, new1, 1)

old2 = """                  <button className="button button-secondary text-xs">
                    <Icon name="lock" className="size-3.5" /> Manage Access
                  </button>"""
new2 = """                  <button onClick={() => showToast('Access management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="lock" className="size-3.5" /> Manage Access
                  </button>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

# The third button already has "info" icon and "Configuration" text
old3 = """                  <button className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Configuration
                  </button>"""
new3 = """                  <button onClick={() => showToast('System configuration opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Configuration
                  </button>"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

open(p, 'w').write(s)
print("done")
