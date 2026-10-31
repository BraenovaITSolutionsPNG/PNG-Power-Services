import os, glob
base = r"D:\BraeNova_Projects\PNG Power Services\src"
for root, dirs, files in os.walk(base):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            path = os.path.join(root, f)
            try:
                s = open(path, encoding='utf-8').read()
                if 'Â' in s or chr(183) in s:
                    print(f"FOUND in {path}")
            except Exception as e:
                print(f"ERROR reading {path}: {e}")
print("done")
