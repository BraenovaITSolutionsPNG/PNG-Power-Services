p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

# Update the Add Staff modal overlay and card
old = '''        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-surface border border-line shadow-2xl p-6">'''

new = '''        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-2xl p-6">'''

assert old in s, "pattern1 not found"
s = s.replace(old, new, 1)

# Update the Role dropdown to include all 8 roles
old2 = """                  <option value="staff">Staff</option>
                  <option value="field">Field Crew</option>
                  <option value="operations">Operations</option>
                  <option value="admin">Admin HQ</option>"""
new2 = """                  <option value="staff">Staff (Call Centre)</option>
                  <option value="field">Field Crew</option>
                  <option value="operations">Operations</option>
                  <option value="admin">Admin HQ</option>
                  <option value="regional_coordinator">Regional Coordinator</option>
                  <option value="regional_manager">Regional Manager</option>
                  <option value="hq_admin">HQ Admin</option>
                  <option value="system_admin">System Admin</option>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

# Update input/label colors for the white background
old3 = """                <label className="block text-xs font-bold mb-1">Full Name</label>
                <input
                  value={newStaff.name || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                />"""
new3 = """                <label className="block text-xs font-bold mb-1 text-gray-700">Full Name</label>
                <input
                  value={newStaff.name || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                />"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

old4 = """                <label className="block text-xs font-bold mb-1">Email</label>
                <input
                  type="email"
                  value={newStaff.email || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                />"""
new4 = """                <label className="block text-xs font-bold mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  value={newStaff.email || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                />"""
assert old4 in s, "pattern4 not found"
s = s.replace(old4, new4, 1)

old5 = """                <label className="block text-xs font-bold mb-1">Role</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as AdminRole })}
                  className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                >"""
new5 = """                <label className="block text-xs font-bold mb-1 text-gray-700">Role</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as AdminRole })}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                >"""
assert old5 in s, "pattern5 not found"
s = s.replace(old5, new5, 1)

old6 = """                <label className="block text-xs font-bold mb-1">Department</label>
                <input
                  value={newStaff.department || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                  className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                />"""
new6 = """                <label className="block text-xs font-bold mb-1 text-gray-700">Department</label>
                <input
                  value={newStaff.department || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                />"""
assert old6 in s, "pattern6 not found"
s = s.replace(old6, new6, 1)

# Update the modal header color
old7 = """            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold">Add New Staff</h3>"""
new7 = """            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">Add New Staff</h3>"""
assert old7 in s, "pattern7 not found"
s = s.replace(old7, new7, 1)

open(p, 'w').write(s)
print("done")
