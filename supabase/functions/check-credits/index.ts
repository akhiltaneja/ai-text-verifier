import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DAILY_LIMIT_LOGGED_IN = 750;
const DAILY_LIMIT_PREMIUM = 5000;
const DAILY_LIMIT_UNLIMITED = 999999;
const DAILY_LIMIT_ANONYMOUS = 500;
const ADMIN_EMAILS = ['admin@aitextverifier.com', 'test@aitextverifier.com', 'test2@aitextverifier.com'];

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

        // Get the user's JWT from the Authorization header
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: 'Not authenticated' }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Create a Supabase client with service role (to bypass RLS for upsert)
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // Create a client with the user's JWT to get their identity
        const supabaseUser = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
            global: { headers: { Authorization: authHeader } }
        });

        // Get the authenticated user
        const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
        if (authError || !user) {
            return new Response(
                JSON.stringify({ error: 'Invalid authentication' }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const { action, tool, wordCount } = await req.json();
        const today = new Date().toISOString().split('T')[0]; // UTC date YYYY-MM-DD

        // Determine the user's active subscription plan from app_metadata
        let activePlan = 'free'; // default
        if (user.app_metadata && user.app_metadata.subscription_plan) {
            activePlan = user.app_metadata.subscription_plan.toLowerCase();
        }

        // Determine the daily limit for this user based on their plan
        let userDailyLimit = DAILY_LIMIT_LOGGED_IN;

        if (activePlan === 'unlimited' || ADMIN_EMAILS.includes(user.email || '')) {
            userDailyLimit = DAILY_LIMIT_UNLIMITED;
            activePlan = 'unlimited'; // FORCE admins visually to unlimited
        } else if (activePlan === 'premium') {
            userDailyLimit = DAILY_LIMIT_PREMIUM;
        }

        console.log(`User ${user.id} (${user.email}) plan: ${activePlan}, limit: ${userDailyLimit}`);

        if (action === 'check') {
            // Return current usage for all tools today
            const { data: usageRows, error: fetchError } = await supabaseAdmin
                .from('daily_usage')
                .select('words_used')
                .eq('user_id', user.id)
                .eq('usage_date', today);

            if (fetchError) {
                console.error('Fetch error:', fetchError);
                throw new Error('Failed to fetch usage');
            }

            // Calculate total global usage across all tools
            let totalWordsUsed = 0;
            if (usageRows) {
                totalWordsUsed = usageRows.reduce((sum: any, row: any) => sum + row.words_used, 0);
            }
            const globalRemaining = Math.max(0, userDailyLimit - totalWordsUsed);

            // Build unified remaining credits map
            const remaining: Record<string, number> = {
                'ai-detector': globalRemaining,
                'grammar-checker': globalRemaining,
                'paraphrasing': globalRemaining,
                'summarization': globalRemaining,
                'ai-summary': globalRemaining,
                'translation': globalRemaining,
            };

            return new Response(
                JSON.stringify({ success: true, remaining, dailyLimit: userDailyLimit, plan: activePlan }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        if (action === 'use') {
            if (!tool || !wordCount || wordCount <= 0) {
                return new Response(
                    JSON.stringify({ error: 'Missing tool or wordCount' }),
                    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            // Get current usage for ALL tools today to enforce global pool
            const { data: usageRows, error: fetchError } = await supabaseAdmin
                .from('daily_usage')
                .select('words_used')
                .eq('user_id', user.id)
                .eq('usage_date', today);

            if (fetchError) {
                console.error('Fetch error:', fetchError);
                throw new Error('Failed to check usage');
            }

            const totalUsedNow = usageRows ? usageRows.reduce((a: any, b: any) => a + b.words_used, 0) : 0;
            const globalRemaining = userDailyLimit - totalUsedNow;

            if (wordCount > globalRemaining) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        error: 'Daily limit exceeded',
                        remaining: globalRemaining,
                        dailyLimit: userDailyLimit,
                    }),
                    { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            // Get the specific tool row to update or insert
            const { data: existing } = await supabaseAdmin
                .from('daily_usage')
                .select('id, words_used')
                .eq('user_id', user.id)
                .eq('tool', tool)
                .eq('usage_date', today)
                .maybeSingle();

            const currentToolUsed = existing?.words_used || 0;

            // Upsert: update existing row or create new one
            if (existing) {
                const { error: updateError } = await supabaseAdmin
                    .from('daily_usage')
                    .update({
                        words_used: currentToolUsed + wordCount,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', existing.id);

                if (updateError) {
                    console.error('Update error:', updateError);
                    throw new Error('Failed to update usage');
                }
            } else {
                const { error: insertError } = await supabaseAdmin
                    .from('daily_usage')
                    .insert({
                        user_id: user.id,
                        tool: tool,
                        words_used: wordCount,
                        usage_date: today,
                    });

                if (insertError) {
                    console.error('Insert error:', insertError);
                    throw new Error('Failed to record usage');
                }
            }

            return new Response(
                JSON.stringify({
                    success: true,
                    remaining: globalRemaining - wordCount,
                    dailyLimit: userDailyLimit,
                    plan: activePlan
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ error: 'Invalid action. Use "check" or "use".' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Credit check error:', (error as Error).message);
        return new Response(
            JSON.stringify({ error: (error as Error).message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
