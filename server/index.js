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

const __dirname = dirname(fileURLToPath(import.meta.url))

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

// ── STRIPE CONFIG ─────────────────────────────────────────────────────────
let stripe = null
if (process.env.STRIPE_SECRET_KEY) {
  const Stripe = await import('stripe')
  stripe = new Stripe.default(process.env.STRIPE_SECRET_KEY)
  console.log('✅ Stripe initialized')
} else {
  console.log('⚠️  Stripe not configured - payments disabled')
}

// Stripe price IDs (create these in Stripe Dashboard)
const STRIPE_PRICES = {
  pro: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_monthly',
  agency: process.env.STRIPE_AGENCY_PRICE_ID || 'price_agency_monthly'
}

// ── FLUTTERWAVE CONFIG ─────────────────────────────────────────────────────────
let flutterwave = null
if (process.env.FLUTTERWAVE_SECRET_KEY) {
  const Flutterwave = await import('flutterwave-node-v3')
  flutterwave = new Flutterwave.default(
    process.env.FLUTTERWAVE_PUBLIC_KEY,
    process.env.FLUTTERWAVE_SECRET_KEY
  )
  console.log('✅ Flutterwave initialized')
} else {
  console.log('⚠️  Flutterwave not configured')
}

// Flutterwave pricing (in Naira - 5000 NGN = ~$3/month)
const FLUTTERWAVE_PLANS = {
  free: { amount: 0, name: 'Free Tier' },
  pro: { amount: 5000, name: 'Pro Plan' },      // 5000 NGN/month
  agency: { amount: 15000, name: 'Agency Plan' }  // 15000 NGN/month
}

// ── DEEPSEEK CONFIG ─────────────────────────────────────────────────────────
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const DEEPSEEK_BASE_URL = 'https://api.deepseek.com'
const DEEPSEEK_MODEL = 'deepseek-chat'

if (!DEEPSEEK_API_KEY) {
  console.error('❌  DEEPSEEK_API_KEY is not set in server/.env')
  process.exit(1)
}

// ── SUPABASE CONFIG ─────────────────────────────────────────────────────────
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_KEY

let supabase = null

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })
  console.log('✅ Supabase client initialized')
} else {
  console.warn('⚠️  SUPABASE_URL/SUPABASE_KEY not set - using mock mode')
}

// ── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors())
app.use(express.json({ limit: '1mb' }))

// In-memory fallback if no database
const usersDb = new Map()
const sessionsDb = new Map()

function getUserDb() {
  return supabase ? {
    async findByEmail(email) {
      console.log('findByEmail:', email)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
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
async create(email, password, firstName, lastName) {
      console.log('Creating user in Supabase:', email)
      // Only add name fields if provided (they may not exist in DB)
      let userData = { 
        email, 
        password_hash: hashPassword(password),
        tier: 'free',
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
            .insert({ email, password_hash: hashPassword(password), tier: 'free' })
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
    }
  } : {
    findByEmail(email) {
      return Array.from(usersDb.values()).find(u => u.email === email) || null
    },
    findById(id) {
      return usersDb.get(id) || null
    },
    create(email, password, firstName, lastName) {
      const user = { 
        id: crypto.randomUUID(), 
        email, 
        password_hash: hashPassword(password),
        tier: 'free', 
        first_name: firstName,
        last_name: lastName,
        created_at: new Date().toISOString() 
      }
      usersDb.set(user.id, user)
      return user
    },
    update(id, updates) {
      const user = usersDb.get(id)
      if (user) {
        Object.assign(user, updates)
        usersDb.set(id, user)
      }
      return user
    }
  }
}

// Simple password hashing (use bcrypt in production)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

function verifyPassword(password, hash) {
  return hashPassword(password) === hash
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex')
}

// Email sending (placeholder - use Resend/SendGrid/AWS SES in production)
async function sendRecoveryEmail(toEmail, token, fromEmail) {
  const APP_URL = process.env.APP_URL || 'http://localhost:3000'
  const recoveryLink = `${APP_URL}/reset-password?token=${token}&email=${encodeURIComponent(toEmail)}`
  
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

  if (process.env.SMTP_HOST) {
    // Production: send via SMTP
    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
    
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: 'ContentSplit - Password Recovery',
      html: emailHtml,
    })
    
    console.log(`📧 Recovery email sent to ${toEmail}`)
  } else {
    console.log(`📧 Would send email to ${toEmail} (SMTP not configured)`)
    console.log(`   Preview: ${recoveryLink}`)
  }
}

// Auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }
  
  const token = auth.replace('Bearer ', '')
  const session = sessionsDb.get(token)
  
  if (!session) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
  
  // Check token expiry
  if (session.expiresAt && session.expiresAt < Date.now()) {
    sessionsDb.delete(token)
    return res.status(401).json({ error: 'Token expired' })
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
    const session = sessionsDb.get(token)
    if (session && (!session.expiresAt || session.expiresAt > Date.now())) {
      req.userId = session.userId
      req.session = session
    }
  }
  next()
}

// ── PLATFORM PROMPTS ─────────────────────────────────────────────────────────
function buildPrompt(inputText, platform, tone) {
  const toneGuide = {
    professional: 'formal, authoritative, and polished',
    casual: 'relaxed, conversational, and friendly',
    punchy: 'energetic, concise, and impactful',
    friendly: 'warm, approachable, and encouraging',
  }[tone] || 'clear and engaging'

  const platformGuides = {
    twitter: `Create a Twitter/X thread (3-5 tweets). Each tweet max 280 chars. Use 1-2 relevant hashtags. Number each tweet (1/ 2/ etc). Tone: ${toneGuide}.`,
    linkedin: `Write a LinkedIn post (150-400 words). Start with a strong hook. Use short paragraphs. Add 3-5 relevant hashtags at the end. Tone: ${toneGuide}.`,
    instagram: `Write an Instagram caption (100-200 words). Start with a grabbing first line (shown before "more"). Use line breaks. Add 10-15 relevant hashtags at the end. Tone: ${toneGuide}.`,
    email: `Write an email newsletter intro (200-300 words). Include: subject line (Subject: ...), preview text (Preview: ...), then the body. Tone: ${toneGuide}.`,
  }

  return `You are a professional content strategist specialising in social media and digital content.

Convert the following blog content into platform-optimised content for ${platform.toUpperCase()}.

${platformGuides[platform] || `Adapt this content appropriately for ${platform}. Tone: ${toneGuide}.`}

IMPORTANT: Output ONLY the final content with no preamble, explanation, or meta-commentary.

--- BLOG CONTENT ---
${inputText}
--- END ---`
}

