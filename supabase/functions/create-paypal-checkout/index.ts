
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Utility function to validate environment variables
function validateEnvironment() {
  const PAYPAL_CLIENT_ID = Deno.env.get('PAYPAL_CLIENT_ID');
  const PAYPAL_CLIENT_SECRET = Deno.env.get('PAYPAL_SECRET_KEY');
  const PAYPAL_API_URL = Deno.env.get('PAYPAL_API_URL') || 'https://api-m.sandbox.paypal.com';
  
  console.log(`PayPal API URL: ${PAYPAL_API_URL}`);
  console.log(`PayPal Client ID available: ${Boolean(PAYPAL_CLIENT_ID)}`);
  console.log(`PayPal Secret Key available: ${Boolean(PAYPAL_CLIENT_SECRET)}`);
  
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    console.error('PayPal credentials not configured');
    throw new Error('PayPal is not properly configured. Please add your PayPal credentials to the edge function environment variables.');
  }
  
  return { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_URL };
}

// Utility function to validate request data
function validateRequestData(requestData) {
  try {
    const parsedBody = JSON.parse(requestData);
    console.log('Parsed request data:', JSON.stringify(parsedBody, null, 2));
    
    const { planId, successUrl, cancelUrl, frequency } = parsedBody;
    
    if (!planId || !successUrl || !cancelUrl) {
      console.error('Missing required fields in request');
      throw new Error('Plan ID, success URL, and cancel URL are required');
    }
    
    console.log(`Creating PayPal checkout for plan: ${planId}, frequency: ${frequency}`);
    console.log(`Success URL: ${successUrl}`);
    console.log(`Cancel URL: ${cancelUrl}`);
    
    return { planId, successUrl, cancelUrl, frequency };
  } catch (error) {
    console.error('Error parsing request data:', error);
    throw new Error(`Invalid request format: ${error.message}`);
  }
}

// Utility function to generate access token
async function generateAccessToken(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_URL) {
  console.log('Generating access token');
  const tokenCredentials = btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`);
  
  const authResponse = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${tokenCredentials}`
    },
    body: 'grant_type=client_credentials'
  });
  
  console.log(`Auth response status: ${authResponse.status}`);
  
  if (!authResponse.ok) {
    const errorText = await authResponse.text();
    console.error(`Auth error (${authResponse.status}): ${errorText}`);
    throw new Error(`Failed to authenticate with PayPal (${authResponse.status}): ${errorText}`);
  }
  
  const authData = await authResponse.json();
  console.log('Access token obtained');
  return authData.access_token;
}

// Utility function to calculate plan price based on ID and frequency
function calculatePlanPrice(planId, frequency) {
  let planName, unitAmount;
  
  if (planId === 'premium') {
    planName = 'Premium Plan';
    unitAmount = frequency === 'yearly' ? 29 : 4;
  } else if (planId === 'unlimited') {
    planName = 'Unlimited Plan';
    unitAmount = frequency === 'yearly' ? 129 : 25;
  } else if (planId === 'free') {
    throw new Error('Free plan does not require checkout');
  } else {
    throw new Error(`Invalid plan ID: ${planId}`);
  }
  
  return { planName, unitAmount };
}

// Utility function to create order payload
function createOrderPayload(planName, unitAmount, frequency, successUrl, cancelUrl) {
  return {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: unitAmount.toString(),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: unitAmount.toString()
            }
          }
        },
        items: [
          {
            name: `${planName} - ${frequency}`,
            quantity: '1',
            unit_amount: {
              currency_code: 'USD',
              value: unitAmount.toString()
            },
            category: 'DIGITAL_GOODS'
          }
        ],
        description: `${planName} - ${frequency} subscription`
      }
    ],
    application_context: {
      brand_name: 'AI Content Tools',
      landing_page: 'BILLING',
      user_action: 'PAY_NOW',
      return_url: successUrl,
      cancel_url: cancelUrl
    }
  };
}

// Utility function to create PayPal order
async function createPayPalOrder(accessToken, orderPayload, PAYPAL_API_URL) {
  console.log('Creating PayPal order');
  console.log('Order payload:', JSON.stringify(orderPayload, null, 2));
  
  const orderResponse = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'PayPal-Request-Id': crypto.randomUUID()
    },
    body: JSON.stringify(orderPayload)
  });
  
  console.log(`Order response status: ${orderResponse.status}`);
  
  if (!orderResponse.ok) {
    const orderErrorText = await orderResponse.text();
    console.error(`Order creation error (${orderResponse.status}): ${orderErrorText}`);
    throw new Error(`Failed to create PayPal order: ${orderResponse.status}`);
  }
  
  return await orderResponse.json();
}

// Utility function to extract approval URL
function extractApprovalUrl(orderData) {
  console.log('Order created successfully:', orderData.id);
  
  // Find the approval URL in the links
  const approvalLink = orderData.links?.find(link => link.rel === 'approve');
  
  if (!approvalLink || !approvalLink.href) {
    console.error('No approval URL found in PayPal response');
    throw new Error('No approval URL received from PayPal');
  }
  
  return approvalLink.href;
}

// Main handler function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Step 1: Validate environment variables
    const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_URL } = validateEnvironment();
    
    // Step 2: Parse and validate the request data
    const requestData = await req.text();
    console.log('Request received:', requestData);
    const { planId, successUrl, cancelUrl, frequency } = validateRequestData(requestData);
    
    // Step 3: Generate access token
    const accessToken = await generateAccessToken(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_URL);
    
    // Step 4: Calculate price based on plan and frequency
    const { planName, unitAmount } = calculatePlanPrice(planId, frequency);
    
    // Step 5: Create order payload
    const orderPayload = createOrderPayload(planName, unitAmount, frequency, successUrl, cancelUrl);
    
    // Step 6: Create PayPal order
    const orderData = await createPayPalOrder(accessToken, orderPayload, PAYPAL_API_URL);
    
    // Step 7: Extract approval URL
    const approvalUrl = extractApprovalUrl(orderData);
    
    // Step 8: Return success response
    return new Response(
      JSON.stringify({ 
        url: approvalUrl,
        orderId: orderData.id,
        totalAmount: unitAmount
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Uncaught error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        location: 'Edge function error handling'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
