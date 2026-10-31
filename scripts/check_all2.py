import os
base = r"D:\BraeNova_Projects\PNG Power Services\src"
for root, dirs, files in os.walk(base):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            path = os.path.join(root, f)
            s = open(path, encoding='utf-8').read()
            if '\ufffd' in s:
                print(f"FOUND replacement char in {path}")
print("done")
