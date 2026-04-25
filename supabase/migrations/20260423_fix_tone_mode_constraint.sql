-- Fix tone_mode constraint to include all tones used by the frontend
-- The UI supports: professional, casual, punchy, friendly
-- Run this in Supabase SQL Editor

ALTER TABLE public.conversions 
  DROP CONSTRAINT IF EXISTS conversions_tone_mode_check;

ALTER TABLE public.conversions 
  ADD CONSTRAINT conversions_tone_mode_check 
  CHECK (tone_mode IN ('professional', 'casual', 'punchy', 'friendly'));
