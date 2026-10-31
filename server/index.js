import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'png_power',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok')
    res.json({ status: 'ok', db: rows[0].ok === 1 })
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
})

// Auth
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const [rows] = await pool.query('SELECT id, name, email, password_hash, role, department, status FROM users WHERE email = ?', [email])
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const user = rows[0]
    if (user.status !== 'Active') {
      return res.status(403).json({ error: 'Account is inactive' })
    }
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      token: Buffer.from(JSON.stringify({ id: user.id, role: user.role })).toString('base64')
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
// Reports
app.get('/api/reports', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reports ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/reports', async (req, res) => {
  try {
    const { issueType, province, location, description, phone, contactPreference } = req.body
    const caseNumber = 'PNG-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-26'
    const [result] = await pool.query(
      'INSERT INTO reports (case_number, issue_type, province, location, description, reporter_phone, contact_preference, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [caseNumber, issueType, province, location, description, phone, contactPreference, 'Recorded']
    )
    res.status(201).json({ id: result.insertId, caseNumber })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/reports/:caseNumber', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reports WHERE case_number = ?', [req.params.caseNumber])
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Incidents
app.get('/api/incidents', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM incidents ORDER BY opened_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Staff
app.get('/api/staff', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, department, status, phone FROM users ORDER BY id')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/staff', async (req, res) => {
  try {
    const { name, email, role, department, phone, status } = req.body
    const [result] = await pool.query(
      'INSERT INTO users (name, email, role, department, phone, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, role, department, phone, status || 'Active']
    )
    res.status(201).json({ id: result.insertId })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Regions
app.get('/api/regions', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM regions ORDER BY name')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Issue categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM issue_categories WHERE is_active = 1')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

