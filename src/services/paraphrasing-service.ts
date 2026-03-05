
import { ParaphrasingResult } from '@/types/paraphrasing';
import { supabase } from '@/integrations/supabase/client';

export const processParaphrasing = async (text: string): Promise<ParaphrasingResult> => {
  if (!text || text.trim().length === 0) {
    throw new Error("Text cannot be empty");
  }

  console.log("Paraphrasing text with LLM, length:", text.length);

  try {
    const { data, error } = await supabase.functions.invoke('process-llm', {
      body: { tool: 'paraphrase', text }
    });

    if (error) {
      console.error("LLM Paraphrase error:", error);
      throw new Error(`Paraphrasing failed: ${error.message}`);
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    if (!data?.paraphrasedText) {
      throw new Error("LLM returned an invalid response format");
    }

    const wordCount = text.split(/\s+/).length;
    const sentenceCount = (text.match(/[.!?]+/g) || []).length || 1;
    const summary = `The original text contains ${wordCount} words across approximately ${sentenceCount} sentences. The paraphrased version was rewritten by AI to be natural, engaging, and flow better while maintaining the original meaning.`;

    return {
      originalText: text,
      paraphrasedText: data.paraphrasedText,
      summary
    };
  } catch (error) {
    console.error("Paraphrasing error:", error);
    throw error;
  }
};
