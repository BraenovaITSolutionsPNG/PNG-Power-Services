p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

old = """                      <p className="eyebrow">Public Fault Report</p>
                      <h3 className="mt-1 text-2xl font-extrabold tracking-tight">
                        Tell us about the power fault
                      </h3>"""
new = """                      <div className="flex items-center justify-between">
                        <div>
                          <p className="eyebrow">Public Fault Report</p>
                          <h3 className="mt-1 text-2xl font-extrabold tracking-tight">
                            {t('reportTitle')}
                          </h3>
                        </div>
                        <div className="flex gap-1">
                          <button type="button" onClick={() => setLanguage('en')} className={`px-2 py-1 text-xs rounded ${language === 'en' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'}`}>EN</button>
                          <button type="button" onClick={() => setLanguage('tp')} className={`px-2 py-1 text-xs rounded ${language === 'tp' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'}`}>TP</button>
                        </div>
                      </div>"""
assert old in s, "pattern1 not found"
s = s.replace(old, new, 1)

old2 = """                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        {t('location')} *
                      </label>
                      <input
                        className="control"
                        required
                        placeholder={t('locationPlaceholder')}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />"""
new2 = """                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        {t('location')} *
                      </label>
                      <div className="flex gap-2">
                        <input
                          className="control flex-1"
                          required
                          placeholder={t('locationPlaceholder')}
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(
                                (pos) => {
                                  const { latitude, longitude } = pos.coords
                                  setLocation('GPS: ' + latitude.toFixed(5) + ', ' + longitude.toFixed(5))
                                },
                                () => alert('Could not get location. Please type your address.')
                              )
                            }
                          }}
                          className="button button-secondary text-xs whitespace-nowrap"
                        >
                          {t('gpsButton')}
                        </button>
                      </div>"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
