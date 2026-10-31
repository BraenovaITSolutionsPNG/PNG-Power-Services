p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
# Add toast state after noteJobId state
old = "  const [noteJobId, setNoteJobId] = useState<string | null>(null)"
new = """  const [noteJobId, setNoteJobId] = useState<string | null>(null)

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null)
  function showToast(message: string, type: 'success' | 'info' | 'error' = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
