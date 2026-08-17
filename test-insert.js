import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: './server/.env' })
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

async function test() {
  const { data, error } = await supabase.from('social_accounts').upsert({
    user_id: Date.now().toString(),
    platform: 'twitter',
    platform_user_id: 'test',
    platform_username: 'test',
    access_token: 'test',
    connected_at: new Date().toISOString()
  }, { onConflict: 'user_id,platform' })
  
  console.log('Error:', error)
  console.log('Data:', data)
}

test()
