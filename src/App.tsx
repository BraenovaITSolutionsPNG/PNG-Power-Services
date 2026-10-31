import { useState, useEffect } from 'react'
import { PublicLandingPage } from './components/PublicLandingPage'
import { AdminPortal } from './components/AdminPortal'
import type { PublicReport } from './types'

function checkIsAdminRoute(): boolean {
  if (typeof window === 'undefined') return false
  const path = window.location.pathname.toLowerCase()
  const hash = window.location.hash.toLowerCase()
  return (
    path.startsWith('/admin') ||
    path.startsWith('/staff') ||
    path.startsWith('/ops') ||
    path.startsWith('/operations') ||
    hash === '#admin' ||
    hash === '#staff'
  )
}

export default function App() {
  // Mode is determined by manually typing the URL path (e.g. /admin, /staff, #admin)
  const [currentMode, setCurrentMode] = useState<'public' | 'admin'>(() =>
    checkIsAdminRoute() ? 'admin' : 'public'
  )

  useEffect(() => {
    function handleLocationChange() {
      setCurrentMode(checkIsAdminRoute() ? 'admin' : 'public')
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  // Initial public reports so tracker and operations have demo data
  const [reports, setReports] = useState<PublicReport[]>([
    {
      caseNumber: 'PNG-6K8R-24',
      issueType: 'Power outage (Area blackout)',
      province: 'National Capital District',
      location: 'Gerehu Stage 3, near market',
      description: 'Feeder line tripped after heavy rain, 14 households affected.',
      phone: '+675 7123 4567',
      contactPreference: 'SMS update',
      status: 'Crew assigned',
      createdAt: '10:15 AM',
      updatedAt: '10:42 AM',
    },
    {
      caseNumber: 'PNG-4T9J-25',
      issueType: 'Transformer fault & sparking',
      province: 'Morobe',
      location: 'Lae Market, Cassowary Road',
      description: 'Sparks and loud humming heard from pole-mounted transformer.',
      phone: '+675 7988 1234',
      contactPreference: 'Phone call',
      status: 'In progress',
      createdAt: '09:30 AM',
      updatedAt: '10:04 AM',
    },
  ])

  function handleNewReport(newReport: PublicReport) {
    setReports((prev) => [newReport, ...prev])
  }

  function handleUpdateReportStatus(caseNumber: string, status: PublicReport['status']) {
    setReports((prev) =>
      prev.map((r) =>
        r.caseNumber === caseNumber
          ? { ...r, status, updatedAt: 'Just now' }
          : r
      )
    )
  }

  function handleBackToPublic() {
    setCurrentMode('public')
    if (checkIsAdminRoute()) {
      window.history.pushState(null, '', '/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (currentMode === 'admin') {
    return (
      <AdminPortal
        onBackToPublic={handleBackToPublic}
        publicReports={reports}
        onUpdateReportStatus={handleUpdateReportStatus}
      />
    )
  }

  // Public Landing Page (What the public sees by default)
  return (
    <PublicLandingPage
      reports={reports}
      onNewReport={handleNewReport}
    />
  )
}
