p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = "  const [restoredJobs, setRestoredJobs] = useState<Set<string>>(new Set())"
new = """  const [restoredJobs, setRestoredJobs] = useState<Set<string>>(new Set())

  // Call Centre state
  const [ccCallerName, setCcCallerName] = useState('')
  const [ccCallerPhone, setCcCallerPhone] = useState('')
  const [ccIssueType, setCcIssueType] = useState('Power outage (Area blackout)')
  const [ccProvince, setCcProvince] = useState('NCD')
  const [ccLocation, setCcLocation] = useState('')
  const [ccDescription, setCcDescription] = useState('')
  const [ccLookupCase, setCcLookupCase] = useState('')
  const [ccLookupResult, setCcLookupResult] = useState<any>(null)
  const [ccLookupError, setCcLookupError] = useState('')
  const [ccFeedback, setCcFeedback] = useState('')
  const [ccFeedbackCase, setCcFeedbackCase] = useState('')
  const [ccCallsToday, setCcCallsToday] = useState(0)
  const [ccCaseLookups, setCcCaseLookups] = useState(0)
  const [ccActiveTab, setCcActiveTab] = useState<'create' | 'lookup' | 'feedback'>('create')"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
