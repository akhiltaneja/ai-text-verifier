
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// ZeroGPT API Key - loaded from environment variable
const ZEROGPT_API_KEY = Deno.env.get('ZEROGPT_API_KEY');

// CORS headers for the API
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
    // Parse the request body to get the text to analyze
    const { text } = await req.json();
    
    if (!text || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Processing text with length: ${text.length}`);

    // Call the ZeroGPT API
    const response = await fetch('https://api.zerogpt.com/api/detect/detectText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': ZEROGPT_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        input_text: text
      })
    });

    console.log(`ZeroGPT API response status: ${response.status}`);

    // Handle error responses from ZeroGPT API
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ZeroGPT API error: ${response.status} - ${errorText}`);
      
      return new Response(
        JSON.stringify({ 
          error: `API returned status ${response.status}: ${errorText || 'Unknown error'}`,
          code: response.status 
        }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse the successful response
    const data = await response.json();
    console.log("ZeroGPT API response received successfully");

    // Return the API response
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(`Error in zerogpt-detect function: ${error.message}`);
    
    return new Response(
      JSON.stringify({ error: error.message, code: 'INTERNAL_ERROR' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
