p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

old = """                        {selectedJob === job.id && (
                          <div className="mt-4 pt-4 border-t border-line bg-surface-raised/60 -mx-5 -mb-5 p-5 rounded-b-xl space-y-3">
                            <p className="text-xs font-bold text-ink">Field Actions & Logs</p>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => {
                                  const note = prompt('Enter log note:')
                                  if (note) alert(`Log note added to ${job.id}: ${note}`)
                                }}
                                className="button button-secondary text-xs"
                              >
                                <Icon name="document" className="size-3.5" /> Add Log Note
                              </button>
                              <button
                                onClick={() => alert(`Opening camera for site photo at ${job.place}`)}
                                className="button button-secondary text-xs"
                              >
                                <Icon name="plus" className="size-3.5" /> Take Site Photo
                              </button>
                              <button
                                onClick={() => {
                                  alert(`Work order ${job.id} marked as Restored/Completed!`)
                                  setFieldJobs(fieldJobs.map(j => j.id === job.id ? { ...j, status: 'Completed' } : j))
                                }}
                                className="button button-primary text-xs bg-success hover:bg-success-dark"
                              >
                                <Icon name="check" className="size-3.5" /> Mark Restored
                              </button>
                            </div>
                            <p className="text-[0.7rem] text-muted flex items-center gap-1.5">
                              <Icon name="shield" className="size-3.5 text-warning" />
                              Ensure site voltage test is zero before handling lines or transformers.
                            </p>
                          </div>
                        )}"""

new = """                        {selectedJob === job.id && (
                          <div className="mt-4 pt-4 border-t border-line bg-surface-raised/60 -mx-5 -mb-5 p-5 rounded-b-xl space-y-3">
                            <p className="text-xs font-bold text-ink">Field Actions & Logs</p>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => {
                                  setNoteJobId(job.id)
                                  setNoteText('')
                                  setShowNoteModal(true)
                                }}
                                className="button button-secondary text-xs"
                              >
                                <Icon name="document" className="size-3.5" /> Add Log Note
                              </button>
                              <label className="button button-secondary text-xs cursor-pointer">
                                <Icon name="plus" className="size-3.5" /> Upload Picture
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) alert(`Picture "${file.name}" uploaded for ${job.id}`)
                                  }}
                                />
                              </label>
                              <button
                                onClick={() => {
                                  setRestoredJobs((prev) => {
                                    const next = new Set(prev)
                                    if (next.has(job.id)) {
                                      next.delete(job.id)
                                      setFieldJobs(fieldJobs.map(j => j.id === job.id ? { ...j, status: 'In progress' } : j))
                                      alert(`Work order ${job.id} restoration cancelled. Status reverted.`)
                                    } else {
                                      next.add(job.id)
                                      setFieldJobs(fieldJobs.map(j => j.id === job.id ? { ...j, status: 'Completed' } : j))
                                      alert(`Work order ${job.id} marked as Restored/Completed successfully!`)
                                    }
                                    return next
                                  })
                                }}
                                className={`button text-xs ${restoredJobs.has(job.id) ? 'bg-brand/20 text-brand border border-brand/40 hover:bg-brand/30' : 'button-primary bg-success hover:bg-success-dark'}`}
                              >
                                <Icon name="check" className="size-3.5" /> {restoredJobs.has(job.id) ? 'Cancel Restore' : 'Mark Restored'}
                              </button>
                            </div>
                            <p className="text-[0.7rem] text-muted flex items-center gap-1.5">
                              <Icon name="shield" className="size-3.5 text-warning" />
                              Ensure site voltage test is zero before handling lines or transformers.
                            </p>
                          </div>
                        )}"""

assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
