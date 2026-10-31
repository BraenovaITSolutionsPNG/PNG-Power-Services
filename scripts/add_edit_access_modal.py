p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Add Edit Access modal before the final closing
old = "    </div>\n  )\n}"
new = """    </div>

      {/* Edit Access Modal */}
      {showEditAccessModal && editAccessUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">Edit Access - {editAccessUser.name}</h3>
              <button onClick={() => setShowEditAccessModal(false)} className="text-gray-500 hover:text-gray-900">
                <Icon name="close" className="size-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-700">Role</label>
                <select
                  value={editAccessRole}
                  onChange={(e) => setEditAccessRole(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                >
                  <option value="staff">Staff (Call Centre)</option>
                  <option value="field">Field Crew</option>
                  <option value="operations">Operations</option>
                  <option value="admin">Admin HQ</option>
                  <option value="regional_coordinator">Regional Coordinator</option>
                  <option value="regional_manager">Regional Manager</option>
                  <option value="hq_admin">HQ Admin</option>
                  <option value="system_admin">System Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-700">Department</label>
                <input
                  value={editAccessDept}
                  onChange={(e) => setEditAccessDept(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-700">Status</label>
                <select
                  value={editAccessStatus}
                  onChange={(e) => setEditAccessStatus(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <button
                onClick={() => {
                  setStaffUsers(staffUsers.map(u => u.id === editAccessUser.id ? { ...u, role: editAccessRole as any, department: editAccessDept, status: editAccessStatus as any } : u))
                  showToast(`Access updated for ${editAccessUser.name}`, 'success')
                  setShowEditAccessModal(false)
                }}
                className="button button-primary flex-1"
              >
                Save Changes
              </button>
              <button onClick={() => setShowEditAccessModal(false)} className="button button-secondary flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
