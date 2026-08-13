/**
 * ContentSplit.ai — Secure Backend Proxy Server
 *
 * The DeepSeek API key lives ONLY here (server/.env).
 * It is NEVER sent to the browser. The frontend talks to
 * this server at /api/*, and this server talks to DeepSeek.
 * 
 * Database: Supabase PostgreSQL
 */

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcrypt'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import multer from 'multer'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Set up multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
})

// Load server-only .env (not VITE_* prefixed — never exposed to browser)
// For local dev, loads from .env file. For Vercel, env vars come from dashboard
const envPath = join(__dirname, '.env')
try {
  dotenv.config({ path: envPath })
} catch (e) {
  // Vercel doesn't have .env file - env vars are set in dashboard
}

const app = express()
const PORT = process.env.PORT || 3001

// Apply basic security headers
app.use(helmet())

// ── FLUTTERWAVE CONFIG ─────────────────────────────────────────────────────────
let flutterwave = null

async function getFlutterwave() {
  if (!flutterwave && process.env.FLUTTERWAVE_SECRET_KEY) {
    try {
      const Flutterwave = await import('flutterwave-node-v3')
      flutterwave = new Flutterwave.default(
        process.env.FLUTTERWAVE_PUBLIC_KEY,
        process.env.FLUTTERWAVE_SECRET_KEY
      )
      console.log('✅ Flutterwave initialized')
    } catch (e) {
      console.warn('⚠️  Flutterwave import failed:', e.message)
    }
  }
  return flutterwave
}

// Flutterwave pricing (in Naira - 5000 NGN = ~$3/month)
const getFlutterwavePlans = () => ({
  free: { amount: 0, name: 'Free Tier' },
  pro: { amount: 8500, name: 'Pro Plan', planId: process.env.FLUTTERWAVE_PLAN_ID_PRO || '165591' },
  agency: { amount: 15000, name: 'Agency Plan', planId: process.env.FLUTTERWAVE_PLAN_ID_AGENCY },
  pro_yearly: { amount: 91800, name: 'Pro Plan (Yearly)', planId: process.env.FLUTTERWAVE_PLAN_ID_PRO_YEARLY || '165593' },
  agency_yearly: { amount: 162000, name: 'Agency Plan (Yearly)', planId: process.env.FLUTTERWAVE_PLAN_ID_AGENCY_YEARLY }
})

// ── DEEPSEEK CONFIG ─────────────────────────────────────────────────────────
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const DEEPSEEK_BASE_URL = 'https://api.deepseek.com'
const DEEPSEEK_MODEL = 'deepseek-chat'

if (!DEEPSEEK_API_KEY) {
  console.warn('⚠️  DEEPSEEK_API_KEY is not set - AI generation will be disabled')
  // Don't exit - allow server to run in mock mode
}

// ── SUPABASE CONFIG ─────────────────────────────────────────────────────────
let supabase = null

async function initSupabase() {
  if (supabase) return supabase

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY

  console.log('Supabase env check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    url: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'MISSING'
  })

  if (!supabaseUrl || !supabaseKey) {
    console.error('⚠️ Supabase env vars missing')
    return null
  }

  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })
    console.log('✅ Supabase client initialized')
  } catch (e) {
    console.error('⚠️ Supabase init error:', e.message)
    supabase = null
  }

  return supabase
}

// ── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors())
app.use((req, res, next) => {
  // If Vercel already parsed the body, mark it so express.json skips it.
  // This prevents the 30s timeout hang.
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    req._body = true;
  }
  next();
});
app.use(express.json({
  limit: '1mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}))

// Initialize services on first API request (handles Vercel serverless cold starts)
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    if (!supabase) await initSupabase()
    if (!flutterwave && req.path.includes('/payments/')) await getFlutterwave()
  }
  next()
})

// Simple file-based persistence for mock mode (skipped on Vercel's read-only FS)
const DB_PATH = path.resolve(__dirname, 'db')
try {
  if (!fs.existsSync(DB_PATH)) fs.mkdirSync(DB_PATH, { recursive: true })
} catch (e) {
  // Vercel has a read-only filesystem — mock DB persistence is not available
  console.warn('⚠️ Cannot create db directory (read-only FS):', e.message)
}

function loadMockDb(name) {
  try {
    const filePath = path.join(DB_PATH, `${name}.json`)
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      return new Map(Object.entries(data))
    }
  } catch (e) {
    console.error(`Error loading ${name} DB:`, e.message)
  }
  return new Map()
}

function saveMockDb(name, map) {
  try {
    const filePath = path.join(DB_PATH, `${name}.json`)
    const data = Object.fromEntries(map)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (e) {
    console.warn(`⚠️ Cannot save ${name} DB:`, e.message)
  }
}

const usersDb = loadMockDb('users')
const conversionsDb = new Map()
const outputsDb = new Map()
const socialAccountsDb = new Map()
const socialPostsDb = new Map()
const emailSubscribersDb = new Map()
const sessionsDb = loadMockDb('sessions')
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET || JWT_SECRET === 'your_jwt_secret_here') {
  console.error('\n❌ FATAL: JWT_SECRET environment variable is not set or is using the placeholder value.')
  console.error('   Generate one with: openssl rand -base64 32')
  console.error('   Then set it in your .env file and Vercel dashboard.\n')
  process.exit(1)
}

// getUserDb returns DB interface (Supabase or mock)
// Call initSupabase() before using this in request handlers
function getUserDb() {
  // Return Supabase-backed DB if available
  if (supabase) {
    return {
      async findByEmail(email) {
        console.log('findByEmail:', email)
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', email.trim().toLowerCase())
          .single()
        console.log('findByEmail result:', { error: error?.message })
        if (error && error.code !== 'PGRST116') throw error
        return data || null
      },
      async findById(id) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single()
        if (error && error.code !== 'PGRST116') throw error
        return data || null
      },
      async create(email, passwordHash, firstName, lastName) {
        // NOTE: passwordHash must already be bcrypt-hashed by the caller
        email = email.trim().toLowerCase()
        console.log('Creating user in Supabase:', email)
        const userData = {
          email,
          password_hash: passwordHash,
          tier: 'free',
          display_name: firstName && lastName ? `${firstName} ${lastName}` : (firstName || lastName || null)
        }

        const { data, error } = await supabase
          .from('users')
          .insert(userData)
          .select()
          .single()
        console.log('Insert result:', { error: error?.message, data: !!data })
        if (error) {
          console.log('Error details:', JSON.stringify(error))
          // Check if it's a column missing error, try without name fields
          if (error.message && (error.message.includes('first_name') || error.message.includes('last_name') || error.message.includes('column'))) {
            console.log('Detected missing column error, retrying without name fields...')
            const { data: retryData, error: retryError } = await supabase
              .from('users')
              .insert({
                email,
                password_hash: passwordHash,
                tier: 'free',
                display_name: firstName && lastName ? `${firstName} ${lastName}` : (firstName || lastName || null)
              })
              .select()
              .single()
            if (retryError) {
              console.error('Supabase insert error:', retryError)
              throw retryError
            }
            return retryData
          }
          console.error('Supabase insert error:', error)
          throw error
        }
        return data
      },
      async update(id, updates) {
        const { data, error } = await supabase
          .from('users')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        if (error) throw error
        return data
      },
      async delete(id) {
        // Delete related data first to prevent foreign key constraint violations
        const tables = [
          'email_subscribers',
          'social_posts',
          'social_accounts',
          'media_uploads',
          'outputs',
          'conversions'
        ]
        
        for (const table of tables) {
          try {
            await supabase.from(table).delete().eq('user_id', id)
          } catch (err) {
            console.warn(`Could not delete from ${table} for user ${id}:`, err.message)
          }
        }

        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', id)
        if (error) throw error
        return true
      }
    }
  }

  // Fallback: mock in-memory DB
  return {
    findByEmail(email) {
      return Array.from(usersDb.values()).find(u => u.email.trim().toLowerCase() === email.trim().toLowerCase()) || null
    },
    findById(id) {
      return usersDb.get(id) || null
    },
    create(email, passwordHash, firstName, lastName) {
      // NOTE: passwordHash must already be bcrypt-hashed by the caller
      const user = {
        id: crypto.randomUUID(),
        email: email.trim().toLowerCase(),
        password_hash: passwordHash,
        tier: 'free',
        first_name: firstName,
        last_name: lastName,
        created_at: new Date().toISOString()
      }
      usersDb.set(user.id, user)
      saveMockDb('users', usersDb)
      return user
    },
    update(id, updates) {
      const user = usersDb.get(id)
      if (user) {
        Object.assign(user, updates)
        usersDb.set(id, user)
        saveMockDb('users', usersDb)
      }
      return user
    }
  }
}

// Secure password hashing with bcrypt (cost factor 12)
async function hashPassword(password) {
  return bcrypt.hash(password, 12)
}

async function verifyPassword(password, hash) {
  if (!hash) return false
  // Support legacy SHA-256 hashes during migration (remove after all users have re-logged in)
  const sha256Hash = crypto.createHash('sha256').update(password).digest('hex')
  if (hash === sha256Hash) return true
  return bcrypt.compare(password, hash)
}

function generateToken(userId) {
  const payload = Buffer.from(JSON.stringify({
    userId: userId || 'recovery',
    type: userId ? 'session' : 'recovery',
    expiresAt: Date.now() + (userId ? (7 * 24 * 60 * 60 * 1000) : (60 * 60 * 1000)) // 7 days for session, 1 hour for recovery
  })).toString('base64')
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(payload).digest('base64')
  return `${payload}.${signature}`
}

const tokenDenylist = new Set()

function verifyToken(token) {
  try {
    if (tokenDenylist.has(token)) return null;
    const [payload, signature] = token.split('.')
    if (!payload || !signature) return null
    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(payload).digest('base64')

    // Timing-safe comparison to prevent timing attacks
    const sigBuf = Buffer.from(signature, 'base64')
    const expectedBuf = Buffer.from(expectedSignature, 'base64')
    if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return null
    }

    const data = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
    if (data.expiresAt < Date.now()) return null

    return data
  } catch (err) {
    return null
  }
}

