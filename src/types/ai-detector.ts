export interface SentenceResult {
  text: string;
  aiProbability: number;
  isHuman: boolean;
  features?: {
    entropy: number;
    vocabularyScore: number;
    formulaicScore: number;
    readabilityScore: number;
    structureScore: number;
    burstyScore: number;
  };
}

export interface AnalysisResult {
  sentences: SentenceResult[];
  overallScore: number;
  summary: string;
  detectionMethods: {
    entropyAnalysis: number;
    vocabularyDiversity: number;
    sentenceStructure: number;
    burstiness: number;
    formulaicPhrases: number;
    readabilityConsistency: number;
  };
  highlightedSentences: string[];
  improvedVersion: string;
  originalText?: string;
}

export interface VerdictInfo {
  text: string;
  className: string;
}

export interface AIDetectorConfig {
  sensitivityLevel: 'low' | 'medium' | 'high';
  minTextLength: number;
}

export interface AIDetectionSample {
  text: string;
  score: number;
  verdict: string;
  highlights: {
    text: string;
    isAI: boolean;
  }[];
}
