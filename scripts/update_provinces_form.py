p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

old = """                        <option>National Capital District (Port Moresby)</option>
                        <option>Central Province</option>
                        <option>Morobe (Lae / Bulolo / Wau)</option>
                        <option>Eastern Highlands (Goroka)</option>
                        <option>Western Highlands (Mt Hagen)</option>
                        <option>East New Britain (Kokopo / Rabaul)</option>
                        <option>Madang</option>
                        <option>New Ireland (Kavieng)</option>
                        <option>West New Britain (Kimbe)</option>
                        <option>Milne Bay (Alotau)</option>
                        <option>Other Province</option>"""
new = """                        <option value="NCD">National Capital District (Port Moresby)</option>
                        <option value="Central">Central Province</option>
                        <option value="Morobe">Morobe (Lae / Bulolo / Wau)</option>
                        <option value="Eastern Highlands">Eastern Highlands (Goroka)</option>
                        <option value="Western Highlands">Western Highlands (Mt Hagen)</option>
                        <option value="East New Britain">East New Britain (Kokopo / Rabaul)</option>
                        <option value="Madang">Madang</option>
                        <option value="New Ireland">New Ireland (Kavieng)</option>
                        <option value="West New Britain">West New Britain (Kimbe)</option>
                        <option value="Milne Bay">Milne Bay (Alotau)</option>
                        <option value="Chimbu">Chimbu (Simbu)</option>
                        <option value="East Sepik">East Sepik</option>
                        <option value="Enga">Enga</option>
                        <option value="Gulf">Gulf</option>
                        <option value="Hela">Hela</option>
                        <option value="Jiwaka">Jiwaka</option>
                        <option value="Manus">Manus</option>
                        <option value="Oro">Oro (Northern)</option>
                        <option value="Sandaun">Sandaun (West Sepik)</option>
                        <option value="Southern Highlands">Southern Highlands</option>
                        <option value="Western">Western</option>
                        <option value="West Sepik">West Sepik</option>
                        <option value="Other">Other Province</option>"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
