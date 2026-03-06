import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.development') });
dotenv.config({ path: path.join(__dirname, '.env.local') });
dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.log("Missing URL or KEY in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
async function run() {
    const { data, error } = await supabase.auth.admin.createUser({
        email: 'admin@aitextverifier.com',
        password: 'Admin!2026Unlimited',
        email_confirm: true
    });
    console.log("User Data:", data.user ? "Created successfully" : "Failed");
    if (error) console.error("Error:", error);
}
run();
