p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = """      {showNoteModal && ("""
new = """      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4">
          <div className={`flex items-center gap-3 rounded-xl px-5 py-3 shadow-2xl border ${
            toast.type === 'success' ? 'bg-success-soft border-success/30 text-success-dark' :
            toast.type === 'error' ? 'bg-brand-soft border-brand/30 text-brand-dark' :
            'bg-blue-soft border-blue/30 text-blue-dark'
          }`}>
            <Icon name={toast.type === 'success' ? 'check' : toast.type === 'error' ? 'alert' : 'info'} className="size-5" />
            <span className="text-sm font-semibold">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">
              <Icon name="close" className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {showNoteModal && ("""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
