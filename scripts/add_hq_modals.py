p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Add modals before the final closing
old = """    </div>
  )
}"""
new = """    </div>

      {/* Issue Categories Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-gray-200 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">Manage Issue Categories</h3>
              <button onClick={() => setShowCategoryModal(false)} className="text-gray-500 hover:text-gray-900">
                <Icon name="close" className="size-4" />
              </button>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex gap-2">
                <input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New category name"
                  className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                />
                <button
                  onClick={() => {
                    if (newCategoryName.trim()) {
                      showToast(`Category "${newCategoryName}" added`, 'success')
                      setNewCategoryName('')
                    }
                  }}
                  className="button button-primary text-xs"
                >
                  <Icon name="plus" className="size-3.5" /> Add
                </button>
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto divide-y divide-gray-200">
              {['Power outage (Area blackout)', 'Single household outage', 'Fallen power line / wire on ground', 'Transformer explosion / smoke / spark', 'Damaged or leaning power pole', 'Streetlight failure', 'Easipay meter error code', 'Low voltage / voltage surge', 'Other electrical hazard'].map((cat) => (
                <div key={cat} className="py-2 flex items-center justify-between">
                  <span className="text-sm text-gray-900">{cat}</span>
                  <button onClick={() => showToast(`Category "${cat}" removed`, 'info')} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button onClick={() => setShowCategoryModal(false)} className="button button-secondary w-full">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Regions Modal */}
      {showRegionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-gray-200 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">Manage Regions</h3>
              <button onClick={() => setShowRegionModal(false)} className="text-gray-500 hover:text-gray-900">
                <Icon name="close" className="size-4" />
              </button>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex gap-2">
                <input
                  value={newRegionName}
                  onChange={(e) => setNewRegionName(e.target.value)}
                  placeholder="Region name"
                  className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                />
                <input
                  value={newRegionCode}
                  onChange={(e) => setNewRegionCode(e.target.value)}
                  placeholder="Code"
                  className="w-20 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                />
                <button
                  onClick={() => {
                    if (newRegionName.trim()) {
                      showToast(`Region "${newRegionName}" added`, 'success')
                      setNewRegionName('')
                      setNewRegionCode('')
                    }
                  }}
                  className="button button-primary text-xs"
                >
                  <Icon name="plus" className="size-3.5" /> Add
                </button>
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto divide-y divide-gray-200">
              {['Central', 'Chimbu', 'Eastern Highlands', 'East New Britain', 'East Sepik', 'Enga', 'Gulf', 'Hela', 'Jiwaka', 'Madang', 'Manus', 'Milne Bay', 'Morobe', 'NCD', 'New Ireland', 'Oro', 'Sandaun', 'Southern Highlands', 'West New Britain', 'Western', 'Western Highlands', 'West Sepik'].map((region) => (
                <div key={region} className="py-2 flex items-center justify-between">
                  <span className="text-sm text-gray-900">{region}</span>
                  <button onClick={() => showToast(`Region "${region}" removed`, 'info')} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button onClick={() => setShowRegionModal(false)} className="button button-secondary w-full">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Teams Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-gray-200 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">Manage Teams</h3>
              <button onClick={() => setShowTeamModal(false)} className="text-gray-500 hover:text-gray-900">
                <Icon name="close" className="size-4" />
              </button>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex gap-2">
                <input
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Team name"
                  className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                />
                <select
                  value={newTeamRegion}
                  onChange={(e) => setNewTeamRegion(e.target.value)}
                  className="w-40 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                >
                  <option value="">Region</option>
                  <option>NCD</option>
                  <option>Morobe</option>
                  <option>Western Highlands</option>
                  <option>East New Britain</option>
                </select>
                <button
                  onClick={() => {
                    if (newTeamName.trim()) {
                      showToast(`Team "${newTeamName}" added`, 'success')
                      setNewTeamName('')
                      setNewTeamRegion('')
                    }
                  }}
                  className="button button-primary text-xs"
                >
                  <Icon name="plus" className="size-3.5" /> Add
                </button>
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto divide-y divide-gray-200">
              {['NCD Dispatch', 'Lae Field Team', 'Mt Hagen Center', 'Kokopo Regional'].map((team) => (
                <div key={team} className="py-2 flex items-center justify-between">
                  <span className="text-sm text-gray-900">{team}</span>
                  <button onClick={() => showToast(`Team "${team}" removed`, 'info')} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button onClick={() => setShowTeamModal(false)} className="button button-secondary w-full">Close</button>
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
