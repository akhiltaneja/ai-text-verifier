
import { SummarizationResult, SummarizationConfig } from '@/types/summarization';
import { supabase } from '@/integrations/supabase/client';

// Default configuration
const defaultConfig: SummarizationConfig = {
  maxWordsPercentage: 0.15,
  includeBulletPoints: true
};

/**
 * TextRank-based extractive summarization
 * Uses graph-based sentence scoring (inspired by PageRank)
 * Much better than the old simple word-frequency approach
 */
const textRankSummarize = (text: string, maxPercent: number = 0.15): { summary: string, keyPoints: string[] } => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

  if (sentences.length === 0) {
    return { summary: text, keyPoints: [] };
  }

  if (sentences.length <= 3) {
    return { summary: text, keyPoints: sentences.map(s => s.trim()) };
  }

  // Build word sets for each sentence (for similarity calculation)
  const sentenceWords: Set<string>[] = sentences.map(s => {
    const words: string[] = (s.toLowerCase().match(/\b[a-z]{3,}\b/g) || []);
    return new Set<string>(words);
  });

  // Calculate similarity matrix between sentences
  const n = sentences.length;
  const similarity: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const sim = calculateSimilarity(sentenceWords[i], sentenceWords[j]);
      similarity[i][j] = sim;
      similarity[j][i] = sim;
    }
  }

  // Run TextRank (simplified PageRank on sentences)
  const damping = 0.85;
  const iterations = 30;
  let scores = new Array(n).fill(1 / n);

  for (let iter = 0; iter < iterations; iter++) {
    const newScores = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          const denominator = similarity[j].reduce((acc, val) => acc + val, 0);
          if (denominator > 0) {
            sum += (similarity[j][i] / denominator) * scores[j];
          }
        }
      }
      newScores[i] = (1 - damping) / n + damping * sum;
    }

    scores = newScores;
  }

  // Determine how many sentences to keep
  const totalWords = text.split(/\s+/).length;
  const targetWords = Math.ceil(totalWords * maxPercent);

  // Create sorted indices by score
  const rankedIndices = scores
    .map((score, index) => ({ score, index }))
    .sort((a, b) => b.score - a.score);

  // Select top sentences until we reach target word count
  let wordCount = 0;
  const selectedIndices: number[] = [];

  for (const { index } of rankedIndices) {
    const sentenceWordCount = (sentences[index].match(/\s+/g) || []).length + 1;
    if (wordCount + sentenceWordCount <= targetWords * 1.3) {
      selectedIndices.push(index);
      wordCount += sentenceWordCount;
    }
    if (wordCount >= targetWords) break;
  }

  // Ensure at least 1 sentence
  if (selectedIndices.length === 0 && rankedIndices.length > 0) {
    selectedIndices.push(rankedIndices[0].index);
  }

  // Sort by original order
  selectedIndices.sort((a, b) => a - b);

  const summaryText = selectedIndices.map(i => sentences[i].trim()).join(' ');

  // Key points: top 3-5 sentences
  const keyPointCount = Math.min(5, Math.ceil(sentences.length / 4));
  const keyPointIndices = rankedIndices.slice(0, keyPointCount);
  const keyPoints = keyPointIndices
    .sort((a, b) => a.index - b.index)
    .map(({ index }) => sentences[index].trim());

  return { summary: summaryText, keyPoints };
};

function calculateSimilarity(set1: Set<string>, set2: Set<string>): number {
  if (set1.size === 0 || set2.size === 0) return 0;

  let intersection = 0;
  for (const word of set1) {
    if (set2.has(word)) intersection++;
  }

  // Normalized overlap (Jaccard-inspired with log normalization)
  const denominator = Math.log(set1.size + 1) + Math.log(set2.size + 1);
  if (denominator === 0) return 0;

  return intersection / denominator;
}

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

// Process summarization
export const processSummarization = async (
  text: string,
  config: Partial<SummarizationConfig> = {}
): Promise<SummarizationResult> => {
  try {
    const mergedConfig = { ...defaultConfig, ...config };

    if (!text || text.trim().length < 50) {
      throw new Error("Text is too short for meaningful summarization");
    }

    console.log("Summarizing text with TextRank, length:", text.length);

    // Use TextRank algorithm
    const { summary, keyPoints } = textRankSummarize(text, mergedConfig.maxWordsPercentage);

    const originalWordCount = text.trim().split(/\s+/).length;
    const summaryWordCount = summary.trim().split(/\s+/).length;

    const result: SummarizationResult = {
      originalText: text,
      summary: summary,
      wordCount: {
        original: originalWordCount,
        summary: summaryWordCount
      },
      keyPoints: mergedConfig.includeBulletPoints ? keyPoints : undefined
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
