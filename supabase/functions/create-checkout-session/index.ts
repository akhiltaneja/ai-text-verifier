
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@12.5.0";

// Load API key from environment variables
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if we have a Stripe Secret Key
    if (!stripeSecretKey) {
      console.error('Stripe Secret Key is not configured');
      return new Response(
        JSON.stringify({ error: 'Stripe is not properly configured. Please add your Stripe secret key to the edge function environment variables.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Stripe with the secret key
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Parse the request body
    const { planId, successUrl, cancelUrl, frequency } = await req.json();
    
    if (!planId) {
      throw new Error('Plan ID is required');
    }
    
    if (!successUrl || !cancelUrl) {
      throw new Error('Success and cancel URLs are required');
    }
    
    console.log(`Creating checkout session for plan: ${planId}, frequency: ${frequency}`);
    
    // Define price IDs - These should match your Stripe dashboard
    const PRICE_IDS = {
      premium: {
        monthly: 'price_1OiABCRJDVF8TadDHGhJiLmN', // Replace with actual monthly price ID
        yearly: 'price_1OiABCRJDVF8TadDJKlMnOp'  // Replace with actual yearly price ID
      },
      unlimited: {
        monthly: 'price_1OiABDRJDVF8TadDJKlMnOp', // Replace with actual monthly price ID
        yearly: 'price_1OiABDRJDVF8TadDKLmNoP'  // Replace with actual yearly price ID
      }
    };
    
    let priceId;
    
    // Determine which price ID to use based on planId and frequency
    if (planId === 'premium') {
      priceId = frequency === 'yearly' ? PRICE_IDS.premium.yearly : PRICE_IDS.premium.monthly;
      console.log('Using premium price ID:', priceId);
    } else if (planId === 'unlimited') {
      priceId = frequency === 'yearly' ? PRICE_IDS.unlimited.yearly : PRICE_IDS.unlimited.monthly;
      console.log('Using unlimited price ID:', priceId);
    } else if (planId === 'free') {
      // Free plan doesn't need checkout
      return new Response(
        JSON.stringify({ message: 'Free plan does not require checkout' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      throw new Error(`Invalid plan ID: ${planId}`);
    }

    // Get authenticated user if available
    const authHeader = req.headers.get('Authorization');
    let customerId = null;
    let customerEmail = null;
    
    if (authHeader) {
      // Extract user info from auth token if needed
      // This is a placeholder for actual auth implementation
      // const user = await verifyAuth(authHeader);
      // customerId = user.stripeCustomerId;
      // customerEmail = user.email;
    }

    // Use only PayPal
    const paymentMethodTypes = ['paypal'];

    console.log('Creating checkout session with price ID:', priceId);
    console.log('Payment methods enabled:', paymentMethodTypes);
    
    // Calculate total amount based on frequency
    let totalAmount = 0;
    if (planId === 'premium') {
      totalAmount = frequency === 'yearly' ? 29 : 4 * 12;
    } else if (planId === 'unlimited') {
      totalAmount = frequency === 'yearly' ? 129 : 25 * 12;
    }
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodTypes,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer: customerId,
      customer_email: customerEmail,
      allow_promotion_codes: true, // Enable coupon codes
      discounts: [
        {
          coupon: 'WELCOME5', // Default coupon code for 5% discount
        }
      ],
      subscription_data: {
        metadata: {
          totalAmount: totalAmount.toString(),
          planId: planId,
          frequency: frequency
        }
      }
    });

    console.log('Checkout session created successfully:', session.id);

    return new Response(
      JSON.stringify({ 
        url: session.url,
        sessionId: session.id,
        totalAmount: totalAmount
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
