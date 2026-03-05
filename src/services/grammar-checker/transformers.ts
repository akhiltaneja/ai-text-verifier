
import { GrammarResult, GrammarCorrection } from '@/types/grammar-checker';

export const transformLanguageToolResponse = (originalText: string, apiResult: any): GrammarResult => {
  const text = originalText;
  const correctedText = apiResult.fixedText || originalText;
  const corrections: GrammarCorrection[] = [];

  // Map LanguageTool corrections to our format
  if (apiResult.corrections && Array.isArray(apiResult.corrections)) {
    for (const match of apiResult.corrections) {
      const bestReplacement = match.replacements?.[0] || match.original;

      corrections.push({
        original: match.original || '',
        corrected: bestReplacement,
        explanation: match.message || match.shortMessage || 'Suggested improvement',
        type: match.type || 'grammar',
        position: [match.offset || 0, (match.offset || 0) + (match.length || 0)],
        replacements: match.replacements || [],
        ruleCategory: match.ruleCategory || 'Grammar',
      });
    }
  }

  // Calculate scores based on corrections
  const errorCount = corrections.length;
  const wordCount = text.split(/\s+/).length;
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

// Keep old export name for backward compatibility
export const transformZeroGPTResponse = transformLanguageToolResponse;
