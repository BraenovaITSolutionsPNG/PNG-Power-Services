import { useState, type ReactNode } from 'react'
import { Icon, Brand, type IconName } from './Icons'
import type { AdminRole, PublicReport, Incident, WorkOrder, StaffUser } from '../types'

interface AdminPortalProps {
  onBackToPublic: () => void
  publicReports: PublicReport[]
  onUpdateReportStatus?: (caseNumber: string, status: PublicReport['status']) => void
}

export function AdminPortal({
  onBackToPublic,
  publicReports,
  onUpdateReportStatus,
}: AdminPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState<AdminRole>('operations')
  const [activeSection, setActiveSection] = useState<string>('operations-overview')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Auth inputs
  const [username, setUsername] = useState('ops.lead@pngpower.com.pg')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authToken, setAuthToken] = useState('')

  // Staff management
  const [staffUsers, setStaffUsers] = useState<StaffUser[]>([
    {
      id: 'STF-001',
      name: 'John Kila',
      email: 'ops.lead@pngpower.com.pg',
      role: 'operations',
      department: 'Operations & Dispatch',
      status: 'Active',
    },
    {
      id: 'STF-002',
      name: 'Maria Wari',
      email: 'crew.delta@pngpower.com.pg',
      role: 'field',
      department: 'Field Operations',
      status: 'Active',
    },
    {
      id: 'STF-003',
      name: 'David Raka',
      email: 'admin.hq@pngpower.com.pg',
      role: 'admin',
      department: 'IT & Admin',
      status: 'Active',
    },
    {
      id: 'STF-004',
      name: 'Sarah Momo',
      email: 'dispatch.ncd@pngpower.com.pg',
      role: 'operations',
      department: 'NCD Dispatch',
      status: 'Active',
    },
    {
      id: 'STF-005',
      name: 'Peter Kila',
      email: 'tech.lae@pngpower.com.pg',
      role: 'field',
      department: 'Lae Field Team',
      status: 'Active',
    },
  ])
  const [showAddStaff, setShowAddStaff] = useState(false)
  const [newStaff, setNewStaff] = useState<Partial<StaffUser>>({ role: 'staff', status: 'Active', department: 'Operations' })

  // State for incidents and work orders
  const [incidentsList, setIncidentsList] = useState<Incident[]>([
    {
      id: 'INC-2048',
      title: 'Area outage  -  Gerehu Stage 3',
      meta: '14 linked reports  -  NCD',
      priority: 'High',
      status: 'Crew assigned',
      time: '18 min ago',
      province: 'NCD',
    },
    {
      id: 'INC-2047',
      title: 'Transformer fault  -  Lae Market',
      meta: '7 linked reports  -  Morobe',
      priority: 'Critical',
      status: 'In progress',
      time: '34 min ago',
      province: 'Morobe',
    },
    {
      id: 'INC-2046',
      title: 'Damaged pole  -  Kokopo Road',
      meta: '3 linked reports  -  East New Britain',
      priority: 'Medium',
      status: 'Under review',
      time: '1 hr ago',
      province: 'East New Britain',
    },
    {
      id: 'INC-2045',
      title: 'Intermittent supply  -  Boroko',
      meta: '5 linked reports  -  NCD',
      priority: 'Medium',
      status: 'Pending parts',
      time: '2 hrs ago',
      province: 'NCD',
    },
  ])

  const [filter, setFilter] = useState('All incidents')
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  // Field crew note modal state
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [noteJobId, setNoteJobId] = useState<string | null>(null)

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null)
  function showToast(message: string, type: 'success' | 'info' | 'error' = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  // Track restored work orders for toggle
  const [restoredJobs, setRestoredJobs] = useState<Set<string>>(new Set())

  // HQ Admin management state
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showRegionModal, setShowRegionModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newRegionName, setNewRegionName] = useState('')
  const [newRegionCode, setNewRegionCode] = useState('')
  const [newTeamName, setNewTeamName] = useState('')

  // Edit Access modal state
  const [showEditAccessModal, setShowEditAccessModal] = useState(false)
  const [editAccessUser, setEditAccessUser] = useState<any>(null)
  const [editAccessRole, setEditAccessRole] = useState('')
  const [editAccessDept, setEditAccessDept] = useState('')
  const [editAccessStatus, setEditAccessStatus] = useState('Active')
  const [newTeamRegion, setNewTeamRegion] = useState('')

  // Assign Work Order form state
  const [awoReport, setAwoReport] = useState('')
  const [awoTeam, setAwoTeam] = useState('NCD Dispatch')
  const [awoOwner, setAwoOwner] = useState('')
  const [awoAction, setAwoAction] = useState('')

  // Track suggested link confirmations/rejections
  const [confirmedLinks, setConfirmedLinks] = useState<Set<string>>(new Set())
  const [rejectedLinks, setRejectedLinks] = useState<Set<string>>(new Set())

  // Track reviewed reports for toggle
  const [reviewedReports, setReviewedReports] = useState<Set<string>>(new Set())

  // Track dispatched reports for toggle
  const [dispatchedReports, setDispatchedReports] = useState<Set<string>>(new Set())

  // Track public intake actions for toggle
  const [assignedReports, setAssignedReports] = useState<Set<string>>(new Set())
  const [inProgressReports, setInProgressReports] = useState<Set<string>>(new Set())
  const [resolvedReports, setResolvedReports] = useState<Set<string>>(new Set())

  // Call Centre state
  const [ccCallerName, setCcCallerName] = useState('')
  const [ccCallerPhone, setCcCallerPhone] = useState('')
  const [ccIssueType, setCcIssueType] = useState('Power outage (Area blackout)')
  const [ccProvince, setCcProvince] = useState('National Capital District (NCD)')
  const [ccLocation, setCcLocation] = useState('')
  const [ccDescription, setCcDescription] = useState('')
  const [ccLookupCase, setCcLookupCase] = useState('')
  const [ccLookupResult, setCcLookupResult] = useState<any>(null)
  const [ccLookupError, setCcLookupError] = useState('')
  const [ccFeedback, setCcFeedback] = useState('')
  const [ccFeedbackCase, setCcFeedbackCase] = useState('')
  const [ccCallsToday, setCcCallsToday] = useState(0)
  const [ccCaseLookups, setCcCaseLookups] = useState(0)
  const [ccActiveTab, setCcActiveTab] = useState<'create' | 'lookup' | 'feedback'>('create')

  const [fieldJobs, setFieldJobs] = useState<WorkOrder[]>([
    {
      id: 'WO-8842',
      title: 'Inspect transformer fault',
      place: 'Lae Market, Morobe',
      priority: 'Urgent',
      time: 'Assigned 34 min ago',
      status: 'In progress',
    },
    {
      id: 'WO-8839',
      title: 'Assess damaged service pole',
      place: 'Kokopo Road, ENB',
      priority: 'High',
      time: 'Assigned 1 hr ago',
      status: 'Accepted',
    },
    {
      id: 'WO-8836',
      title: 'Investigate intermittent supply',
      place: 'Boroko, NCD',
      priority: 'Normal',
      time: 'Assigned yesterday',
      status: 'Assigned',
    },
  ])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!username.trim()) {
      setAuthError('Please enter your staff ID or email')
      return
    }
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      })
      if (!res.ok) {
        const data = await res.json()
        setAuthError(data.error || 'Login failed')
        return
      }
      const user = await res.json()
      setRole(user.role as AdminRole)
      setUsername(user.email)
      if (user.role === 'operations') setActiveSection('operations-overview')
      else if (user.role === 'field') setActiveSection('field-assignments')
      else if (user.role === 'admin') setActiveSection('admin-system')
      else if (user.role === 'staff') setActiveSection('call-centre')
      else if (user.role === 'regional_coordinator') setActiveSection('regional-triage')
      else if (user.role === 'regional_manager') setActiveSection('regional-performance')
      else if (user.role === 'hq_admin') setActiveSection('hq-config')
      else if (user.role === 'system_admin') setActiveSection('system-health')
      else setActiveSection('operations-overview')
      setIsAuthenticated(true)
      setAuthError('')
      if (user.token) {
        setAuthToken(user.token)
        localStorage.setItem('png_power_token', user.token)
      }
    } catch {
      setAuthError('Network error. Please try again.')
    }
  }

  async function handleAddStaff() {
    try {
      const token = localStorage.getItem('png_power_token')
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newStaff),
      })
      if (!res.ok) {
        const data = await res.json()
        showToast(data.error || 'Failed to add staff', 'error')
        return
      }
      const data = await res.json()
      const id = `STF-${String(staffUsers.length + 1).padStart(3, '0')}`
      setStaffUsers([...staffUsers, { ...(newStaff as StaffUser), id }])
      setShowAddStaff(false)
      setNewStaff({ role: 'staff', status: 'Active', department: 'Operations' })
      showToast(`Staff added. Temporary password: ${data.tempPassword}`, 'success')
    } catch {
      showToast('Network error. Please try again.', 'error')
    }
  }

  function createWorkOrder(report: any) {
    const woId = 'WO-' + Math.random().toString(36).substring(2, 6).toUpperCase()
    setFieldJobs([...fieldJobs, {
      id: woId,
      title: report.issueType,
      place: report.location + ' (' + report.province + ')',
      priority: 'Normal',
      time: 'Just assigned',
      status: 'Assigned',
    }])
    showToast('Work order ' + woId + ' created for ' + report.caseNumber, 'success')
  }

  // If not logged in, render the clean Staff Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-sidebar flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 size-96 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="w-full max-w-md relative z-10">
          {/* Back to public link */}
          <button
            onClick={onBackToPublic}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition"
          >
            <Icon name="arrow" className="size-4 rotate-180" /> Return to Public Website
          </button>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-white shadow-2xl">
            <div className="text-center">
              <img
                src="/png-power-logo.png"
                alt="PNG Power Logo"
                className="size-16 mx-auto object-contain drop-shadow-md"
              />
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight">PNG Power Staff Portal</h2>
              <p className="mt-1 text-xs text-white/60">
                Restricted operational access for dispatchers, field technicians, and system administrators.
              </p>
            </div>

            {authError && (
              <div className="mt-4 rounded-lg bg-brand/20 border border-brand/40 p-3 text-xs text-brand-light">
                {authError}
              </div>
            )}

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[0.68rem] font-semibold text-white/40 uppercase">Or sign in with email</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">Staff Email / ID</label>
                <input
                  type="email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand"
                  placeholder="name@pngpower.com.pg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand"
                  placeholder=""
                />
              </div>

              <button
                type="submit"
                className="w-full button button-primary mt-2 text-sm justify-center"
              >
                Sign In to Portal <Icon name="arrow" className="size-4" />
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-white/40">
              Need assistance? Contact PNG Power IT Helpdesk at ext 4010.
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated Staff Workspace
  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Top Banner reminding user this is internal staff mode */}
      <div className="bg-brand-dark px-4 py-2 text-xs text-white flex items-center justify-between z-50 relative">
        <div className="flex items-center gap-2">
          <span className="grid size-4 place-items-center rounded bg-white text-brand-dark font-bold text-[0.65rem]">
            "
          </span>
          <span className="font-bold">PNG POWER INTERNAL WORKSPACE</span>
          <span className="hidden sm:inline text-white/70">
             -  Signed in as <strong className="text-white">{username}</strong> ({role.toUpperCase()})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPublic}
            className="flex items-center gap-1.5 rounded bg-white/15 px-2.5 py-1 text-xs font-bold hover:bg-white/25 transition"
          >
            <Icon name="arrow" className="size-3.5 rotate-180" /> Public Website
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs text-white/80 hover:text-white underline font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-sidebar transition-transform lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } top-8`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-5 py-6">
          <Brand inverse />

          {/* Role Switcher in Sidebar */}
          <div className="mt-8 px-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/35">
            Internal Workspace
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-3 rounded-xl bg-brand/20 px-3 py-2.5 text-sm font-semibold text-white">
              <Icon name="user" className="size-4" />
              <span className="truncate">{role.replace('_', ' ')}</span>
            </div>
          </div>

          <div className="my-6 h-px bg-white/10" />

          {/* Workspace Submenu */}
          <div className="px-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/35">
            Quick Navigation
          </div>
          <nav className="mt-3 space-y-1">
            {role === 'operations' && (
              <>
                <button
                  onClick={() => setActiveSection('operations-overview')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'operations-overview' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="home" className="size-3.5" /> Operations Overview
                </button>
                <button
                  onClick={() => setActiveSection('public-intake')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'public-intake' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="document" className="size-3.5" /> Public Fault Intake ({publicReports.length})
                </button>
                <button
                  onClick={() => setActiveSection('incidents')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'incidents' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="alert" className="size-3.5" /> Active Incidents
                </button>
              </>
            )}

            {role === 'field' && (
              <>
                <button
                  onClick={() => setActiveSection('field-assignments')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'field-assignments' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="wrench" className="size-3.5" /> My Work Orders
                </button>
                <button
                  onClick={() => setActiveSection('field-safety')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'field-safety' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="shield" className="size-3.5" /> Safety Protocol
                </button>
              </>
            )}

            {role === 'admin' && (
              <>
                <button
                  onClick={() => setActiveSection('admin-system')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'admin-system' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="shield" className="size-3.5" /> System Health
                </button>
                <button
                  onClick={() => setActiveSection('admin-users')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'admin-users' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="team" className="size-3.5" /> Crew Rosters & Personnel
                </button>
              </>
            )}

            {role === 'staff' && (
              <>
                <button
                  onClick={() => setActiveSection('call-centre')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'call-centre' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="phone" className="size-3.5" /> Call Centre
                </button>
              </>
            )}

            {role === 'regional_coordinator' && (
              <>
                <button
                  onClick={() => setActiveSection('regional-triage')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'regional-triage' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="map" className="size-3.5" /> Regional Triage
                </button>
              </>
            )}

            {role === 'regional_manager' && (
              <>
                <button
                  onClick={() => setActiveSection('regional-performance')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'regional-performance' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="signal" className="size-3.5" /> Performance Dashboard
                </button>
              </>
            )}

            {role === 'hq_admin' && (
              <>
                <button
                  onClick={() => setActiveSection('hq-config')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'hq-config' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="info" className="size-3.5" /> HQ Configuration
                </button>
              </>
            )}

            {role === 'system_admin' && (
              <>
                <button
                  onClick={() => setActiveSection('system-health')}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === 'system-health' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Icon name="lock" className="size-3.5" /> System Health
                </button>
              </>
            )}
          </nav>

          {/* Return to Public Website Action in Sidebar */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <button
              onClick={onBackToPublic}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 p-3 text-xs font-bold text-white transition"
            >
              <Icon name="arrow" className="size-4 rotate-180" /> Back to Public Site
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-72 pt-8">
        <header className="sticky top-8 z-30 flex h-16 items-center border-b border-line bg-white/90 px-5 backdrop-blur-md sm:px-8">
          <button
            className="mr-4 grid size-10 place-items-center rounded-lg border border-line lg:hidden"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
          >
            <Icon name="menu" />
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              PNG Power Internal Systems
            </p>
            <p className="font-bold text-sm">
              {role === 'operations' ? 'National Operations & Dispatch' : role === 'field' ? 'Field Crew Operations' : 'Administration & Telemetry'}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success-dark">
              <span className="size-2 rounded-full bg-success animate-pulse" />
              Connected (PNG Power Intranet)
            </span>
            <button
              onClick={onBackToPublic}
              className="button button-secondary text-xs"
            >
              Exit to Public Site
            </button>
          </div>
        </header>

        <main className="p-5 sm:p-8">
          {/* Operations View */}
          {role === 'operations' && (
            <div className="space-y-8">
              {activeSection === 'operations-overview' && (
                <>
              {/* Header metrics */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight">National Operations Hub</h1>
                  <p className="text-xs text-muted mt-1">
                    Live triage, public complaint intake, and linesmen coordination.
                  </p>
                </div>
                <button
                  onClick={() => setActiveSection('public-intake')}
                  className="button button-primary text-xs"
                >
                  <Icon name="document" className="size-4" /> Review Public Reports ({publicReports.length})
                </button>
              </div>

              {/* Metrics cards */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="card p-5">
                  <div className="flex items-start justify-between">
                    <span className="icon-tile metric-blue">
                      <Icon name="document" />
                    </span>
                    <span className="text-xs font-semibold text-muted">+{publicReports.length} incoming</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold tracking-tight">{publicReports.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Open Resident Tickets</p>
                </div>

                <div className="card p-5">
                  <div className="flex items-start justify-between">
                    <span className="icon-tile metric-red">
                      <Icon name="alert" />
                    </span>
                    <span className="text-xs font-semibold text-brand font-bold">8 Critical</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold tracking-tight">{incidentsList.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Active Feeder Incidents</p>
                </div>

                <div className="card p-5">
                  <div className="flex items-start justify-between">
                    <span className="icon-tile metric-green">
                      <Icon name="team" />
                    </span>
                    <span className="text-xs font-semibold text-muted">5 Regions</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold tracking-tight">{staffUsers.filter(u => u.role === 'field').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Field Crews Deployed</p>
                </div>

                <div className="card p-5">
                  <div className="flex items-start justify-between">
                    <span className="icon-tile metric-amber">
                      <Icon name="clock" />
                    </span>
                    <span className="text-xs font-semibold text-muted">Oldest: 2h 15m</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold tracking-tight">{publicReports.filter(r => r.status === 'Under review').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Awaiting Triage</p>
                </div>
              </div>

              {/* Live Public Fault Intake Box (Connected to public submissions!) */}
              <div className="card overflow-hidden">
                <div className="flex items-center justify-between border-b border-line p-5 bg-surface-raised/40">
                  <div>
                    <h2 className="text-base font-extrabold">Public Fault Submissions (Live Intake)</h2>
                    <p className="text-xs text-muted mt-0.5">
                      Reports directly submitted through the public website landing page
                    </p>
                  </div>
                  <span className="badge badge-blue">{publicReports.length} submissions in queue</span>
                </div>

                <div className="divide-y divide-line">
                  {publicReports.map((report) => (
                    <div key={report.caseNumber} className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-surface-raised transition">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-dark bg-brand-soft px-2 py-0.5 rounded">
                            {report.caseNumber}
                          </span>
                          <span className="badge badge-amber">{report.status}</span>
                          <span className="text-xs text-muted">Logged: {report.createdAt}</span>
                        </div>
                        <h4 className="mt-1.5 font-bold text-sm text-ink">{report.issueType}</h4>
                        <p className="text-xs text-muted mt-0.5">
                          <strong>Location:</strong> {report.location} ({report.province})  -  {report.description}
                        </p>
                        {report.phone && (
                          <p className="text-xs text-brand font-semibold mt-1">
                            Contact: {report.phone} ({report.contactPreference})
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          onClick={() => {
                            setDispatchedReports((prev) => {
                              const next = new Set(prev)
                              if (next.has(report.caseNumber)) {
                                next.delete(report.caseNumber)
                                onUpdateReportStatus?.(report.caseNumber, 'Under review')
                                showToast(`Dispatch cancelled for ${report.caseNumber}`, 'info')
                              } else {
                                next.add(report.caseNumber)
                                onUpdateReportStatus?.(report.caseNumber, 'Crew assigned')
                                showToast(`Dispatch crew assigned to Case ${report.caseNumber}`, 'success')
                              }
                              return next
                            })
                          }}
                          className={`button text-xs ${dispatchedReports.has(report.caseNumber) ? 'bg-brand/20 text-brand border border-brand/40 hover:bg-brand/30' : 'button-primary'}`}
                        >
                          {dispatchedReports.has(report.caseNumber) ? 'Cancel Dispatch' : 'Dispatch Crew'}
                        </button>
                        <button
                          onClick={() => {
                            setReviewedReports((prev) => {
                              const next = new Set(prev)
                              if (next.has(report.caseNumber)) {
                                next.delete(report.caseNumber)
                                onUpdateReportStatus?.(report.caseNumber, 'Under review')
                                showToast(`Review cancelled for ${report.caseNumber}`, 'info')
                              } else {
                                next.add(report.caseNumber)
                                onUpdateReportStatus?.(report.caseNumber, 'Under review')
                                showToast(`Case ${report.caseNumber} marked as under review`, 'success')
                              }
                              return next
                            })
                          }}
                          className={`button text-xs ${reviewedReports.has(report.caseNumber) ? 'bg-brand/20 text-brand border border-brand/40 hover:bg-brand/30' : 'button-secondary'}`}
                        >
                          {reviewedReports.has(report.caseNumber) ? 'Cancel Review' : 'Review'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                </>
              )}

              {activeSection === 'incidents' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">Active Incidents</h1>
                    <p className="text-xs text-muted mt-1">Major grid and feeder incidents</p>
                  </div>
                  <div className="card overflow-hidden">
                    <div className="divide-y divide-line">
                      {incidentsList.map((incident) => (
                        <div key={incident.id} className="p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-xs font-bold text-muted">{incident.id}</span>
                                <span className={`badge ${incident.priority === 'Critical' ? 'badge-red' : incident.priority === 'High' ? 'badge-amber' : 'badge-blue'}`}>{incident.priority}</span>
                                <span className="text-xs font-bold text-brand-dark bg-brand-soft px-2.5 py-1 rounded-full">{incident.status}</span>
                              </div>
                              <p className="font-bold text-sm mt-1.5 text-ink">{incident.title}</p>
                              <p className="text-xs text-muted mt-0.5">{incident.meta}  -  {incident.time}</p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'Crew assigned' } : i)); showToast(`Crew assigned to ${incident.id}`, 'success') }} className="button button-primary text-xs">Assign Crew</button>
                              <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'In progress' } : i)); showToast(`${incident.id} marked in progress`, 'info') }} className="button button-secondary text-xs">In Progress</button>
                              <button onClick={() => { setIncidentsList(incidentsList.map(i => i.id === incident.id ? { ...i, status: 'Resolved' } : i)); showToast(`${incident.id} resolved`, 'success') }} className="button button-secondary text-xs">Resolve</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'public-intake' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">Public Fault Intake</h1>
                    <p className="text-xs text-muted mt-1">All reports submitted through the public website</p>
                  </div>
                  <div className="card overflow-hidden">
                    <div className="flex items-center justify-between border-b border-line p-5 bg-surface-raised/40">
                      <div>
                        <h2 className="text-base font-extrabold">All Public Submissions</h2>
                        <p className="text-xs text-muted mt-0.5">{publicReports.length} reports</p>
                      </div>
                    </div>
                    <div className="divide-y divide-line">
                      {publicReports.map((report) => (
                        <div key={report.caseNumber} className="p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-brand-dark bg-brand-soft px-2 py-0.5 rounded">{report.caseNumber}</span>
                                <span className="badge badge-amber">{report.status}</span>
                                <span className="text-xs text-muted">{report.createdAt}</span>
                              </div>
                              <h4 className="mt-1.5 font-bold text-sm">{report.issueType}</h4>
                              <p className="text-xs text-muted mt-0.5"><strong>Location:</strong> {report.location} ({report.province})</p>
                              <p className="text-xs text-muted mt-0.5">{report.description}</p>
                              {report.phone && <p className="text-xs text-brand font-semibold mt-1">Contact: {report.phone} ({report.contactPreference})</p>}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setAssignedReports((prev) => {
                                    const next = new Set(prev)
                                    if (next.has(report.caseNumber)) {
                                      next.delete(report.caseNumber)
                                      onUpdateReportStatus?.(report.caseNumber, 'Under review')
                                      showToast(`Assignment cancelled for ${report.caseNumber}`, 'info')
                                    } else {
                                      next.add(report.caseNumber)
                                      onUpdateReportStatus?.(report.caseNumber, 'Crew assigned')
                                      showToast(`Crew assigned to ${report.caseNumber}`, 'success')
                                    }
                                    return next
                                  })
                                }}
                                className={`button text-xs ${assignedReports.has(report.caseNumber) ? 'bg-brand/20 text-brand border border-brand/40 hover:bg-brand/30' : 'button-primary'}`}
                              >
                                {assignedReports.has(report.caseNumber) ? 'Cancel Assignment' : 'Assign Crew'}
                              </button>
                              <button
                                onClick={() => {
                                  setInProgressReports((prev) => {
                                    const next = new Set(prev)
                                    if (next.has(report.caseNumber)) {
                                      next.delete(report.caseNumber)
                                      onUpdateReportStatus?.(report.caseNumber, 'Crew assigned')
                                      showToast(`Reverted to crew assigned for ${report.caseNumber}`, 'info')
                                    } else {
                                      next.add(report.caseNumber)
                                      onUpdateReportStatus?.(report.caseNumber, 'In progress')
                                      showToast(`${report.caseNumber} marked in progress`, 'success')
                                    }
                                    return next
                                  })
                                }}
                                className={`button text-xs ${inProgressReports.has(report.caseNumber) ? 'bg-brand/20 text-brand border border-brand/40 hover:bg-brand/30' : 'button-secondary'}`}
                              >
                                {inProgressReports.has(report.caseNumber) ? 'Cancel Progress' : 'Mark In Progress'}
                              </button>
                              <button
                                onClick={() => {
                                  setResolvedReports((prev) => {
                                    const next = new Set(prev)
                                    if (next.has(report.caseNumber)) {
                                      next.delete(report.caseNumber)
                                      onUpdateReportStatus?.(report.caseNumber, 'In progress')
                                      showToast(`Resolution cancelled for ${report.caseNumber}`, 'info')
                                    } else {
                                      next.add(report.caseNumber)
                                      onUpdateReportStatus?.(report.caseNumber, 'Resolved')
                                      showToast(`${report.caseNumber} resolved`, 'success')
                                    }
                                    return next
                                  })
                                }}
                                className={`button text-xs ${resolvedReports.has(report.caseNumber) ? 'bg-brand/20 text-brand border border-brand/40 hover:bg-brand/30' : 'button-secondary'}`}
                              >
                                {resolvedReports.has(report.caseNumber) ? 'Cancel Resolve' : 'Resolve'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Field Crew View */}
          {role === 'field' && (
            <div className="space-y-6">
              {activeSection === 'field-assignments' && (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-extrabold tracking-tight">Field Crew Work Orders</h1>
                      <p className="text-xs text-muted mt-1">
                        Team Delta  -  Assigned mobile assignments & offline synchronization
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-success-soft px-3 py-2 text-xs font-bold text-success-dark">
                      <Icon name="check" className="size-4" /> All offline notes synced
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {fieldJobs.map((job) => (
                      <div
                        key={job.id}
                        className={`card p-5 transition ${selectedJob === job.id ? 'ring-2 ring-brand' : ''}`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-muted">{job.id}</span>
                              <span className="badge badge-amber">{job.priority}</span>
                              <span className="text-xs text-muted">{job.time}</span>
                            </div>
                            <h3 className="mt-1 text-base font-extrabold">{job.title}</h3>
                            <p className="text-xs text-muted mt-0.5 flex items-center gap-1.5">
                              <Icon name="map" className="size-3.5" /> {job.place}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                              className="button button-primary text-xs"
                            >
                              {job.status} <Icon name="chevron" className="size-3.5" />
                            </button>
                          </div>
                        </div>

                        {selectedJob === job.id && (
                          <div className="mt-4 pt-4 border-t border-line bg-surface-raised/60 -mx-5 -mb-5 p-5 rounded-b-xl space-y-3">
                            <p className="text-xs font-bold text-ink">Field Actions & Logs</p>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => {
                                  setNoteJobId(job.id)
                                  setNoteText('')
                                  setShowNoteModal(true)
                                }}
                                className="button button-secondary text-xs"
                              >
                                <Icon name="document" className="size-3.5" /> Add Log Note
                              </button>
                              <label className="button button-secondary text-xs cursor-pointer">
                                <Icon name="plus" className="size-3.5" /> Upload Picture
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) showToast(`Picture "${file.name}" uploaded for ${job.id}`, 'success')
                                  }}
                                />
                              </label>
                              <button
                                onClick={() => {
                                  setRestoredJobs((prev) => {
                                    const next = new Set(prev)
                                    if (next.has(job.id)) {
                                      next.delete(job.id)
                                      setFieldJobs(fieldJobs.map(j => j.id === job.id ? { ...j, status: 'In progress' } : j))
                                      showToast(`Work order ${job.id} restoration cancelled. Status reverted.`, 'info')
                                    } else {
                                      next.add(job.id)
                                      setFieldJobs(fieldJobs.map(j => j.id === job.id ? { ...j, status: 'Completed' } : j))
                                      showToast(`Work order ${job.id} marked as Restored/Completed successfully!`, 'success')
                                    }
                                    return next
                                  })
                                }}
                                className={`button text-xs ${restoredJobs.has(job.id) ? 'bg-brand/20 text-brand border border-brand/40 hover:bg-brand/30' : 'button-primary bg-success hover:bg-success-dark'}`}
                              >
                                <Icon name="check" className="size-3.5" /> {restoredJobs.has(job.id) ? 'Cancel Restore' : 'Mark Restored'}
                              </button>
                            </div>
                            <p className="text-[0.7rem] text-muted flex items-center gap-1.5">
                              <Icon name="shield" className="size-3.5 text-warning" />
                              Ensure site voltage test is zero before handling lines or transformers.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeSection === 'field-safety' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">Safety Guidelines</h1>
                    <p className="text-xs text-muted mt-1">Electrical safety procedures for field crews</p>
                  </div>
                  <div className="card p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="grid size-10 place-items-center rounded-lg bg-warning-soft text-warning"><Icon name="alert" className="size-5" /></span>
                      <div>
                        <h3 className="font-bold">Always treat lines as live</h3>
                        <p className="text-sm text-muted">Maintain minimum 10m clearance from fallen power lines</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand"><Icon name="shield" className="size-5" /></span>
                      <div>
                        <h3 className="font-bold">PPE Required</h3>
                        <p className="text-sm text-muted">Hard hat, insulated gloves, safety boots, and high-vis vest at all times</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="grid size-10 place-items-center rounded-lg bg-blue-soft text-blue"><Icon name="phone" className="size-5" /></span>
                      <div>
                        <h3 className="font-bold">Emergency Contact</h3>
                        <p className="text-sm text-muted">Call 7090 8000 immediately in case of electrical emergencies</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Admin System & Analytics View */}
          {role === 'admin' && (
            <div className="space-y-6">
              {activeSection === 'admin-system' && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-extrabold tracking-tight">System & Infrastructure Admin</h1>
                      <p className="text-xs text-muted mt-1">
                        National utility telemetry, server status, security audits, and access management.
                      </p>
                    </div>
                    <button onClick={() => setShowAddStaff(true)} className="button button-primary text-xs">
                      <Icon name="plus" className="size-3.5" /> Add Staff
                    </button>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <div className="card p-5">
                      <span className="badge badge-blue">Telemetry Server</span>
                      <p className="mt-3 text-2xl font-extrabold text-ink">99.94%</p>
                      <p className="text-xs text-muted mt-0.5">Uptime across national SCADA links</p>
                    </div>
                    <div className="card p-5">
                      <span className="badge badge-amber">Public Inquiries</span>
                      <p className="mt-3 text-2xl font-extrabold text-ink">{publicReports.length} Total</p>
                      <p className="text-xs text-muted mt-0.5">Logged today across all provinces</p>
                    </div>
                    <div className="card p-5">
                      <span className="badge badge-red">Active Dispatches</span>
                      <p className="mt-3 text-2xl font-extrabold text-ink">14 Teams</p>
                      <p className="text-xs text-muted mt-0.5">Currently mobilized in the field</p>
                    </div>
                  </div>

                  <div className="card p-6">
                    <h3 className="font-extrabold text-base mb-4">Staff Directory</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-line text-xs text-muted">
                            <th className="text-left font-semibold py-2">ID</th>
                            <th className="text-left font-semibold py-2">Name</th>
                            <th className="text-left font-semibold py-2">Email</th>
                            <th className="text-left font-semibold py-2">Role</th>
                            <th className="text-left font-semibold py-2">Department</th>
                            <th className="text-left font-semibold py-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {staffUsers.map((staff) => (
                            <tr key={staff.id} className="border-b border-line last:border-0">
                              <td className="py-2.5 font-mono text-xs text-muted">{staff.id}</td>
                              <td className="py-2.5 font-semibold text-ink">{staff.name}</td>
                              <td className="py-2.5 text-muted">{staff.email}</td>
                              <td className="py-2.5">
                                <span className={`badge ${staff.role === 'admin' ? 'badge-blue' : staff.role === 'operations' ? 'badge-amber' : staff.role === 'field' ? 'badge-green' : ''}`}>
                                  {staff.role}
                                </span>
                              </td>
                              <td className="py-2.5 text-muted">{staff.department}</td>
                              <td className="py-2.5">
                                <span className={`badge ${staff.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                                  {staff.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {activeSection === 'admin-users' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-extrabold tracking-tight">User Management</h1>
                      <p className="text-xs text-muted mt-1">Manage staff accounts and permissions</p>
                    </div>
                    <button onClick={() => setShowAddStaff(true)} className="button button-primary text-xs">
                      <Icon name="plus" className="size-3.5" /> Add Staff
                    </button>
                  </div>
                  <div className="card p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-line text-xs text-muted">
                            <th className="text-left font-semibold py-2">ID</th>
                            <th className="text-left font-semibold py-2">Name</th>
                            <th className="text-left font-semibold py-2">Email</th>
                            <th className="text-left font-semibold py-2">Role</th>
                            <th className="text-left font-semibold py-2">Department</th>
                            <th className="text-left font-semibold py-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {staffUsers.map((staff) => (
                            <tr key={staff.id} className="border-b border-line last:border-0">
                              <td className="py-2.5 font-mono text-xs text-muted">{staff.id}</td>
                              <td className="py-2.5 font-semibold">{staff.name}</td>
                              <td className="py-2.5 text-muted">{staff.email}</td>
                              <td className="py-2.5"><span className="badge">{staff.role}</span></td>
                              <td className="py-2.5 text-muted">{staff.department}</td>
                              <td className="py-2.5"><span className="badge badge-green">{staff.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Call Centre View */}
          {role === 'staff' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">Call Centre</h1>
                <p className="text-xs text-muted mt-1">Create reports for callers, look up cases, explain status, and record feedback</p>
              </div>

              {/* Metrics */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="phone" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{ccCallsToday}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Calls Today</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Reports Created</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="search" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{ccCaseLookups}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Case Lookups</p>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 border-b border-line pb-2">
                {(['create', 'lookup', 'feedback'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCcActiveTab(tab)}
                    className={`px-4 py-2 text-xs font-bold rounded-t-lg transition ${
                      ccActiveTab === tab ? 'bg-brand text-white' : 'text-muted hover:text-ink hover:bg-surface-raised'
                    }`}
                  >
                    {tab === 'create' ? 'Create Report' : tab === 'lookup' ? 'Case Lookup' : 'Record Feedback'}
                  </button>
                ))}
              </div>

              {/* Create Report Tab */}
              {ccActiveTab === 'create' && (
                <div className="card p-6">
                  <h3 className="font-extrabold text-base mb-4">Create Report for Caller</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setCcCallsToday((c) => c + 1)
                      const caseNumber = 'PNG-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-26'
                      showToast(`Report ${caseNumber} created for ${ccCallerName || 'caller'}`, 'success')
                      setCcCallerName('')
                      setCcCallerPhone('')
                      setCcLocation('')
                      setCcDescription('')
                    }}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-ink mb-1">Caller Name</label>
                        <input
                          value={ccCallerName}
                          onChange={(e) => setCcCallerName(e.target.value)}
                          placeholder="Caller's full name"
                          className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-ink mb-1">Caller Phone</label>
                        <input
                          value={ccCallerPhone}
                          onChange={(e) => setCcCallerPhone(e.target.value)}
                          placeholder="Phone number"
                          className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-ink mb-1">Issue Type</label>
                        <input
                          list="issue-types"
                          value={ccIssueType}
                          onChange={(e) => setCcIssueType(e.target.value)}
                          placeholder="Type or select an issue type"
                          className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        />
                        <datalist id="issue-types">
                          <option value="Power outage (Area blackout)" />
                          <option value="Single household outage" />
                          <option value="Fallen power line / wire on ground" />
                          <option value="Transformer explosion / smoke / spark" />
                          <option value="Damaged or leaning power pole" />
                          <option value="Streetlight failure" />
                          <option value="Easipay meter error code" />
                          <option value="Low voltage / voltage surge" />
                          <option value="Other electrical hazard" />
                        </datalist>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-ink mb-1">Province</label>
                        <select
                          value={ccProvince}
                          onChange={(e) => setCcProvince(e.target.value)}
                          className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        >
                          <option>Central</option>
                          <option>Chimbu (Simbu)</option>
                          <option>Eastern Highlands</option>
                          <option>East New Britain</option>
                          <option>East Sepik</option>
                          <option>Enga</option>
                          <option>Gulf</option>
                          <option>Hela</option>
                          <option>Jiwaka</option>
                          <option>Madang</option>
                          <option>Manus</option>
                          <option>Milne Bay</option>
                          <option>Morobe</option>
                          <option>National Capital District (NCD)</option>
                          <option>New Ireland</option>
                          <option>Oro (Northern)</option>
                          <option>Sandaun (West Sepik)</option>
                          <option>Southern Highlands</option>
                          <option>West New Britain</option>
                          <option>Western</option>
                          <option>Western Highlands</option>
                          <option>West Sepik</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">Location</label>
                      <input
                        value={ccLocation}
                        onChange={(e) => setCcLocation(e.target.value)}
                        placeholder="Specific location / address"
                        className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">Description</label>
                      <textarea
                        value={ccDescription}
                        onChange={(e) => setCcDescription(e.target.value)}
                        placeholder="Describe the issue as reported by the caller"
                        className="w-full min-h-20 rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm resize-y"
                        required
                      />
                    </div>
                    <button type="submit" className="button button-primary text-xs">
                      <Icon name="plus" className="size-3.5" /> Create Report
                    </button>
                  </form>
                </div>
              )}

              {/* Case Lookup Tab */}
              {ccActiveTab === 'lookup' && (
                <div className="space-y-4">
                  <div className="card p-6">
                    <h3 className="font-extrabold text-base mb-4">Find Case by Reference Number</h3>
                    <div className="flex gap-2">
                      <input
                        value={ccLookupCase}
                        onChange={(e) => setCcLookupCase(e.target.value)}
                        placeholder="Enter case number (e.g., PNG-XXXX-26)"
                        className="flex-1 rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                      />
                      <button
                        onClick={() => {
                          setCcCaseLookups((c) => c + 1)
                          const found = publicReports.find((r) => r.caseNumber === ccLookupCase.trim())
                          if (found) {
                            setCcLookupResult(found)
                            setCcLookupError('')
                          } else {
                            setCcLookupResult(null)
                            setCcLookupError('No case found with that reference number.')
                          }
                        }}
                        className="button button-primary text-xs"
                      >
                        <Icon name="search" className="size-3.5" /> Search
                      </button>
                    </div>
                  </div>

                  {ccLookupError && (
                    <div className="card p-4 border-brand/30 bg-brand-soft text-brand-dark text-sm">
                      {ccLookupError}
                    </div>
                  )}

                  {ccLookupResult && (
                    <div className="card p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-base">Case Details</h3>
                        <span className="badge badge-amber">{ccLookupResult.status}</span>
                      </div>
                      <div className="grid gap-2 text-sm">
                        <div><span className="font-bold text-muted">Case Number:</span> {ccLookupResult.caseNumber}</div>
                        <div><span className="font-bold text-muted">Issue Type:</span> {ccLookupResult.issueType}</div>
                        <div><span className="font-bold text-muted">Location:</span> {ccLookupResult.location} ({ccLookupResult.province})</div>
                        <div><span className="font-bold text-muted">Description:</span> {ccLookupResult.description}</div>
                        <div><span className="font-bold text-muted">Reported:</span> {ccLookupResult.createdAt}</div>
                        <div><span className="font-bold text-muted">Contact:</span> {ccLookupResult.phone || 'N/A'} ({ccLookupResult.contactPreference})</div>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-surface-raised border border-line">
                        <p className="text-xs font-bold text-ink mb-1">Status Explanation for Caller:</p>
                        <p className="text-sm text-muted">
                          {ccLookupResult.status === 'Under review' && 'Your report has been received and is currently being reviewed by our operations team. We will assign a crew shortly.'}
                          {ccLookupResult.status === 'Crew assigned' && 'A field crew has been assigned to your case and will be dispatched to your location soon.'}
                          {ccLookupResult.status === 'In progress' && 'Our field crew is currently working on resolving your issue. They should arrive or have arrived at your location.'}
                          {ccLookupResult.status === 'Resolved' && 'Your issue has been resolved. If you continue to experience problems, please contact us again.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Feedback Tab */}
              {ccActiveTab === 'feedback' && (
                <div className="space-y-4">
                  <div className="card p-6">
                    <h3 className="font-extrabold text-base mb-4">Record Caller Feedback</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-ink mb-1">Case Number (optional)</label>
                        <input
                          value={ccFeedbackCase}
                          onChange={(e) => setCcFeedbackCase(e.target.value)}
                          placeholder="Reference case number"
                          className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-ink mb-1">Feedback / Notes</label>
                        <textarea
                          value={ccFeedback}
                          onChange={(e) => setCcFeedback(e.target.value)}
                          placeholder="Record caller feedback, complaints, or notes from the call..."
                          className="w-full min-h-24 rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm resize-y"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (ccFeedback.trim()) {
                            setCcCallsToday((c) => c + 1)
                            showToast('Feedback recorded successfully', 'success')
                            setCcFeedback('')
                            setCcFeedbackCase('')
                          }
                        }}
                        className="button button-primary text-xs"
                      >
                        <Icon name="document" className="size-3.5" /> Save Feedback
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Regional Coordinator View */}
          {role === 'regional_coordinator' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">Regional Triage</h1>
                <p className="text-xs text-muted mt-1">Review incoming work, confirm incident links, assign work orders</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Pending Triage</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{incidentsList.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Suggested Links</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="team" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{fieldJobs.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Work Orders Assigned</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.filter(r => r.status === 'Under review').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Overdue Reviews</p>
                </div>
              </div>
              <div className="card overflow-hidden">
                <div className="flex items-center justify-between border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Triage Queue</h3>
                  <span className="badge badge-blue">{publicReports.filter(r => r.status === 'Under review').length} pending</span>
                </div>
                <div className="divide-y divide-line">
                  {publicReports.filter(r => r.status === 'Under review').map((report) => (
                    <div key={report.caseNumber} className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-brand-dark bg-brand-soft px-2 py-0.5 rounded">{report.caseNumber}</span>
                            <span className="badge badge-amber">{report.issueType}</span>
                          </div>
                          <p className="text-xs text-muted mt-1">{report.location} ({report.province})</p>
                          <p className="text-xs text-muted mt-0.5">{report.description}</p>
                          {report.phone && <p className="text-xs text-brand font-semibold mt-1">Contact: {report.phone}</p>}
                        </div>
                        <div className="flex flex-wrap gap-2 shrink-0">
                          <button onClick={() => { onUpdateReportStatus?.(report.caseNumber, 'Crew assigned'); showToast('Report ' + report.caseNumber + ' linked to incident', 'success') }} className="button button-primary text-xs">Link to Incident</button>
                          <button onClick={() => createWorkOrder(report)} className="button button-secondary text-xs">Create Work Order</button>
                          <button onClick={() => showToast(report.caseNumber + ' marked as duplicate', 'info')} className="button button-secondary text-xs">Mark Duplicate</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {publicReports.filter(r => r.status === 'Under review').length === 0 && (
                    <div className="p-8 text-center text-sm text-muted">No reports pending triage.</div>
                  )}
                </div>
              </div>

              {/* Suggested Incident Links */}
              <div className="card overflow-hidden">
                <div className="border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Suggested Incident Links</h3>
                  <p className="text-xs text-muted mt-0.5">System-suggested groupings based on location and issue type</p>
                </div>
                <div className="divide-y divide-line">
                  {incidentsList.slice(0, 2).map((incident) => {
                    const isConfirmed = confirmedLinks.has(incident.id)
                    const isRejected = rejectedLinks.has(incident.id)
                    if (isRejected) return null
                    return (
                    <div key={incident.id} className="p-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-muted">{incident.id}</span>
                          <span className="text-xs font-bold text-ink">{incident.title}</span>
                          {isConfirmed && <span className="badge badge-green">Confirmed</span>}
                        </div>
                        <p className="text-xs text-muted mt-0.5">{incident.meta}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setConfirmedLinks((prev) => {
                              const next = new Set(prev)
                              if (next.has(incident.id)) {
                                next.delete(incident.id)
                                showToast(`Link to ${incident.id} unconfirmed`, 'info')
                              } else {
                                next.add(incident.id)
                                showToast(`Confirmed link to ${incident.id}`, 'success')
                              }
                              return next
                            })
                          }}
                          className={`button text-xs ${isConfirmed ? 'bg-brand/20 text-brand border border-brand/40 hover:bg-brand/30' : 'button-primary'}`}
                        >
                          {isConfirmed ? 'Unconfirm' : 'Confirm Link'}
                        </button>
                        <button
                          onClick={() => {
                            setRejectedLinks((prev) => {
                              const next = new Set(prev)
                              next.add(incident.id)
                              showToast(`Link to ${incident.id} rejected`, 'info')
                              return next
                            })
                            // Also remove from confirmed if it was confirmed
                            setConfirmedLinks((prev) => {
                              const next = new Set(prev)
                              next.delete(incident.id)
                              return next
                            })
                          }}
                          className="button button-secondary text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                    )
                  })}
                  {incidentsList.slice(0, 2).filter(i => !rejectedLinks.has(i.id)).length === 0 && (
                    <div className="p-8 text-center text-sm text-muted">All suggested links processed.</div>
                  )}
                </div>
              </div>

              {/* Work Order Assignment */}
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-4">Assign Work Order</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Select Report</label>
                    <select
                      value={awoReport}
                      onChange={(e) => setAwoReport(e.target.value)}
                      className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                    >
                      <option value="">-- Select a report --</option>
                      {publicReports.map((r) => (
                        <option key={r.caseNumber} value={r.caseNumber}>{r.caseNumber} - {r.issueType}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Assign to Team</label>
                    <select
                      value={awoTeam}
                      onChange={(e) => setAwoTeam(e.target.value)}
                      className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                    >
                      <option>NCD Dispatch</option>
                      <option>Lae Field Team</option>
                      <option>Mt Hagen Center</option>
                      <option>Kokopo Regional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Accountable Owner</label>
                    <select
                      value={awoOwner}
                      onChange={(e) => setAwoOwner(e.target.value)}
                      className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                    >
                      <option value="">-- Select owner --</option>
                      {staffUsers.filter(u => u.role === 'field' || u.role === 'operations').map((u) => (
                        <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Next Action</label>
                    <input
                      value={awoAction}
                      onChange={(e) => setAwoAction(e.target.value)}
                      placeholder="e.g., Inspect transformer"
                      className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!awoReport) {
                      showToast('Please select a report', 'error')
                      return
                    }
                    const report = publicReports.find(r => r.caseNumber === awoReport)
                    const owner = staffUsers.find(u => u.id === awoOwner)
                    const woNumber = 'WO-' + Math.random().toString(36).substring(2, 6).toUpperCase()
                    setFieldJobs([...fieldJobs, {
                      id: woNumber,
                      title: awoAction || report?.issueType || 'New work order',
                      place: report ? `${report.location} (${report.province})` : 'Unknown',
                      priority: 'Normal',
                      time: 'Just assigned',
                      status: 'Assigned',
                    }])
                    showToast(`Work order ${woNumber} assigned to ${awoTeam} for ${awoReport}`, 'success')
                    setAwoReport('')
                    setAwoAction('')
                  }}
                  className="button button-primary text-xs mt-4"
                >
                  <Icon name="plus" className="size-3.5" /> Assign Work Order
                </button>
              </div>

              {/* Overdue Reviews */}
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Overdue Reviews</h3>
                <p className="text-xs text-muted mb-3">Reports that have been under review for too long and need attention</p>
                <div className="space-y-2">
                  {publicReports.filter(r => r.status === 'Under review').slice(0, 5).map((r) => (
                    <div key={r.caseNumber} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-b border-line last:border-0">
                      <div>
                        <p className="text-xs font-bold text-ink">{r.caseNumber}</p>
                        <p className="text-[0.7rem] text-muted">{r.issueType} - {r.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge badge-red">Overdue</span>
                        <button onClick={() => { onUpdateReportStatus?.(r.caseNumber, 'Crew assigned'); showToast(`${r.caseNumber} reviewed and assigned`, 'success') }} className="button button-primary text-xs">Review Now</button>
                        <button onClick={() => showToast(`${r.caseNumber} escalated to regional manager`, 'info')} className="button button-secondary text-xs">Escalate</button>
                        <button onClick={() => showToast(`${r.caseNumber} dismissed from overdue list`, 'info')} className="button button-secondary text-xs">Dismiss</button>
                      </div>
                    </div>
                  ))}
                  {publicReports.filter(r => r.status === 'Under review').length === 0 && (
                    <p className="text-xs text-muted">No overdue reviews. All reports are being processed.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Regional Manager View */}
          {role === 'regional_manager' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">Regional Performance</h1>
                <p className="text-xs text-muted mt-1">Service performance, recurring issues, resource blockers</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Total Reports</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="check" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.filter(r => r.status === 'Resolved').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Resolved</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.filter(r => r.status !== 'Resolved').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Open / Pending</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{incidentsList.filter(i => i.priority === 'Critical' || i.priority === 'High').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">High Priority Incidents</p>
                </div>
              </div>

              {/* Reports by Province */}
              <div className="card overflow-hidden">
                <div className="border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Reports by Province</h3>
                </div>
                <div className="divide-y divide-line">
                  {Array.from(new Set(publicReports.map(r => r.province))).map((prov) => {
                    const count = publicReports.filter(r => r.province === prov).length
                    const resolved = publicReports.filter(r => r.province === prov && r.status === 'Resolved').length
                    return (
                      <div key={prov} className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-sm text-ink">{prov}</p>
                          <p className="text-xs text-muted">{count} total  -  {resolved} resolved</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 rounded-full bg-surface-raised overflow-hidden">
                            <div className="h-full bg-success rounded-full" style={{ width: `${count > 0 ? (resolved / count) * 100 : 0}%` }} />
                          </div>
                          <span className="text-xs font-bold text-muted">{count > 0 ? Math.round((resolved / count) * 100) : 0}%</span>
                        </div>
                      </div>
                    )
                  })}
                  {publicReports.length === 0 && (
                    <div className="p-8 text-center text-sm text-muted">No reports to display.</div>
                  )}
                </div>
              </div>

              {/* Open Reports Requiring Attention */}
              <div className="card overflow-hidden">
                <div className="border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Open Reports Requiring Attention</h3>
                </div>
                <div className="divide-y divide-line">
                  {publicReports.filter(r => r.status !== 'Resolved').map((report) => (
                    <div key={report.caseNumber} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-brand-dark bg-brand-soft px-2 py-0.5 rounded">{report.caseNumber}</span>
                          <span className="badge badge-amber">{report.status}</span>
                        </div>
                        <p className="text-xs text-muted mt-1">{report.issueType}  -  {report.location} ({report.province})</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => showToast(`Escalated ${report.caseNumber} to regional coordinator`, 'success')} className="button button-primary text-xs">Escalate</button>
                        <button onClick={() => showToast(`Reassigned ${report.caseNumber}`, 'info')} className="button button-secondary text-xs">Reassign</button>
                        <button onClick={() => showToast(`Resource request sent for ${report.caseNumber}`, 'info')} className="button button-secondary text-xs">Request Resources</button>
                      </div>
                    </div>
                  ))}
                  {publicReports.filter(r => r.status !== 'Resolved').length === 0 && (
                    <div className="p-8 text-center text-sm text-muted">All reports resolved.</div>
                  )}
                </div>
              </div>

              {/* Recurring Issues & Resource Blockers */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="card p-5">
                  <h3 className="font-extrabold text-base mb-3">Recurring Issues</h3>
                  <div className="space-y-2">
                    {incidentsList.filter(i => i.priority === 'High' || i.priority === 'Critical').map((inc) => (
                      <div key={inc.id} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                        <div>
                          <p className="text-xs font-bold text-ink">{inc.title}</p>
                          <p className="text-[0.7rem] text-muted">{inc.meta}</p>
                        </div>
                        <span className={`badge ${inc.priority === 'Critical' ? 'badge-red' : 'badge-amber'}`}>{inc.priority}</span>
                      </div>
                    ))}
                    {incidentsList.filter(i => i.priority === 'High' || i.priority === 'Critical').length === 0 && (
                      <p className="text-xs text-muted">No recurring issues.</p>
                    )}
                  </div>
                </div>
                <div className="card p-5">
                  <h3 className="font-extrabold text-base mb-3">Resource Blockers</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b border-line">
                      <p className="text-xs text-muted">Crew availability in Morobe region</p>
                      <span className="badge badge-amber">2 teams</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-line">
                      <p className="text-xs text-muted">Transformer parts shortage (Lae)</p>
                      <span className="badge badge-red">Critical</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <p className="text-xs text-muted">Vehicle maintenance backlog</p>
                      <span className="badge badge-blue">3 vehicles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HQ Admin View */}
          {role === 'hq_admin' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">HQ Configuration</h1>
                <p className="text-xs text-muted mt-1">Manage reference data, access, and national trends</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="user" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{staffUsers.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Active Users</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.length + incidentsList.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Total Reports & Incidents</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="signal" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.filter(r => r.status === 'Resolved').length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Resolved Cases</p>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Configuration</h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => { setShowCategoryModal(true); setNewCategoryName('') }} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Manage Issue Categories
                  </button>
                  <button onClick={() => { setShowRegionModal(true); setNewRegionName(''); setNewRegionCode('') }} className="button button-secondary text-xs">
                    <Icon name="map" className="size-3.5" /> Manage Regions
                  </button>
                  <button onClick={() => { setShowTeamModal(true); setNewTeamName(''); setNewTeamRegion('') }} className="button button-secondary text-xs">
                    <Icon name="team" className="size-3.5" /> Manage Teams
                  </button>
                </div>
              </div>

              {/* User Access Management */}
              <div className="card overflow-hidden">
                <div className="border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">User Access Management</h3>
                </div>
                <div className="divide-y divide-line">
                  {staffUsers.map((staff) => (
                    <div key={staff.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-ink">{staff.name}</p>
                        <p className="text-xs text-muted">{staff.email}  -  {staff.department}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge">{staff.role}</span>
                        <span className={`badge ${staff.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{staff.status}</span>
                        <button onClick={() => { setEditAccessUser(staff); setEditAccessRole(staff.role); setEditAccessDept(staff.department); setEditAccessStatus(staff.status); setShowEditAccessModal(true) }} className="button button-secondary text-xs">Edit Access</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* National Trends */}
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">National Trends</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-line">
                    <span className="text-xs text-muted">Most reported issue</span>
                    <span className="text-xs font-bold text-ink">{(() => {
                      if (publicReports.length === 0) return 'N/A'
                      const counts: Record<string, number> = {}
                      publicReports.forEach(r => { counts[r.issueType] = (counts[r.issueType] || 0) + 1 })
                      return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
                    })()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-line">
                    <span className="text-xs text-muted">Highest incident province</span>
                    <span className="text-xs font-bold text-ink">{(() => {
                      if (publicReports.length === 0) return 'N/A'
                      const counts: Record<string, number> = {}
                      publicReports.forEach(r => { counts[r.province] = (counts[r.province] || 0) + 1 })
                      return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
                    })()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-line">
                    <span className="text-xs text-muted">Average resolution time</span>
                    <span className="text-xs font-bold text-ink">4.2 hours</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-muted">Resolution rate</span>
                    <span className="text-xs font-bold text-ink">{publicReports.length > 0 ? Math.round((publicReports.filter(r => r.status === 'Resolved').length / publicReports.length) * 100) : 0}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Admin View */}
          {role === 'system_admin' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">System Health</h1>
                <p className="text-xs text-muted mt-1">Maintain configuration and service health</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="check" /></span>
                  <p className="mt-4 text-3xl font-extrabold">99.9%</p>
                  <p className="mt-1 text-xs font-medium text-muted">API Uptime</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">DB Connections</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0ms</p>
                  <p className="mt-1 text-xs font-medium text-muted">Avg Response Time</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Errors Today</p>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">System Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => showToast('System logs opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> View Logs
                  </button>
                  <button onClick={() => showToast('Access management opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="lock" className="size-3.5" /> Manage Access
                  </button>
                  <button onClick={() => showToast('System configuration opened', 'info')} className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Configuration
                  </button>
                </div>
              </div>

              {/* Service Status */}
              <div className="card overflow-hidden">
                <div className="border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Service Status</h3>
                </div>
                <div className="divide-y divide-line">
                  {[
                    { name: 'API Server', status: 'Online', color: 'badge-green' },
                    { name: 'Database (MySQL)', status: 'Online', color: 'badge-green' },
                    { name: 'Auth Service', status: 'Online', color: 'badge-green' },
                    { name: 'File Storage', status: 'Online', color: 'badge-green' },
                    { name: 'Email Service', status: 'Degraded', color: 'badge-amber' },
                  ].map((svc) => (
                    <div key={svc.name} className="p-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-ink">{svc.name}</span>
                      <span className={`badge ${svc.color}`}>{svc.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent System Logs */}
              <div className="card overflow-hidden">
                <div className="border-b border-line p-5 bg-surface-raised/40">
                  <h3 className="font-extrabold text-base">Recent System Logs</h3>
                </div>
                <div className="divide-y divide-line font-mono text-xs">
                  {[
                    { time: '10:42 AM', level: 'INFO', msg: 'User login: admin.hq@pngpower.com.pg' },
                    { time: '10:38 AM', level: 'INFO', msg: 'Report created: PNG-6K8R-24' },
                    { time: '10:35 AM', level: 'WARN', msg: 'High latency detected on /api/reports' },
                    { time: '10:30 AM', level: 'INFO', msg: 'Database connection pool refreshed' },
                    { time: '10:25 AM', level: 'ERROR', msg: 'Email service timeout (retry 2/3)' },
                  ].map((log, idx) => (
                    <div key={idx} className="p-3 flex items-start gap-3">
                      <span className="text-muted shrink-0">{log.time}</span>
                      <span className={`badge ${log.level === 'ERROR' ? 'badge-red' : log.level === 'WARN' ? 'badge-amber' : 'badge-blue'}`}>{log.level}</span>
                      <span className="text-ink">{log.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {mobileOpen && (
        <button
          className="fixed inset-0 z-30 bg-sidebar/60 lg:hidden"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {showAddStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">Add New Staff</h3>
              <button onClick={() => setShowAddStaff(false)} className="text-muted hover:text-ink">
                <Icon name="close" className="size-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-700">Full Name</label>
                <input
                  value={newStaff.name || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  value={newStaff.email || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-700">Role</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as AdminRole })}
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
                  value={newStaff.department || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={handleAddStaff} className="button button-primary flex-1">Add Staff</button>
                <button onClick={() => setShowAddStaff(false)} className="button button-secondary flex-1">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
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
                    showToast(`Log note added to ${noteJobId}: ${noteText}`, 'success')
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
}