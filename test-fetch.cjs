const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({ path: './server/.env' });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function fetchAccounts() {
  const { data, error } = await supabase.from('social_accounts').select('*');
  console.log('Error:', error);
  console.log('All accounts in Supabase:', data);
}

fetchAccounts();