// Email sending (placeholder - use Resend/SendGrid/AWS SES in production)
async function sendRecoveryEmail(toEmail, token, fromEmail) {
  const APP_URL = process.env.APP_URL || 'http://localhost:3000'
  const recoveryLink = `${APP_URL}/reset-password?token=${token}&email=${encodeURIComponent(toEmail)}`
  const isPlaceholder = (val) => !val || val.includes('your_resend_api_key') || val.includes('your_deepseek_api_key')

  const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #1a1a1a;">ContentSplit - Password Recovery</h2>
  <p>You requested to reset your password. Click the button below to create a new password:</p>
  <a href="${recoveryLink}" style="display: inline-block; background: #1a1a1a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
    Reset Password
  </a>
  <p style="color: #666; font-size: 14px;">This link expires in 1 hour.</p>
  <p style="color: #666; font-size: 14px;">If you didn't request this, ignore this email.</p>
</body>
</html>
  `.trim()

  if (process.env.RESEND_API_KEY && !isPlaceholder(process.env.RESEND_API_KEY)) {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'ContentSplit <noreply@resend.dev>',
      to: toEmail,
      subject: 'ContentSplit - Password Recovery',
      html: emailHtml,
    })

    console.log(`📧 Recovery email sent via Resend to ${toEmail}`)
  } else if (process.env.SMTP_HOST && process.env.SMTP_HOST.trim() !== '') {
    // Production: send via SMTP
    const nodemailerModule = await import('nodemailer')
    const nodemailer = nodemailerModule.default || nodemailerModule
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Verify connection before sending
    await transporter.verify()

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || fromEmail,
      to: toEmail,
      subject: 'ContentSplit - Password Recovery',
      html: emailHtml,
    })

    console.log(`📧 Recovery email sent via SMTP to ${toEmail}`)
  } else {
    console.log(`📧 [MOCK] Password recovery email for: ${toEmail}`)
    console.log(`   Link: ${recoveryLink}`)
  }
}

// Auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = auth.replace('Bearer ', '')
  const session = verifyToken(token)

  if (!session) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  req.userId = session.userId
  req.session = session
  next()
}

// Optional auth - doesn't fail if no token
function optionalAuth(req, res, next) {
  const auth = req.headers.authorization
  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.replace('Bearer ', '')
    const session = verifyToken(token)
    if (session) {
      req.userId = session.userId
      req.session = session
    }
  }
  next()
}

// ── PLATFORM PROMPTS ─────────────────────────────────────────────────────────
function buildPrompt(inputText, platform, tone, regenerationOption = null) {
  const toneGuide = {
    professional: 'formal, authoritative, and polished',
    casual: 'relaxed, conversational, and friendly',
    punchy: 'energetic, concise, and impactful',
    friendly: 'warm, approachable, and encouraging',
  }[tone] || 'clear and engaging'

  const platformGuides = {
    twitter: `Create a Twitter/X thread (3-5 tweets). Each tweet max 280 chars. Use 1-2 relevant hashtags. Number each tweet (1/ 2/ etc). Tone: ${toneGuide}.`,
    facebook: `Write a Facebook post (150-500 words). Start with an engaging hook that stops the scroll. Use conversational tone. Add line breaks for readability. Include an engagement question at the end. Tone: ${toneGuide}.`,
    linkedin: `Write a LinkedIn post (150-400 words). Start with a strong hook. Use short paragraphs. Add 3-5 relevant hashtags at the end. Tone: ${toneGuide}.`,
    instagram: `Write an Instagram caption (100-200 words). Start with a grabbing first line (shown before "more"). Use line breaks. Add 10-15 relevant hashtags at the end. Tone: ${toneGuide}.`,
    email: `Write an email newsletter intro (200-300 words). Include: subject line (Subject: ...), preview text (Preview: ...), then the body. Tone: ${toneGuide}.`,
    summary: `Create a TL;DR summary with 3-5 bullet points. Keep each point brief and actionable. Tone: ${toneGuide}.`,
  }

  let regenerationInstruction = ''
  if (regenerationOption) {
    switch (regenerationOption) {
      case 'clarity':
        regenerationInstruction = '\n\nIMPORTANT: Rewrite this content to IMPROVE CLARITY. Use simpler language, clearer structure, and remove any ambiguity while keeping the same core message.'
        break
      case 'shorter':
        regenerationInstruction = '\n\nIMPORTANT: Rewrite this content to be SHORTER. Condense the message, remove fluff, and keep only the most essential points while maintaining impact.'
        break
      case 'emotion':
        regenerationInstruction = '\n\nIMPORTANT: Rewrite this content to ADD MORE EMOTION. Use more expressive language, power words, emotional hooks, and compelling storytelling to make it more engaging.'
        break
    }
  }

  return `You are a professional content strategist specialising in social media and digital content.

Convert the following blog content into platform-optimised content for ${platform.toUpperCase()}.

${platformGuides[platform] || `Adapt this content appropriately for ${platform}. Tone: ${toneGuide}.`}${regenerationInstruction}

IMPORTANT: Output ONLY the final content with no preamble, explanation, or meta-commentary.

--- BLOG CONTENT ---
${inputText}
--- END ---`
}

// ── RATE LIMITERS ────────────────────────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Please try again in 15 minutes.' }
})

const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour for anonymous/IP
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => !!req.userId, // skip for authenticated users (handled by per-user DB quota)
  message: { error: 'Too many requests. Please sign up for a free account to continue.' }
})

// ── ROUTES ───────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', async (req, res) => {
  let tableStatus = 'unknown'
  let userCount = 0
  if (supabase) {
    try {
      const { data, error } = await supabase.from('users').select('id', { count: 'exact' })
      if (error) {
        tableStatus = error.message
      } else {
        tableStatus = 'ok'
        userCount = data?.length || 0
      }
    } catch (e) {
      tableStatus = e.message
    }
  }
  res.json({
    status: 'ok',
    model: DEEPSEEK_MODEL,
    database: supabase ? 'connected' : 'mock',
    ...(process.env.NODE_ENV === 'development' && {
      table_status: tableStatus,
      user_count: userCount
    })
  })
})

// Login
app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const { email: rawEmail, password } = req.body
    const email = rawEmail?.trim()

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const userDb = getUserDb()
    const user = await userDb.findByEmail(email)

    if (!user) {
      console.log('Login failed: User not found for email:', email)
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    if (!await verifyPassword(password, user.password_hash)) {
      console.log('Login failed: Password mismatch for email:', email)
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // If user still has legacy SHA-256 hash, silently re-hash with bcrypt on login
    if (user.password_hash.length === 64) {
      const newHash = await hashPassword(password)
      await userDb.update(user.id, { password_hash: newHash })
    }

    // Create session
    const token = generateToken(user.id)

    // Remove password hash from response
    const { password_hash, ...userWithoutPassword } = user

    res.json({
      token,
      user: userWithoutPassword
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
})

// Register
app.post('/api/auth/register', authLimiter, async (req, res) => {
  try {
    const { email: rawEmail, password, firstName, lastName } = req.body
    const email = rawEmail?.trim()

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    if (password.length < 8 || !/(?=.*\d)/.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters and include at least one number' })
    }

    const userDb = getUserDb()
    console.log('Attempting to register:', email)

    // Check if user exists
    const existing = await userDb.findByEmail(email)
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    // Create user
    console.log('Creating user...')
    const user = await userDb.create(email, await hashPassword(password), firstName, lastName)
    console.log('User created:', user.id)

    // Create session
    const token = generateToken(user.id)

    // Remove password hash from response
    const { password_hash, ...userWithoutPassword } = user

    res.status(201).json({
      token,
      user: userWithoutPassword
    })
  } catch (err) {
    console.error('Registration error:', err.message, err.stack)
    // Do not leak internal error details to client
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already registered' })
    }
    res.status(500).json({ error: 'Registration failed. Please try again.' })
  }
})

// Google Auth
app.post('/api/auth/google', async (req, res) => {
  try {
    const { access_token } = req.body
    if (!access_token) {
      return res.status(400).json({ error: 'Google access token is required' })
    }

    // Fetch user profile from Google using the access token
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    })

    if (!userInfoRes.ok) {
      return res.status(401).json({ error: 'Invalid Google token' })
    }

    const payload = await userInfoRes.json()
    const email = payload.email
    const firstName = payload.given_name || ''
    const lastName = payload.family_name || ''
    const displayName = payload.name || `${firstName} ${lastName}`.trim()

    if (!email) {
      return res.status(400).json({ error: 'No email provided by Google' })
    }

    const userDb = getUserDb()
    let user = await userDb.findByEmail(email)

    if (!user) {
      console.log(`Creating new Google user: ${email} (${displayName})`)
      // Create user if they don't exist.
      const randomPw = await hashPassword(crypto.randomUUID())
      user = await userDb.create(email, randomPw, firstName, lastName)

      // If the userDb.create didn't set display_name (e.g. in mock mode), we set it here if needed
      // But we updated userDb.create already.
    }

    // Create session
    const token = generateToken(user.id)

    const { password_hash, ...userWithoutPassword } = user

    res.json({
      token,
      user: userWithoutPassword
    })
  } catch (err) {
    console.error('Google auth error:', err)
    res.status(500).json({
      error: 'Google auth failed',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
  }
})

// Get current user
app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const userDb = getUserDb()
    const user = await userDb.findById(req.userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const { password_hash, ...userWithoutPassword } = user
    res.json(userWithoutPassword)
  } catch (err) {
    console.error('Get user error:', err)
    res.status(500).json({ error: 'Failed to get user' })
  }
})

// Update password
app.post('/api/auth/update-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new passwords are required' })
    }
    
    if (newPassword.length < 8 || !/(?=.*\d)/.test(newPassword)) {
      return res.status(400).json({ error: 'New password must be at least 8 characters and include at least one number' })
    }

    const userDb = getUserDb()
    const user = await userDb.findById(req.userId)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Check if current password is correct
    if (!await verifyPassword(currentPassword, user.password_hash)) {
      return res.status(401).json({ error: 'Incorrect current password' })
    }

    // Update password
    await userDb.update(req.userId, {
      password_hash: await hashPassword(newPassword)
    })

    res.json({ success: true, message: 'Password updated successfully' })
  } catch (err) {
    console.error('Update password error:', err)
    res.status(500).json({ error: 'Failed to update password' })
  }
})

// Logout
app.post('/api/auth/logout', requireAuth, (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    tokenDenylist.add(token);
  }
  res.json({ success: true })
})

// ── MEDIA UPLOADS ────────────────────────────────────────────────────────────

app.post('/api/upload', requireAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' })
    }

    if (!supabase) {
      return res.status(500).json({ error: 'Supabase storage is not configured' })
    }

    const file = req.file
    const fileExt = file.originalname.split('.').pop()
    const fileName = `${req.userId}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `social/${fileName}`

    const { data, error } = await supabase.storage
      .from('media_uploads')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return res.status(500).json({ error: 'Failed to upload file to storage', details: error.message })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('media_uploads')
      .getPublicUrl(filePath)

    res.json({ url: urlData.publicUrl })
  } catch (err) {
    console.error('Upload error:', err)
    res.status(500).json({ error: 'Upload failed' })
  }
})

// ── CONTENT GENERATION ─────────────────────────────────────────────────────
const VALID_TONES = ['professional', 'casual', 'punchy', 'friendly']

const generateSchema = z.object({
  input_text: z.string().min(1, 'Content is required').refine((val) => {
    const wordCount = val.trim().split(/\s+/).length;
    return wordCount >= 10 && wordCount <= 5000;
  }, { message: 'Content must be between 10 and 5,000 words.' }),
  tone_mode: z.string().optional().default('casual').transform(t => VALID_TONES.includes(t) ? t : 'casual'),
  platforms: z.array(z.string()).min(1, 'Please select at least one platform'),
  persona: z.string().optional()
})

