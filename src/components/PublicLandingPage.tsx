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
      <div className="hidden sm:block bg-sidebar px-4 py-2 text-xs text-white/80">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-success animate-pulse" />
            <span className="font-semibold text-white">National Power Grid Status:</span>
            <span className="text-white/70">Port Moresby & Ramu systems operating normally</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
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
      <header className="relative z-30 border-b border-line bg-white/95 backdrop-blur-md">
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
      <section className="hero-slider relative overflow-hidden bg-hero scroll-mt-20"
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

        <div className="page-wrap relative flex min-h-[34rem] items-center pt-8 pb-14 sm:min-h-[38rem] lg:min-h-[42rem]">
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
            <div className="hidden sm:flex mt-8 items-center gap-3 text-xs text-white/60">
              <span className="rounded-md bg-warning/20 border border-warning/30 px-2 py-1 font-bold text-warning">
                HAZARD ALERT
              </span>
              <span>Sparks or fallen line? Keep 10m clear and call 7090 8000 immediately.</span>
            </div>
          </div>

          {/* Carousel Slide Indicators & Controls */}
          <div className="hidden sm:flex absolute bottom-10 left-0 right-0 items-center justify-between">
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
            <div className="hidden sm:flex gap-2">
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

        <div className="mt-10 overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 min-w-max">
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Port Moresby (HQ)</h4>
              <p className="text-xs text-muted mt-1">Corner Wards Road, Hohola, NCD</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 7090 8000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Lae Regional Office</h4>
              <p className="text-xs text-muted mt-1">Cassowary Road, Lae, Morobe</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 472 2011</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Mt Hagen Center</h4>
              <p className="text-xs text-muted mt-1">Kimininga Barracks Rd, WHP</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 542 1244</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Kokopo Commercial</h4>
              <p className="text-xs text-muted mt-1">Malaguna Road, Kokopo, ENB</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 982 9111</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Goroka Office</h4>
              <p className="text-xs text-muted mt-1">Eastern Highlands Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 532 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Wewak Office</h4>
              <p className="text-xs text-muted mt-1">East Sepik Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 456 2000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Wabag Office</h4>
              <p className="text-xs text-muted mt-1">Enga Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 547 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Kerema Office</h4>
              <p className="text-xs text-muted mt-1">Gulf Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 548 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Tari Office</h4>
              <p className="text-xs text-muted mt-1">Hela Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 549 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Minj Office</h4>
              <p className="text-xs text-muted mt-1">Jiwaka Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 550 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Madang Office</h4>
              <p className="text-xs text-muted mt-1">Madang Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 422 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Lorengau Office</h4>
              <p className="text-xs text-muted mt-1">Manus Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 441 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Alotau Office</h4>
              <p className="text-xs text-muted mt-1">Milne Bay Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 641 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Kundiawa Office</h4>
              <p className="text-xs text-muted mt-1">Chimbu (Simbu) Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 535 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Popondetta Office</h4>
              <p className="text-xs text-muted mt-1">Oro (Northern) Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 629 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Vanimo Office</h4>
              <p className="text-xs text-muted mt-1">Sandaun (West Sepik) Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 457 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Mendi Office</h4>
              <p className="text-xs text-muted mt-1">Southern Highlands Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 549 2000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Kimbe Office</h4>
              <p className="text-xs text-muted mt-1">West New Britain Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 935 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Daru Office</h4>
              <p className="text-xs text-muted mt-1">Western Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 646 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Kavieng Office</h4>
              <p className="text-xs text-muted mt-1">New Ireland Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 984 1000</p>
              </div>
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

