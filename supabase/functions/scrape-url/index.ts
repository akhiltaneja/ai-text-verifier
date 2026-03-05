import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { url } = await req.json();

        if (!url || !url.trim()) {
            return new Response(
                JSON.stringify({ error: 'URL is required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        console.log('Scraping URL:', url);

        // Fetch the webpage
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; AITextVerifier/1.0)',
                'Accept': 'text/html,application/xhtml+xml',
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();

        // Extract text content from HTML
        const articleText = extractArticleText(html);
        const title = extractTitle(html);

        console.log('Extracted text length:', articleText.length);

        return new Response(
            JSON.stringify({
                success: true,
                text: articleText,
                title: title,
                url: url,
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Scrape error:', error.message);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});

function extractTitle(html: string): string {
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
    if (titleMatch) {
        return decodeHtmlEntities(titleMatch[1].trim());
    }

    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/is);
    if (h1Match) {
        return decodeHtmlEntities(stripTags(h1Match[1]).trim());
    }

    return '';
}

function extractArticleText(html: string): string {
    // Remove script and style tags
    let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    text = text.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '');
    text = text.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
    text = text.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
    text = text.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
    text = text.replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '');

    // Try to find article or main content
    const articleMatch = text.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    const mainMatch = text.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const contentMatch = text.match(/<div[^>]*(?:class|id)=['"]*[^'"]*(?:content|article|post|entry|body)[^'"]*['"]*[^>]*>([\s\S]*?)<\/div>/i);

    let contentHtml = articleMatch?.[1] || mainMatch?.[1] || contentMatch?.[1] || text;

    // Extract text from paragraphs
    const paragraphs: string[] = [];
    const pMatches = contentHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    for (const match of pMatches) {
        const cleaned = stripTags(match[1]).trim();
        if (cleaned.length > 20) { // Only include substantial paragraphs
            paragraphs.push(cleaned);
        }
    }

    // If no paragraphs found, fall back to stripping all tags
    if (paragraphs.length === 0) {
        const stripped = stripTags(contentHtml)
            .replace(/\s+/g, ' ')
            .trim();
        return stripped.slice(0, 10000); // Limit to 10k chars
    }

    return paragraphs.join('\n\n').slice(0, 10000);
}

function stripTags(html: string): string {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
}

function decodeHtmlEntities(text: string): string {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');
}
