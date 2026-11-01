p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("hidden sm:flex items-center gap-4 text-xs")
# Walk up to find the top bar container
pos = idx
depth = 0
# Find the nearest <div that contains both
while pos > 0:
    if s[pos:pos+4] == '<div':
        # Check if this div contains both grid status and hotline
        end = s.find('>', pos) + 1
        # Find matching close
        d = 1
        i = end
        while i < len(s) and d > 0:
            if s[i:i+4] == '<div':
                d += 1
                i += 4
            elif s[i:i+6] == '</div>':
                d -= 1
                if d == 0:
                    break
                i += 6
            else:
                i += 1
        container = s[pos:i+6]
        if 'National Power Grid Status' in container or '24/7 Hotline' in container:
            print(f"Found container at {pos}:")
            print(repr(container[:200]))
            print("...")
            print(repr(container[-100:]))
            break
        pos -= 1
