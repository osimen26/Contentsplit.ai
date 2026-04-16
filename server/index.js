/**
 * ContentSplit.ai — Secure Backend Proxy Server
 *
 * The DeepSeek API key lives ONLY here (server/.env).
 * It is NEVER sent to the browser. The frontend talks to
 * this server at /api/*, and this server talks to DeepSeek.
 */

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load server-only .env (not VITE_* prefixed — never exposed to browser)
dotenv.config({ path: join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 3001

// ── OPENAI CONFIG ────────────────────────────────────────────────────────────
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_BASE_URL = 'https://api.openai.com/v1'
const OPENAI_MODEL = 'gpt-4o-mini' // fast and cost-effective OpenAI model

if (!OPENAI_API_KEY) {
  console.error('❌  OPENAI_API_KEY is not set in server/.env')
  process.exit(1)
}

// ── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5199',
    'http://localhost:5202',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json({ limit: '1mb' }))

// Simple in-memory auth check (replace with your real auth later)
function requireAuth(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    // For development, allow unauthenticated if no token exists
    if (process.env.NODE_ENV === 'development') return next()
    return res.status(401).json({ error: 'Unauthorized' })
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
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', model: OPENAI_MODEL })
})

// Mock auth (replace with real auth system)
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body
  res.json({ token: 'dev-token', user: { id: '1', email: email || 'user@example.com', tier: 'free', created_at: new Date().toISOString() } })
})

app.get('/api/auth/me', (req, res) => {
  res.json({ id: '1', email: 'user@example.com', tier: 'free', created_at: new Date().toISOString() })
})

// Conversions list (mock history)
app.get('/api/conversions', (req, res) => {
  res.json({ data: [], total: 0, page: 1, page_size: 20, has_more: false })
})

// ── MAIN: Content Generation via OpenAI ────────────────────────────────────
app.post('/api/conversions/generate', requireAuth, async (req, res) => {
  const { input_text, tone_mode, platforms } = req.body

  if (!input_text || !platforms?.length) {
    return res.status(400).json({ error: 'input_text and platforms are required' })
  }

  console.log(`⚡ Generating for platforms: ${platforms.join(', ')} | tone: ${tone_mode}`)

  try {
    // Generate content for all selected platforms IN PARALLEL for speed
    const results = await Promise.all(
      platforms.map(async (platform) => {
        const prompt = buildPrompt(input_text, platform, tone_mode)

        const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`, // ← key stays server-side only
          },
          body: JSON.stringify({
            model: OPENAI_MODEL,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 1024,
          }),
        })

        if (!response.ok) {
          const err = await response.text()
          throw new Error(`OpenAI error for ${platform}: ${err}`)
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

    res.json({
      conversion: {
        id: conversionId,
        user_id: '1',
        input_text: input_text.slice(0, 200),
        tone_mode,
        created_at: new Date().toISOString(),
      },
      outputs,
    })

    console.log(`✅ Generated ${outputs.length} outputs`)
  } catch (err) {
    console.error('Generation error:', err.message)
    res.status(500).json({ error: 'Content generation failed. Check your OpenAI API key.' })
  }
})

// Regeneration
app.post('/api/conversions/regenerate', requireAuth, async (req, res) => {
  const { conversion_id, platform } = req.body
  res.json({
    output: {
      id: crypto.randomUUID(),
      conversion_id,
      platform,
      content: 'Regenerated content will appear here.',
      regeneration_count: 1,
    },
  })
})

// Usage stats
app.get('/api/users/usage', (req, res) => {
  res.json({ monthly_usage: 0, tier_limit: 5000, conversions_this_month: 0 })
})

// ── START ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  ContentSplit backend running at http://localhost:${PORT}`)
  console.log(`🔐  OpenAI API key: ${OPENAI_API_KEY ? '✓ loaded' : '✗ MISSING'}`)
  console.log(`⚡  Model: ${OPENAI_MODEL}\n`)
})
