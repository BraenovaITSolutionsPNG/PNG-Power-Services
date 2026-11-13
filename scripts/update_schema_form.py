p = r"D:\BraeNova_Projects\PNG Power Services\database\schema.sql"
s = open(p, encoding='utf-8').read()
old = """  reporter_phone VARCHAR(30),
  reporter_email VARCHAR(150),
  contact_preference VARCHAR(50),"""
new = """  reporter_phone VARCHAR(30),
  reporter_email VARCHAR(150),
  contact_preference VARCHAR(50),
  pol_number VARCHAR(50),
  account_holder VARCHAR(100),
  district VARCHAR(100),
  is_safety_hazard BOOLEAN DEFAULT FALSE,
  preferred_contact_time VARCHAR(50),"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w', encoding='utf-8').write(s)
print("done")
