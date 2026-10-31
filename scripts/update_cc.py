p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

old = """            <div className="space-y-6">
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
            </div>"""

new = """            <div className="space-y-6">
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
                        <select
                          value={ccIssueType}
                          onChange={(e) => setCcIssueType(e.target.value)}
                          className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        >
                          <option>Power outage (Area blackout)</option>
                          <option>Single household outage</option>
                          <option>Fallen power line / wire on ground</option>
                          <option>Transformer explosion / smoke / spark</option>
                          <option>Damaged or leaning power pole</option>
                          <option>Streetlight failure</option>
                          <option>Easipay meter error code</option>
                          <option>Low voltage / voltage surge</option>
                          <option>Other electrical hazard</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-ink mb-1">Province</label>
                        <select
                          value={ccProvince}
                          onChange={(e) => setCcProvince(e.target.value)}
                          className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        >
                          <option>NCD</option>
                          <option>Central</option>
                          <option>Morobe</option>
                          <option>Eastern Highlands</option>
                          <option>Western Highlands</option>
                          <option>East New Britain</option>
                          <option>Madang</option>
                          <option>New Ireland</option>
                          <option>West New Britain</option>
                          <option>Milne Bay</option>
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
            </div>"""

assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
