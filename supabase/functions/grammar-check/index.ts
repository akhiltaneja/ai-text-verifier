
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Text cannot be empty" }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log("Processing grammar check request for text length:", text.length);

    // Call LanguageTool public API
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        language: 'auto',
        enabledOnly: 'false',
      }).toString()
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LanguageTool API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: `LanguageTool API failed with status: ${response.status}` }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const data = await response.json();
    console.log("LanguageTool API matches found:", data.matches?.length || 0);

    // Build corrected text by applying all replacements
    let correctedText = text;
    const corrections = [];

    // Sort matches by offset descending so we can replace from the end
    const sortedMatches = [...(data.matches || [])].sort((a: any, b: any) => b.offset - a.offset);

    for (const match of sortedMatches) {
      const replacements = (match.replacements || []).slice(0, 5); // Top 5 suggestions
      const bestReplacement = replacements[0]?.value || '';

      if (bestReplacement) {
        // Apply the best replacement to build corrected text
        const before = correctedText.slice(0, match.offset);
        const after = correctedText.slice(match.offset + match.length);
        correctedText = before + bestReplacement + after;
      }

      corrections.push({
        offset: match.offset,
        length: match.length,
        message: match.message,
        shortMessage: match.shortMessage || '',
        original: text.slice(match.offset, match.offset + match.length),
        replacements: replacements.map((r: any) => r.value),
        ruleId: match.rule?.id || '',
        ruleCategory: match.rule?.category?.name || 'Grammar',
        ruleDescription: match.rule?.description || '',
        type: match.rule?.category?.id === 'TYPOS' ? 'spelling'
          : match.rule?.category?.id === 'PUNCTUATION' ? 'punctuation'
            : match.rule?.category?.id === 'STYLE' ? 'style'
              : 'grammar',
      });
    }

    // Re-sort corrections by offset ascending for display
    corrections.sort((a: any, b: any) => a.offset - b.offset);

    const result = {
      success: true,
      result: {
        fixedText: correctedText,
        originalText: text,
        corrections: corrections,
        language: data.language?.detectedLanguage?.name || 'English',
      }
    };

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("Error in grammar check function:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
