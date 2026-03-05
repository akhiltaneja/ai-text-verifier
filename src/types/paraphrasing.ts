
export interface ParaphrasingResult {
  originalText: string;
  paraphrasedText: string;
  summary: string;
}

export interface WordReplacement {
  [key: string]: string[];
}

export interface SentenceTransformation {
  (s: string): string;
}

export interface PlagiarismMatch {
  text: string;
  source: string;
  url: string;
  matchPercentage: number;
}

export interface PlagiarismResult {
  matches: PlagiarismMatch[];
  originalityScore: number;
  grammarScore: number;
  totalWords: number;
  matchedWords: number;
  summary: string;
  correctedText?: string;
}

export interface SearchApiResponse {
  success: boolean;
  results: SearchResult[];
  error?: string;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  sourceName: string;
}
