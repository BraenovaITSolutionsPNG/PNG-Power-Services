p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = "    </div>\n  )\n}"
new = """    </div>

      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-surface border border-line shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold">Add Log Note - {noteJobId}</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-muted hover:text-ink">
                <Icon name="close" className="size-4" />
              </button>
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter your field notes here..."
              className="w-full min-h-32 rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm resize-y"
              autoFocus
            />
            <div className="flex gap-2 pt-4">
              <button
                onClick={() => {
                  if (noteText.trim()) {
                    alert(`Log note added to ${noteJobId}: ${noteText}`)
                    setShowNoteModal(false)
                    setNoteText('')
                  }
                }}
                className="button button-primary flex-1"
              >
                Save Note
              </button>
              <button
                onClick={() => {
                  setShowNoteModal(false)
                  setNoteText('')
                }}
                className="button button-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  )
}"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
