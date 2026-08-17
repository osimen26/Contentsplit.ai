import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: './server/.env' })
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

async function alterTable() {
  const { data, error } = await supabase.rpc('execute_sql', {
    sql: 'ALTER TABLE social_accounts ALTER COLUMN user_id TYPE text;'
  })
  
  console.log('RPC Error:', error)
  console.log('RPC Data:', data)
}

alterTable()