app.post('/api/conversions/generate', generateLimiter, optionalAuth, async (req, res) => {
  try {
    const parsedData = generateSchema.parse(req.body)
    let { input_text, tone_mode, platforms, persona } = parsedData
    
    // Prompt Injection Defense: strip special characters that could act as override commands
    if (persona) {
      persona = persona.replace(/[^a-zA-Z0-9\s.,-]/g, '').slice(0, 100);
    }
    
    const userId = req.userId || 'anonymous'

    // Check daily limit before generating (skip for anonymous users)
    if (userId !== 'anonymous') {
      const userDb = getUserDb()
      const user = await userDb.findById(userId)
      const tierLimits = {
        free: 1,        // 1 per day
        pro: 100,      // 100 per day
        agency: 999999  // unlimited
      }
      const tier = user?.tier || 'free'
      let limit = 5
      let periodStart = new Date()
      periodStart.setHours(0, 0, 0, 0)
      
      if (tier === 'pro') {
        limit = 100
        periodStart.setDate(1) // Start of month
      } else if (tier === 'agency') {
        limit = 999999
      }

      let usageCount = 0

      if (supabase) {
        const { count } = await supabase
          .from('conversions')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .gte('created_at', periodStart.toISOString())

        usageCount = count || 0
      } else {
        const allConversions = Array.from(conversionsDb.values())
        usageCount = allConversions.filter(c =>
          c.user_id === userId && new Date(c.created_at) >= periodStart
        ).length
      }

      if (usageCount >= limit) {
        const periodStr = tier === 'pro' ? 'month' : 'day'
        return res.status(429).json({
          error: `Limit reached. You've used ${usageCount}/${limit} conversions this ${periodStr}. Upgrade your plan for more.`,
          limit_reached: true,
          daily_usage: usageCount,
          daily_limit: limit
        })
      }
    }

    console.log(`⚡ Generating for platforms: ${platforms.join(', ')} | tone: ${tone_mode} | persona: ${persona || 'none'}`)

    // Generate content for all selected platforms IN PARALLEL
    const results = await Promise.all(
      platforms.map(async (platform) => {
        let prompt = buildPrompt(input_text, platform, tone_mode)
        if (persona) {
          prompt = `You are writing from the perspective of a ${persona}.\n` + prompt;
        }

        const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: DEEPSEEK_MODEL,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 1024,
          }),
        })

        if (!response.ok) {
          const err = await response.text()
          console.error(`DeepSeek API error for ${platform}:`, err)
          throw new Error(`DeepSeek error for ${platform}: ${err}`)
        }

        const data = await response.json()
        const content = data.choices?.[0]?.message?.content || ''

        return {
          id: crypto.randomUUID(),
          conversion_id: 'temp',
          platform,
          content,
          regeneration_count: 0,
        }
      })
    )

    const conversionId = crypto.randomUUID()
    const outputs = results.map(r => ({ ...r, conversion_id: conversionId }))

    // Save conversion to Supabase if user is authenticated
    if (userId !== 'anonymous' && supabase) {
      try {
        await supabase.from('conversions').insert({
          id: conversionId,
          user_id: req.userId,
          input_text: input_text.slice(0, 500),
          tone_mode,
          created_at: new Date().toISOString()
        })

        for (const output of outputs) {
          await supabase.from('outputs').insert({
            id: output.id,
            conversion_id: conversionId,
            platform: output.platform,
            content: output.content,
            regeneration_count: 0
          })
        }
        console.log('✅ Saved conversion to database')
      } catch (dbErr) {
        console.warn('Failed to save conversion:', dbErr.message)
      }
    } else {
      // Save to in-memory mock database
      conversionsDb.set(conversionId, {
        id: conversionId,
        user_id: userId,
        input_text: input_text.slice(0, 500),
        tone_mode,
        created_at: new Date().toISOString()
      })
      for (const output of outputs) {
        outputsDb.set(output.id, {
          id: output.id,
          conversion_id: conversionId,
          platform: output.platform,
          content: output.content,
          regeneration_count: 0
        })
      }
      saveMockDb('conversions', conversionsDb)
      saveMockDb('outputs', outputsDb)
      console.log('✅ Saved conversion to mock database')
    }

    res.json({
      conversion: {
        id: conversionId,
        user_id: userId,
        input_text: input_text.slice(0, 200),
        tone_mode,
        created_at: new Date().toISOString(),
      },
      outputs,
    })

    console.log(`✅ Generated ${outputs.length} outputs`)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors[0].message })
    }
    console.error('Generation error:', err.message)
    res.status(500).json({ error: 'Content generation failed. Check your DeepSeek API key.' })
  }
})

// Get conversion history
app.get('/api/conversions', requireAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1')
    const pageSize = parseInt(req.query.page_size || '20')

    const userDb = getUserDb()
    const user = await userDb.findById(req.userId)
    const tier = user?.tier || 'free'

    if (tier === 'free') {
      return res.json({
        data: [],
        total: 0,
        page,
        page_size: pageSize,
        has_more: false,
        locked: true
      })
    }

    let cutoffDate = null;
    if (tier === 'pro') {
      cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30); // 30 days history for Pro
    }

    if (supabase) {
      let query = supabase
        .from('conversions')
        .select('*')
        .eq('user_id', req.userId)
        
      if (cutoffDate) {
        query = query.gte('created_at', cutoffDate.toISOString())
      }
      
      const { data: conversions, error } = await query
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1)

      if (error) throw error

      let countQuery = supabase
        .from('conversions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', req.userId)

      if (cutoffDate) {
        countQuery = countQuery.gte('created_at', cutoffDate.toISOString())
      }

      const { count } = await countQuery

      res.json({
        data: conversions || [],
        total: count || 0,
        page,
        page_size: pageSize,
        has_more: (page * pageSize) < (count || 0)
      })
    } else {
      // Mock response - sample data
      let userConversions = Array.from(conversionsDb.values())
        .filter(c => c.user_id === req.userId)

      if (cutoffDate) {
        userConversions = userConversions.filter(c => new Date(c.created_at) >= cutoffDate)
      }

      userConversions = userConversions
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice((page - 1) * pageSize, page * pageSize)

      res.json({
        data: userConversions,
        total: userConversions.length,
        page,
        page_size: pageSize,
        has_more: false
      })
    }
  } catch (err) {
    console.error('Get conversions error:', err)
    res.status(500).json({ error: 'Failed to get conversions' })
  }
})

// Get single conversion
app.get('/api/conversions/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params

    if (supabase) {
      const { data: conversion, error } = await supabase
        .from('conversions')
        .select('*')
        .eq('id', id)
        .eq('user_id', req.userId)
        .single()

      if (error) throw error
      if (!conversion) {
        return res.status(404).json({ error: 'Conversion not found' })
      }
      res.json(conversion)
    } else {
      res.status(404).json({ error: 'Conversion not found' })
    }
  } catch (err) {
    console.error('Get conversion error:', err)
    res.status(500).json({ error: 'Failed to get conversion' })
  }
})

// Delete a conversion
app.delete('/api/conversions/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params

    if (supabase) {
      // Delete outputs first
      const { error: outputsError } = await supabase
        .from('outputs')
        .delete()
        .eq('conversion_id', id)

      if (outputsError) throw outputsError

      // Delete the conversion
      const { error } = await supabase
        .from('conversions')
        .delete()
        .eq('id', id)
        .eq('user_id', req.userId)

      if (error) throw error
    } else {
      // Mock response - delete from in-memory
      conversionsDb.delete(id)
      outputsDb.forEach((output, key) => {
        if (output.conversion_id === id) outputsDb.delete(key)
      })
      saveMockDb('conversions', conversionsDb)
      saveMockDb('outputs', outputsDb)
    }

    res.json({ success: true })
  } catch (err) {
    console.error('Delete conversion error:', err)
    res.status(500).json({ error: 'Failed to delete conversion' })
  }
})

// Get outputs for a conversion
app.get('/api/conversions/:id/outputs', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params

    if (supabase) {
      const { data: outputs, error } = await supabase
        .from('outputs')
        .select('*')
        .eq('conversion_id', id)

      if (error) throw error
      res.json(outputs || [])
    } else {
      // Mock response - get from in-memory
      const conversionOutputs = Array.from(outputsDb.values())
        .filter(o => o.conversion_id === id)
      res.json(conversionOutputs)
    }
  } catch (err) {
    console.error('Get outputs error:', err)
    res.status(500).json({ error: 'Failed to get outputs' })
  }
})

// Regeneration
app.post('/api/conversions/regenerate', optionalAuth, async (req, res) => {
  try {
    const { conversion_id, platform, option } = req.body

    if (!conversion_id || !platform) {
      return res.status(400).json({ error: 'conversion_id and platform are required' })
    }

    // Get original conversion to regenerate with same settings
    let originalText = ''
    let toneMode = 'casual'

    let conversion = null

    if (supabase) {
      const { data, error } = await supabase
        .from('conversions')
        .select('input_text, tone_mode')
        .eq('id', conversion_id)
        .single()

      if (data && !error) {
        conversion = data
      }
    }

    if (!conversion) {
      // Check mock database
      const mockConversion = conversionsDb.get(conversion_id)
      if (mockConversion && mockConversion.user_id === req.userId) {
        conversion = mockConversion
      }
    }

    if (!conversion) {
      return res.status(404).json({ error: 'Conversion not found' })
    }

    originalText = conversion.input_text || ''
    toneMode = conversion.tone_mode || 'casual'

    // Build prompt and call DeepSeek
    const prompt = buildPrompt(originalText, platform, toneMode, option)
    const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      throw new Error('DeepSeek API error')
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ''

    const outputId = crypto.randomUUID()

    // Update in database
    if (supabase && req.userId) {
      await supabase.from('outputs').insert({
        id: outputId,
        conversion_id,
        platform,
        content,
        regeneration_count: 1
      })
    } else {
      outputsDb.set(outputId, {
        id: outputId,
        conversion_id,
        platform,
        content,
        regeneration_count: 1
      })
      saveMockDb('outputs', outputsDb)
    }

    res.json({
      output: {
        id: outputId,
        conversion_id,
        platform,
        content,
        regeneration_count: 1,
      }
    })
  } catch (err) {
    console.error('Regeneration error:', err)
    res.status(500).json({ error: 'Regeneration failed' })
  }
})

// Usage stats
app.get('/api/users/usage', requireAuth, async (req, res) => {
  try {
    const userDb = getUserDb()
    const user = await userDb.findById(req.userId)

    const tier = user?.tier || 'free'
    let limit = 5
    let periodStart = new Date()
    periodStart.setHours(0, 0, 0, 0)
    
    if (tier === 'pro') {
      limit = 100
      periodStart.setDate(1)
    } else if (tier === 'agency') {
      limit = 999999
    }

    let usageCount = 0

    if (supabase) {
      const { count } = await supabase
        .from('conversions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', req.userId)
        .gte('created_at', periodStart.toISOString())

      usageCount = count || 0
    } else {
      const allConversions = Array.from(conversionsDb.values())
      usageCount = allConversions.filter(c =>
        c.user_id === req.userId && new Date(c.created_at) >= periodStart
      ).length
    }

    res.json({
      daily_usage: usageCount,
      daily_limit: limit,
      conversions_today: usageCount,
      period: tier === 'pro' ? 'month' : 'day'
    })
  } catch (err) {
    console.error('Usage error:', err)
    res.status(500).json({ error: 'Failed to get usage' })
  }
})

// Update profile or onboarding
app.patch('/api/users/profile', requireAuth, async (req, res) => {
  try {
    const { displayName, nickname, persona, tone } = req.body
    const userDb = getUserDb()

    const updates = {}
    if (displayName !== undefined) updates.display_name = displayName
    if (nickname !== undefined) updates.nickname = nickname
    if (persona !== undefined) updates.persona = persona
    if (tone !== undefined) updates.tone = tone

    const user = await userDb.update(req.userId, updates)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const { password_hash, ...userWithoutPassword } = user
    res.json(userWithoutPassword)
  } catch (err) {
    console.error('Update profile error:', err)
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

// Delete account
app.delete('/api/users/me', requireAuth, async (req, res) => {
  try {
    const userDb = getUserDb()
    await userDb.delete(req.userId)
    res.json({ success: true, message: 'Account deleted' })
  } catch (err) {
    console.error('Delete account error:', err)
    res.status(500).json({ error: 'Failed to delete account' })
  }
})

// NOTE: Subscription tier is managed EXCLUSIVELY by the Flutterwave webhook.
// This endpoint has been removed to prevent users from self-promoting their tier for free.
// To manually adjust a user's tier, update it directly in the Supabase dashboard.

// Password recovery with email
app.post('/api/auth/recover', authLimiter, async (req, res) => {
  try {
    const { email } = req.body
    console.log('📧 Recover endpoint hit with email:', email)
    res.setHeader('Content-Type', 'application/json')

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const userDb = getUserDb()
    const user = await userDb.findByEmail(email)

    if (!user) {
      return res.json({ success: true, message: 'If an account exists, a recovery email has been sent.' })
    }

    const recoveryToken = generateToken(user.id)
    const debugInfo = {
      email,
      userFound: true,
      smtpConfigured: !!process.env.SMTP_HOST,
      resendKeySet: !!process.env.RESEND_API_KEY
    }

    try {
      await sendRecoveryEmail(email, recoveryToken, process.env.EMAIL_FROM || 'noreply@contentsplit.ai')
      // Never leak debug info or user existence to client in production
      res.json({ success: true, message: 'If an account exists, a recovery email has been sent.' })
    } catch (emailErr) {
      console.error('📧 Email sending failed:', emailErr)
      // Still return success to avoid user enumeration
      res.json({ success: true, message: 'If an account exists, a recovery email has been sent.' })
    }
  } catch (err) {
    console.error('Recovery error:', err)
    res.status(500).json({ error: 'Failed to process recovery request' })
  }
})

// Reset password with token
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, token, newPassword } = req.body

    if (!email || !token || !newPassword) {
      return res.status(400).json({ error: 'Email, token, and new password are required' })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' })
    }

    const session = verifyToken(token)
    if (!session || session.type !== 'recovery') {
      return res.status(400).json({ error: 'Invalid or expired recovery token' })
    }

    const userDb = getUserDb()
    const user = await userDb.findByEmail(email)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (session.userId !== user.id) {
      return res.status(400).json({ error: 'Invalid recovery token' })
    }

    await userDb.update(user.id, { password_hash: hashPassword(newPassword) })

    const newToken = generateToken(user.id)

    const { password_hash, ...userWithoutPassword } = user
    res.json({ token: newToken, user: userWithoutPassword })
  } catch (err) {
    console.error('Reset password error:', err)
    res.status(500).json({ error: 'Failed to reset password' })
  }
})

