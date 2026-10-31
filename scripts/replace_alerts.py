p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

# Replace alert in Mark Restored with showToast
old1 = """                                    if (next.has(job.id)) {
                                      next.delete(job.id)
                                      setFieldJobs(fieldJobs.map(j => j.id === job.id ? { ...j, status: 'In progress' } : j))
                                      alert(`Work order ${job.id} restoration cancelled. Status reverted.`)
                                    } else {
                                      next.add(job.id)
                                      setFieldJobs(fieldJobs.map(j => j.id === job.id ? { ...j, status: 'Completed' } : j))
                                      alert(`Work order ${job.id} marked as Restored/Completed successfully!`)
                                    }"""
new1 = """                                    if (next.has(job.id)) {
                                      next.delete(job.id)
                                      setFieldJobs(fieldJobs.map(j => j.id === job.id ? { ...j, status: 'In progress' } : j))
                                      showToast(`Work order ${job.id} restoration cancelled. Status reverted.`, 'info')
                                    } else {
                                      next.add(job.id)
                                      setFieldJobs(fieldJobs.map(j => j.id === job.id ? { ...j, status: 'Completed' } : j))
                                      showToast(`Work order ${job.id} marked as Restored/Completed successfully!`, 'success')
                                    }"""
assert old1 in s, "pattern1 not found"
s = s.replace(old1, new1, 1)

# Replace alert in Add Log Note with showToast
old2 = """                  if (noteText.trim()) {
                    alert(`Log note added to ${noteJobId}: ${noteText}`)
                    setShowNoteModal(false)
                    setNoteText('')
                  }"""
new2 = """                  if (noteText.trim()) {
                    showToast(`Log note added to ${noteJobId}: ${noteText}`, 'success')
                    setShowNoteModal(false)
                    setNoteText('')
                  }"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

# Replace alert in Upload Picture
old3 = """                                    const file = e.target.files?.[0]
                                    if (file) alert(`Picture "${file.name}" uploaded for ${job.id}`)"""
new3 = """                                    const file = e.target.files?.[0]
                                    if (file) showToast(`Picture "${file.name}" uploaded for ${job.id}`, 'success')"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

open(p, 'w').write(s)
print("done")
