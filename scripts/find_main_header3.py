p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p, encoding='utf-8').read()
idx = s.find("<header")
end = s.find("</header>", idx) + len("</header>")
print(s[idx+len('<header className="fixed top-0 right-0 left-0 lg:left-72 z-30 flex h-16 items-center border-b border-line bg-white/95 px-5 backdrop-blur-md shadow-sm sm:px-8">'):end])