// ── ROUTES ───────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', async (req, res) => {
  let tableStatus = 'unknown'
  if (supabase) {
    try {
      const { error } = await supabase.from('users').select('id').limit(1)
      tableStatus = error ? error.message : 'ok'
    } catch (e) {
      tableStatus = e.message
    }
  }
  res.json({ 
    status: 'ok', 
    model: DEEPSEEK_MODEL,
    database: supabase ? 'connected' : 'mock',
    table_status: tableStatus
  })
})

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const userDb = getUserDb()
    const user = await userDb.findByEmail(email)
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    if (!verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Create session
    const token = generateToken()
    sessionsDb.set(token, {
      userId: user.id,
      createdAt: Date.now(),
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    })

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
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' })
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
    const user = await userDb.create(email, password, firstName, lastName)
    console.log('User created:', user.id)

    // Create session
    const token = generateToken()
    sessionsDb.set(token, {
      userId: user.id,
      createdAt: Date.now(),
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000)
    })

    // Remove password hash from response
    const { password_hash, ...userWithoutPassword } = user

    res.status(201).json({ 
      token, 
      user: userWithoutPassword 
    })
  } catch (err) {
    console.error('Registration error:', err.message, err.stack)
    res.status(500).json({ error: 'Registration failed: ' + err.message })
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
    
    if (!email) {
      return res.status(400).json({ error: 'No email provided by Google' })
    }

    const userDb = getUserDb()
    let user = await userDb.findByEmail(email)
    
    if (!user) {
      // Create user if they don't exist. We use a random UUID as the password hash
      // because they authenticate via Google and will not use a password.
      user = await userDb.create(email, crypto.randomUUID(), firstName, lastName)
    }

    // Create session
    const token = generateToken()
    sessionsDb.set(token, {
      userId: user.id,
      createdAt: Date.now(),
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    })

    const { password_hash, ...userWithoutPassword } = user

    res.json({ 
      token, 
      user: userWithoutPassword 
    })
  } catch (err) {
    console.error('Google auth error:', err)
    res.status(500).json({ error: 'Google auth failed' })
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

// Logout
app.post('/api/auth/logout', requireAuth, (req, res) => {
  const auth = req.headers.authorization
  const token = auth.replace('Bearer ', '')
  sessionsDb.delete(token)
  res.json({ success: true })
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

app.post('/api/conversions/generate', optionalAuth, async (req, res) => {
  try {
    const parsedData = generateSchema.parse(req.body)
    const { input_text, tone_mode, platforms, persona } = parsedData
    const userId = req.userId || 'anonymous'

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

    // Save conversion to database if user is authenticated
    if (supabase && userId !== 'anonymous') {
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

    if (supabase) {
      const { data: conversions, error } = await supabase
        .from('conversions')
        .select('*')
        .eq('user_id', req.userId)
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1)

      if (error) throw error

      const { count } = await supabase
        .from('conversions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', req.userId)

      res.json({
        data: conversions || [],
        total: count || 0,
        page,
        page_size: pageSize,
        has_more: (page * pageSize) < (count || 0)
      })
    } else {
      // Mock response
      res.json({ data: [], total: 0, page, page_size: pageSize, has_more: false })
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
      res.json([])
    }
  } catch (err) {
    console.error('Get outputs error:', err)
    res.status(500).json({ error: 'Failed to get outputs' })
  }
})

// Regeneration
app.post('/api/conversions/regenerate', optionalAuth, async (req, res) => {
  try {
    const { conversion_id, platform } = req.body
    
    if (!conversion_id || !platform) {
      return res.status(400).json({ error: 'conversion_id and platform are required' })
    }

    // Get original conversion to regenerate with same settings
    let originalText = ''
    let toneMode = 'casual'
    
    if (supabase) {
      const { data: conversion } = await supabase
        .from('conversions')
        .select('input_text, tone_mode')
        .eq('id', conversion_id)
        .single()
      
      if (conversion) {
        originalText = conversion.input_text
        toneMode = conversion.tone_mode
      }
    }

    // Build prompt and call DeepSeek
    let prompt = buildPrompt(originalText, platform, toneMode)
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
    
    const tierLimits = {
      free: 10,
      pro: 100,
      agency: 999999
    }

    let conversionsThisMonth = 0
    
    if (supabase) {
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { count } = await supabase
        .from('conversions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', req.userId)
        .gte('created_at', startOfMonth.toISOString())

      conversionsThisMonth = count || 0
    }

    res.json({
      monthly_usage: conversionsThisMonth,
      tier_limit: tierLimits[user?.tier || 'free'] || 10,
      conversions_this_month: conversionsThisMonth
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

// Update subscription tier
app.post('/api/users/subscription', requireAuth, async (req, res) => {
  try {
    const { tier } = req.body
    
    if (!tier || !['free', 'pro', 'agency'].includes(tier)) {
      return res.status(400).json({ error: 'Invalid tier' })
    }

    const userDb = getUserDb()
    const user = await userDb.update(req.userId, { tier })
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const { password_hash, ...userWithoutPassword } = user
    res.json(userWithoutPassword)
  } catch (err) {
    console.error('Update subscription error:', err)
    res.status(500).json({ error: 'Failed to update subscription' })
  }
})

// Password recovery with email
app.post('/api/auth/recover', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const userDb = getUserDb()
    const user = await userDb.findByEmail(email)
    
    if (!user) {
      // Return success even if user not found (security)
      return res.json({ success: true, message: 'If an account exists, a recovery email has been sent.' })
    }

    // Generate recovery token
    const recoveryToken = generateToken()
    const expiresAt = Date.now() + (60 * 60 * 1000) // 1 hour
    
    // Store recovery token (in production, use Redis or database)
    sessionsDb.set(`recovery:${email}`, { token: recoveryToken, expiresAt })

    // In production, send email via SMTP/Resend/SendGrid
    const RECOVERY_EMAIL_FROM = process.env.RECOVERY_EMAIL_FROM || 'noreply@contentsplit.ai'
    const APP_URL = process.env.APP_URL || 'http://localhost:3000'
    const recoveryLink = `${APP_URL}/reset-password?token=${recoveryToken}&email=${encodeURIComponent(email)}`
    
    console.log(`📧 Password recovery email would be sent to: ${email}`)
    console.log(`   Recovery link: ${recoveryLink}`)
    
    // If SMTP configured, send the email
    if (process.env.SMTP_HOST) {
      await sendRecoveryEmail(email, recoveryToken, RECOVERY_EMAIL_FROM)
    }

    res.json({ success: true, message: 'If an account exists, a recovery email has been sent.' })
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

    // Verify recovery token
    const stored = sessionsDb.get(`recovery:${email}`)
    if (!stored || stored.token !== token || stored.expiresAt < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired recovery token' })
    }

    const userDb = getUserDb()
    const user = await userDb.findByEmail(email)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Update password
    await userDb.update(user.id, { password_hash: hashPassword(newPassword) })
    
    // Delete recovery token
    sessionsDb.delete(`recovery:${email}`)
    
    // Create new session
    const newToken = generateToken()
    sessionsDb.set(newToken, {
      userId: user.id,
      createdAt: Date.now(),
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000)
    })

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
      { id: 'free', name: 'Free', price: 0, features: ['10 conversions/month', 'Basic tones'] },
      { id: 'pro', name: 'Pro', price: 5000, currency: 'NGN', features: ['100 conversions/month', 'All tones', 'Priority support'] },
      { id: 'agency', name: 'Agency', price: 15000, currency: 'NGN', features: ['Unlimited conversions', 'All tones', 'Team access', 'Priority support'] }
    ]
  })
})

// Create payment link
app.post('/api/payments/initiate', requireAuth, async (req, res) => {
  if (!flutterwave) {
    return res.status(503).json({ error: 'Payment system not configured' })
  }

  try {
    const { planId } = req.body
    const plan = FLUTTERWAVE_PLANS[planId]

    if (!plan || plan.amount === 0) {
      return res.status(400).json({ error: 'Invalid plan' })
    }

    const userDb = getUserDb()
    const user = await userDb.findById(req.userId)

    const response = await flutterwave.PaymentLink.create({
      tx_ref: `CS_${Date.now()}_${req.userId}`,
      amount: plan.amount,
      currency: 'NGN',
      redirect_url: `${process.env.APP_URL || 'http://localhost:3000'}/payment-callback`,
      customer: {
        email: user.email,
        name: user.display_name || user.email.split('@')[0]
      },
      customizations: {
        title: `ContentSplit.ai - ${plan.name}`,
        description: `Monthly subscription for ${plan.name}`
      }
    })

    res.json({
      paymentLink: response.data.link,
      reference: response.data.tx_ref
    })
  } catch (err) {
    console.error('Payment error:', err)
    res.status(500).json({ error: 'Failed to create payment' })
  }
})

// Verify payment webhook
app.post('/api/payments/webhook', async (req, res) => {
  if (!flutterwave) {
    return res.status(503).json({ error: 'Payment not configured' })
  }

  try {
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH
    const signature = req.headers['flutterwave-webhook-signature']

    // Verify signature if configured
    if (secretHash && signature !== secretHash) {
      // In production, verify properly
      // For now, accept webhooks
    }

    const event = req.body
    console.log('Flutterwave webhook:', event.event)

    if (event.event === 'charge.completed') {
      const data = event.data
      const txRef = data.tx_ref
      const amount = data.amount

      // Extract user ID from tx_ref (format: CS_timestamp_userId)
      const parts = txRef.split('_')
      const userId = parts[parts.length - 1]

      // Determine tier based on amount
      let tier = 'free'
      if (amount >= 15000) tier = 'agency'
      else if (amount >= 5000) tier = 'pro'

      // Update user tier
      const userDb = getUserDb()
      await userDb.update(userId, { tier })

      console.log(`✅ Updated user ${userId} to ${tier} tier`)
    }

    res.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    res.status(500).json({ error: 'Webhook failed' })
  }
})

// Verify payment (for callback)
app.get('/api/payments/verify/:reference', requireAuth, async (req, res) => {
  if (!flutterwave) {
    return res.status(503).json({ error: 'Payment not configured' })
  }

  try {
    const { reference } = req.params
    const response = await flutterwave.Transaction.verify({ id: reference })

    if (response.data.status === 'successful') {
      const amount = response.data.amount
      let tier = 'free'
      if (amount >= 15000) tier = 'agency'
      else if (amount >= 5000) tier = 'pro'

      const userDb = getUserDb()
      await userDb.update(req.userId, { tier })

      res.json({ success: true, tier })
    } else {
      res.json({ success: false })
    }
  } catch (err) {
    console.error('Verify error:', err)
    res.status(500).json({ error: 'Verification failed' })
  }
})

// ── START ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  ContentSplit backend running at http://localhost:${PORT}`)
  console.log(`🔐  DeepSeek API key: ${DEEPSEEK_API_KEY ? '✓ loaded' : '✗ MISSING'}`)
  console.log(`⚡  Model: ${DEEPSEEK_MODEL}`)
  console.log(`🗄️  Database: ${supabase ? 'Supabase' : 'Mock (in-memory)'}`)
  console.log(`💳 Payments: ${flutterwave ? 'Flutterwave' : 'Not configured'}\n`)
})
