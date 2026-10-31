p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = """                      <div>
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
                      </div>"""
new = """                      <div>
                        <label className="block text-xs font-bold text-ink mb-1">Issue Type</label>
                        <input
                          list="issue-types"
                          value={ccIssueType}
                          onChange={(e) => setCcIssueType(e.target.value)}
                          placeholder="Type or select an issue type"
                          className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        />
                        <datalist id="issue-types">
                          <option value="Power outage (Area blackout)" />
                          <option value="Single household outage" />
                          <option value="Fallen power line / wire on ground" />
                          <option value="Transformer explosion / smoke / spark" />
                          <option value="Damaged or leaning power pole" />
                          <option value="Streetlight failure" />
                          <option value="Easipay meter error code" />
                          <option value="Low voltage / voltage surge" />
                          <option value="Other electrical hazard" />
                        </datalist>
                      </div>"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