// ── FLUTTERWAVE PAYMENTS ───────────────────────────────────────────────────

// Get available plans
app.get('/api/plans', (req, res) => {
  res.json({
    plans: [
      { id: 'free', name: 'Free', price: 0, features: ['5 conversions/day', 'Basic tones'] },
      { id: 'pro', name: 'Pro', price: 8500, currency: 'NGN', features: ['100 conversions/month', 'All tones', 'Priority support'] },
      { id: 'agency', name: 'Agency', price: 15000, currency: 'NGN', features: ['Unlimited conversions', 'All tones', 'Team access', 'Priority support'] }
    ]
  })
})

// Landing page demo: Generate Twitter thread
app.post('/api/generate-thread', async (req, res) => {
  try {
    const { content } = req.body

    if (!content || content.trim().length < 20) {
      return res.status(400).json({ error: 'Please provide at least 20 characters of content' })
    }

    if (!DEEPSEEK_API_KEY) {
      // Return mock data if no API key
      const mockTweets = [
        '🌟 Just discovered the secret to 10x your content creation',
        'Most creators spend hours repurposing one piece of content. Here is the better way:',
        '1. Write once 2. Auto-distribute 3. Never repeat yourself',
        'Your time is worth more than editing AI outputs.',
        'The future of content is one-click everywhere. 🚀'
      ]
      return res.json({ tweets: mockTweets })
    }

    const prompt = `Transform the following content into a 5-tweet Twitter thread. Each tweet should be engaging, have a hook, and end with a CTA or question. Return ONLY a JSON array of tweet strings, nothing else.

Content:
${content}`

    const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 512,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('DeepSeek API error:', err)
      // Return mock on error
      const mockTweets = [
        '🌟 Just discovered the secret to 10x your content creation',
        'Most creators spend hours repurposing one piece of content. Here is the better way:',
        '1. Write once 2. Auto-distribute 3. Never repeat yourself',
        'Your time is worth more than editing AI outputs.',
        'The future of content is one-click everywhere. 🚀'
      ]
      return res.json({ tweets: mockTweets })
    }

    const data = await response.json()
    let contentStr = data.choices?.[0]?.message?.content || ''

    // Parse JSON from response
    let tweets = []
    try {
      // Try to extract JSON array
      const match = contentStr.match(/\[[\s\S]*\]/)
      if (match) {
        tweets = JSON.parse(match[0])
      }
    } catch (parseErr) {
      // Split by numbered tweets if JSON parsing fails
      tweets = contentStr.split(/\n\d+\./).filter(t => t.trim())
    }

    if (tweets.length === 0) {
      tweets = [
        '🌟 Just discovered the secret to 10x your content creation',
        'Most creators spend hours repurposing one piece of content. Here is the better way:',
        '1. Write once 2. Auto-distribute 3. Never repeat yourself',
        'Your time is worth more than editing AI outputs.',
        'The future of content is one-click everywhere. 🚀'
      ]
    }

    res.json({ tweets: tweets.slice(0, 5) })
    console.log('✅ Generated demo thread')
  } catch (err) {
    console.error('Demo generation error:', err.message)
    res.status(500).json({ error: 'Generation failed' })
  }
})

// Create payment link — uses Flutterwave REST API directly (v3/payments)
app.post('/api/payments/initiate', requireAuth, async (req, res) => {
  const flwSecretKey = process.env.FLUTTERWAVE_SECRET_KEY
  if (!flwSecretKey || flwSecretKey.includes('xxxxx')) {
    console.error('❌ FLUTTERWAVE_SECRET_KEY is not configured')
    return res.status(503).json({ error: 'Payment system not configured' })
  }

  // Initialize Supabase if not already done
  if (!supabase) {
    await initSupabase()
  }

  try {
    const { planId } = req.body
    const plan = getFlutterwavePlans()[planId]

    if (!plan || plan.amount === 0) {
      return res.status(400).json({ error: 'Invalid plan' })
    }

    const userDb = getUserDb()
    const user = await userDb.findById(req.userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const payload = {
      tx_ref: `CS_${Date.now()}_${req.userId}`,
      amount: plan.amount,
      currency: 'NGN',
      redirect_url: `${process.env.APP_URL || 'https://contentsplit-ai.vercel.app'}/payment-callback`,
      customer: {
        email: user.email,
        name: user.display_name || user.email.split('@')[0],
        phonenumber: ''
      },
      customizations: {
        title: 'ContentSplit.ai',
        description: `${planId.includes('yearly') ? 'Yearly' : 'Monthly'} subscription — ${plan.name}`,
        logo: `${process.env.APP_URL || 'https://contentsplit-ai.vercel.app'}/logo.svg`
      }
    }

    // Attach recurring payment plan ID if set
    if (plan.planId) {
      payload.payment_plan = plan.planId
    }

    // Call Flutterwave Standard Payment API directly (no SDK required)
    const flwResponse = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${flwSecretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const flwData = await flwResponse.json()
    console.log('Flutterwave response:', flwResponse.status, flwData?.status, flwData?.message)

    if (!flwResponse.ok || flwData?.status !== 'success') {
      console.error('Flutterwave API error:', flwData)
      return res.status(502).json({
        error: 'Failed to create payment link',
        details: flwData?.message || 'Unknown error from Flutterwave'
      })
    }

    res.json({
      paymentLink: flwData.data.link,
      reference: payload.tx_ref
    })
  } catch (err) {
    console.error('Payment initiation error:', err)
    res.status(500).json({ error: 'Failed to create payment' })
  }
})

// Simple memory cache for replay protection
const processedTransactions = new Set()

// Verify payment webhook
app.post('/api/payments/webhook', async (req, res) => {
  // Initialize Flutterwave if not already done
  if (!flutterwave) {
    await getFlutterwave()
  }

  if (!flutterwave) {
    return res.status(503).json({ error: 'Payment not configured' })
  }

  // Webhook signature is REQUIRED — no fallback
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET
  if (!secretHash || secretHash === 'your_webhook_secret_here') {
    console.error('❌ FATAL: FLUTTERWAVE_WEBHOOK_SECRET is not set. Rejecting all webhook requests.')
    return res.status(503).json({ error: 'Webhook not configured' })
  }

  try {
    const signature = req.headers['flutterwave-webhook-signature']

    if (!signature) {
      console.warn('⚠️ Webhook attempt without signature — rejected')
      return res.status(401).json({ error: 'Missing signature' })
    }

    const payloadString = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body)
    const expectedSignature = crypto
      .createHmac('sha256', secretHash)
      .update(payloadString)
      .digest('hex')

    // Timing-safe comparison
    const sigBuf = Buffer.from(signature, 'hex')
    const expectedBuf = Buffer.from(expectedSignature, 'hex')
    if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      console.warn('⚠️ Invalid webhook signature — rejected')
      return res.status(401).json({ error: 'Invalid signature' })
    }

    const event = req.body
    console.log('Flutterwave webhook:', event.event, event.data?.status)

    if (event.event === 'charge.completed') {
      const data = event.data
      const txRef = data.tx_ref
      const amount = data.amount
      const status = data.status
      const txId = data.id

      // Replay protection
      if (processedTransactions.has(txId)) {
        console.log(`⚠️ Transaction ${txId} already processed`)
        return res.json({ received: true, status: 'duplicate' })
      }

      // Handle failed/cancelled transactions
      if (status === 'failed' || status === 'cancelled') {
        console.log(`❌ Payment ${status} for tx_ref: ${txRef}`)
        return res.json({ received: true, status: 'failed' })
      }

      // Only process successful transactions
      if (status !== 'successful') {
        console.log(`⚠️ Unhandled payment status: ${status} for tx_ref: ${txRef}`)
        return res.json({ received: true, status: 'unhandled' })
      }
      // Verify transaction with Flutterwave API to ensure payload wasn't spoofed
      try {
        const verifyRes = await flutterwave.Transaction.verify({ id: txId })
        if (verifyRes.data.status !== 'successful' || verifyRes.data.amount < amount) {
          console.warn(`❌ Transaction verification failed for ${txId}`)
          return res.status(400).json({ error: 'Verification failed' })
        }
        console.log(`✅ Transaction ${txId} verified with Flutterwave API`)
      } catch (verifyErr) {
        console.error('Flutterwave verify API error:', verifyErr.message)
        return res.status(500).json({ error: 'Verification error' })
      }

      // Extract user ID from tx_ref (format: CS_timestamp_userId)
      const parts = txRef.split('_')
      const userId = parts[parts.length - 1]

      // Determine tier based on amount
      let tier = 'free'
      if (amount >= 160000 || amount === 15000) tier = 'agency' // 15,000 monthly or 162,000 yearly
      else if (amount >= 8500) tier = 'pro' // 8,500 monthly or 91,800 yearly

      // Update user tier
      const userDb = getUserDb()
      await userDb.update(userId, { tier })

      console.log(`✅ Updated user ${userId} to ${tier} tier`)

      // Add to processed transactions and clear if it gets too large
      processedTransactions.add(txId)
      if (processedTransactions.size > 10000) processedTransactions.clear()
    } else if (event.event === 'subscription.cancelled') {
      const data = event.data
      const customerEmail = data.customer?.email
      if (customerEmail) {
        const userDb = getUserDb()
        const user = await userDb.findByEmail(customerEmail)
        if (user) {
          await userDb.updateSubscription(user.id, 'free')
          console.log(`❌ Subscription cancelled for ${customerEmail}, downgraded to free`)
        }
      }
      return res.json({ received: true, status: 'cancelled' })
    } else {
      console.log(`⚠️ Unhandled webhook event type: ${event.event}`)
      return res.json({ received: true, status: 'unhandled_event' })
    }

    res.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err.message, err.stack)
    res.status(500).json({ error: 'Webhook failed' })
  }
})

// ── SOCIAL PUBLISHING ────────────────────────────────────────────────────────

// Token encryption helpers (AES-256-GCM)
const SOCIAL_TOKEN_KEY = process.env.SOCIAL_TOKEN_ENCRYPTION_KEY
  ? Buffer.from(process.env.SOCIAL_TOKEN_ENCRYPTION_KEY, 'base64')
  : null

function encryptToken(plaintext) {
  if (!SOCIAL_TOKEN_KEY) return plaintext // fallback: store plain in dev
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', SOCIAL_TOKEN_KEY, iv)
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted.toString('hex')
}

