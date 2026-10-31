p = r"C:\xampp\phpMyAdmin\config.inc.php"
s = open(p).read()
old = "$cfg['Servers'][$i]['host'] = '127.0.0.1';"
new = "$cfg['Servers'][$i]['host'] = '127.0.0.1';\n$cfg['Servers'][$i]['port'] = '3307';"
assert old in s, "not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
