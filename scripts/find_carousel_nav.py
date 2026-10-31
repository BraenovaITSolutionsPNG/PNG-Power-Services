p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
# Find the carousel nav container
idx = s.find('aria-label="Previous slide"')
start = s.rfind('<button', 0, idx)
# Go further back to find the container div
container_start = s.rfind('<div', 0, start)
print(repr(s[container_start:container_start+120]))
