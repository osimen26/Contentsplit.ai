// Vercel serverless function - wraps Express app for Vercel
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load env vars (local dev only - Vercel injects them automatically)
try { dotenv.config({ path: join(__dirname, '.env') }); } catch(e) {}
try { dotenv.config({ path: join(__dirname, '..', '.env.local') }); } catch(e) {}

const app = express();

// ── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// ── CONFIG ────────────────────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || process.env.SUPABASE_KEY || 'contentsplit-secret-key';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';
const DEEPSEEK_MODEL = 'deepseek-chat';

// Flutterwave
let flutterwave = null;
if (process.env.FLUTTERWAVE_SECRET_KEY) {
  try {
    const Flutterwave = await import('flutterwave-node-v3');
    flutterwave = new Flutterwave.default(
      process.env.FLUTTERWAVE_PUBLIC_KEY,
      process.env.FLUTTERWAVE_SECRET_KEY
    );
  } catch(e) { console.warn('Flutterwave init failed:', e.message); }
}

// Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_KEY;
let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

// In-memory fallback
const usersDb = new Map();
const sessionsDb = new Map();

// ── AUTH UTILS ──────────────────────────────────────────────────────────────
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}
function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}
function generateToken(userId) {
  const payload = Buffer.from(JSON.stringify({
    userId: userId || 'recovery',
    type: userId ? 'session' : 'recovery',
    expiresAt: Date.now() + (userId ? 7*24*60*60*1000 : 60*60*1000)
  })).toString('base64');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(payload).digest('base64');
  return `${payload}.${signature}`;
}
function verifyToken(token) {
  try {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return null;
    const expected = crypto.createHmac('sha256', JWT_SECRET).update(payload).digest('base64');
    if (signature !== expected) return null;
    const data = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
    if (data.expiresAt < Date.now()) return null;
    return data;
  } catch { return null; }
}
function getUserDb() {
  return supabase ? {
    async findByEmail(email) {
      const { data } = await supabase.from('users').select('*').eq('email', email).single();
      return data || null;
    },
    async findById(id) {
      const { data } = await supabase.from('users').select('*').eq('id', id).single();
      return data || null;
    },
    async create(email, password, firstName, lastName) {
      const { data } = await supabase.from('users').insert({
        email, password_hash: hashPassword(password), tier: 'free',
        display_name: firstName && lastName ? `${firstName} ${lastName}` : (firstName || lastName || null)
      }).select().single();
      return data;
    },
    async update(id, updates) {
      const { data } = await supabase.from('users').update(updates).eq('id', id).select().single();
      return data;
    }
  } : {
    findByEmail(email) { return Array.from(usersDb.values()).find(u => u.email === email) || null; },
    findById(id) { return usersDb.get(id) || null; },
    create(email, password, firstName, lastName) {
      const user = { id: crypto.randomUUID(), email, password_hash: hashPassword(password), tier: 'free',
        display_name: firstName && lastName ? `${firstName} ${lastName}` : null, created_at: new Date().toISOString() };
      usersDb.set(user.id, user);
      return user;
    },
    update(id, updates) { const user = usersDb.get(id); if (user) Object.assign(user, updates); return user; }
  };
}
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });
  const session = verifyToken(auth.replace('Bearer ', ''));
  if (!session) return res.status(401).json({ error: 'Invalid or expired token' });
  req.userId = session.userId;
  next();
}

// ── ROUTES ──────────────────────────────────────────────────────────────────

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
    const userDb = getUserDb();
    const user = await userDb.findByEmail(email);
    if (!user || !verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user.id);
    const { password_hash, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });
    const userDb = getUserDb();
    if (await userDb.findByEmail(email)) return res.status(400).json({ error: 'Email already registered' });
    const user = await userDb.create(email, password, firstName, lastName);
    const token = generateToken(user.id);
    const { password_hash, ...userWithoutPassword } = user;
    res.status(201).json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed: ' + err.message });
  }
});

// Get current user
app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const userDb = getUserDb();
    const user = await userDb.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password_hash, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Logout
app.post('/api/auth/logout', requireAuth, (req, res) => res.json({ success: true }));

