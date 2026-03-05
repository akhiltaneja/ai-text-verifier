import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// --- SYSTEM PROMPTS ---
const PROMPTS = {
  grammar: `You are an expert proofreader and copy editor. Review the provided text for grammatical errors, spelling mistakes, punctuation issues, and awkward phrasing.
You must return your response as a valid JSON object matching this TypeScript interface exactly:
{
  "fixedText": "The fully corrected text replacing the original",
  "corrections": [
    {
      "original": "the exact original incorrect word/phrase",
      "corrected": "the exact suggested replacement",
      "explanation": "a brief 1-sentence explanation of why it was changed",
      "type": "grammar" // must be one of: "grammar", "spelling", "punctuation", "style"
    }
  ]
}
If there are no errors, return the original text as fixedText and an empty array for corrections. ALWAYS return valid JSON without Markdown block markers.`,

  summary: `You are an expert summarizer. Read the provided text and create a concise, accurate summary.
You must return your response as a valid JSON object matching this TypeScript interface exactly:
{
  "summary": "A cohesive 1-3 paragraph summary capturing the core meaning.",
  "keyPoints": [
    "Bullet point 1",
    "Bullet point 2",
    "Bullet point 3"
  ]
}
ALWAYS return valid JSON without Markdown block markers.`,

  paraphrase: `You are an expert writer capable of rewriting text while preserving its original meaning. Rewrite the provided text to be natural, engaging, and flow better.
You must return your response as a valid JSON object matching this TypeScript interface exactly:
{
  "paraphrasedText": "The fully rewritten and improved text"
}
ALWAYS return valid JSON without Markdown block markers.`,

  translate: `You are a professional translator. Translate the provided text into the requested target language. Ensure you preserve context, tone, and idioms appropriately.
You must return your response as a valid JSON object matching this TypeScript interface exactly:
{
  "translatedText": "The text translated into the target language"
}
ALWAYS return valid JSON without Markdown block markers.`
};


// --- LLM Providers ---

async function callGroq(prompt: string, text: string, apiKey: string): Promise<string> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: text }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API Error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGemini(prompt: string, text: string, apiKey: string): Promise<string> {
  // Use gemini-1.5-flash which is very fast and cheap/free
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: prompt + "\\n\\nHere is the text:\\n" + text }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error("Invalid Gemini response format");
  }

  return data.candidates[0].content.parts[0].text;
}


// --- Main Handler ---

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tool, text, targetLanguage } = await req.json();

    if (!tool || !text || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing required arguments: tool and text" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!(tool in PROMPTS)) {
      return new Response(
        JSON.stringify({ error: `Unknown tool: ${tool}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let prompt = PROMPTS[tool as keyof typeof PROMPTS];
    if (tool === 'translate') {
      if (!targetLanguage) {
        return new Response(
          JSON.stringify({ error: "Missing required argument: targetLanguage" }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      prompt = prompt.replace('the requested target language', targetLanguage);
    }

    const groqKey = Deno.env.get('GROQ_API_KEY');
    const geminiKey = Deno.env.get('GEMINI_API_KEY');

    if (!groqKey && !geminiKey) {
      return new Response(
        JSON.stringify({ error: "No AI API keys configured. Please configure GROQ_API_KEY or GEMINI_API_KEY." }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let jsonResponseStr = "";
    let providerUsed = "";

    // TRY GROQ (Llama 3) FIRST
    if (groqKey) {
      try {
        console.log(`[${tool}] Attempting Groq...`);
        jsonResponseStr = await callGroq(prompt, text, groqKey);
        providerUsed = "groq";
      } catch (err) {
        console.warn("Groq failed, will try fallback:", err);
      }
    }

    // FALLBACK TO GEMINI
    if (!jsonResponseStr && geminiKey) {
      try {
        console.log(`[${tool}] Attempting Gemini Fallback...`);
        jsonResponseStr = await callGemini(prompt, text, geminiKey);
        providerUsed = "gemini";
      } catch (err) {
        console.error("Gemini failed:", err);
        throw new Error("Both primary and fallback AI providers failed.");
      }
    }

    if (!jsonResponseStr) {
      throw new Error("Failed to generate response from AI providers.");
    }

    // Parse the JSON to ensure it's valid before sending to client
    let resultObj;
    try {
      resultObj = JSON.parse(jsonResponseStr);
    } catch (e) {
      console.error("Failed to parse LLM JSON response:", jsonResponseStr);
      throw new Error("AI returned malformed JSON");
    }

    resultObj._provider = providerUsed;

    return new Response(
      JSON.stringify(resultObj),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("process-llm error:", (error as Error).message);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
