import { useState, type FormEvent } from 'react'
import { Icon, type IconName } from './Icons'

interface NewConnectionPageProps {
  onBackToHome: () => void
}

export function NewConnectionPage({ onBackToHome }: NewConnectionPageProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'downloads' | 'checklist' | 'fees'>('form')

  // Form states
  const [applicantType, setApplicantType] = useState('Domestic (Single Phase 240V)')
  const [fullName, setFullName] = useState('')
  const [mobilePhone, setMobilePhone] = useState('')
  const [email, setEmail] = useState('')
  const [province, setProvince] = useState('National Capital District (Port Moresby)')
  const [suburb, setSuburb] = useState('')
  const [sectionLot, setSectionLot] = useState('')
  const [nearestPole, setNearestPole] = useState('')
  const [contractorName, setContractorName] = useState('')
  const [contractorLicense, setContractorLicense] = useState('')
  const [meterType, setMeterType] = useState('Prepaid Easipay Meter (Recommended)')
  const [hasFormE, setHasFormE] = useState(true)

  // Submission result
  const [submittedAppNumber, setSubmittedAppNumber] = useState<string | null>(null)

  function handleSubmitApplication(e: FormEvent) {
    e.preventDefault()
    const randomCode = Math.floor(1000 + Math.random() * 9000)
    const provCode = province.includes('National Capital') ? 'POM' : province.includes('Morobe') ? 'LAE' : 'PNG'
    const refNumber = `NC-2026-${provCode}-${randomCode}`
    setSubmittedAppNumber(refNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function downloadSimulatedForm(formName: string, filename: string) {
    const textContent = `PAPUA NEW GUINEA POWER LIMITED (PNG POWER LTD)\n` +
      `=======================================================\n` +
      `OFFICIAL DOCUMENT: ${formName}\n` +
      `Reference: PPL-REG-2026-FORM\n\n` +
      `Instructions:\n` +
      `1. Complete all sections in clear block letters.\n` +
      `2. Attach copy of Land Title / Statutory Declaration.\n` +
      `3. Attach Form E Certificate of Compliance completed by a licensed electrical contractor.\n` +
      `4. Submit to your nearest PNG Power Commercial Centre or upload via the online portal.\n\n` +
      `National Call Centre: 7090 8000 | Toll Free: 116\n` +
      `Corner of Wards Road & Hohola, Port Moresby, NCD\n` +
      `=======================================================\n`

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-canvas text-ink py-10">
      <div className="page-wrap">
        {/* Breadcrumb & Return button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <nav className="flex items-center gap-2 text-xs text-muted font-semibold">
            <button onClick={onBackToHome} className="hover:text-brand transition">
              Home
            </button>
            <span>/</span>
            <span className="text-ink">New Connection Application</span>
          </nav>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-ink transition"
          >
            <Icon name="arrow" className="size-4 rotate-180" /> Back to Public Homepage
          </button>
        </div>

        {/* Hero Card */}
        <div className="card overflow-hidden bg-sidebar text-white p-8 sm:p-12 relative shadow-card mb-10">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-bold text-brand-light backdrop-blur-sm">
              <Icon name="zap" className="size-3.5" /> Official PNG Power Grid Connection Service
            </div>
            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Apply for a New Electricity Connection
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
              Connect your new residential home, business premise, or commercial development to the PNG Power
              grid. Submit online or download official printable application forms.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('form')}
                className={`button ${activeTab === 'form' ? 'button-primary' : 'button-dark'} text-xs`}
              >
                <Icon name="clipboard" className="size-4" /> Apply Online Now
              </button>
              <button
                onClick={() => setActiveTab('downloads')}
                className={`button ${activeTab === 'downloads' ? 'button-primary' : 'button-dark'} text-xs`}
              >
                <Icon name="download" className="size-4" /> Download Official Forms
              </button>
              <button
                onClick={() => setActiveTab('checklist')}
                className={`button ${activeTab === 'checklist' ? 'button-primary' : 'button-dark'} text-xs`}
              >
                <Icon name="check" className="size-4" /> Requirements Checklist
              </button>
              <button
                onClick={() => setActiveTab('fees')}
                className={`button ${activeTab === 'fees' ? 'button-primary' : 'button-dark'} text-xs`}
              >
                <Icon name="info" className="size-4" /> Connection Fee Guide
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex border-b border-line mb-8 overflow-x-auto text-sm font-bold">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-5 py-3 border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'form' ? 'border-brand text-brand' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            <Icon name="clipboard" className="size-4" /> Online Application Form
          </button>
          <button
            onClick={() => setActiveTab('downloads')}
            className={`px-5 py-3 border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'downloads' ? 'border-brand text-brand' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            <Icon name="download" className="size-4" /> Downloadable Forms (PDF)
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-5 py-3 border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'checklist' ? 'border-brand text-brand' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            <Icon name="shield" className="size-4" /> Document Checklist
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-5 py-3 border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'fees' ? 'border-brand text-brand' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            <Icon name="info" className="size-4" /> Fee Schedule & Steps
          </button>
        </div>

        {/* Tab 1: Online Application Form */}
        {activeTab === 'form' && (
          <div>
            {submittedAppNumber ? (
              <div className="card p-8 sm:p-12 text-center max-w-2xl mx-auto bg-white border border-success/30">
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-success text-white shadow-brand">
                  <Icon name="check" className="size-8" />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-success-dark">
                  Application Submitted
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                  Your New Connection is in Progress!
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Your application has been received by the PNG Power Commercial & Planning team.
                </p>

                <div className="mt-6 rounded-2xl bg-surface-raised p-6 text-left border border-line">
                  <div className="flex justify-between items-center pb-3 border-b border-line">
                    <span className="text-xs font-bold uppercase text-muted">Application Reference</span>
                    <span className="font-mono text-xl font-bold text-brand-dark">{submittedAppNumber}</span>
                  </div>
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted">Applicant:</span>
                      <span className="font-semibold">{fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Category:</span>
                      <span className="font-semibold">{applicantType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Location:</span>
                      <span className="font-semibold">{sectionLot}, {suburb} ({province})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Meter Preference:</span>
                      <span className="font-semibold">{meterType}</span>
                    </div>
                  </div>
                </div>

                {/* Next Steps Card */}
                <div className="mt-6 rounded-xl border border-line p-5 text-left bg-blue-soft/30 space-y-3">
                  <h4 className="text-sm font-bold text-blue flex items-center gap-2">
                    <Icon name="info" className="size-4" /> What Happens Next?
                  </h4>
                  <ul className="text-xs text-ink/80 space-y-2 list-disc pl-4">
                    <li><strong>Step 1: Technical Site Feasibility:</strong> A PNG Power field technician will inspect the nearest distribution pole within 3–5 working days.</li>
                    <li><strong>Step 2: Quotation:</strong> We will SMS/call your mobile (<strong>{mobilePhone}</strong>) with the service drop connection fee and meter deposit invoice.</li>
                    <li><strong>Step 3: Energization:</strong> Upon payment at any commercial office or BSP/Kina Bank, our crew will run the overhead cable and activate your Easipay meter.</li>
                  </ul>
                </div>

                <div className="mt-8 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedAppNumber(null)
                    }}
                    className="button button-secondary text-xs"
                  >
                    Submit Another Application
                  </button>
                  <button
                    onClick={onBackToHome}
                    className="button button-primary text-xs"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-12 items-start">
                <form
                  onSubmit={handleSubmitApplication}
                  className="card p-6 sm:p-8 lg:col-span-8 bg-white border border-line space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-extrabold text-ink">New Connection Application Form</h2>
                    <p className="text-xs text-muted mt-1">
                      Fill out this digital application. All fields marked with * are required.
                    </p>
                  </div>

                  {/* Section 1: Connection Specification */}
                  <div className="pt-4 border-t border-line space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand">
                      1. Connection & Tariff Type
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-ink mb-1.5">Supply Type *</label>
                        <select
                          className="control text-sm"
                          value={applicantType}
                          onChange={(e) => setApplicantType(e.target.value)}
                        >
                          <option>Domestic (Single Phase 240V)</option>
                          <option>Commercial (Three Phase 415V)</option>
                          <option>Industrial High Voltage (HV)</option>
                          <option>Temporary Supply (Construction / Events)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-ink mb-1.5">Metering Option *</label>
                        <select
                          className="control text-sm"
                          value={meterType}
                          onChange={(e) => setMeterType(e.target.value)}
                        >
                          <option>Prepaid Easipay Meter (Recommended)</option>
                          <option>Post-Paid Credit Meter (Monthly Billing)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Applicant Information */}
                  <div className="pt-4 border-t border-line space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand">
                      2. Applicant Details
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-ink mb-1.5">Full Name / Registered Entity *</label>
                        <input
                          required
                          className="control text-sm"
                          placeholder="e.g. Samuel Kopi or Papindo Trading Ltd"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-ink mb-1.5">Primary Mobile Phone *</label>
                        <input
                          required
                          type="tel"
                          className="control text-sm"
                          placeholder="e.g. 7123 4567 or 7988 0000"
                          value={mobilePhone}
                          onChange={(e) => setMobilePhone(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-ink mb-1.5">Email Address</label>
                        <input
                          type="email"
                          className="control text-sm"
                          placeholder="e.g. name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Premises Location */}
                  <div className="pt-4 border-t border-line space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand">
                      3. Premises Location & Land Allotment
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-ink mb-1.5">Province *</label>
                        <select
                          className="control text-sm"
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                        >
                          <option>National Capital District (Port Moresby)</option>
                          <option>Central Province</option>
                          <option>Morobe (Lae)</option>
                          <option>Eastern Highlands (Goroka)</option>
                          <option>Western Highlands (Mt Hagen)</option>
                          <option>East New Britain (Kokopo / Rabaul)</option>
                          <option>Madang</option>
                          <option>West New Britain (Kimbe)</option>
                          <option>New Ireland (Kavieng)</option>
                          <option>Milne Bay (Alotau)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-ink mb-1.5">Suburb / Town / Village *</label>
                        <input
                          required
                          className="control text-sm"
                          placeholder="e.g. Waigani, Gerehu, Eriku, Taraka"
                          value={suburb}
                          onChange={(e) => setSuburb(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-ink mb-1.5">Section & Lot # / Portion *</label>
                        <input
                          required
                          className="control text-sm"
                          placeholder="e.g. Section 45, Lot 12 or Portion 204"
                          value={sectionLot}
                          onChange={(e) => setSectionLot(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-ink mb-1.5">Nearest Pole # / Landmark</label>
                        <input
                          className="control text-sm"
                          placeholder="e.g. Pole # POM-4021 or Opposite Church"
                          value={nearestPole}
                          onChange={(e) => setNearestPole(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Electrical Contractor */}
                  <div className="pt-4 border-t border-line space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand">
                      4. Certified Electrician (Wiring Certificate)
                    </h3>
                    <p className="text-xs text-muted">
                      PNG electrical regulations require all premises to be wired and tested by a licensed contractor
                      holding a valid PNG Power Wireman License before connection.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-ink mb-1.5">Licensed Electrician Name *</label>
                        <input
                          required
                          className="control text-sm"
                          placeholder="e.g. John Wanma Electrical"
                          value={contractorName}
                          onChange={(e) => setContractorName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-ink mb-1.5">Wireman License # *</label>
                        <input
                          required
                          className="control text-sm"
                          placeholder="e.g. PPL-LIC-2023-412"
                          value={contractorLicense}
                          onChange={(e) => setContractorLicense(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="rounded-xl border border-line bg-surface-raised p-4 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="formECheck"
                        required
                        checked={hasFormE}
                        onChange={(e) => setHasFormE(e.target.checked)}
                        className="mt-1 size-4 rounded text-brand focus:ring-brand"
                      />
                      <label htmlFor="formECheck" className="text-xs text-ink/80 cursor-pointer">
                        <strong>Certificate of Compliance (Form E) Available:</strong> I confirm the internal wiring
                        has been inspected and tested, and the electrician&apos;s completion certificate will be presented
                        during the site survey.
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line flex items-center justify-between">
                    <button
                      type="button"
                      onClick={onBackToHome}
                      className="button button-secondary text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="button button-primary text-xs"
                    >
                      Submit Application <Icon name="arrow" className="size-4" />
                    </button>
                  </div>
                </form>

                {/* Sidebar Guidance */}
                <div className="lg:col-span-4 space-y-5">
                  <div className="card p-6 bg-white border border-line">
                    <h3 className="font-extrabold text-sm mb-3 text-ink">Connection Procedure</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft text-brand text-xs font-bold">
                          1
                        </span>
                        <div>
                          <p className="text-xs font-bold text-ink">Submit Application</p>
                          <p className="text-[0.75rem] text-muted mt-0.5">
                            Submit online or at your nearest PNG Power Commercial Office.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-soft text-blue text-xs font-bold">
                          2
                        </span>
                        <div>
                          <p className="text-xs font-bold text-ink">Site Inspection & Survey</p>
                          <p className="text-[0.75rem] text-muted mt-0.5">
                            An inspector surveys the distance to the nearest low-voltage pole.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-purple-50 text-purple-600 text-xs font-bold">
                          3
                        </span>
                        <div>
                          <p className="text-xs font-bold text-ink">Receive Formal Quote</p>
                          <p className="text-[0.75rem] text-muted mt-0.5">
                            Standard connection fee + any line extension costs.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-success-soft text-success-dark text-xs font-bold">
                          4
                        </span>
                        <div>
                          <p className="text-xs font-bold text-ink">Meter Energization</p>
                          <p className="text-[0.75rem] text-muted mt-0.5">
                            Our field crew installs the Easipay meter and connects overhead service drops.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-warning-line bg-warning-soft p-5">
                    <div className="flex items-center gap-2 font-bold text-warning-dark text-xs">
                      <Icon name="shield" className="size-4" /> Safety Notice
                    </div>
                    <p className="mt-2 text-xs text-warning-text leading-relaxed">
                      Never allow unlicensed wiremen to tamper with PNG Power distribution poles. Unofficial service
                      lines pose lethal fire and electrocution hazards.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Downloadable Forms */}
        {activeTab === 'downloads' && (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold text-ink">Download Official Application Forms</h2>
              <p className="text-xs text-muted mt-1">
                Print, fill out, and submit these standardized documents at any provincial PNG Power customer desk.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Form A */}
              <div className="card p-6 bg-white border border-line flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="badge badge-red">Form A</span>
                    <span className="text-xs font-bold text-muted">PDF / 2 Pages</span>
                  </div>
                  <h3 className="mt-3 text-lg font-extrabold text-ink">Application for Electricity Supply</h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Standard primary application form required for all new domestic and commercial electricity service
                    connections throughout PNG.
                  </p>
                </div>
                <button
                  onClick={() => downloadSimulatedForm('FORM A: Application for Electricity Supply', 'Form-A-Electricity-Supply-PNG-Power.txt')}
                  className="button button-primary w-full mt-6 text-xs"
                >
                  <Icon name="download" className="size-4" /> Download Form A
                </button>
              </div>

              {/* Form E */}
              <div className="card p-6 bg-white border border-line flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="badge badge-blue">Form E</span>
                    <span className="text-xs font-bold text-muted">PDF / 3 Pages</span>
                  </div>
                  <h3 className="mt-3 text-lg font-extrabold text-ink">Certificate of Electrical Completion</h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Mandatory certificate of compliance and insulation test report that must be completed and signed by
                    your licensed electrical contractor.
                  </p>
                </div>
                <button
                  onClick={() => downloadSimulatedForm('FORM E: Certificate of Electrical Completion & Wireman Test', 'Form-E-Electrical-Completion-PNG-Power.txt')}
                  className="button button-primary w-full mt-6 text-xs"
                >
                  <Icon name="download" className="size-4" /> Download Form E
                </button>
              </div>

              {/* Form T */}
              <div className="card p-6 bg-white border border-line flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="badge badge-amber">Form T</span>
                    <span className="text-xs font-bold text-muted">PDF / 1 Page</span>
                  </div>
                  <h3 className="mt-3 text-lg font-extrabold text-ink">Temporary Supply Agreement</h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Application for short-term builder&apos;s power on construction sites, carnivals, or temporary community
                    gatherings.
                  </p>
                </div>
                <button
                  onClick={() => downloadSimulatedForm('FORM T: Temporary Electricity Supply Agreement', 'Form-T-Temporary-Supply-PNG-Power.txt')}
                  className="button button-primary w-full mt-6 text-xs"
                >
                  <Icon name="download" className="size-4" /> Download Form T
                </button>
              </div>

              {/* Tariff Schedule */}
              <div className="card p-6 bg-white border border-line flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="badge badge-blue">Tariff Schedule</span>
                    <span className="text-xs font-bold text-muted">PDF / 4 Pages</span>
                  </div>
                  <h3 className="mt-3 text-lg font-extrabold text-ink">National Electricity Rates & Fees</h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Official schedule of approved residential, general commercial, industrial tariffs, and meter security
                    deposits.
                  </p>
                </div>
                <button
                  onClick={() => downloadSimulatedForm('PNG POWER: National Tariff & Connection Fee Schedule', 'PNG-Power-Tariff-Fee-Schedule.txt')}
                  className="button button-secondary w-full mt-6 text-xs"
                >
                  <Icon name="download" className="size-4" /> Download Tariff Guide
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Document Checklist */}
        {activeTab === 'checklist' && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-ink">Mandatory Requirements Checklist</h2>
              <p className="text-xs text-muted mt-1">
                Before submitting your application, ensure you have gathered the following supporting documents:
              </p>
            </div>

            <div className="space-y-4">
              <div className="card p-5 bg-white border border-line flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon name="document" className="size-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-sm text-ink">1. Proof of Land / Property Ownership</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Any one of the following: Copy of State Lease / Land Title Certificate, Statutory Declaration of Customary
                    Ownership (signed by a Commissioner of Oaths / Magistrate), or Formal Tenancy Agreement with authorization
                    letter from landlord.
                  </p>
                </div>
              </div>

              <div className="card p-5 bg-white border border-line flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-soft text-blue">
                  <Icon name="shield" className="size-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-sm text-ink">2. Certificate of Compliance (Form E)</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Must be completed and signed by an electrical contractor with a valid PNG Power Wireman License number.
                    Internal wiring must conform to AS/NZS 3000 wiring rules.
                  </p>
                </div>
              </div>

              <div className="card p-5 bg-white border border-line flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-success-soft text-success-dark">
                  <Icon name="user" className="size-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-sm text-ink">3. Certified Copy of Identification</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Valid PNG National Identity (NID) Card, PNG Passport, Driver&apos;s License, or Employee ID card certified
                    by a recognized village elder or commissioner of oaths.
                  </p>
                </div>
              </div>

              <div className="card p-5 bg-white border border-line flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-purple-50 text-purple-600">
                  <Icon name="map" className="size-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-sm text-ink">4. Site Map / Location Sketch</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    A simple sketch showing the building location, distance to the nearest road, and position of the meter
                    board relative to the nearest PNG Power pole.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Fee Schedule & Steps */}
        {activeTab === 'fees' && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-ink">Connection Fee Schedule (Indicative)</h2>
              <p className="text-xs text-muted mt-1">
                Standard fees subject to formal technical survey quote based on length of service drop line.
              </p>
            </div>

            <div className="card overflow-hidden bg-white border border-line">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-raised border-b border-line text-ink font-bold">
                  <tr>
                    <th className="p-4">Connection Category</th>
                    <th className="p-4">Standard Service Drop (&lt;30m)</th>
                    <th className="p-4">Security / Meter Deposit</th>
                    <th className="p-4">Typical Turnaround</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-muted">
                  <tr>
                    <td className="p-4 font-bold text-ink">Domestic Single Phase (240V Easipay)</td>
                    <td className="p-4">K350.00</td>
                    <td className="p-4">K150.00</td>
                    <td className="p-4">5 – 7 Working Days</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-ink">Commercial Three Phase (415V)</td>
                    <td className="p-4">K850.00</td>
                    <td className="p-4">K400.00</td>
                    <td className="p-4">7 – 14 Working Days</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-ink">Temporary Supply (Single Phase)</td>
                    <td className="p-4">K250.00</td>
                    <td className="p-4">K200.00 (Refundable)</td>
                    <td className="p-4">3 – 5 Working Days</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-ink">Line Extension (&gt; 1 Pole Required)</td>
                    <td className="p-4" colSpan={2}>
                      Quoted after engineering survey (Capital Contribution)
                    </td>
                    <td className="p-4">14 – 21 Working Days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-line bg-surface-raised p-5 text-xs text-muted space-y-2">
              <p className="font-bold text-ink">Important Note on Capital Contributions:</p>
              <p>
                If your property is further than 30 meters from the nearest low-voltage power pole, additional poles or a
                feeder line extension may be required. The survey officer will prepare a capital contribution estimate.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

