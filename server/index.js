import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { sendNotification } from './notifications.js'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-in-production-use-a-long-random-string'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret-change-in-production'
const JWT_EXPIRES_IN = '15m'
const JWT_REFRESH_EXPIRES_IN = '7d'

const app = express()

// Security headers
app.use(helmet())

// CORS
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

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/', generalLimiter)

// File upload config
const uploadDir = path.join(process.cwd(), 'uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|pdf|doc|docx/
    const ext = allowed.test(path.extname(file.originalname).toLowerCase())
    const mime = allowed.test(file.mimetype)
    if (ext && mime) cb(null, true)
    else cb(new Error('Invalid file type'))
  }
})

// Static files
app.use('/uploads', express.static(uploadDir))

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

// Audit logging helper
async function logEvent(entityType, entityId, eventType, actorId, reason, metadata) {
  try {
    await pool.query(
      'INSERT INTO events (entity_type, entity_id, event_type, actor_id, reason, metadata) VALUES (?, ?, ?, ?, ?, ?)',
      [entityType, entityId, eventType, actorId, reason || null, metadata ? JSON.stringify(metadata) : null]
    )
  } catch (err) {
    console.error('Audit log failed:', err.message)
  }
}

// Status transition validation
const validTransitions = {
  report: {
    'Recorded': ['Under review'],
    'Under review': ['Assigned', 'Recorded'],
    'Assigned': ['Work in progress', 'Under review'],
    'Work in progress': ['Pending', 'Resolved', 'Assigned'],
    'Pending': ['Work in progress', 'Resolved'],
    'Resolved': ['Closed', 'Work in progress'],
    'Closed': [],
  },
  incident: {
    'Open': ['Under review'],
    'Under review': ['Assigned', 'Open'],
    'Assigned': ['In progress', 'Under review'],
    'In progress': ['Pending', 'Resolved', 'Assigned'],
    'Pending': ['In progress', 'Resolved'],
    'Resolved': ['Closed', 'In progress'],
    'Closed': [],
  },
  workOrder: {
    'Draft': ['Assigned'],
    'Assigned': ['Accepted', 'Draft'],
    'Accepted': ['In progress', 'Assigned'],
    'In progress': ['Blocked', 'Work completed', 'Accepted'],
    'Blocked': ['In progress'],
    'Work completed': ['Cancelled'],
    'Cancelled': [],
  },
}

function isValidTransition(entityType, fromStatus, toStatus) {
  const transitions = validTransitions[entityType]
  if (!transitions) return true
  if (!transitions[fromStatus]) return true // unknown status, allow
  return transitions[fromStatus].includes(toStatus)
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
  reporterName: z.string().max(100).optional(),
  polNumber: z.string().max(50).optional(),
  accountHolder: z.string().max(100).optional(),
  district: z.string().max(100).optional(),
  isSafetyHazard: z.boolean().optional(),
  preferredContactTime: z.string().max(50).optional(),
  assetType: z.string().max(50).optional(),
  assetNumber: z.string().max(50).optional(),
  assetDescription: z.string().max(500).optional(),
})

const staffSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(150),
  role: z.enum(['operations', 'field', 'admin', 'staff', 'regional_coordinator', 'regional_manager', 'hq_admin', 'system_admin']),
  department: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  status: z.enum(['Active', 'Inactive']).optional(),
})

const passwordResetSchema = z.object({
  email: z.string().email().max(150),
})

const passwordChangeSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8).max(128),
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

// Auth - Login
app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input' })
    }
    const { email, password } = parsed.data
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
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )
    const refreshToken = jwt.sign(
      { id: user.id, type: 'refresh' },
      JWT_REFRESH_SECRET,
      { expiresIn: JWT_REFRESH_EXPIRES_IN }
    )
    // Store refresh token
    await pool.query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))', [user.id, refreshToken])
    await logEvent('user', user.id, 'login', user.id, 'User logged in', { email: user.email })
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      accessToken,
      refreshToken,
    })
  } catch (err) {
    res.status(500).json({ error: 'Authentication failed' })
  }
})

// Auth - Refresh token
app.post('/api/auth/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' })
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET)
    const [rows] = await pool.query('SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()', [refreshToken])
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid refresh token' })
    const [users] = await pool.query('SELECT id, name, email, role, department, status FROM users WHERE id = ?', [decoded.id])
    if (users.length === 0 || users[0].status !== 'Active') return res.status(401).json({ error: 'User not found or inactive' })
    const user = users[0]
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )
    res.json({ accessToken })
  } catch (err) {
    res.status(401).json({ error: 'Invalid refresh token' })
  }
})

