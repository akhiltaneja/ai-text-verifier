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
    console.log("Connecting to Supabase Admin API...");

    // 1. Find the user ID for the admin email
    const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
    if (usersError) {
        console.error("Error fetching users:", usersError);
        return;
    }

    const adminUser = usersData.users.find(u => u.email === 'admin@aitextverifier.com');

    if (!adminUser) {
        console.log("Admin user not found. Creating and auto-confirming...");
        const { data, error } = await supabase.auth.admin.createUser({
            email: 'admin@aitextverifier.com',
            password: 'Admin!2026Unlimited',
            email_confirm: true // This forces confirmation upon creation
        });
        console.log(error ? ("Error creating: " + error.message) : "Successfully created and confirmed.");
        return;
    }

    console.log("Found admin user. Forcing email confirmation...");

    // 2. Update the existing user to be confirmed
    const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
        adminUser.id,
        { email_confirm: true }
    );

    if (updateError) {
        console.error("Error confirming user:", updateError);
    } else {
        console.log("Successfully confirmed email for admin@aitextverifier.com!");
    }
}

run();
