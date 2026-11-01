p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Find the offices grid container
start = s.find('        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">')
end = s.find("Phone: 982 9111", start) + len("Phone: 982 9111")
# Find the closing divs after
close = s.find("</section>", end)
# The grid ends before </section>, find the last </div> before </section>
grid_end = s.rfind("</div>", start, close) + 6
old_block = s[start:grid_end]

# New horizontal scroll container with all 22 provinces
new_block = '''        <div className="mt-10 overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 min-w-max">
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Port Moresby (HQ)</h4>
              <p className="text-xs text-muted mt-1">Corner Wards Road, Hohola, NCD</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 7090 8000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Lae Regional Office</h4>
              <p className="text-xs text-muted mt-1">Cassowary Road, Lae, Morobe</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 472 2011</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Mt Hagen Center</h4>
              <p className="text-xs text-muted mt-1">Kimininga Barracks Rd, WHP</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 542 1244</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Kokopo Commercial</h4>
              <p className="text-xs text-muted mt-1">Malaguna Road, Kokopo, ENB</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 982 9111</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Goroka Office</h4>
              <p className="text-xs text-muted mt-1">Eastern Highlands Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 532 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Wewak Office</h4>
              <p className="text-xs text-muted mt-1">East Sepik Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 456 2000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Wabag Office</h4>
              <p className="text-xs text-muted mt-1">Enga Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 547 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Kerema Office</h4>
              <p className="text-xs text-muted mt-1">Gulf Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 548 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Tari Office</h4>
              <p className="text-xs text-muted mt-1">Hela Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 549 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Minj Office</h4>
              <p className="text-xs text-muted mt-1">Jiwaka Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 550 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Madang Office</h4>
              <p className="text-xs text-muted mt-1">Madang Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 422 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Lorengau Office</h4>
              <p className="text-xs text-muted mt-1">Manus Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 441 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Alotau Office</h4>
              <p className="text-xs text-muted mt-1">Milne Bay Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 641 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Kundiawa Office</h4>
              <p className="text-xs text-muted mt-1">Chimbu (Simbu) Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 535 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Popondetta Office</h4>
              <p className="text-xs text-muted mt-1">Oro (Northern) Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 629 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Vanimo Office</h4>
              <p className="text-xs text-muted mt-1">Sandaun (West Sepik) Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 457 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Mendi Office</h4>
              <p className="text-xs text-muted mt-1">Southern Highlands Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 549 2000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Kimbe Office</h4>
              <p className="text-xs text-muted mt-1">West New Britain Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 935 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Daru Office</h4>
              <p className="text-xs text-muted mt-1">Western Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 646 1000</p>
              </div>
            </div>
            <div className="card p-5 min-w-[260px] shrink-0">
              <h4 className="font-bold text-ink">Kavieng Office</h4>
              <p className="text-xs text-muted mt-1">New Ireland Province</p>
              <div className="mt-4 text-xs space-y-1 font-semibold text-ink/80">
                <p>Mon - Fri: 8:00 AM - 4:30 PM</p>
                <p className="text-brand">Phone: 984 1000</p>
              </div>
            </div>
          </div>
        </div>'''

assert old_block in s, "pattern not found"
s = s.replace(old_block, new_block, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
