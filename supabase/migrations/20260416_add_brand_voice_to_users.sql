-- Migration: Add Brand Voice details to Users Table
-- Description: Adds 'persona' and 'tone' to enable AI dynamic prefixing based on onboarding preferences.

ALTER TABLE public.users 
  ADD COLUMN IF NOT EXISTS persona TEXT DEFAULT 'casual',
  ADD COLUMN IF NOT EXISTS tone TEXT DEFAULT 'casual';
  
-- To apply: 
-- You can run this in your Supabase SQL editor directly, or using the Supabase local CLI:
-- `supabase db push` after editing migrations.
