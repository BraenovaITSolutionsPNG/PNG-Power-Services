p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

# Add reviewedReports state after restoredJobs state
old = "  const [restoredJobs, setRestoredJobs] = useState<Set<string>>(new Set())"
new = """  const [restoredJobs, setRestoredJobs] = useState<Set<string>>(new Set())

  // Track reviewed reports for toggle
  const [reviewedReports, setReviewedReports] = useState<Set<string>>(new Set())"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Replace the Review button with a toggle
old2 = """                        <button
                          onClick={() => showToast(`Case ${report.caseNumber} marked as under review`, 'info')}
                          className="button button-secondary text-xs"
                        >
                          Review
                        </button>"""
new2 = """                        <button
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
                        </button>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w').write(s)
print("done")
