p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

# Add state for tracking public intake actions
old = "  const [dispatchedReports, setDispatchedReports] = useState<Set<string>>(new Set())"
new = """  const [dispatchedReports, setDispatchedReports] = useState<Set<string>>(new Set())

  // Track public intake actions for toggle
  const [assignedReports, setAssignedReports] = useState<Set<string>>(new Set())
  const [inProgressReports, setInProgressReports] = useState<Set<string>>(new Set())
  const [resolvedReports, setResolvedReports] = useState<Set<string>>(new Set())"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Replace the three buttons with toggles
old2 = """                            <div className="flex gap-2">
                              <button onClick={() => onUpdateReportStatus?.(report.caseNumber, 'Crew assigned')} className="button button-primary text-xs">Assign Crew</button>
                              <button onClick={() => onUpdateReportStatus?.(report.caseNumber, 'In progress')} className="button button-secondary text-xs">Mark In Progress</button>
                              <button onClick={() => onUpdateReportStatus?.(report.caseNumber, 'Resolved')} className="button button-secondary text-xs">Resolve</button>
                            </div>"""
new2 = """                            <div className="flex gap-2">
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
                            </div>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w').write(s)
print("done")
