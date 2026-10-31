import { useState, useEffect, type FormEvent } from 'react'
import { Icon, Brand, type IconName } from './Icons'
import type { PublicReport } from '../types'
import { NewConnectionPage } from './NewConnectionPage'

const heroSlides = [
  {
    eyebrow: 'Resident & Community Services',
    title: 'Power issue?',
    accent: 'We’re here to help.',
    copy: 'Report outages, fallen power lines, or equipment hazards across Papua New Guinea and follow your case from triage to restoration.',
    image:
      'https://images.unsplash.com/photo-1738932498296-b4ac7a99fabe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1600',
    credit: 'Photo by Emmanuel Umsim on Unsplash',
  },
  {
    eyebrow: 'Transparent Case Tracking',
    title: 'Stay informed.',
    accent: 'Every step of the way.',
    copy: 'Use your unique PNG Power reference number to check live inspection progress, crew dispatch, and estimated restoration times.',
    image:
      'https://images.unsplash.com/photo-1700144068858-17d24f5c2abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1600',
    credit: 'Photo by Dicky Wauyari on Unsplash',
  },
  {
    eyebrow: 'Community Electrical Safety',
    title: 'See a hazard?',
    accent: 'Report it safely.',
    copy: 'Keep well clear of fallen lines and damaged substations. Warn neighbors and notify PNG Power emergency crews immediately.',
    image:
      'https://images.unsplash.com/photo-1700144068853-671567b77ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1600',
    credit: 'Photo by Dicky Wauyari on Unsplash',
  },
]

interface PublicLandingPageProps {
  reports: PublicReport[]
  onNewReport: (report: PublicReport) => void
}