function decryptToken(ciphertext) {
  if (!SOCIAL_TOKEN_KEY || !ciphertext.includes(':')) return ciphertext // plain fallback
  try {
    const [ivHex, tagHex, dataHex] = ciphertext.split(':')
    const decipher = crypto.createDecipheriv('aes-256-gcm', SOCIAL_TOKEN_KEY, Buffer.from(ivHex, 'hex'))
    decipher.setAuthTag(Buffer.from(tagHex, 'hex'))
    return decipher.update(Buffer.from(dataHex, 'hex')) + decipher.final('utf8')
  } catch (e) {
    console.error('Token decryption failed:', e.message)
    return null
  }
}

// ── FIX 1: Stateless PKCE state (works across Vercel serverless instances) ────
// Instead of an in-memory Map (which breaks across cold-started serverless functions),
// we encode {userId, codeVerifier, expiresAt} into an AES-256-GCM encrypted state param.
// No server-side storage required — the state IS the encrypted token.
function createOAuthState(userId, codeVerifier) {
  const payload = JSON.stringify({ userId, codeVerifier, expiresAt: Date.now() + 10 * 60 * 1000 })
  return encryptToken(payload) // reuses the same AES-256-GCM helper
}

function verifyOAuthState(state) {
  try {
    const payload = decryptToken(state)
    if (!payload) return null
    const data = JSON.parse(payload)
    if (!data.userId || !data.codeVerifier || !data.expiresAt) return null
    if (data.expiresAt < Date.now()) return null // expired
    return data
  } catch {
    return null
  }
}

// ── FIX 3: Rate limiter for social publishing (20 posts/hr per IP) ────────────
const socialPublishLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.userId || req.ip, // per-user, not just IP
  message: { error: 'Too many publish requests. You can post up to 20 times per hour.' }
})

// GET /api/social/twitter/auth-url — Generate OAuth 2.0 PKCE auth URL
app.get('/api/social/twitter/auth-url', requireAuth, async (req, res) => {
  try {
    const userDb = getUserDb()
    const user = await userDb.findById(req.userId)
    if (!user || user.tier === 'free') {
      return res.status(403).json({ error: 'Social publishing requires a Pro or Agency plan.' })
    }

    const clientId = process.env.TWITTER_CLIENT_ID
    if (!clientId) return res.status(500).json({ error: 'Twitter OAuth not configured on server.' })

    // Generate PKCE code verifier + challenge
    const codeVerifier = crypto.randomBytes(32).toString('base64url')
    const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url')

    // FIX 1: Stateless encrypted state — no in-memory Map needed
    const state = createOAuthState(req.userId, codeVerifier)
    if (!state || state === codeVerifier) {
      // Encryption not configured — block OAuth in production for safety
      if (process.env.NODE_ENV === 'production') {
        return res.status(500).json({ error: 'SOCIAL_TOKEN_ENCRYPTION_KEY must be set in production.' })
      }
    }

    const scopes = ['tweet.write', 'users.read', 'offline.access'].join(' ')
    const callbackUrl = process.env.TWITTER_CALLBACK_URL || 'http://localhost:3001/api/social/twitter/callback'

    const authUrl = new URL('https://twitter.com/i/oauth2/authorize')
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('redirect_uri', callbackUrl)
    authUrl.searchParams.set('scope', scopes)
    authUrl.searchParams.set('state', encodeURIComponent(state)) // URL-safe
    authUrl.searchParams.set('code_challenge', codeChallenge)
    authUrl.searchParams.set('code_challenge_method', 'S256')

    res.json({ url: authUrl.toString() })
  } catch (err) {
    console.error('Twitter auth-url error:', err)
    res.status(500).json({ error: 'Failed to generate auth URL' })
  }
})

// GET /api/social/twitter/callback — OAuth callback, exchange code for tokens
app.get('/api/social/twitter/callback', async (req, res) => {
  try {
    const { code, state: rawState, error: oauthError } = req.query
    const APP_URL = process.env.APP_URL || 'http://localhost:5173'

    if (oauthError) {
      console.warn('Twitter OAuth error:', oauthError)
      return res.redirect(`${APP_URL}/dashboard/settings?tab=integrations&error=oauth_denied`)
    }

    // FIX 1: Verify encrypted stateless state — no Map lookup needed
    const state = decodeURIComponent(rawState || '')
    const stateData = verifyOAuthState(state)
    if (!stateData) {
      console.warn('Twitter OAuth: invalid or expired state param')
      return res.redirect(`${APP_URL}/dashboard/settings?tab=integrations&error=invalid_state`)
    }

    const { userId, codeVerifier } = stateData
    const callbackUrl = process.env.TWITTER_CALLBACK_URL || 'http://localhost:3001/api/social/twitter/callback'

    // Exchange code for access token
    const tokenRes = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        redirect_uri: callbackUrl,
        code_verifier: codeVerifier,
      }).toString()
    })

    if (!tokenRes.ok) {
      const errText = await tokenRes.text()
      console.error('Twitter token exchange failed:', errText)
      return res.redirect(`${APP_URL}/dashboard/settings?tab=integrations&error=token_exchange_failed`)
    }

    const tokenData = await tokenRes.json()
    const { access_token, refresh_token, expires_in } = tokenData

    // Fetch X user profile
    const userRes = await fetch('https://api.twitter.com/2/users/me', {
      headers: { Authorization: `Bearer ${access_token}` }
    })
    const userData = await userRes.json()
    const xUser = userData.data

    // Save to Supabase (or mock)
    const db = await initSupabase()
    if (db) {
      const expiresAt = expires_in ? new Date(Date.now() + expires_in * 1000).toISOString() : null
      const { error: upsertError } = await db.from('social_accounts').upsert({
        user_id: userId,
        platform: 'twitter',
        platform_user_id: xUser.id,
        platform_username: xUser.username,
        access_token: encryptToken(access_token),
        refresh_token: refresh_token ? encryptToken(refresh_token) : null,
        token_expires_at: expiresAt,
        connected_at: new Date().toISOString()
      }, { onConflict: 'user_id,platform' })

      if (upsertError) {
        console.error('Failed to save social account:', upsertError.message)
        return res.redirect(`${APP_URL}/dashboard/settings?tab=integrations&error=db_error`)
      }
    }

    console.log(`✅ Twitter connected for user ${userId}: @${xUser.username}`)
    res.redirect(`${APP_URL}/dashboard/settings?tab=integrations&connected=twitter`)
  } catch (err) {
    console.error('Twitter callback error:', err)
    const APP_URL = process.env.APP_URL || 'http://localhost:5173'
    res.redirect(`${APP_URL}/dashboard/settings?tab=integrations&error=server_error`)
  }
})

// GET /api/social/accounts — List all connected social accounts for current user
app.get('/api/social/accounts', requireAuth, async (req, res) => {
  try {
    const db = await initSupabase()
    if (!db) return res.json([])

    const { data, error } = await db
      .from('social_accounts')
      .select('id, platform, platform_username, connected_at')
      .eq('user_id', req.userId)

    if (error) throw error
    res.json(data || [])
  } catch (err) {
    console.error('Get social accounts error:', err)
    res.status(500).json({ error: 'Failed to fetch connected accounts' })
  }
})

// DELETE /api/social/twitter/disconnect — Revoke and remove Twitter connection
app.delete('/api/social/twitter/disconnect', requireAuth, async (req, res) => {
  try {
    const db = await initSupabase()
    if (!db) return res.json({ success: true })

    // Fetch the account to get the token for revocation
    const { data: account } = await db
      .from('social_accounts')
      .select('access_token')
      .eq('user_id', req.userId)
      .eq('platform', 'twitter')
      .single()

    // Attempt to revoke the token on X's side (best-effort)
    if (account?.access_token) {
      try {
        const plainToken = decryptToken(account.access_token)
        await fetch('https://api.twitter.com/2/oauth2/revoke', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString('base64')}`
          },
          body: new URLSearchParams({ token: plainToken, token_type_hint: 'access_token' }).toString()
        })
      } catch (revokeErr) {
        console.warn('Token revocation failed (non-fatal):', revokeErr.message)
      }
    }

    // Delete from DB
    const { error } = await db
      .from('social_accounts')
      .delete()
      .eq('user_id', req.userId)
      .eq('platform', 'twitter')

    if (error) throw error
    res.json({ success: true })
  } catch (err) {
    console.error('Twitter disconnect error:', err)
    res.status(500).json({ error: 'Failed to disconnect account' })
  }
})

// POST /api/social/twitter/publish — Post content to X immediately (Pro/Agency only)
// FIX 3: Rate limited to 20 posts/hr per user
app.post('/api/social/twitter/publish', requireAuth, socialPublishLimiter, async (req, res) => {
  try {
    const userDb = getUserDb()
    const user = await userDb.findById(req.userId)
    if (!user || user.tier === 'free') {
      return res.status(403).json({ error: 'Social publishing requires a Pro or Agency plan.' })
    }

    const { content: rawContent, output_id: rawOutputId } = req.body

    // FIX 6: Sanitise content — strip control characters and trim
    if (!rawContent || typeof rawContent !== 'string') {
      return res.status(400).json({ error: 'Content is required' })
    }
    // eslint-disable-next-line no-control-regex
    const content = rawContent.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim()
    if (!content) {
      return res.status(400).json({ error: 'Content cannot be empty' })
    }
    if (content.length > 280) {
      return res.status(400).json({ error: `Content exceeds 280 characters (${content.length})` })
    }

    const db = await initSupabase()
    if (!db) return res.status(503).json({ error: 'Database not available' })

    // FIX 4: IDOR protection — validate output_id belongs to this user before using it
    let output_id = null
    if (rawOutputId && typeof rawOutputId === 'string') {
      const { data: outputCheck } = await db
        .from('outputs')
        .select('id, conversion_id')
        .eq('id', rawOutputId)
        .single()
      if (outputCheck) {
        // Also verify the parent conversion belongs to this user
        const { data: convCheck } = await db
          .from('conversions')
          .select('user_id')
          .eq('id', outputCheck.conversion_id)
          .single()
        if (convCheck?.user_id === req.userId) {
          output_id = rawOutputId
        } else {
          console.warn(`IDOR attempt: user ${req.userId} tried to reference output ${rawOutputId} owned by ${convCheck?.user_id}`)
        }
      }
    }

    // Get connected Twitter account
    const { data: account, error: accErr } = await db
      .from('social_accounts')
      .select('access_token, platform_username, token_expires_at')
      .eq('user_id', req.userId)
      .eq('platform', 'twitter')
      .single()

    if (accErr || !account) {
      return res.status(400).json({ error: 'No Twitter account connected. Please connect your account first.' })
    }

    // FIX 5: Check token expiry before attempting to post
    if (account.token_expires_at && new Date(account.token_expires_at) <= new Date()) {
      return res.status(401).json({
        error: 'Your X session has expired. Please reconnect your account in Settings → Integrations.',
        code: 'TOKEN_EXPIRED'
      })
    }

    const accessToken = decryptToken(account.access_token)
    if (!accessToken) {
      return res.status(500).json({ error: 'Failed to decrypt access token. Please reconnect your Twitter account.' })
    }

    // Post tweet via X API v2
    const tweetRes = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ text: content })
    })

    const tweetData = await tweetRes.json()

    if (!tweetRes.ok) {
      const errMsg = tweetData?.detail || tweetData?.errors?.[0]?.message || 'Failed to post tweet'
      console.error('Twitter post failed:', tweetData)

      // Log failed post
      await db.from('social_posts').insert({
        user_id: req.userId,
        output_id: output_id || null,
        platform: 'twitter',
        content,
        status: 'failed',
        error_message: errMsg,
        published_at: new Date().toISOString()
      }).then(({ error }) => { if (error) console.warn('Failed to log failed post:', error.message) })

      return res.status(tweetRes.status).json({ error: errMsg })
    }

    const tweetId = tweetData.data?.id
    const tweetUrl = tweetId
      ? `https://x.com/${account.platform_username}/status/${tweetId}`
      : null

    // Log successful post
    const { data: post, error: postErr } = await db.from('social_posts').insert({
      user_id: req.userId,
      output_id: output_id || null,
      platform: 'twitter',
      content,
      status: 'published',
      published_at: new Date().toISOString(),
      platform_post_id: tweetId,
      platform_post_url: tweetUrl
    }).select().single()

    if (postErr) console.warn('Failed to log post:', postErr.message)

    console.log(`✅ Tweet posted for user ${req.userId}: ${tweetUrl}`)
    res.json({ success: true, post: post || null, tweet_url: tweetUrl, tweet_id: tweetId })
  } catch (err) {
    console.error('Twitter publish error:', err)
    res.status(500).json({ error: 'Failed to publish tweet' })
  }
})

// GET /api/social/posts — Paginated published post history
app.get('/api/social/posts', requireAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10)
    const pageSize = Math.min(parseInt(req.query.page_size || '20', 10), 50)
    const offset = (page - 1) * pageSize

    const db = await initSupabase()
    if (!db) return res.json({ data: [], total: 0, page, page_size: pageSize, has_more: false })

    const { data, count, error } = await db
      .from('social_posts')
      .select('id, platform, content, status, published_at, platform_post_id, platform_post_url, error_message', { count: 'exact' })
      .eq('user_id', req.userId)
      .order('published_at', { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) throw error

    res.json({
      data: data || [],
      total: count || 0,
      page,
      page_size: pageSize,
      has_more: (count || 0) > offset + pageSize
    })
  } catch (err) {
    console.error('Get social posts error:', err)
    res.status(500).json({ error: 'Failed to fetch post history' })
  }
})

