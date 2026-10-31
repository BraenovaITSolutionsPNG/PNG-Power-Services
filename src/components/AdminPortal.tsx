import { useState, type ReactNode } from 'react'
import { Icon, Brand, type IconName } from './Icons'
import type { AdminRole, PublicReport, Incident, WorkOrder } from '../types'

interface AdminPortalProps {
  onBackToPublic: () => void
  publicReports: PublicReport[]
  onUpdateReportStatus?: (caseNumber: string, status: PublicReport['status']) => void
}

export function AdminPortal({
  onBackToPublic,
  publicReports,
}: AdminPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState<AdminRole>('operations')
  const [activeSection, setActiveSection] = useState<string>('operations-overview')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Auth inputs
  const [username, setUsername] = useState('ops.lead@pngpower.com.pg')
  const [password, setPassword] = useState('••••••••••••')
  const [authError, setAuthError] = useState('')

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

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!username.trim()) {
      setAuthError('Please enter your staff ID or email')
      return
    }
    setIsAuthenticated(true)
    setAuthError('')
  }

  function handleQuickLogin(targetRole: AdminRole) {
    setRole(targetRole)
    if (targetRole === 'operations') {
      setUsername('ops.lead@pngpower.com.pg')
      setActiveSection('operations-overview')
    } else if (targetRole === 'field') {
      setUsername('crew.delta@pngpower.com.pg')
      setActiveSection('field-assignments')
    } else {
      setUsername('admin.hq@pngpower.com.pg')
      setActiveSection('admin-system')
    }
    setIsAuthenticated(true)
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

            {/* Quick Demo Sign-in selector */}
            <div className="mt-6">
              <p className="text-[0.68rem] font-bold uppercase tracking-wider text-white/50 mb-2">
                1-Click Quick Demo Sign In
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('operations')}
                  className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 p-2 text-center transition"
                >
                  <Icon name="briefcase" className="size-4 mx-auto text-brand-light" />
                  <span className="block mt-1 text-[0.72rem] font-bold">Operations</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('field')}
                  className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 p-2 text-center transition"
                >
                  <Icon name="wrench" className="size-4 mx-auto text-warning" />
                  <span className="block mt-1 text-[0.72rem] font-bold">Field Crew</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 p-2 text-center transition"
                >
                  <Icon name="shield" className="size-4 mx-auto text-blue" />
                  <span className="block mt-1 text-[0.72rem] font-bold">Admin HQ</span>
                </button>
              </div>
            </div>

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

              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">Access Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminRole)}
                  className="w-full rounded-lg border border-white/15 bg-sidebar px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
                >
                  <option value="operations">Operations Center (Triage & Dispatch)</option>
                  <option value="field">Field Technician / Crew</option>
                  <option value="admin">System Administration & Oversight</option>
                </select>
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
            <button
              onClick={() => {
                setRole('operations')
                setActiveSection('operations-overview')
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                role === 'operations' ? 'bg-brand text-white shadow-brand' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <Icon name="briefcase" className="size-4" />
              <span>Operations Hub</span>
              {role === 'operations' && <span className="ml-auto size-1.5 rounded-full bg-white" />}
            </button>

            <button
              onClick={() => {
                setRole('field')
                setActiveSection('field-assignments')
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                role === 'field' ? 'bg-brand text-white shadow-brand' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <Icon name="wrench" className="size-4" />
              <span>Field Crew Work</span>
              {role === 'field' && <span className="ml-auto size-1.5 rounded-full bg-white" />}
            </button>

            <button
              onClick={() => {
                setRole('admin')
                setActiveSection('admin-system')
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                role === 'admin' ? 'bg-brand text-white shadow-brand' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <Icon name="shield" className="size-4" />
              <span>Admin & Analytics</span>
              {role === 'admin' && <span className="ml-auto size-1.5 rounded-full bg-white" />}
            </button>
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

              {/* Active Feeder Incidents */}
              <div className="card overflow-hidden">
                <div className="flex items-center justify-between border-b border-line p-5">
                  <h2 className="text-base font-extrabold">Major Grid & Feeder Incidents</h2>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="control h-9 w-auto py-0 text-xs"
                  >
                    <option>All incidents</option>
                    <option>Critical priority</option>
                    <option>High priority</option>
                  </select>
                </div>
                <div className="divide-y divide-line">
                  {incidentsList.map((incident) => (
                    <div key={incident.id} className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-1 size-3 rounded-full shrink-0 ${
                            incident.priority === 'Critical'
                              ? 'bg-brand'
                              : incident.priority === 'High'
                              ? 'bg-warning'
                              : 'bg-blue'
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-muted">{incident.id}</span>
                            <span
                              className={`badge ${
                                incident.priority === 'Critical'
                                  ? 'badge-red'
                                  : incident.priority === 'High'
                                  ? 'badge-amber'
                                  : 'badge-blue'
                              }`}
                            >
                              {incident.priority}
                            </span>
                          </div>
                          <p className="font-bold text-sm mt-1">{incident.title}</p>
                          <p className="text-xs text-muted">{incident.meta} · {incident.time}</p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs font-bold text-brand-dark bg-brand-soft px-2.5 py-1 rounded-full">
                          {incident.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Field Crew View */}
          {role === 'field' && (
            <div className="space-y-6">
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
                          <button className="button button-secondary text-xs">
                            <Icon name="document" className="size-3.5" /> Add Log Note
                          </button>
                          <button className="button button-secondary text-xs">
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
            </div>
          )}

          {/* Admin System & Analytics View */}
          {role === 'admin' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">System & Infrastructure Admin</h1>
                <p className="text-xs text-muted mt-1">
                  National utility telemetry, server status, security audits, and access management.
                </p>
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
                <h3 className="font-extrabold text-base mb-3">Audit Logs & Activity Feed</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-line">
                    <span>Public report triage auto-routed to Port Moresby Dispatch</span>
                    <span className="text-muted">4 min ago</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-line">
                    <span>Field Crew Delta marked WO-8842 transformer inspection as In Progress</span>
                    <span className="text-muted">34 min ago</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-line">
                    <span>SCADA link to Rouna 2 Hydro validated</span>
                    <span className="text-muted">1 hr ago</span>
                  </div>
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
    </div>
  )
}

