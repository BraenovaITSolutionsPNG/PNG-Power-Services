p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

# Add dispatchedReports state
old = "  const [reviewedReports, setReviewedReports] = useState<Set<string>>(new Set())"
new = """  const [reviewedReports, setReviewedReports] = useState<Set<string>>(new Set())

  // Track dispatched reports for toggle
  const [dispatchedReports, setDispatchedReports] = useState<Set<string>>(new Set())"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Replace Dispatch Crew button with toggle
old2 = """                        <button
                          onClick={() => showToast(`Dispatch crew assigned to Case ${report.caseNumber}`, 'success')}
                          className="button button-primary text-xs"
                        >
                          Dispatch Crew
                        </button>"""
new2 = """                        <button
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
                        </button>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w').write(s)
print("done")