// ── LINKEDIN PUBLISHING ──────────────────────────────────────────────────────

// GET /api/social/linkedin/auth-url — Generate OAuth 2.0 PKCE auth URL
app.get('/api/social/linkedin/auth-url', requireAuth, async (req, res) => {
  try {
    const userDb = getUserDb()
    const user = await userDb.findById(req.userId)
    if (!user || user.tier === 'free') {
      return res.status(403).json({ error: 'Social publishing requires a Pro or Agency plan.' })
    }

    const clientId = process.env.LINKEDIN_CLIENT_ID
    if (!clientId) return res.status(500).json({ error: 'LinkedIn OAuth not configured on server.' })

    // PKCE code verifier + challenge
    const codeVerifier = crypto.randomBytes(32).toString('base64url')
    const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url')

    // Stateless encrypted state (same helper as Twitter)
    const state = createOAuthState(req.userId, codeVerifier)
    if (!state || state === codeVerifier) {
      if (process.env.NODE_ENV === 'production') {
        return res.status(500).json({ error: 'SOCIAL_TOKEN_ENCRYPTION_KEY must be set in production.' })
      }
    }

    const callbackUrl = process.env.LINKEDIN_CALLBACK_URL || 'http://localhost:3001/api/social/linkedin/callback'

    const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization')
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('redirect_uri', callbackUrl)
    authUrl.searchParams.set('scope', 'openid profile w_member_social')
    authUrl.searchParams.set('state', encodeURIComponent(state))
    authUrl.searchParams.set('code_challenge', codeChallenge)
    authUrl.searchParams.set('code_challenge_method', 'S256')

    res.json({ url: authUrl.toString() })
  } catch (err) {
    console.error('LinkedIn auth-url error:', err)
    res.status(500).json({ error: 'Failed to generate LinkedIn auth URL' })
  }
})

// GET /api/social/linkedin/callback — Exchange code for token, save account
app.get('/api/social/linkedin/callback', async (req, res) => {
  try {
    const { code, state: rawState, error: oauthError } = req.query
    const APP_URL = process.env.APP_URL || 'http://localhost:5173'

    if (oauthError) {
      console.warn('LinkedIn OAuth error:', oauthError)
      return res.redirect(`${APP_URL}/dashboard/settings?tab=integrations&error=oauth_denied`)
    }

    // Verify stateless encrypted state
    const state = decodeURIComponent(rawState || '')
    const stateData = verifyOAuthState(state)
    if (!stateData) {
      console.warn('LinkedIn OAuth: invalid or expired state param')
      return res.redirect(`${APP_URL}/dashboard/settings?tab=integrations&error=invalid_state`)
    }

    const { userId, codeVerifier } = stateData
    const callbackUrl = process.env.LINKEDIN_CALLBACK_URL || 'http://localhost:3001/api/social/linkedin/callback'

    // Exchange code for access token
    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: callbackUrl,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        code_verifier: codeVerifier,
      }).toString()
    })

    if (!tokenRes.ok) {
      const errText = await tokenRes.text()
      console.error('LinkedIn token exchange failed:', errText)
      return res.redirect(`${APP_URL}/dashboard/settings?tab=integrations&error=token_exchange_failed`)
    }

    const tokenData = await tokenRes.json()
    const { access_token, expires_in } = tokenData

    // Fetch LinkedIn profile (OpenID userinfo endpoint)
    const profileRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    })
    const profile = await profileRes.json()
    // LinkedIn userinfo returns sub (person URN ID), name, email
    const linkedInUserId = profile.sub   // e.g. "abc123"
    const displayName = profile.name || profile.given_name || 'LinkedIn User'

    const db = await initSupabase()
    if (db) {
      const expiresAt = expires_in ? new Date(Date.now() + expires_in * 1000).toISOString() : null
      const { error: upsertError } = await db.from('social_accounts').upsert({
        user_id: userId,
        platform: 'linkedin',
        platform_user_id: linkedInUserId,
        platform_username: displayName,
        access_token: encryptToken(access_token),
        refresh_token: null, // LinkedIn v2 doesn't issue refresh tokens on free tier
        token_expires_at: expiresAt,
        connected_at: new Date().toISOString()
      }, { onConflict: 'user_id,platform' })

      if (upsertError) {
        console.error('Failed to save LinkedIn account:', upsertError.message)
        return res.redirect(`${APP_URL}/dashboard/settings?tab=integrations&error=db_error`)
      }
    }

    console.log(`✅ LinkedIn connected for user ${userId}: ${displayName}`)
    res.redirect(`${APP_URL}/dashboard/settings?tab=integrations&connected=linkedin`)
  } catch (err) {
    console.error('LinkedIn callback error:', err)
    const APP_URL = process.env.APP_URL || 'http://localhost:5173'
    res.redirect(`${APP_URL}/dashboard/settings?tab=integrations&error=server_error`)
  }
})

// DELETE /api/social/linkedin/disconnect — Remove LinkedIn connection
app.delete('/api/social/linkedin/disconnect', requireAuth, async (req, res) => {
  try {
    const db = await initSupabase()
    if (!db) return res.json({ success: true })

    // LinkedIn doesn't have a token revocation endpoint on v2 free tier — just delete locally
    const { error } = await db
      .from('social_accounts')
      .delete()
      .eq('user_id', req.userId)
      .eq('platform', 'linkedin')

    if (error) throw error
    res.json({ success: true })
  } catch (err) {
    console.error('LinkedIn disconnect error:', err)
    res.status(500).json({ error: 'Failed to disconnect LinkedIn account' })
  }
})

// POST /api/social/linkedin/publish — Post to LinkedIn (Pro/Agency only)
app.post('/api/social/linkedin/publish', requireAuth, socialPublishLimiter, async (req, res) => {
  try {
    const userDb = getUserDb()
    const user = await userDb.findById(req.userId)
    if (!user || user.tier === 'free') {
      return res.status(403).json({ error: 'Social publishing requires a Pro or Agency plan.' })
    }

    const { content: rawContent, url: rawUrl, output_id: rawOutputId } = req.body

    // Sanitise content — strip control characters and trim
    if (!rawContent || typeof rawContent !== 'string') {
      return res.status(400).json({ error: 'Content is required' })
    }
    // eslint-disable-next-line no-control-regex
    const content = rawContent.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim()
    if (!content) return res.status(400).json({ error: 'Content cannot be empty' })
    if (content.length > 3000) {
      return res.status(400).json({ error: `Content exceeds 3000 characters (${content.length})` })
    }

    // Validate optional URL
    const articleUrl = rawUrl && typeof rawUrl === 'string' ? rawUrl.trim() : null
    if (articleUrl) {
      try { new URL(articleUrl) } catch {
        return res.status(400).json({ error: 'Invalid URL provided' })
      }
    }

    const db = await initSupabase()
    if (!db) return res.status(503).json({ error: 'Database not available' })

    // IDOR check on output_id
    let output_id = null
    if (rawOutputId && typeof rawOutputId === 'string') {
      const { data: outputCheck } = await db.from('outputs').select('id, conversion_id').eq('id', rawOutputId).single()
      if (outputCheck) {
        const { data: convCheck } = await db.from('conversions').select('user_id').eq('id', outputCheck.conversion_id).single()
        if (convCheck?.user_id === req.userId) {
          output_id = rawOutputId
        } else {
          console.warn(`IDOR attempt: user ${req.userId} tried to reference output ${rawOutputId}`)
        }
      }
    }

    // Get connected LinkedIn account (includes platform_user_id for the URN)
    const { data: account, error: accErr } = await db
      .from('social_accounts')
      .select('access_token, platform_user_id, token_expires_at')
      .eq('user_id', req.userId)
      .eq('platform', 'linkedin')
      .single()

    if (accErr || !account) {
      return res.status(400).json({ error: 'No LinkedIn account connected. Please connect your account first.' })
    }

    // Check token expiry
    if (account.token_expires_at && new Date(account.token_expires_at) <= new Date()) {
      return res.status(401).json({
        error: 'Your LinkedIn session has expired. Please reconnect your account in Settings → Integrations.',
        code: 'TOKEN_EXPIRED'
      })
    }

    const accessToken = decryptToken(account.access_token)
    if (!accessToken) {
      return res.status(500).json({ error: 'Failed to decrypt access token. Please reconnect your LinkedIn account.' })
    }

    const authorUrn = `urn:li:person:${account.platform_user_id}`

    // Build UGC Post payload
    let specificContent
    if (articleUrl) {
      // Article share with URL
      specificContent = {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text: content },
          shareMediaCategory: 'ARTICLE',
          media: [{
            status: 'READY',
            originalUrl: articleUrl,
          }]
        }
      }
    } else {
      // Text-only post
      specificContent = {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text: content },
          shareMediaCategory: 'NONE'
        }
      }
    }

    const ugcPayload = {
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent,
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    }

    const postRes = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(ugcPayload)
    })

    const postData = await postRes.json()

    if (!postRes.ok) {
      const errMsg = postData?.message || postData?.serviceErrorCode?.toString() || 'Failed to post to LinkedIn'
      console.error('LinkedIn post failed:', postData)

      await db.from('social_posts').insert({
        user_id: req.userId,
        output_id,
        platform: 'linkedin',
        content,
        status: 'failed',
        error_message: errMsg,
        published_at: new Date().toISOString()
      }).then(({ error }) => { if (error) console.warn('Failed to log failed LinkedIn post:', error.message) })

      return res.status(postRes.status).json({ error: errMsg })
    }

    // LinkedIn returns the post ID in the `id` field (e.g. "urn:li:ugcPost:123456789")
    const postId = postData.id
    const postUrl = postId
      ? `https://www.linkedin.com/feed/update/${encodeURIComponent(postId)}`
      : null

    const { data: post, error: postErr } = await db.from('social_posts').insert({
      user_id: req.userId,
      output_id,
      platform: 'linkedin',
      content,
      status: 'published',
      published_at: new Date().toISOString(),
      platform_post_id: postId,
      platform_post_url: postUrl
    }).select().single()

    if (postErr) console.warn('Failed to log LinkedIn post:', postErr.message)

    console.log(`✅ LinkedIn post published for user ${req.userId}: ${postUrl}`)
    res.json({ success: true, post: post || null, post_url: postUrl, post_id: postId })
  } catch (err) {
    console.error('LinkedIn publish error:', err)
    res.status(500).json({ error: 'Failed to publish to LinkedIn' })
  }
})

