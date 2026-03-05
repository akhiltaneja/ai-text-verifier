
export interface SummarizationResult {
  originalText: string;
  summary: string;
  wordCount: {
    original: number;
    summary: number;
  };
  keyPoints?: string[];
}

export interface SummarizationConfig {
  maxWordsPercentage: number;
  includeBulletPoints: boolean;
}
