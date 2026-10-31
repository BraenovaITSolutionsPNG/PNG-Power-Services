p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = "  const [selectedJob, setSelectedJob] = useState<string | null>(null)"
new = """  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  // Field crew note modal state
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [noteJobId, setNoteJobId] = useState<string | null>(null)

  // Track restored work orders for toggle
  const [restoredJobs, setRestoredJobs] = useState<Set<string>>(new Set())"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
