import bcrypt from 'bcrypt'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'png_power',
})

const users = [
  { name: 'John Kila', email: 'ops.lead@pngpower.com.pg', password: 'ops123', role: 'operations', department: 'Operations & Dispatch' },
  { name: 'Maria Wari', email: 'crew.delta@pngpower.com.pg', password: 'field123', role: 'field', department: 'Field Operations' },
  { name: 'David Raka', email: 'admin.hq@pngpower.com.pg', password: 'admin123', role: 'admin', department: 'IT & Admin' },
  { name: 'Sarah Momo', email: 'dispatch.ncd@pngpower.com.pg', password: 'dispatch123', role: 'operations', department: 'NCD Dispatch' },
  { name: 'Peter Kila', email: 'tech.lae@pngpower.com.pg', password: 'tech123', role: 'field', department: 'Lae Field Team' },
  { name: 'Regional Coordinator', email: 'coord@pngpower.com.pg', password: 'coord123', role: 'regional_coordinator', department: 'Regional Coordination' },
  { name: 'Regional Manager', email: 'manager@pngpower.com.pg', password: 'manager123', role: 'regional_manager', department: 'Regional Management' },
  { name: 'HQ Analyst', email: 'analyst@pngpower.com.pg', password: 'analyst123', role: 'hq_admin', department: 'HQ Analytics' },
  { name: 'System Admin', email: 'sysadmin@pngpower.com.pg', password: 'sysadmin123', role: 'system_admin', department: 'System Administration' },
  { name: 'Call Centre Agent', email: 'callcentre@pngpower.com.pg', password: 'call123', role: 'staff', department: 'Call Centre' },
]

async function seed() {
  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10)
    await pool.query(
      'INSERT INTO users (name, email, password_hash, role, department, status) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = ?, role = ?, department = ?',
      [u.name, u.email, hash, u.role, u.department, 'Active', hash, u.role, u.department]
    )
    console.log(`Seeded: ${u.email} (${u.role})`)
  }
  await pool.end()
  console.log('Done!')
}

seed().catch(err => { console.error(err); process.exit(1) })