// Auth - Logout
app.post('/api/auth/logout', authenticate, async (req, res) => {
  try {
    await pool.query('DELETE FROM refresh_tokens WHERE user_id = ?', [req.user.id])
    await logEvent('user', req.user.id, 'logout', req.user.id, 'User logged out', null)
    res.json({ message: 'Logged out successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Logout failed' })
  }
})

// Auth - Forgot password
app.post('/api/auth/forgot-password', authLimiter, async (req, res) => {
  try {
    const parsed = passwordResetSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: 'Invalid input' })
    const { email } = parsed.data
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email])
    // Always return success to prevent user enumeration
    if (rows.length > 0) {
      const resetToken = jwt.sign({ id: rows[0].id, type: 'reset' }, JWT_SECRET, { expiresIn: '1h' })
      await pool.query('INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))', [rows[0].id, resetToken])
      // In production, send email with reset link
      console.log(`Password reset token for ${email}: ${resetToken}`)
    }
    res.json({ message: 'If the email exists, a reset link has been sent' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to process request' })
  }
})

// Auth - Reset password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const parsed = passwordChangeSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: 'Invalid input' })
    const { token, newPassword } = parsed.data
    const decoded = jwt.verify(token, JWT_SECRET)
    const [rows] = await pool.query('SELECT * FROM password_reset_tokens WHERE token = ? AND expires_at > NOW() AND used = 0', [token])
    if (rows.length === 0) return res.status(400).json({ error: 'Invalid or expired reset token' })
    const hash = await bcrypt.hash(newPassword, 12)
    await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, decoded.id])
    await pool.query('UPDATE password_reset_tokens SET used = 1 WHERE token = ?', [token])
    await logEvent('user', decoded.id, 'password_reset', decoded.id, 'Password reset via token', null)
    res.json({ message: 'Password reset successfully' })
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired reset token' })
  }
})

// Auth - Change password (authenticated)
app.post('/api/auth/change-password', authenticate, async (req, res) => {
  try {
    const schema = z.object({
      currentPassword: z.string().min(1),
      newPassword: z.string().min(8).max(128),
    })
    const parsed = schema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: 'Invalid input' })
    const { currentPassword, newPassword } = parsed.data
    const [rows] = await pool.query('SELECT password_hash FROM users WHERE id = ?', [req.user.id])
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' })
    const valid = await bcrypt.compare(currentPassword, rows[0].password_hash)
    if (!valid) return res.status(401).json({ error: 'Current password is incorrect' })
    const hash = await bcrypt.hash(newPassword, 12)
    await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, req.user.id])
    await logEvent('user', req.user.id, 'password_change', req.user.id, 'Password changed', null)
    res.json({ message: 'Password updated successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update password' })
  }
})

// Auth - Get current user
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
    const { issueType, province, location, description, phone, contactPreference, reporterName, polNumber, accountHolder, district, isSafetyHazard, preferredContactTime, assetType, assetNumber, assetDescription } = parsed.data
    const caseNumber = 'PNG-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + new Date().getFullYear().toString().slice(-2)
    const [result] = await pool.query(
      'INSERT INTO reports (case_number, issue_type, province, location, description, reporter_phone, contact_preference, reporter_name, status, pol_number, account_holder, district, is_safety_hazard, preferred_contact_time, asset_type, asset_number, asset_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [caseNumber, issueType, province || null, location, description, phone || null, contactPreference || null, reporterName || null, 'Recorded', polNumber || null, accountHolder || null, district || null, isSafetyHazard || false, preferredContactTime || null, assetType || null, assetNumber || null, assetDescription || null]
    )
    await logEvent('report', result.insertId, 'created', req.user?.id || null, 'Report created', { caseNumber, issueType })
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

