p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Add POL number and account holder fields after province select, before location
old = """                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Location / Community / Landmark *
                      </label>"""
new = """                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        POL / Meter Number (Optional)
                      </label>
                      <input
                        className="control"
                        placeholder="e.g. 1234567890"
                        value={polNumber}
                        onChange={(e) => setPolNumber(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Account Holder Name (Optional)
                      </label>
                      <input
                        className="control"
                        placeholder="Name on the account"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        District / LLG (Optional)
                      </label>
                      <input
                        className="control"
                        placeholder="e.g. Gerehu, Boroko, Downtown"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Location / Community / Landmark *
                      </label>"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Add safety hazard checkbox and preferred contact time after phone field
old2 = """                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Updates via
                      </label>"""
new2 = """                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        <input
                          type="checkbox"
                          checked={isSafetyHazard}
                          onChange={(e) => setIsSafetyHazard(e.target.checked)}
                          className="rounded border-line"
                        />
                        This is a safety hazard (fallen line, exposed wire, sparking)
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Preferred Contact Time
                      </label>
                      <select
                        className="control"
                        value={preferredContactTime}
                        onChange={(e) => setPreferredContactTime(e.target.value)}
                      >
                        <option>Anytime</option>
                        <option>Morning (8am - 12pm)</option>
                        <option>Afternoon (12pm - 4pm)</option>
                        <option>Evening (4pm - 8pm)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Updates via
                      </label>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
