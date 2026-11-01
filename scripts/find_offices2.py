p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("Port Moresby (HQ)")
# Go back to find the grid container
start = s.rfind("grid gap-6", 0, idx)
print("grid at:", start)
print(repr(s[start-30:start+10]))
# Find the end - search for the last office card
end_marker = "Phone: 982 9111"
end = s.find(end_marker, idx)
print("end_marker at:", end)
# Show 200 chars after
print(repr(s[end:end+200]))
