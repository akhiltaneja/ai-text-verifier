
import { SummarizationResult, SummarizationConfig } from '@/types/summarization';
import { supabase } from '@/integrations/supabase/client';

// Default configuration
const defaultConfig: SummarizationConfig = {
  maxWordsPercentage: 0.15,
  includeBulletPoints: true
};

// Scrape URL to extract article text
export const scrapeUrl = async (url: string): Promise<{ text: string; title: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('scrape-url', {
      body: { url }
    });

    if (error) {
      throw new Error(`Scrape failed: ${error.message}`);
    }

    if (!data?.success) {
      throw new Error(data?.error || 'Failed to extract text from URL');
    }

    return {
      text: data.text || '',
      title: data.title || '',
    };
  } catch (error) {
    console.error('URL scrape error:', error);
    throw error;
  }
};

// Process summarization using LLM
export const processSummarization = async (
  text: string,
  config: Partial<SummarizationConfig> = {}
): Promise<SummarizationResult> => {
  try {
    const mergedConfig = { ...defaultConfig, ...config };

    if (!text || text.trim().length < 50) {
      throw new Error("Text is too short for meaningful summarization");
    }

    console.log("Summarizing text with LLM, length:", text.length);

    // Call unified LLM edge function
    const { data, error } = await supabase.functions.invoke('process-llm', {
      body: { tool: 'summary', text }
    });

    if (error) {
      console.error("LLM Summarize error:", error);
      throw new Error(`Summarization failed: ${error.message}`);
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    if (!data?.summary) {
      throw new Error("LLM returned an invalid response format");
    }

    const originalWordCount = text.trim().split(/\s+/).length;
    const summaryWordCount = data.summary.trim().split(/\s+/).length;

    const result: SummarizationResult = {
      originalText: text,
      summary: data.summary,
      wordCount: {
        original: originalWordCount,
        summary: summaryWordCount
      },
      keyPoints: (mergedConfig.includeBulletPoints && data.keyPoints) ? data.keyPoints : undefined
    };

    return result;
  } catch (error) {
    console.error("Summarization error:", error);
    throw error;
  }
};

// Generate a downloadable text file with summary
export const downloadSummaryAsText = (result: SummarizationResult) => {
  const text = `SUMMARY REPORT
==============

ORIGINAL TEXT (${result.wordCount.original} words):
${result.originalText}

SUMMARY (${result.wordCount.summary} words):
${result.summary}

${result.keyPoints ? `KEY POINTS:
${result.keyPoints.map(point => `- ${point}`).join('\n')}` : ''}

Generated on: ${new Date().toLocaleString()}
`;

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'summary-report.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