// Update report status with transition validation
app.patch('/api/reports/:caseNumber/status', authenticate, async (req, res) => {
  try {
    const { status, reason } = req.body
    const validStatuses = ['Recorded', 'Under review', 'Assigned', 'Work in progress', 'Pending', 'Resolved', 'Closed']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    const [rows] = await pool.query('SELECT id, status FROM reports WHERE case_number = ?', [req.params.caseNumber])
    if (rows.length === 0) return res.status(404).json({ error: 'Report not found' })
    const currentStatus = rows[0].status
    if (!isValidTransition('report', currentStatus, status)) {
      return res.status(400).json({ error: `Invalid transition from ${currentStatus} to ${status}` })
    }
    await pool.query('UPDATE reports SET status = ?, updated_at = NOW() WHERE case_number = ?', [status, req.params.caseNumber])
    await logEvent('report', rows[0].id, 'status_change', req.user.id, reason || `Status changed to ${status}`, { from: currentStatus, to: status })
    res.json({ message: 'Status updated', from: currentStatus, to: status })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' })
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
    const tempPassword = Math.random().toString(36).slice(-10) + 'A1!'
    const hash = await bcrypt.hash(tempPassword, 12)
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password_hash, role, department, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, hash, role, department || null, phone || null, status || 'Active']
    )
    await logEvent('user', result.insertId, 'created', req.user.id, 'Staff member added', { name, email, role })
    res.status(201).json({ id: result.insertId, tempPassword })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' })
    }
    res.status(500).json({ error: 'Failed to create staff' })
  }
})

// Update staff
app.patch('/api/staff/:id', authenticate, authorize('admin', 'system_admin', 'hq_admin'), async (req, res) => {
  try {
    const { role, department, status } = req.body
    const [rows] = await pool.query('SELECT id FROM users WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' })
    const updates = []
    const values = []
    if (role) { updates.push('role = ?'); values.push(role) }
    if (department) { updates.push('department = ?'); values.push(department) }
    if (status) { updates.push('status = ?'); values.push(status) }
    if (updates.length === 0) return res.status(400).json({ error: 'No updates provided' })
    values.push(req.params.id)
    await pool.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values)
    await logEvent('user', parseInt(req.params.id), 'updated', req.user.id, 'Staff access updated', { role, department, status })
    res.json({ message: 'Staff updated' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update staff' })
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

// File upload
app.post('/api/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
    const { entityType, entityId } = req.body
    const [result] = await pool.query(
      'INSERT INTO attachments (entity_type, entity_id, file_name, file_type, file_size, file_path, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [entityType || 'report', entityId || 0, req.file.originalname, req.file.mimetype, req.file.size, `/uploads/${req.file.filename}`, req.user.id]
    )
    await logEvent(entityType || 'report', entityId || 0, 'file_uploaded', req.user.id, 'File uploaded', { fileName: req.file.originalname, fileSize: req.file.size })
    res.status(201).json({ id: result.insertId, fileName: req.file.originalname, filePath: `/uploads/${req.file.filename}` })
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload file' })
  }
})

// Notifications - send
app.post('/api/notifications', authenticate, async (req, res) => {
  try {
    const { recipientType, reportId, incidentId, userId, channel, template } = req.body
    const [result] = await pool.query(
      'INSERT INTO notifications (recipient_type, report_id, incident_id, user_id, channel, template, delivery_state) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [recipientType, reportId || null, incidentId || null, userId || null, channel, template || null, 'pending']
    )
    // Attempt to send via provider
    const recipient = recipientType === 'reporter' ? 'reporter' : `user:${userId}`
    const sendResult = await sendNotification(channel, recipient, template, { message: template })
    const deliveryState = sendResult.success ? 'sent' : 'failed'
    await pool.query('UPDATE notifications SET delivery_state = ?, sent_at = NOW() WHERE id = ?', [deliveryState, result.insertId])
    await logEvent('notification', result.insertId, deliveryState, req.user.id, `Notification ${deliveryState}`, { channel, template, provider: sendResult.provider })
    res.status(201).json({ id: result.insertId, deliveryState })
  } catch (err) {
    res.status(500).json({ error: 'Failed to queue notification' })
  }
})

// Get notifications for a report
app.get('/api/notifications/report/:reportId', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM notifications WHERE report_id = ? ORDER BY created_at DESC', [req.params.reportId])
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' })
  }
})

// Audit events for an entity
app.get('/api/events/:entityType/:entityId', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT e.*, u.name as actor_name FROM events e LEFT JOIN users u ON e.actor_id = u.id WHERE e.entity_type = ? AND e.entity_id = ? ORDER BY e.server_time DESC', [req.params.entityType, req.params.entityId])
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' })
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
