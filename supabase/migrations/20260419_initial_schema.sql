-- ContentSplit.ai - Initial Database Schema
-- Run this in Supabase SQL Editor or apply via CLI: supabase db push

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'agency')),
  display_name TEXT,
  nickname TEXT,
  preferences JSONB DEFAULT '{}',
  persona TEXT DEFAULT 'casual',
  tone TEXT DEFAULT 'casual',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversions table
CREATE TABLE IF NOT EXISTS public.conversions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  input_text TEXT NOT NULL,
  tone_mode TEXT NOT NULL DEFAULT 'casual' CHECK (tone_mode IN ('professional', 'casual', 'punchy')),
  prompt_version TEXT DEFAULT 'v1',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Outputs table
CREATE TABLE IF NOT EXISTS public.outputs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversion_id UUID NOT NULL REFERENCES public.conversions(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'instagram', 'email')),
  content TEXT NOT NULL,
  regeneration_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_conversions_user_id ON public.conversions(user_id);
CREATE INDEX IF NOT EXISTS idx_conversions_created_at ON public.conversions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_outputs_conversion_id ON public.outputs(conversion_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Row Level Security (RLS) - Disabled for custom token auth
-- Enable when using Supabase Auth
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.conversions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.outputs ENABLE ROW LEVEL SECURITY;

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update users.updated_at
DROP TRIGGER IF EXISTS users_updated_at ON public.users;
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Anon key for client (restrict appropriately in production)
-- Note: For RLS to work with Supabase client, you need to set up auth properly.
-- This migration enables the foundation; integrate with Supabase Auth for full RLS.

COMMENT ON TABLE public.users IS 'User accounts with tier levels (free, pro, agency)';
COMMENT ON TABLE public.conversions IS 'Content transformation requests';
COMMENT ON TABLE public.outputs IS 'Generated platform-specific content';