import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-in-production-use-a-long-random-string'
const JWT_EXPIRES_IN = '8h'

const app = express()

// Security headers
app.use(helmet())

// CORS - restrict to known origins
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3003,http://localhost:5173').split(',')
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({ limit: '10kb' }))

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window
  message: { error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// General rate limiter
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/', generalLimiter)

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'png_power',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Auth middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    next()
  }
}

// Validation schemas
const loginSchema = z.object({
  email: z.string().email().max(150),
  password: z.string().min(1).max(128),
})

const reportSchema = z.object({
  issueType: z.string().min(1).max(100),
  province: z.string().max(100).optional(),
  location: z.string().min(1).max(500),
  description: z.string().min(1).max(2000),
  phone: z.string().max(30).optional(),
  contactPreference: z.string().max(50).optional(),
})

const staffSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(150),
  role: z.enum(['operations', 'field', 'admin', 'staff', 'regional_coordinator', 'regional_manager', 'hq_admin', 'system_admin']),
  department: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  status: z.enum(['Active', 'Inactive']).optional(),
})

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok')
    res.json({ status: 'ok', db: rows[0].ok === 1 })
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Database unavailable' })
  }
})

// Auth
app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input' })
    }
    const { email, password } = parsed.data
    const [rows] = await pool.query('SELECT id, name, email, password_hash, role, department, status FROM users WHERE email = ?', [email])
    if (rows.length === 0) {
      // Use same error message to prevent user enumeration
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
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      token,
    })
  } catch (err) {
    res.status(500).json({ error: 'Authentication failed' })
  }
})

// Verify token
app.get('/api/auth/me', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, department, status FROM users WHERE id = ?', [req.user.id])
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// Reports
app.get('/api/reports', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reports ORDER BY created_at DESC LIMIT 100')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports' })
  }
})

app.post('/api/reports', async (req, res) => {
  try {
    const parsed = reportSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
    }
    const { issueType, province, location, description, phone, contactPreference } = parsed.data
    const caseNumber = 'PNG-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-26'
    const [result] = await pool.query(
      'INSERT INTO reports (case_number, issue_type, province, location, description, reporter_phone, contact_preference, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [caseNumber, issueType, province || null, location, description, phone || null, contactPreference || null, 'Recorded']
    )
    res.status(201).json({ id: result.insertId, caseNumber })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create report' })
  }
})

app.get('/api/reports/:caseNumber', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reports WHERE case_number = ?', [req.params.caseNumber])
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch report' })
  }
})

// Incidents
app.get('/api/incidents', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM incidents ORDER BY opened_at DESC LIMIT 100')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch incidents' })
  }
})

// Staff
app.get('/api/staff', authenticate, authorize('admin', 'system_admin', 'hq_admin'), async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, department, status, phone FROM users ORDER BY id')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff' })
  }
})

app.post('/api/staff', authenticate, authorize('admin', 'system_admin'), async (req, res) => {
  try {
    const parsed = staffSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
    }
    const { name, email, role, department, phone, status } = parsed.data
    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-10) + 'A1!'
    const hash = await bcrypt.hash(tempPassword, 12)
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password_hash, role, department, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, hash, role, department || null, phone || null, status || 'Active']
    )
    res.status(201).json({ id: result.insertId, tempPassword })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' })
    }
    res.status(500).json({ error: 'Failed to create staff' })
  }
})

// Change password
app.post('/api/auth/change-password', authenticate, async (req, res) => {
  try {
    const schema = z.object({
      currentPassword: z.string().min(1),
      newPassword: z.string().min(8).max(128),
    })
    const parsed = schema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input' })
    }
    const { currentPassword, newPassword } = parsed.data
    const [rows] = await pool.query('SELECT password_hash FROM users WHERE id = ?', [req.user.id])
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' })
    const valid = await bcrypt.compare(currentPassword, rows[0].password_hash)
    if (!valid) return res.status(401).json({ error: 'Current password is incorrect' })
    const hash = await bcrypt.hash(newPassword, 12)
    await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, req.user.id])
    res.json({ message: 'Password updated successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update password' })
  }
})

// Regions
app.get('/api/regions', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM regions ORDER BY name')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch regions' })
  }
})

// Issue categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM issue_categories WHERE is_active = 1')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