// ── Instagram ──────────────────────────────────────────────────────────────────

// To store state temporarily for the callback (same pattern as Twitter/LinkedIn if they needed it)
// For Instagram, we pass state, but how do we get the userId?
// We can use a temporary memory store mapping state -> userId.
const igStateToUserId = new Map()

app.get('/api/social/instagram/auth-url', requireAuth, (req, res) => {
  const { INSTAGRAM_APP_ID, INSTAGRAM_CALLBACK_URL } = process.env
  if (!INSTAGRAM_APP_ID || !INSTAGRAM_CALLBACK_URL) {
    return res.status(500).json({ error: 'Instagram credentials not configured' })
  }
  const scopes = 'instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement'
  const state = crypto.randomBytes(16).toString('hex')
  igStateToUserId.set(state, req.userId)

  const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${encodeURIComponent(INSTAGRAM_CALLBACK_URL)}&state=${state}&scope=${scopes}&response_type=code`
  res.json({ url })
})

app.get('/api/social/instagram/callback', async (req, res) => {
  const { code, state, error: authError, error_description } = req.query
  if (authError) return res.redirect(`http://localhost:5173/settings?error=instagram_auth_failed`)
  if (!code) return res.status(400).send('No authorization code provided')
  
  const userId = igStateToUserId.get(state)
  if (!userId) return res.redirect(`http://localhost:5173/settings?error=invalid_state`)
  
  igStateToUserId.delete(state)

  const { INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET, INSTAGRAM_CALLBACK_URL } = process.env
  
  try {
    // 1. Get short-lived token
    const tokenRes = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${encodeURIComponent(INSTAGRAM_CALLBACK_URL)}&client_secret=${INSTAGRAM_APP_SECRET}&code=${code}`)
    const tokenData = await tokenRes.json()
    if (!tokenData.access_token) throw new Error(tokenData.error?.message || 'Failed to get access token')

    // 2. Exchange for long-lived token (60 days)
    const longTokenRes = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${INSTAGRAM_APP_ID}&client_secret=${INSTAGRAM_APP_SECRET}&fb_exchange_token=${tokenData.access_token}`)
    const longTokenData = await longTokenRes.json()
    const accessToken = longTokenData.access_token || tokenData.access_token

    // 3. Fetch user's Facebook Pages
    const pagesRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`)
    const pagesData = await pagesRes.json()
    if (!pagesData.data || pagesData.data.length === 0) {
      return res.redirect(`http://localhost:5173/settings?error=no_facebook_pages`)
    }

    // 4. Find a page with a connected Instagram Business Account
    let igUserId = null
    let igUsername = null
    
    for (const page of pagesData.data) {
      const pageToken = page.access_token
      const igRes = await fetch(`https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${pageToken}`)
      const igData = await igRes.json()
      if (igData.instagram_business_account) {
        igUserId = igData.instagram_business_account.id
        // Get IG Username
        const profileRes = await fetch(`https://graph.facebook.com/v19.0/${igUserId}?fields=username&access_token=${pageToken}`)
        const profileData = await profileRes.json()
        igUsername = profileData.username || 'Instagram User'
        break
      }
    }

    if (!igUserId) {
      return res.redirect(`http://localhost:5173/settings?error=no_linked_instagram`)
    }

    const encryptedToken = encryptToken(accessToken)
    const db = getUserDb().supabase || supabase

    // Upsert social account
    const { error: upsertErr } = await db.from('social_accounts').upsert({
      user_id: userId,
      platform: 'instagram',
      platform_user_id: igUserId,
      platform_username: igUsername,
      access_token: encryptedToken,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id, platform' })

    if (upsertErr) throw upsertErr

    res.redirect(`http://localhost:5173/settings?connected=instagram`)
  } catch (err) {
    console.error('Instagram callback error:', err)
    res.redirect(`http://localhost:5173/settings?error=instagram_callback_failed`)
  }
})

app.delete('/api/social/instagram/disconnect', requireAuth, async (req, res) => {
  try {
    const db = getUserDb().supabase || supabase
    if (!db) return res.status(500).json({ error: 'Database not available' })
    const { error } = await db.from('social_accounts').delete().eq('user_id', req.userId).eq('platform', 'instagram')
    if (error) throw error
    res.json({ success: true })
  } catch (err) {
    console.error('Instagram disconnect error:', err)
    res.status(500).json({ error: 'Failed to disconnect Instagram' })
  }
})

app.post('/api/social/instagram/publish', requireAuth, socialPublishLimiter, async (req, res) => {
  try {
    const { output_id, content, media_url } = req.body
    if (!output_id || !content) return res.status(400).json({ error: 'Missing output_id or content' })
    if (!media_url) return res.status(400).json({ error: 'Instagram requires a media_url (image or video) to publish' })

    const db = getUserDb().supabase || supabase
    if (!db) return res.status(500).json({ error: 'Database not available' })

    const { data: output, error: outErr } = await db.from('outputs').select('id').eq('id', output_id).eq('user_id', req.userId).single()
    if (outErr || !output) return res.status(404).json({ error: 'Output not found' })

    const { data: account, error: accErr } = await db.from('social_accounts').select('access_token, platform_user_id').eq('user_id', req.userId).eq('platform', 'instagram').single()
    if (accErr || !account) return res.status(400).json({ error: 'No Instagram account connected.' })

    const accessToken = decryptToken(account.access_token)
    if (!accessToken) return res.status(500).json({ error: 'Failed to decrypt access token.' })

    const igUserId = account.platform_user_id
    const isVideo = media_url.match(/\.(mp4|mov)$/i)
    
    const containerParams = new URLSearchParams({ caption: content, access_token: accessToken })
    if (isVideo) {
      containerParams.append('media_type', 'VIDEO')
      containerParams.append('video_url', media_url)
    } else {
      containerParams.append('image_url', media_url)
    }

    const containerRes = await fetch(`https://graph.facebook.com/v19.0/${igUserId}/media`, { method: 'POST', body: containerParams })
    const containerData = await containerRes.json()

    if (!containerRes.ok || !containerData.id) {
      return res.status(containerRes.status).json({ error: containerData?.error?.message || 'Failed to create Instagram media container' })
    }

    const publishParams = new URLSearchParams({ creation_id: containerData.id, access_token: accessToken })
    const publishRes = await fetch(`https://graph.facebook.com/v19.0/${igUserId}/media_publish`, { method: 'POST', body: publishParams })
    const publishData = await publishRes.json()

    if (!publishRes.ok) {
      return res.status(publishRes.status).json({ error: publishData?.error?.message || 'Failed to publish to Instagram' })
    }

    const postId = publishData.id
    const postUrl = `https://www.instagram.com/`

    const { data: post, error: postErr } = await db.from('social_posts').insert({
      user_id: req.userId, output_id, platform: 'instagram', content, status: 'published',
      published_at: new Date().toISOString(), platform_post_id: postId, platform_post_url: postUrl
    }).select().single()

    res.json({ success: true, post: post || null, post_url: postUrl, post_id: postId })
  } catch (err) {
    console.error('Instagram publish error:', err)
    res.status(500).json({ error: 'Failed to publish to Instagram' })
  }
})

// ── Newsletter ───────────────────────────────────────────────────────────────

app.get('/api/newsletter/subscribers', requireAuth, async (req, res) => {
  try {
    const db = getUserDb().supabase || supabase
    if (db) {
      const { data, error } = await db.from('email_subscribers').select('*').eq('user_id', req.userId).order('created_at', { ascending: false })
      if (error && error.code !== '42P01') throw error // Ignore relation doesn't exist error on first boot
      res.json(data || [])
    } else {
      const subs = Array.from(emailSubscribersDb.values()).filter(s => s.user_id === req.userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      res.json(subs)
    }
  } catch (err) {
    console.error('Fetch subscribers error:', err)
    res.status(500).json({ error: 'Failed to fetch subscribers' })
  }
})

app.post('/api/newsletter/subscribers', requireAuth, async (req, res) => {
  try {
    const { email, name } = req.body
    if (!email) return res.status(400).json({ error: 'Email is required' })

    const db = getUserDb().supabase || supabase
    const newSub = {
      id: crypto.randomUUID(),
      user_id: req.userId,
      email: email.trim().toLowerCase(),
      name: name?.trim() || null,
      created_at: new Date().toISOString()
    }

    if (db) {
      const { error } = await db.from('email_subscribers').insert({
        user_id: req.userId,
        email: newSub.email,
        name: newSub.name
      })
      if (error) {
        if (error.code === '23505') return res.status(400).json({ error: 'Subscriber already exists' })
        throw error
      }
    } else {
      const existing = Array.from(emailSubscribersDb.values()).find(s => s.user_id === req.userId && s.email === newSub.email)
      if (existing) return res.status(400).json({ error: 'Subscriber already exists' })
      emailSubscribersDb.set(newSub.id, newSub)
    }
    res.json({ success: true })
  } catch (err) {
    console.error('Add subscriber error:', err)
    res.status(500).json({ error: 'Failed to add subscriber' })
  }
})

app.delete('/api/newsletter/subscribers/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const db = getUserDb().supabase || supabase
    if (db) {
      const { error } = await db.from('email_subscribers').delete().eq('id', id).eq('user_id', req.userId)
      if (error) throw error
    } else {
      const sub = emailSubscribersDb.get(id)
      if (sub && sub.user_id === req.userId) emailSubscribersDb.delete(id)
    }
    res.json({ success: true })
  } catch (err) {
    console.error('Delete subscriber error:', err)
    res.status(500).json({ error: 'Failed to delete subscriber' })
  }
})

