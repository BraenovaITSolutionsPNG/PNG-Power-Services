p = r"D:\BraeNova_Projects\PNG Power Services\src\components\AdminPortal.tsx"
s = open(p).read()

old = """  function handleAddStaff() {
    const id = `STF-${String(staffUsers.length + 1).padStart(3, '0')}`
    setStaffUsers([...staffUsers, { ...(newStaff as StaffUser), id }])
    setShowAddStaff(false)
    setNewStaff({ role: 'staff', status: 'Active', department: 'Operations' })
  }"""

new = """  async function handleAddStaff() {
    try {
      const token = localStorage.getItem('png_power_token')
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newStaff),
      })
      if (!res.ok) {
        const data = await res.json()
        showToast(data.error || 'Failed to add staff', 'error')
        return
      }
      const data = await res.json()
      const id = `STF-${String(staffUsers.length + 1).padStart(3, '0')}`
      setStaffUsers([...staffUsers, { ...(newStaff as StaffUser), id }])
      setShowAddStaff(false)
      setNewStaff({ role: 'staff', status: 'Active', department: 'Operations' })
      showToast(`Staff added. Temporary password: ${data.tempPassword}`, 'success')
    } catch {
      showToast('Network error. Please try again.', 'error')
    }
  }"""

assert old in s, "pattern not found"
s = s.replace(old, new, 1)
open(p, 'w').write(s)
print("done")
