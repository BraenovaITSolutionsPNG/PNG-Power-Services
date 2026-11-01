p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Fix extra closing divs before </section>
old = """            </div>
          </div>
        </div>
          </div>
        </div>
      </section>"""
new = """            </div>
          </div>
        </div>
      </section>"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
