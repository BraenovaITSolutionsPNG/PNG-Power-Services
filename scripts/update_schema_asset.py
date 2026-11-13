p = r"D:\BraeNova_Projects\PNG Power Services\database\schema.sql"
s = open(p, encoding='utf-8').read()
old = """  preferred_contact_time VARCHAR(50),"""
new = """  preferred_contact_time VARCHAR(50),
  asset_type VARCHAR(50),
  asset_number VARCHAR(50),
  asset_description VARCHAR(500),"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
