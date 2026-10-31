p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = '''                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => alert(`Opening camera for site photo at ${job.place}`)}
                                className="button button-secondary text-xs"
                              >
                                <Icon name="plus" className="size-3.5" /> Take Site Photo
                              </button>'''
new = '''                            <div className="flex flex-wrap gap-2">
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
                              </button>'''
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
