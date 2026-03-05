
import { GrammarResult, GrammarCorrection } from '@/types/grammar-checker';

export const transformLLMResponse = (originalText: string, llmResult: any): GrammarResult => {
  const text = originalText;
  const correctedText = llmResult.fixedText || originalText;
  const corrections: GrammarCorrection[] = [];

  // Map LLM corrections to our format
  if (llmResult.corrections && Array.isArray(llmResult.corrections)) {
    for (const match of llmResult.corrections) {
      if (!match.original || !match.corrected) continue;

      // Calculate approximate position. Since LLM might change length or not perfectly match, 
      // we do a simple indexOf to find where the original text was.
      const startIndex = text.indexOf(match.original);
      const position = startIndex !== -1
        ? [startIndex, startIndex + match.original.length] as [number, number]
        : [0, 0] as [number, number];

      corrections.push({
        original: match.original,
        corrected: match.corrected,
        explanation: match.explanation || 'Suggested improvement',
        type: match.type || 'grammar',
        position,
        replacements: [match.corrected],
        ruleCategory: match.type ? match.type.charAt(0).toUpperCase() + match.type.slice(1) : 'Grammar',
      });
    }
  }

  // Calculate scores based on corrections
  const errorCount = corrections.length;
  const wordCount = text.split(/\s+/).length || 1;
  const errorPercentage = Math.min(100, Math.round((errorCount / Math.max(1, wordCount)) * 100));

  const baseScore = Math.max(0, 100 - errorPercentage * 1.5);
  const score = Math.round(baseScore);

  // Generate related scores with slight variation
  const generateRelatedScore = (baseScore: number): number => {
    const variation = Math.random() * 20 - 10;
    return Math.min(100, Math.max(0, Math.round(baseScore + variation)));
  };

  const fluencyScore = generateRelatedScore(score);
  const clarityScore = generateRelatedScore(score);

  // Generate summary
  let summary = "";
  if (score >= 90) {
    summary = "Excellent! Your text has very few or no grammatical issues. The writing is clear and effective.";
  } else if (score >= 80) {
    summary = "Very good writing with only minor grammatical issues. A few small suggestions would improve clarity.";
  } else if (score >= 70) {
    summary = "Good writing overall. There are some grammatical issues that should be addressed to improve clarity.";
  } else if (score >= 60) {
    summary = "Your text has several grammatical issues that affect readability. Addressing these would significantly improve your writing.";
  } else if (score >= 40) {
    summary = "There are numerous grammatical issues in your text that make it difficult to understand in places. Careful editing is recommended.";
  } else {
    summary = "The text contains many grammatical issues that significantly impact clarity. A thorough revision is needed.";
  }

  return {
    text,
    correctedText,
    corrections,
    summary,
    score,
    fluencyScore,
    clarityScore,
    errorPercentage,
  };
};

// Keep old export name for backward compatibility temporarily if imported elsewhere
export const transformZeroGPTResponse = transformLLMResponse;
export const transformLanguageToolResponse = transformLLMResponse;
