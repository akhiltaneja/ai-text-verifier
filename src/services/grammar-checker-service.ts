
import { GrammarResult } from '@/types/grammar-checker';
import { supabase } from '@/integrations/supabase/client';
import { transformZeroGPTResponse } from './grammar-checker/transformers';
import { grammarRules } from './grammar-checker/grammar-rules';
import { downloadGrammarReport } from './grammar-checker/report-generator';

export { grammarRules, downloadGrammarReport };

export const checkGrammar = async (text: string): Promise<GrammarResult> => {
  console.log("Sending text to grammar check function:", text.substring(0, 50) + "...");
  
  // Check if text is empty
  if (!text.trim()) {
    throw new Error("Text cannot be empty");
  }
  
  try {
    // Call our secure edge function with the text
    const { data, error } = await supabase.functions.invoke('grammar-check', {
      body: { text }
    });
    
    if (error) {
      console.error("Grammar check function error:", error);
      throw new Error(`Grammar check failed: ${error.message}`);
    }
    
    if (!data || !data.success || !data.result) {
      console.error("Grammar check function returned unsuccessful result:", data);
      
      // Try to extract more useful error message if available
      if (data && data.error) {
        throw new Error(`Grammar check error: ${data.error}`);
      } else if (data && data.details && data.details.error) {
        throw new Error(`Grammar check error: ${data.details.error}`);
      } else {
        throw new Error("Grammar check returned an unsuccessful result");
      }
    }
    
    // Transform ZeroGPT response to our format
    return transformZeroGPTResponse(text, data.result);
  } catch (error) {
    console.error("Grammar check error:", error);
    throw error;
  }
};
