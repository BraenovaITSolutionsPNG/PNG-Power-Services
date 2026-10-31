p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Add state for HQ Admin management modals
old = "  const [restoredJobs, setRestoredJobs] = useState<Set<string>>(new Set())"
new = """  const [restoredJobs, setRestoredJobs] = useState<Set<string>>(new Set())

  // HQ Admin management state
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showRegionModal, setShowRegionModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newRegionName, setNewRegionName] = useState('')
  const [newRegionCode, setNewRegionCode] = useState('')
  const [newTeamName, setNewTeamName] = useState('')
  const [newTeamRegion, setNewTeamRegion] = useState('')"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Update the config buttons to open modals
old2 = """                  <button onClick={() => showToast('Issue categories management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Manage Issue Categories
                  </button>"""
new2 = """                  <button onClick={() => { setShowCategoryModal(true); setNewCategoryName('') }} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Manage Issue Categories
                  </button>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

old3 = """                  <button onClick={() => showToast('Regions management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="map" className="size-3.5" /> Manage Regions
                  </button>"""
new3 = """                  <button onClick={() => { setShowRegionModal(true); setNewRegionName(''); setNewRegionCode('') }} className="button button-secondary text-xs">
                    <Icon name="map" className="size-3.5" /> Manage Regions
                  </button>"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

old4 = """                  <button onClick={() => showToast('Teams management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="team" className="size-3.5" /> Manage Teams
                  </button>"""
new4 = """                  <button onClick={() => { setShowTeamModal(true); setNewTeamName(''); setNewTeamRegion('') }} className="button button-secondary text-xs">
                    <Icon name="team" className="size-3.5" /> Manage Teams
                  </button>"""
assert old4 in s, "pattern4 not found"
s = s.replace(old4, new4, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