// Google Auth
app.post('/api/auth/google', async (req, res) => {
  try {
    const { access_token } = req.body;
    if (!access_token) return res.status(400).json({ error: 'Google access token is required' });
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    if (!userInfoRes.ok) return res.status(401).json({ error: 'Invalid Google token' });
    const payload = await userInfoRes.json();
    const email = payload.email;
    if (!email) return res.status(400).json({ error: 'No email provided by Google' });
    const userDb = getUserDb();
    let user = await userDb.findByEmail(email);
    if (!user) user = await userDb.create(email, crypto.randomUUID(), payload.given_name || '', payload.family_name || '');
    const token = generateToken(user.id);
    const { password_hash, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(500).json({ error: 'Google auth failed' });
  }
});

// Content generation
const VALID_TONES = ['professional', 'casual', 'punchy', 'friendly'];
app.post('/api/conversions/generate', async (req, res) => {
  try {
    const { input_text, tone_mode, platforms } = req.body;
    if (!input_text || !platforms?.length) return res.status(400).json({ error: 'Missing required fields' });
    
    if (!DEEPSEEK_API_KEY) return res.status(503).json({ error: 'AI service not configured' });
    
    const results = await Promise.all(platforms.map(async (platform) => {
      const prompt = `You are a professional content strategist. Convert the following content for ${platform.toUpperCase()}.\nTone: ${tone_mode || 'casual'}\n\nContent: ${input_text}\n\nOutput ONLY the final content.`;
      const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${DEEPSEEK_API_KEY}` },
        body: JSON.stringify({ model: DEEPSEEK_MODEL, messages: [{ role: 'user', content: prompt }], temperature: 0.7, max_tokens: 1024 })
      });
      if (!response.ok) throw new Error(`DeepSeek API error for ${platform}`);
      const data = await response.json();
      return { id: crypto.randomUUID(), platform, content: data.choices?.[0]?.message?.content || '', regeneration_count: 0 };
    }));
    
    res.json({ conversion: { id: crypto.randomUUID(), user_id: 'anonymous', input_text: input_text.slice(0, 200), tone_mode, created_at: new Date().toISOString() }, outputs: results });
  } catch (err) {
    console.error('Generation error:', err);
    res.status(500).json({ error: 'Content generation failed' });
  }
});

// Plans
app.get('/api/plans', (req, res) => res.json({
  plans: [
    { id: 'free', name: 'Free', price: 0, features: ['5 conversions/day', 'Basic tones'] },
    { id: 'pro', name: 'Pro', price: 5000, currency: 'NGN', features: ['100 conversions/day', 'All tones', 'Priority support'] },
    { id: 'agency', name: 'Agency', price: 15000, currency: 'NGN', features: ['Unlimited conversions', 'All tones', 'Team access'] }
  ]
}));

// Payment init
app.post('/api/payments/initiate', requireAuth, async (req, res) => {
  if (!flutterwave) return res.status(503).json({ error: 'Payment system not configured' });
  try {
    const { planId } = req.body;
    const plans = { pro: { amount: 5000 }, agency: { amount: 15000 } };
    const plan = plans[planId];
    if (!plan) return res.status(400).json({ error: 'Invalid plan' });
    const userDb = getUserDb();
    const user = await userDb.findById(req.userId);
    const response = await flutterwave.PaymentLink.create({
      tx_ref: `CS_${Date.now()}_${req.userId}`,
      amount: plan.amount,
      currency: 'NGN',
      redirect_url: `${process.env.APP_URL || 'http://localhost:3000'}/payment-callback`,
      customer: { email: user.email, name: user.display_name || user.email }
    });
    res.json({ paymentLink: response.data.link, reference: response.data.tx_ref });
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

// Webhook
app.post('/api/payments/webhook', async (req, res) => {
  try {
    const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET;
    const signature = req.headers['flutterwave-webhook-signature'];
    if (secretHash && signature) {
      const expected = crypto.createHmac('sha256', secretHash).update(JSON.stringify(req.body)).digest('hex');
      if (signature !== expected) return res.status(401).json({ error: 'Invalid signature' });
    }
    const event = req.body;
    if (event.event === 'charge.completed' && event.data?.status === 'successful') {
      const parts = event.data.tx_ref.split('_');
      const userId = parts[parts.length - 1];
      const amount = event.data.amount;
      let tier = 'free';
      if (amount >= 15000) tier = 'agency';
      else if (amount >= 5000) tier = 'pro';
      const userDb = getUserDb();
      await userDb.update(userId, { tier });
      console.log(`Updated user ${userId} to ${tier}`);
    }
    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: 'Webhook failed' });
  }
});

export default app;
