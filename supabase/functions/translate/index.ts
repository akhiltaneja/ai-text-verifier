
// Translation Edge Function using MyMemory API (free, 200+ languages, no key needed)
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { text, fromLanguage, toLanguage } = await req.json()

    if (!text || !toLanguage) {
      throw new Error('Missing required parameters: text and toLanguage')
    }

    // Determine source language code
    const fromCode = fromLanguage || 'en'
    const toCode = toLanguage

    console.log(`Translating from ${fromCode} to ${toCode}, text length: ${text.length}`)

    // MyMemory API (free, no API key needed for up to 5000 words/day)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromCode}|${toCode}`

    const response = await fetch(url)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('MyMemory API error:', response.status, errorText)
      throw new Error(`Translation API failed with status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.responseData) {
      throw new Error('No translation data received')
    }

    const translatedText = data.responseData.translatedText || ''
    const detectedLanguage = data.responseData.detectedLanguage || fromCode

    console.log('Translation successful, result length:', translatedText.length)

    return new Response(
      JSON.stringify({
        translatedText: translatedText,
        fromLanguage: detectedLanguage || fromCode,
        toLanguage: toCode
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Translation error:', error.message)

    return new Response(
      JSON.stringify({
        error: error.message,
        message: 'Translation failed. Please try again.'
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})
