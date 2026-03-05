
import { GrammarResult } from '@/types/grammar-checker';
import { supabase } from '@/integrations/supabase/client';
import { transformLLMResponse } from './grammar-checker/transformers';
import { grammarRules } from './grammar-checker/grammar-rules';
import { downloadGrammarReport } from './grammar-checker/report-generator';

export { grammarRules, downloadGrammarReport };

export const checkGrammar = async (text: string): Promise<GrammarResult> => {
  console.log("Sending text to grammar check (process-llm):", text.substring(0, 50) + "...");

  if (!text.trim()) {
    throw new Error("Text cannot be empty");
  }

  try {
    const { data, error } = await supabase.functions.invoke('process-llm', {
      body: { tool: 'grammar', text }
    });

    if (error) {
      console.error("LLM Grammar check error:", error);
      throw new Error(`Grammar check failed: ${error.message}`);
    }

    // Check if edge function returned an internal error JSON before throwing
    if (data?.error) {
      throw new Error(data.error);
    }

    return transformLLMResponse(text, data);
  } catch (error) {
    console.error("Grammar check error:", error);
    throw error;
  }
};
