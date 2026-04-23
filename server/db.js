import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '.env') })

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ SUPABASE_URL and SUPABASE_KEY are required in server/.env')
  process.exit(1)
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export const TABLES = {
  USERS: 'users',
  CONVERSIONS: 'conversions',
  OUTPUTS: 'outputs'
}

// Helper to check if table exists and create if not
export async function initDatabase() {
  try {
    const { error } = await supabase.from(TABLES.USERS).select('id').limit(1)
    if (error && error.code === '42P01') {
      console.log('⚠️  Tables not found. Please run Supabase migrations first.')
      console.log('   Run: supabase db push or apply migrations manually')
      return false
    }
    console.log('✅ Database connected')
    return true
  } catch (err) {
    console.error('❌ Database connection failed:', err.message)
    return false
  }
}