export function PublicLandingPage({
  reports,
  onNewReport,
}: PublicLandingPageProps) {
  const [subView, setSubView] = useState<'home' | 'new-connection'>('home')
  const [heroSlide, setHeroSlide] = useState(0)
  const [showReportForm, setShowReportForm] = useState(false)
  const [submittedCase, setSubmittedCase] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Report form state
  const [issueType, setIssueType] = useState('')
  const [province, setProvince] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [phone, setPhone] = useState('')
  const [contactPreference, setContactPreference] = useState('SMS update')

  // Case lookup state
  const [lookupQuery, setLookupQuery] = useState('')
  const [foundReport, setFoundReport] = useState<PublicReport | null | undefined>(undefined)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroSlides.length)
    }, 7000)
    return () => window.clearInterval(interval)
  }, [])

  const changeHeroSlide = (direction: number) => {
    setHeroSlide((current) => (current + direction + heroSlides.length) % heroSlides.length)
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault()
    const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase()
    const newCaseNumber = `PNG-${randomChars}-26`

    const newReport: PublicReport = {
      caseNumber: newCaseNumber,
      issueType: issueType || 'Power outage',
      province: province || 'National Capital District',
      location,
      description,
      phone: phone || undefined,
      contactPreference,
      status: 'Under review',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedAt: 'Just now',
    }

    onNewReport(newReport)
    setSubmittedCase(newCaseNumber)
    setLookupQuery(newCaseNumber)
    // Clear inputs
    setIssueType('')
    setLocation('')
    setDescription('')
    setPhone('')
  }

  function handleSearchCase() {
    if (!lookupQuery.trim()) {
      setFoundReport(null)
      return
    }
    const cleanQuery = lookupQuery.trim().toUpperCase()
    const match = reports.find(
      (r) => r.caseNumber.toUpperCase() === cleanQuery || r.caseNumber.toUpperCase().includes(cleanQuery)
    )
    if (match) {
      setFoundReport(match)
    } else {
      setFoundReport(null)
    }
  }

  if (subView === 'new-connection') {
    return (
      <NewConnectionPage
        onBackToHome={() => {
          setSubView('home')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col">
      {/* Top Banner / Emergency Alert Strip */}
      <div className="bg-sidebar px-4 py-2 text-xs text-white/80">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-success animate-pulse" />
            <span className="font-semibold text-white">National Power Grid Status:</span>
            <span className="text-white/70">Port Moresby & Ramu systems operating normally</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:70908000"
              className="flex items-center gap-1.5 font-bold text-brand-light hover:underline"
            >
              <Icon name="phone" className="size-3.5" /> 24/7 Hotline: 7090 8000 / 116 (Toll Free)
            </a>
          </div>
        </div>
      </div>

      {/* Main Public Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">
        <div className="page-wrap flex h-20 items-center justify-between gap-4">
          <Brand />

          {/* Desktop Navigation Links (with whitespace-nowrap to prevent text wrapping/stacking) */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 text-sm font-semibold text-ink/80">
            <a href="#services" className="whitespace-nowrap transition hover:text-brand">
              Services
            </a>
            <a href="#report-section" className="whitespace-nowrap transition hover:text-brand">
              Report Issue
            </a>
            <a href="#case-lookup" className="whitespace-nowrap transition hover:text-brand">
              Track Case
            </a>
            <a href="#grid-status" className="whitespace-nowrap transition hover:text-brand">
              Grid Status
            </a>
            <a href="#easipay" className="whitespace-nowrap transition hover:text-brand">
              Easipay & Tariffs
            </a>
            <a href="#safety" className="whitespace-nowrap transition hover:text-brand">
              Safety Advice
            </a>
            <a href="#contact" className="whitespace-nowrap transition hover:text-brand">
              Contact
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setShowReportForm(true)
                setSubmittedCase(null)
                window.setTimeout(() => {
                  document.getElementById('report-section')?.scrollIntoView({ behavior: 'smooth' })
                }, 50)
              }}
              className="button button-primary hidden sm:inline-flex text-xs whitespace-nowrap"
            >
              <Icon name="bolt" className="size-4" /> Report Outage
            </button>

            {/* Mobile / Tablet menu trigger (visible under xl) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid size-10 place-items-center rounded-lg border border-line xl:hidden shrink-0"
              aria-label="Toggle navigation menu"
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} className="size-5" />
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-line bg-white px-5 py-4 xl:hidden space-y-3">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-ink hover:text-brand"
            >
              Services
            </a>
            <a
              href="#report-section"
              onClick={() => {
                setMobileMenuOpen(false)
                setShowReportForm(true)
              }}
              className="block py-2 text-sm font-bold text-ink hover:text-brand"
            >
              Report Outage / Hazard
            </a>
            <a
              href="#case-lookup"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-ink hover:text-brand"
            >
              Check Case Status
            </a>
            <a
              href="#grid-status"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-ink hover:text-brand"
            >
              Live Grid Advisories
            </a>
            <a
              href="#easipay"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-ink hover:text-brand"
            >
              Easipay & Tariffs
            </a>
            <a
              href="#safety"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-ink hover:text-brand"
            >
              Electrical Safety
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-ink hover:text-brand"
            >
              Customer Care & Offices
            </a>
            <div className="pt-3 border-t border-line">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setShowReportForm(true)
                }}
                className="button button-primary w-full text-center"
              >
                <Icon name="bolt" className="size-4" /> Report Outage Now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Carousel Section */}
      <section
        className="hero-slider relative overflow-hidden bg-hero scroll-mt-20"
        aria-roledescription="carousel"
        aria-label="PNG Power public services"
      >
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.image}
              src={slide.image}
              alt=""
              className={`absolute inset-0 size-full object-cover transition duration-700 ${
                heroSlide === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-sidebar via-sidebar/90 to-sidebar/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-sidebar/80 via-transparent to-transparent" />
        </div>

        <div className="page-wrap relative flex min-h-[34rem] items-center py-14 sm:min-h-[38rem] lg:min-h-[42rem]">
          <div key={heroSlide} className="hero-copy max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
              <span className="size-2 rounded-full bg-brand animate-ping" />
              <span className="size-2 rounded-full bg-success absolute" />
              {heroSlides[heroSlide].eyebrow}
            </div>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {heroSlides[heroSlide].title}
              <br />
              <span className="text-brand-light">{heroSlides[heroSlide].accent}</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {heroSlides[heroSlide].copy}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  setShowReportForm(true)
                  setSubmittedCase(null)
                  document.getElementById('report-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="button button-primary text-base"
              >
                Report a power issue <Icon name="arrow" className="size-4" />
              </button>
              <a href="#case-lookup" className="button button-dark text-base">
                Check a case status <Icon name="search" className="size-4" />
              </a>
            </div>

            {/* Quick emergency call out */}
            <div className="mt-8 flex items-center gap-3 text-xs text-white/60">
              <span className="rounded-md bg-warning/20 border border-warning/30 px-2 py-1 font-bold text-warning">
                HAZARD ALERT
              </span>
              <span>Sparks or fallen line? Keep 10m clear and call 7090 8000 immediately.</span>
            </div>
          </div>

          {/* Carousel Slide Indicators & Controls */}
          <div className="absolute bottom-10 left-0 right-0 flex items-center justify-between">
            <div className="flex items-center gap-2" aria-label="Choose hero slide">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  className={`h-1.5 rounded-full transition-all ${
                    heroSlide === index ? 'w-10 bg-brand' : 'w-5 bg-white/35 hover:bg-white/60'
                  }`}
                  onClick={() => setHeroSlide(index)}
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                  aria-current={heroSlide === index}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                className="hero-control"
                onClick={() => changeHeroSlide(-1)}
                aria-label="Previous slide"
              >
                <Icon name="arrow" className="size-5 rotate-180" />
              </button>
              <button
                className="hero-control"
                onClick={() => changeHeroSlide(1)}
                aria-label="Next slide"
              >
                <Icon name="arrow" className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Hotline Banner */}
      <div id="safety" className="page-wrap -mt-6 relative z-10 scroll-mt-24">
        <div className="grid overflow-hidden rounded-2xl border border-warning-line bg-warning-soft shadow-card md:grid-cols-[auto_1fr_auto]">
          <div className="grid w-full place-items-center bg-warning px-5 py-4 text-white md:w-20">
            <Icon name="alert" className="size-7" />
          </div>
          <div className="px-5 py-4">
            <p className="font-bold text-warning-dark">
              See a fallen power line or exposed electrical transformer?
            </p>
            <p className="mt-1 text-sm text-warning-text">
              Treat all wires as live. Keep everyone back at least 10 meters and call our emergency team right away.
            </p>
          </div>
          <div className="flex items-center px-5 pb-4 md:py-4">
            <a
              href="tel:70908000"
              className="flex items-center gap-2 rounded-xl bg-warning-dark px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90 transition"
            >
              <Icon name="phone" className="size-4" /> 7090 8000 (Emergency)
            </a>
          </div>
        </div>
      </div>

      {/* Self-Service Portal Cards */}
      <section id="services" className="page-wrap py-12 sm:py-16 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Public Customer Services</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Everything you need for your power connection
          </h2>
          <p className="mt-3 text-sm text-muted">
            Fast, accessible citizen assistance for homes, communities, and businesses across PNG.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Report Issue */}
          <div
            onClick={() => {
              setShowReportForm(true)
              setSubmittedCase(null)
              document.getElementById('report-section')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="action-card cursor-pointer group"
          >
            <span className="icon-tile bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white transition">
              <Icon name="bolt" className="size-6" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-brand">Outage / Hazard</p>
            <h3 className="mt-1.5 text-xl font-extrabold">Report Power Issue</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Submit blackouts, fallen lines, or transformer sparks. No account number required.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-brand group-hover:translate-x-1 transition">
              Start report <Icon name="arrow" className="size-3.5" />
            </span>
          </div>

          {/* Card 2: Track Case */}
          <a href="#case-lookup" className="action-card group">
            <span className="icon-tile bg-blue-soft text-blue group-hover:bg-blue group-hover:text-white transition">
              <Icon name="search" className="size-6" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-blue">Status Check</p>
            <h3 className="mt-1.5 text-xl font-extrabold">Track Case Status</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Enter your PNG-XXXX-XX case code to check dispatch status and restoration times.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-blue group-hover:translate-x-1 transition">
              Check progress <Icon name="arrow" className="size-3.5" />
            </span>
          </a>

          {/* Card 3: Easipay */}
          <a href="#easipay" className="action-card group">
            <span className="icon-tile bg-success-soft text-success-dark group-hover:bg-success group-hover:text-white transition">
              <Icon name="zap" className="size-6" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-success-dark">Prepaid Power</p>
            <h3 className="mt-1.5 text-xl font-extrabold">Easipay & Tariffs</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Buy prepaid tokens via mobile banking, check residential tariffs, and find vending outlets.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-success-dark group-hover:translate-x-1 transition">
              View instructions <Icon name="arrow" className="size-3.5" />
            </span>
          </a>

          {/* Card 4: New Connections */}
          <div
            onClick={() => {
              setSubView('new-connection')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="action-card group cursor-pointer"
          >
            <span className="icon-tile bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition">
              <Icon name="clipboard" className="size-6" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-purple-600">Application</p>
            <h3 className="mt-1.5 text-xl font-extrabold">New Connection</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Apply for new residential meter, post-paid metering, or load upgrade for commercial sites.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-purple-600 group-hover:translate-x-1 transition">
              Apply & download forms <Icon name="arrow" className="size-3.5" />
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Report & Case Lookup Section */}
      <section id="report-section" className="bg-white py-14 sm:py-18 border-y border-line scroll-mt-20">
        <div className="page-wrap">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Left Column: Issue Reporting Form or Confirmation */}
            <div className="lg:col-span-7">
              {submittedCase ? (
                <div className="rounded-2xl border border-success/30 bg-success-soft/50 p-6 sm:p-10 text-center">
                  <div className="mx-auto grid size-16 place-items-center rounded-full bg-success text-white shadow-md">
                    <Icon name="check" className="size-8" />
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-success-dark">
                    Report Logged Successfully
                  </p>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Thank you for notifying PNG Power
                  </h3>
                  <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
                    Your report has been forwarded to our national operations dispatch center. A field crew will
                    review and prioritize the dispatch.
                  </p>

                  <div className="mt-6 inline-block rounded-xl border border-line bg-white p-5 text-left shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">Your Reference Number</p>
                    <p className="mt-1 font-mono text-3xl font-bold tracking-wider text-brand-dark">
                      {submittedCase}
                    </p>
                    <p className="mt-2 text-xs text-muted">
                      Keep this reference number. You can use it in the tracker anytime to check status updates.
                    </p>
                  </div>

                  <div className="mt-8 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSubmittedCase(null)
                        setShowReportForm(false)
                      }}
                      className="button button-secondary text-sm"
                    >
                      Close Form
                    </button>
                    <button
                      onClick={() => {
                        setSubmittedCase(null)
                        setShowReportForm(true)
                      }}
                      className="button button-primary text-sm"
                    >
                      Submit Another Report
                    </button>
                  </div>
                </div>
              ) : showReportForm ? (
                <form onSubmit={handleFormSubmit} className="card p-6 sm:p-8 border-line">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="eyebrow">Public Fault Report</p>
                      <h3 className="mt-1 text-2xl font-extrabold tracking-tight">
                        Tell us about the power fault
                      </h3>
                      <p className="mt-1 text-xs text-muted">
                        All reports are directly routed to the provincial dispatch team.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowReportForm(false)}
                      className="text-muted hover:text-ink text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Issue Type *
                      </label>
                      <select
                        className="control"
                        required
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}
                      >
                        <option value="" disabled>
                          Select fault type
                        </option>
                        <option>Total Blackout (Neighborhood / Suburb)</option>
                        <option>Single Household Outage</option>
                        <option>Fallen Power Line / Wire on Ground</option>
                        <option>Transformer Explosion / Smoke / Spark</option>
                        <option>Damaged or Leaning Power Pole</option>
                        <option>Streetlight Failure</option>
                        <option>Easipay Meter Error Code</option>
                        <option>Low Voltage / Voltage Surge</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Province *
                      </label>
                      <select
                        className="control"
                        required
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                      >
                        <option value="" disabled>
                          Select province
                        </option>
                        <option>National Capital District (Port Moresby)</option>
                        <option>Central Province</option>
                        <option>Morobe (Lae / Bulolo / Wau)</option>
                        <option>Eastern Highlands (Goroka)</option>
                        <option>Western Highlands (Mt Hagen)</option>
                        <option>East New Britain (Kokopo / Rabaul)</option>
                        <option>Madang</option>
                        <option>New Ireland (Kavieng)</option>
                        <option>West New Britain (Kimbe)</option>
                        <option>Milne Bay (Alotau)</option>
                        <option>Other Province</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Location / Community / Landmark *
                      </label>
                      <input
                        className="control"
                        required
                        placeholder="e.g. Gerehu Stage 3 near Market, or Cassowary Rd Section 12"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Description of Problem *
                      </label>
                      <textarea
                        className="control min-h-24 resize-y"
                        required
                        placeholder="Describe what happened, any sparks, visible damage, or affected area..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Your Mobile Phone (Optional)
                      </label>
                      <input
                        className="control"
                        type="tel"
                        placeholder="e.g. 7123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Updates via
                      </label>
                      <select
                        className="control"
                        value={contactPreference}
                        onChange={(e) => setContactPreference(e.target.value)}
                      >
                        <option>SMS update</option>
                        <option>Phone call</option>
                        <option>No contact required</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                    <p className="text-[0.75rem] text-muted">
                      🔒 Your contact information is only used for fault resolution.
                    </p>
                    <button type="submit" className="button button-primary text-sm">
                      Submit Fault Report <Icon name="arrow" className="size-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="card p-6 sm:p-8 bg-surface-raised/40">
                  <div className="flex items-center gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-brand">
                      <Icon name="bolt" className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold">Notice a power fault in your area?</h3>
                      <p className="text-xs text-muted mt-0.5">
                        Quick submission helps our field crew restore your feeder line faster.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-line">
                      <div className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft text-brand font-bold text-xs">
                        1
                      </div>
                      <p className="text-xs text-ink/80 leading-relaxed">
                        <strong>Instant Logging:</strong> Every submission immediately generates a unique tracking
                        code for the public.
                      </p>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-line">
                      <div className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-soft text-blue font-bold text-xs">
                        2
                      </div>
                      <p className="text-xs text-ink/80 leading-relaxed">
                        <strong>Operations Triage:</strong> National Control Center groups reports to locate
                        tripped breakers or damaged transformers.
                      </p>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-line">
                      <div className="grid size-6 shrink-0 place-items-center rounded-full bg-success-soft text-success-dark font-bold text-xs">
                        3
                      </div>
                      <p className="text-xs text-ink/80 leading-relaxed">
                        <strong>Crew Dispatch:</strong> Regional linesmen are assigned with live status updates
                        visible to you.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowReportForm(true)}
                    className="button button-primary w-full mt-6 text-sm"
                  >
                    Open Fault Reporting Form <Icon name="arrow" className="size-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Case Tracking Search */}
            <div id="case-lookup" className="lg:col-span-5 scroll-mt-24">
              <div className="card p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-blue-soft text-blue">
                    <Icon name="search" className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold">Track Your Case</h3>
                    <p className="text-xs text-muted">Check live status of an existing report</p>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                    Enter Case Reference #
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={lookupQuery}
                      onChange={(e) => setLookupQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearchCase()}
                      className="control min-w-0 flex-1 font-mono text-sm uppercase"
                      placeholder="e.g. PNG-6K8R-24"
                    />
                    <button onClick={handleSearchCase} className="button button-primary text-sm px-4">
                      <Icon name="search" className="size-4" />
                    </button>
                  </div>
                  <p className="text-[0.7rem] text-muted mt-1.5">
                    Try demo cases: <button onClick={() => { setLookupQuery('PNG-6K8R-24'); }} className="text-brand font-mono font-bold underline">PNG-6K8R-24</button> or <button onClick={() => { setLookupQuery('PNG-4T9J-25'); }} className="text-brand font-mono font-bold underline">PNG-4T9J-25</button>
                  </p>
                </div>

                {/* Case Search Result Box */}
                {foundReport !== undefined && (
                  <div className="mt-5 border-t border-line pt-4">
                    {foundReport ? (
                      <div className="rounded-xl border border-line bg-surface-raised/60 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-brand-dark bg-brand-soft px-2 py-0.5 rounded">
                            {foundReport.caseNumber}
                          </span>
                          <span className="badge badge-amber">{foundReport.status}</span>
                        </div>

                        <div>
                          <p className="text-sm font-bold text-ink">{foundReport.issueType}</p>
                          <p className="text-xs text-muted mt-0.5">{foundReport.location} · {foundReport.province}</p>
                        </div>

                        {/* Progress Timeline */}
                        <div className="mt-3 pt-3 border-t border-line/60">
                          <p className="text-[0.68rem] font-bold uppercase tracking-wider text-muted mb-2">
                            Status Progression
                          </p>
                          <div className="grid grid-cols-4 gap-1 text-center">
                            <div className="rounded bg-success/20 py-1 text-[0.65rem] font-bold text-success-dark">
                              Reported ✓
                            </div>
                            <div className={`rounded py-1 text-[0.65rem] font-bold ${foundReport.status !== 'Under review' ? 'bg-success/20 text-success-dark' : 'bg-warning/20 text-warning-dark'}`}>
                              Triaged
                            </div>
                            <div className={`rounded py-1 text-[0.65rem] font-bold ${foundReport.status === 'In progress' || foundReport.status === 'Resolved' ? 'bg-success/20 text-success-dark' : 'bg-gray-100 text-muted'}`}>
                              Dispatched
                            </div>
                            <div className={`rounded py-1 text-[0.65rem] font-bold ${foundReport.status === 'Resolved' ? 'bg-success text-white' : 'bg-gray-100 text-muted'}`}>
                              Restored
                            </div>
                          </div>
                        </div>

                        <p className="text-[0.7rem] text-muted">
                          Last operational log: Updated {foundReport.updatedAt}
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-warning-line bg-warning-soft p-3.5 text-xs text-warning-dark">
                        <p className="font-bold">No active record found</p>
                        <p className="mt-0.5 text-warning-text">
                          Please verify your case code format (PNG-XXXX-XX) or submit a new fault report.
                        </p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Regional Grid Status Section */}
      <section id="grid-status" className="page-wrap py-14 sm:py-18 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="eyebrow">National Transmission & Distribution</p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight">Regional Power Grids</h2>
            <p className="mt-2 text-sm text-muted">
              Live generation telemetry and scheduled feeder maintenance status across PNG.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-muted">
            <span className="size-2 rounded-full bg-success animate-pulse" />
            Telemetry: Live 10:45 AM
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Grid 1: Port Moresby */}
          <div className="card p-5 border-l-4 border-l-success">
            <div className="flex items-center justify-between">
              <span className="font-bold text-base">Port Moresby Grid (POM)</span>
              <span className="badge badge-blue">98% Normal</span>
            </div>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Serving National Capital District & Central Province. Edevu & Rouna hydro running at nominal capacity.
            </p>
            <div className="mt-4 pt-3 border-t border-line space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Generation Capacity</span>
                <span className="font-semibold">124 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Current Load</span>
                <span className="font-semibold">96 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Active Feeder Alerts</span>
                <span className="font-semibold text-warning-dark">1 isolated (Gerehu)</span>
              </div>
            </div>
          </div>

          {/* Grid 2: Ramu Grid */}
          <div className="card p-5 border-l-4 border-l-warning">
            <div className="flex items-center justify-between">
              <span className="font-bold text-base">Ramu Grid</span>
              <span className="badge badge-amber">Maintenance</span>
            </div>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Covering Morobe (Lae), Madang, Eastern & Western Highlands, Chimbu. Yonki dam hydro stable.
            </p>
            <div className="mt-4 pt-3 border-t border-line space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Generation Capacity</span>
                <span className="font-semibold">88 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Current Load</span>
                <span className="font-semibold">74 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Active Feeder Alerts</span>
                <span className="font-semibold text-brand">2 (Lae Market line work)</span>
              </div>
            </div>
          </div>

          {/* Grid 3: Gazelle Grid */}
          <div className="card p-5 border-l-4 border-l-success">
            <div className="flex items-center justify-between">
              <span className="font-bold text-base">Gazelle Grid (ENB)</span>
              <span className="badge badge-blue">Stable</span>
            </div>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Supplying Kokopo, Rabaul, Keravat, and Kerevat Valley. Warangoi Hydro scheme operating normally.
            </p>
            <div className="mt-4 pt-3 border-t border-line space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Generation Capacity</span>
                <span className="font-semibold">22 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Current Load</span>
                <span className="font-semibold">16 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Active Feeder Alerts</span>
                <span className="font-semibold text-success-dark">0 alerts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Easipay & Tariffs Guide Section */}
      <section id="easipay" className="bg-canvas border-t border-line py-14 sm:py-18 scroll-mt-24">
        <div className="page-wrap">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="eyebrow">Prepaid Electricity Services</p>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight">
                How to buy Easipay Tokens
              </h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                PNG Power Easipay allows residential and business customers to purchase electricity credit 24/7
                directly using mobile banking and official retail vending kiosks.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 rounded-xl bg-white p-4 border border-line">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand font-bold text-sm">
                    BSP
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-ink">BSP Mobile Banking (*131#)</h4>
                    <p className="text-xs text-muted mt-0.5">
                      Dial *131#, select &quot;Buy Easipay&quot;, enter your 11-digit Meter Number and purchase amount.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white p-4 border border-line">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-soft text-blue font-bold text-sm">
                    Kina
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-ink">Kina Bank Mobile & USSD (*625#)</h4>
                    <p className="text-xs text-muted mt-0.5">
                      Select Bill Pay &gt; PNG Power Easipay, confirm meter number, receive instant 20-digit token.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white p-4 border border-line">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-green-50 text-green-700 font-bold text-sm">
                    Digi
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-ink">Digicel Cellmoni (*888#)</h4>
                    <p className="text-xs text-muted mt-0.5">
                      Purchase Easipay with your mobile phone balance without needing a bank account.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Meter entering tips */}
            <div className="card p-6 sm:p-8 bg-sidebar text-white shadow-card">
              <span className="badge badge-amber">Customer Tip</span>
              <h3 className="mt-3 text-2xl font-extrabold">Entering your 20-digit token</h3>
              <p className="mt-2 text-xs text-white/70 leading-relaxed">
                Follow these standard instructions for your keypad interface:
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3 text-xs border border-white/10">
                  <span className="font-mono text-brand-light font-bold text-sm">1.</span>
                  <span>Press the blue key or power button on your Conlog or Landis+Gyr meter keypad.</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3 text-xs border border-white/10">
                  <span className="font-mono text-brand-light font-bold text-sm">2.</span>
                  <span>Type the 20-digit number received in your bank SMS.</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3 text-xs border border-white/10">
                  <span className="font-mono text-brand-light font-bold text-sm">3.</span>
                  <span>Press the <strong># or ↵ (Enter)</strong> button. Your screen will display &quot;ACCEPT&quot; and your kWh total.</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span>Meter displaying Error 30?</span>
                <a href="#contact" className="font-bold text-brand-light hover:underline">
                  Contact Tech Support →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Regional Offices Section */}
      <section id="contact" className="page-wrap py-14 sm:py-18 scroll-mt-24">
        <div className="text-center max-w-xl mx-auto">
          <p className="eyebrow">Customer Care & Offices</p>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight">We’re here for you</h2>
          <p className="mt-2 text-sm text-muted">
            Visit our regional commercial centers or contact our 24-hour national support desks.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-5">
            <h4 className="font-bold text-ink">Port Moresby (HQ)</h4>
            <p className="text-xs text-muted mt-1">Corner Wards Road, Hohola, NCD</p>
            <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
              <p>Mon - Fri: 8:00 AM – 4:30 PM</p>
              <p className="text-brand">Phone: 7090 8000</p>
            </div>
          </div>

          <div className="card p-5">
            <h4 className="font-bold text-ink">Lae Regional Office</h4>
            <p className="text-xs text-muted mt-1">Cassowary Road, Lae, Morobe</p>
            <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
              <p>Mon - Fri: 8:00 AM – 4:30 PM</p>
              <p className="text-brand">Phone: 472 2011</p>
            </div>
          </div>

          <div className="card p-5">
            <h4 className="font-bold text-ink">Mt Hagen Center</h4>
            <p className="text-xs text-muted mt-1">Kimininga Barracks Rd, WHP</p>
            <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
              <p>Mon - Fri: 8:00 AM – 4:30 PM</p>
              <p className="text-brand">Phone: 542 1244</p>
            </div>
          </div>

          <div className="card p-5">
            <h4 className="font-bold text-ink">Kokopo Commercial</h4>
            <p className="text-xs text-muted mt-1">Malaguna Road, Kokopo, ENB</p>
            <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
              <p>Mon - Fri: 8:00 AM – 4:30 PM</p>
              <p className="text-brand">Phone: 982 9111</p>
            </div>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="mt-auto bg-sidebar text-white pt-12 pb-8 border-t border-white/10">
        <div className="page-wrap">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 pb-10 border-b border-white/10">
            <div className="lg:col-span-2 space-y-4">
              <Brand inverse />
              <p className="text-xs text-white/60 leading-relaxed max-w-sm">
                PNG Power Ltd is the national electricity utility provider responsible for the generation,
                transmission, distribution and retail of electricity throughout Papua New Guinea.
              </p>
              <p className="text-xs text-white/40">
                P.O. Box 1105, Boroko, National Capital District, Papua New Guinea.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Public Services</p>
              <ul className="space-y-2 text-xs text-white/70">
                <li><button onClick={() => { setSubView('new-connection'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-white text-left">New Connection Application</button></li>
                <li><a href="#report-section" className="hover:text-white">Report Fault</a></li>
                <li><a href="#case-lookup" className="hover:text-white">Track Case Status</a></li>
                <li><a href="#easipay" className="hover:text-white">Easipay Prepaid</a></li>
                <li><a href="#grid-status" className="hover:text-white">Grid Status</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Safety & Legal</p>
              <ul className="space-y-2 text-xs text-white/70">
                <li><a href="#safety" className="hover:text-white">Fallen Line Guidelines</a></li>
                <li><a href="#safety" className="hover:text-white">Electrical Hazards</a></li>
                <li><span className="text-white/40">Customer Charter</span></li>
                <li><span className="text-white/40">Privacy Policy</span></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Emergency & Hotlines</p>
              <p className="text-xs text-white/70 font-semibold mb-1">National 24/7 Call Centre</p>
              <p className="text-sm font-extrabold text-brand-light mb-2">7090 8000</p>
              <p className="text-xs text-white/50 leading-relaxed">
                Toll Free: 116. Report electrical emergencies, fallen lines, or system blackouts.
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-3">
            <p>© {new Date().getFullYear()} PNG Power Limited. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>National Call Centre: 7090 8000</span>
              <span>·</span>
              <span>Toll Free: 116</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