app.post('/api/social/newsletter/publish', requireAuth, socialPublishLimiter, async (req, res) => {
  try {
    const { output_id, content } = req.body
    if (!output_id || !content) return res.status(400).json({ error: 'Missing output_id or content' })

    const db = getUserDb().supabase || supabase
    let subscribers = []
    
    if (db) {
      const { data, error } = await db.from('email_subscribers').select('email, name').eq('user_id', req.userId)
      if (error && error.code !== '42P01') throw error
      subscribers = data || []
    } else {
      subscribers = Array.from(emailSubscribersDb.values()).filter(s => s.user_id === req.userId)
    }

    if (subscribers.length === 0) {
      return res.status(400).json({ error: 'You have no subscribers to send to.' })
    }

    const user = await getUserDb().findById(req.userId)
    const senderName = user.display_name || user.first_name || 'ContentSplit User'
    
    // We send emails sequentially here. For a real large-scale MVP, this should be done in the background.
    let successCount = 0
    let failCount = 0
    
    for (const sub of subscribers) {
      try {
        const greeting = sub.name ? `Hi ${sub.name},` : 'Hi there,'
        const emailContent = `${greeting}\n\n${content}\n\n---\nSent by ${senderName} via ContentSplit.ai`
        await sendEmail(sub.email, `New update from ${senderName}`, emailContent)
        successCount++
      } catch (err) {
        console.error('Failed to send email to', sub.email, err)
        failCount++
      }
    }
    
    res.json({ 
      success: true, 
      post: {
        id: crypto.randomUUID(),
        platform: 'email',
        status: 'published',
        published_at: new Date().toISOString()
      },
      message: `Sent to ${successCount} subscribers (${failCount} failed)`
    })
  } catch (err) {
    console.error('Newsletter publish error:', err)
    res.status(500).json({ error: 'Failed to send newsletter' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// Facebook
// ─────────────────────────────────────────────────────────────────────────────
const fbStateToUserId = new Map()

app.get('/api/social/facebook/auth-url', requireAuth, (req, res) => {
  const { FACEBOOK_APP_ID, FACEBOOK_CALLBACK_URL } = process.env
  if (!FACEBOOK_APP_ID || !FACEBOOK_CALLBACK_URL) {
    return res.status(500).json({ error: 'Facebook credentials not configured' })
  }
  const scopes = 'pages_manage_posts,pages_show_list,pages_read_engagement'
  const state = crypto.randomBytes(16).toString('hex')
  fbStateToUserId.set(state, req.userId)

  const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(FACEBOOK_CALLBACK_URL)}&state=${state}&scope=${scopes}&response_type=code`
  res.json({ url })
})

app.get('/api/social/facebook/callback', async (req, res) => {
  const { code, state, error: authError } = req.query
  if (authError) return res.redirect(`${process.env.APP_URL || 'http://localhost:5173'}/dashboard/settings?tab=integrations&error=facebook_auth_failed`)
  if (!code) return res.status(400).send('No authorization code provided')
  
  const userId = fbStateToUserId.get(state)
  fbStateToUserId.delete(state)
  if (!userId) return res.redirect(`${process.env.APP_URL || 'http://localhost:5173'}/dashboard/settings?tab=integrations&error=invalid_state`)

  const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK_URL } = process.env
  
  try {
    const tokenRes = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(FACEBOOK_CALLBACK_URL)}&client_secret=${FACEBOOK_APP_SECRET}&code=${code}`)
    const tokenData = await tokenRes.json()
    if (!tokenData.access_token) throw new Error(tokenData.error?.message || 'Failed to get access token')

    const longTokenRes = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${FACEBOOK_APP_ID}&client_secret=${FACEBOOK_APP_SECRET}&fb_exchange_token=${tokenData.access_token}`)
    const longTokenData = await longTokenRes.json()
    const accessToken = longTokenData.access_token || tokenData.access_token

    // Fetch user pages
    const pagesRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`)
    const pagesData = await pagesRes.json()
    
    if (!pagesData.data || pagesData.data.length === 0) {
      return res.redirect(`${process.env.APP_URL || 'http://localhost:5173'}/dashboard/settings?tab=integrations&error=no_facebook_pages`)
    }

    // Auto-select the first page for MVP
    const page = pagesData.data[0]
    const pageToken = page.access_token
    const pageId = page.id
    const pageName = page.name

    const db = await initSupabase()
    const encryptedToken = encryptToken(pageToken)
    
    const { error: upsertErr } = await db.from('social_accounts').upsert({
      user_id: userId,
      platform: 'facebook',
      platform_user_id: pageId,
      platform_username: pageName,
      access_token: encryptedToken,
      connected_at: new Date().toISOString()
    })
    
    if (upsertErr) throw upsertErr

    res.redirect(`${process.env.APP_URL || 'http://localhost:5173'}/dashboard/settings?tab=integrations&connected=facebook`)
  } catch (err) {
    console.error('Facebook callback error:', err)
    res.redirect(`${process.env.APP_URL || 'http://localhost:5173'}/dashboard/settings?tab=integrations&error=facebook_callback_failed`)
  }
})

app.delete('/api/social/facebook/disconnect', requireAuth, async (req, res) => {
  try {
    const db = await initSupabase()
    const { error } = await db.from('social_accounts').delete().eq('user_id', req.userId).eq('platform', 'facebook')
    if (error) throw error
    res.json({ success: true })
  } catch (err) {
    console.error('Facebook disconnect error:', err)
    res.status(500).json({ error: 'Failed to disconnect Facebook' })
  }
})

app.post('/api/social/facebook/publish', requireAuth, socialPublishLimiter, async (req, res) => {
  try {
    const { output_id, content } = req.body
    if (!content) return res.status(400).json({ error: 'Missing content' })

    const db = await initSupabase()
    
    const { data: account, error: accErr } = await db.from('social_accounts').select('access_token, platform_user_id').eq('user_id', req.userId).eq('platform', 'facebook').single()
    if (accErr || !account) return res.status(400).json({ error: 'No Facebook account connected.' })

    const pageToken = decryptToken(account.access_token)
    const pageId = account.platform_user_id

    const publishRes = await fetch(`https://graph.facebook.com/v19.0/${pageId}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: content,
        access_token: pageToken
      })
    })

    const publishData = await publishRes.json()

    if (!publishRes.ok) {
      return res.status(publishRes.status).json({ error: publishData?.error?.message || 'Failed to publish to Facebook' })
    }

    const postId = publishData.id
    const postUrl = `https://facebook.com/${postId}`

    const { data: post } = await db.from('social_posts').insert({
      user_id: req.userId, output_id, platform: 'facebook', content, status: 'published',
      published_at: new Date().toISOString(), platform_post_id: postId, platform_post_url: postUrl
    }).select().single()
    
    res.json({ success: true, post: post || null, post_url: postUrl, post_id: postId })
  } catch (err) {
    console.error('Facebook publish error:', err)
    res.status(500).json({ error: 'Failed to publish to Facebook' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// Threads
// ─────────────────────────────────────────────────────────────────────────────
const threadsStateToUserId = new Map()

app.get('/api/social/threads/auth-url', requireAuth, (req, res) => {
  const { FACEBOOK_APP_ID, THREADS_CALLBACK_URL } = process.env
  if (!FACEBOOK_APP_ID || !THREADS_CALLBACK_URL) {
    return res.status(500).json({ error: 'Meta credentials not configured' })
  }
  const scopes = 'threads_basic,threads_content_publish'
  const state = crypto.randomBytes(16).toString('hex')
  threadsStateToUserId.set(state, req.userId)

  const url = `https://threads.net/oauth/authorize?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(THREADS_CALLBACK_URL)}&state=${state}&scope=${scopes}&response_type=code`
  res.json({ url })
})

app.get('/api/social/threads/callback', async (req, res) => {
  const { code, state, error: authError } = req.query
  if (authError) return res.redirect(`${process.env.APP_URL || 'http://localhost:5173'}/dashboard/settings?tab=integrations&error=threads_auth_failed`)
  if (!code) return res.status(400).send('No authorization code provided')
  
  const userId = threadsStateToUserId.get(state)
  threadsStateToUserId.delete(state)
  if (!userId) return res.redirect(`${process.env.APP_URL || 'http://localhost:5173'}/dashboard/settings?tab=integrations&error=invalid_state`)

  const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, THREADS_CALLBACK_URL } = process.env
  
  try {
    const tokenRes = await fetch(`https://graph.threads.net/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: FACEBOOK_APP_ID,
        client_secret: FACEBOOK_APP_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: THREADS_CALLBACK_URL,
        code
      }).toString()
    })
    
    const tokenData = await tokenRes.json()
    if (!tokenData.access_token) throw new Error(tokenData.error_message || 'Failed to get access token')
    
    const threadsUserId = tokenData.user_id
    
    const longTokenRes = await fetch(`https://graph.threads.net/access_token?grant_type=th_exchange_token&client_secret=${FACEBOOK_APP_SECRET}&access_token=${tokenData.access_token}`)
    const longTokenData = await longTokenRes.json()
    const accessToken = longTokenData.access_token || tokenData.access_token

    // Fetch user profile
    const profileRes = await fetch(`https://graph.threads.net/v1.0/me?fields=id,username&access_token=${accessToken}`)
    const profileData = await profileRes.json()
    const threadsUsername = profileData.username || 'Threads User'

    const db = await initSupabase()
    const encryptedToken = encryptToken(accessToken)
    
    const { error: upsertErr } = await db.from('social_accounts').upsert({
      user_id: userId,
      platform: 'threads',
      platform_user_id: threadsUserId.toString(),
      platform_username: threadsUsername,
      access_token: encryptedToken,
      connected_at: new Date().toISOString()
    })
    
    if (upsertErr) throw upsertErr

    res.redirect(`${process.env.APP_URL || 'http://localhost:5173'}/dashboard/settings?tab=integrations&connected=threads`)
  } catch (err) {
    console.error('Threads callback error:', err)
    res.redirect(`${process.env.APP_URL || 'http://localhost:5173'}/dashboard/settings?tab=integrations&error=threads_callback_failed`)
  }
})

app.delete('/api/social/threads/disconnect', requireAuth, async (req, res) => {
  try {
    const db = await initSupabase()
    const { error } = await db.from('social_accounts').delete().eq('user_id', req.userId).eq('platform', 'threads')
    if (error) throw error
    res.json({ success: true })
  } catch (err) {
    console.error('Threads disconnect error:', err)
    res.status(500).json({ error: 'Failed to disconnect Threads' })
  }
})

app.post('/api/social/threads/publish', requireAuth, socialPublishLimiter, async (req, res) => {
  try {
    const { output_id, content } = req.body
    if (!content) return res.status(400).json({ error: 'Missing content' })

    const db = await initSupabase()
    
    const { data: account, error: accErr } = await db.from('social_accounts').select('access_token, platform_user_id').eq('user_id', req.userId).eq('platform', 'threads').single()
    if (accErr || !account) return res.status(400).json({ error: 'No Threads account connected.' })

    const accessToken = decryptToken(account.access_token)
    const threadsUserId = account.platform_user_id

    // Create container
    const containerRes = await fetch(`https://graph.threads.net/v1.0/${threadsUserId}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        media_type: 'TEXT',
        text: content,
        access_token: accessToken
      })
    })

    const containerData = await containerRes.json()

    if (!containerRes.ok || !containerData.id) {
      return res.status(containerRes.status).json({ error: containerData?.error?.message || 'Failed to create Threads container' })
    }

    // Publish container
    const publishRes = await fetch(`https://graph.threads.net/v1.0/${threadsUserId}/threads_publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creation_id: containerData.id,
        access_token: accessToken
      })
    })

    const publishData = await publishRes.json()

    if (!publishRes.ok) {
      return res.status(publishRes.status).json({ error: publishData?.error?.message || 'Failed to publish to Threads' })
    }

    const postId = publishData.id
    const postUrl = `https://threads.net/` // Threads doesn't easily expose the permalink yet

    const { data: post } = await db.from('social_posts').insert({
      user_id: req.userId, output_id, platform: 'threads', content, status: 'published',
      published_at: new Date().toISOString(), platform_post_id: postId, platform_post_url: postUrl
    }).select().single()
    
    res.json({ success: true, post: post || null, post_url: postUrl, post_id: postId })
  } catch (err) {
    console.error('Threads publish error:', err)
    res.status(500).json({ error: 'Failed to publish to Threads' })
  }
})

// ── START ─────────────────────────────────────────────────────────────
// Only start a TCP server for local development.
// On Vercel, the app is wrapped by serverless-http in api/index.js.
const isVercel = process.env.VERCEL || process.env.VERCEL_ENV
if (!isVercel && process.env.NODE_ENV !== 'production') {
  ; (async () => {
    // Initialize Supabase before starting so the console log is accurate
    await initSupabase()
    app.listen(PORT, () => {
      console.log(`\n🚀  ContentSplit backend running at http://localhost:${PORT}`)
      console.log(`🔐  DeepSeek API key: ${DEEPSEEK_API_KEY ? '✓ loaded' : '✗ MISSING'}`)
      console.log(`⚡  Model: ${DEEPSEEK_MODEL}`)
      console.log(`🗄️  Database: ${supabase ? 'Supabase' : 'Mock (in-memory)'}\n`)
    })
  })()
}

export default app
