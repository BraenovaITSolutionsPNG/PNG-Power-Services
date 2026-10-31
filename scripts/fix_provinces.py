p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()
old = """                        <select
                          value={ccProvince}
                          onChange={(e) => setCcProvince(e.target.value)}
                          className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        >
                          <option>NCD</option>
                          <option>Central</option>
                          <option>Morobe</option>
                          <option>Eastern Highlands</option>
                          <option>Western Highlands</option>
                          <option>East New Britain</option>
                          <option>Madang</option>
                          <option>New Ireland</option>
                          <option>West New Britain</option>
                          <option>Milne Bay</option>
                        </select>"""
new = """                        <select
                          value={ccProvince}
                          onChange={(e) => setCcProvince(e.target.value)}
                          className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm"
                        >
                          <option>Central</option>
                          <option>Chimbu (Simbu)</option>
                          <option>Eastern Highlands</option>
                          <option>East New Britain</option>
                          <option>East Sepik</option>
                          <option>Enga</option>
                          <option>Gulf</option>
                          <option>Hela</option>
                          <option>Jiwaka</option>
                          <option>Madang</option>
                          <option>Manus</option>
                          <option>Milne Bay</option>
                          <option>Morobe</option>
                          <option>National Capital District (NCD)</option>
                          <option>New Ireland</option>
                          <option>Oro (Northern)</option>
                          <option>Sandaun (West Sepik)</option>
                          <option>Southern Highlands</option>
                          <option>West New Britain</option>
                          <option>Western</option>
                          <option>Western Highlands</option>
                          <option>West Sepik</option>
                        </select>"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
