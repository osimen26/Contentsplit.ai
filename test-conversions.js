import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ffijjaimnmrlcrqvpftx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmaWpqYWltbm1ybGNycXZwZnR4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njc3MTAxOCwiZXhwIjoyMDkyMzQ3MDE4fQ.R0cvgFTz62ADpc3zdgYQaITCaP7wBVi9otV3CRGwysI'
)

console.log('Creating tables...')

// Create conversions table
const { error: convError } = await supabase.from('conversions').insert({
  id: '00000000-0000-0000-0000-000000000001',
  user_id: '00000000-0000-0000-0000-000000000001',
  input_text: 'test',
  tone_mode: 'casual',
  created_at: new Date().toISOString()
}).select()

console.log('Conversions table:', convError ? convError.message : 'OK')

// Create outputs table  
const { error: outError } = await supabase.from('outputs').insert({
  id: '00000000-0000-0000-0000-000000000002',
  conversion_id: '00000000-0000-0000-0000-000000000001',
  platform: 'twitter',
  content: 'test content',
  regeneration_count: 0,
  created_at: new Date().toISOString()
}).select()

console.log('Outputs table:', outError ? outError.message : 'OK')