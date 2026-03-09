import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || ''
);

async function verifyUser() {
  if (!process.env.VITE_SUPABASE_SERVICE_ROLE_KEY) {
    console.log("No service key.");
    return;
  }
  
  const { data: users, error: getError } = await supabase.auth.admin.listUsers();
  if (getError) {
     console.error("Error fetching:", getError);
     return;
  }
  
  const targetUser = users.users.find(u => u.email === 'test@aitextverifier.com');
  if (!targetUser) {
     console.log("User not found.");
     return;
  }
  
  const { data, error } = await supabase.auth.admin.updateUserById(
    targetUser.id,
    { email_confirm: true }
  );
  
  if (error) console.error("Update error:", error);
  else console.log("Success! user verified.");
}

verifyUser();
