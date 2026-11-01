p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()

# Simplify - remove the unused newReport and alert
old = """                      setCcCallsToday((c) => c + 1)
                      const caseNumber = 'PNG-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-26'
                      const newReport: PublicReport = {
                        caseNumber,
                        issueType: ccIssueType || 'Power outage (Area blackout)',
                        province: ccProvince,
                        location: ccLocation,
                        description: ccDescription,
                        phone: ccCallerPhone,
                        contactPreference: 'Phone call',
                        status: 'Under review',
                        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      }
                      // Add to public reports (system-generated reference number)
                      if (onUpdateReportStatus) {
                        // Notify parent that a new report was created
                      }
                      showToast(`Report created! Reference number: ${caseNumber}`, 'success')
                      // Copy to clipboard hint
                      alert(`Reference number (system generated): ${caseNumber}\\nPlease provide this to the caller.`)
                      setCcCallerName('')"""
new = """                      setCcCallsToday((c) => c + 1)
                      const caseNumber = 'PNG-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-26'
                      // System-generated reference number - display prominently
                      showToast(`Report created! Reference number: ${caseNumber} (system generated)`, 'success')
                      setCcCallerName('')"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
