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
      title: 'Area outage — Gerehu Stage 3',
      meta: '14 linked reports · NCD',
      priority: 'High',
      status: 'Crew assigned',
      time: '18 min ago',
      province: 'NCD',
    },
    {
      id: 'INC-2047',
      title: 'Transformer fault — Lae Market',
      meta: '7 linked reports · Morobe',
      priority: 'Critical',
      status: 'In progress',
      time: '34 min ago',
      province: 'Morobe',
    },
    {
      id: 'INC-2046',
      title: 'Damaged pole — Kokopo Road',
      meta: '3 linked reports · East New Britain',
      priority: 'Medium',
      status: 'Under review',
      time: '1 hr ago',
      province: 'East New Britain',
    },
    {
      id: 'INC-2045',
      title: 'Intermittent supply — Boroko',
      meta: '5 linked reports · NCD',
      priority: 'Medium',
      status: 'Pending parts',
      time: '2 hrs ago',
      province: 'NCD',
    },
  ])

  const [filter, setFilter] = useState('All incidents')
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

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

  function handleAddStaff() {
    const id = `STF-${String(staffUsers.length + 1).padStart(3, '0')}`
    setStaffUsers([...staffUsers, { ...(newStaff as StaffUser), id }])
    setShowAddStaff(false)
    setNewStaff({ role: 'staff', status: 'Active', department: 'Operations' })
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
                  placeholder="••••••••"
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
            ✓
          </span>
          <span className="font-bold">PNG POWER INTERNAL WORKSPACE</span>
          <span className="hidden sm:inline text-white/70">
            · Signed in as <strong className="text-white">{username}</strong> ({role.toUpperCase()})
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
                  <p className="mt-4 text-3xl font-extrabold tracking-tight">186</p>
                  <p className="mt-1 text-xs font-medium text-muted">Open Resident Tickets</p>
                </div>

                <div className="card p-5">
                  <div className="flex items-start justify-between">
                    <span className="icon-tile metric-red">
                      <Icon name="alert" />
                    </span>
                    <span className="text-xs font-semibold text-brand font-bold">8 Critical</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold tracking-tight">42</p>
                  <p className="mt-1 text-xs font-medium text-muted">Active Feeder Incidents</p>
                </div>

                <div className="card p-5">
                  <div className="flex items-start justify-between">
                    <span className="icon-tile metric-green">
                      <Icon name="team" />
                    </span>
                    <span className="text-xs font-semibold text-muted">5 Regions</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold tracking-tight">17</p>
                  <p className="mt-1 text-xs font-medium text-muted">Field Crews Deployed</p>
                </div>

                <div className="card p-5">
                  <div className="flex items-start justify-between">
                    <span className="icon-tile metric-amber">
                      <Icon name="clock" />
                    </span>
                    <span className="text-xs font-semibold text-muted">Oldest: 2h 15m</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold tracking-tight">19</p>
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
                          <strong>Location:</strong> {report.location} ({report.province}) · {report.description}
                        </p>
                        {report.phone && (
                          <p className="text-xs text-brand font-semibold mt-1">
                            Contact: {report.phone} ({report.contactPreference})
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          onClick={() => alert(`Assigned dispatch crew to Case ${report.caseNumber}`)}
                          className="button button-primary text-xs"
                        >
                          Dispatch Crew
                        </button>
                        <button
                          onClick={() => alert(`Case ${report.caseNumber} marked as under review`)}
                          className="button button-secondary text-xs"
                        >
                          Review
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
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-muted">{incident.id}</span>
                                <span className={`badge ${incident.priority === 'Critical' ? 'badge-red' : incident.priority === 'High' ? 'badge-amber' : 'badge-blue'}`}>{incident.priority}</span>
                              </div>
                              <p className="font-bold text-sm mt-1">{incident.title}</p>
                              <p className="text-xs text-muted">{incident.meta} · {incident.time}</p>
                            </div>
                            <span className="text-xs font-bold text-brand-dark bg-brand-soft px-2.5 py-1 rounded-full">{incident.status}</span>
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
                              <button onClick={() => onUpdateReportStatus?.(report.caseNumber, 'Crew assigned')} className="button button-primary text-xs">Assign Crew</button>
                              <button onClick={() => onUpdateReportStatus?.(report.caseNumber, 'In progress')} className="button button-secondary text-xs">Mark In Progress</button>
                              <button onClick={() => onUpdateReportStatus?.(report.caseNumber, 'Resolved')} className="button button-secondary text-xs">Resolve</button>
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
                        Team Delta · Assigned mobile assignments & offline synchronization
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
                                onClick={() => alert(`Opening camera for site photo at ${job.place}`)}
                                className="button button-secondary text-xs"
                              >
                                <Icon name="plus" className="size-3.5" /> Take Site Photo
                              </button>
                              <button
                                onClick={() => {
                                  alert(`Work order ${job.id} marked as Restored/Completed!`)
                                  setFieldJobs(fieldJobs.map(j => j.id === job.id ? { ...j, status: 'Completed' } : j))
                                }}
                                className="button button-primary text-xs bg-success hover:bg-success-dark"
                              >
                                <Icon name="check" className="size-3.5" /> Mark Restored
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
                <p className="text-xs text-muted mt-1">Create reports for callers, find cases, and explain status</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="card p-5">
                  <span className="icon-tile metric-blue"><Icon name="phone" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Calls Today</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">{publicReports.length}</p>
                  <p className="mt-1 text-xs font-medium text-muted">Reports Created</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="search" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Case Lookups</p>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="button button-primary text-xs">
                    <Icon name="plus" className="size-3.5" /> Create Report for Caller
                  </button>
                  <button className="button button-secondary text-xs">
                    <Icon name="search" className="size-3.5" /> Find Case by Number
                  </button>
                  <button className="button button-secondary text-xs">
                    <Icon name="document" className="size-3.5" /> Record Feedback
                  </button>
                </div>
              </div>
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
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Suggested Links</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="team" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Work Orders Assigned</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Overdue Reviews</p>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Pending Actions</h3>
                <p className="text-sm text-muted">Review suggested report-to-incident links and confirm or correct groupings.</p>
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
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Resolved</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="clock" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Overdue</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-red"><Icon name="alert" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Recurring Issues</p>
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
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Active Users</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-green"><Icon name="document" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">Reference Data Items</p>
                </div>
                <div className="card p-5">
                  <span className="icon-tile metric-amber"><Icon name="signal" /></span>
                  <p className="mt-4 text-3xl font-extrabold">0</p>
                  <p className="mt-1 text-xs font-medium text-muted">National Trends</p>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">Configuration</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Manage Issue Categories
                  </button>
                  <button className="button button-secondary text-xs">
                    <Icon name="map" className="size-3.5" /> Manage Regions
                  </button>
                  <button className="button button-secondary text-xs">
                    <Icon name="team" className="size-3.5" /> Manage Teams
                  </button>
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
                  <button className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> View Logs
                  </button>
                  <button className="button button-secondary text-xs">
                    <Icon name="lock" className="size-3.5" /> Manage Access
                  </button>
                  <button className="button button-secondary text-xs">
                    <Icon name="info" className="size-3.5" /> Configuration
                  </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-surface border border-line shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold">Add New Staff</h3>
              <button onClick={() => setShowAddStaff(false)} className="text-muted hover:text-ink">
                <Icon name="close" className="size-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Full Name</label>
                <input
                  value={newStaff.name || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Email</label>
                <input
                  type="email"
                  value={newStaff.email || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Role</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as AdminRole })}
                  className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                >
                  <option value="staff">Staff</option>
                  <option value="field">Field Crew</option>
                  <option value="operations">Operations</option>
                  <option value="admin">Admin HQ</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Department</label>
                <input
                  value={newStaff.department || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                  className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
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
    </div>
  )
}





