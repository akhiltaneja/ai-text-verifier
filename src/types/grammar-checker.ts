
export interface GrammarCorrection {
  original: string;
  corrected: string;
  explanation: string;
  type: 'grammar' | 'spelling' | 'punctuation' | 'style';
  position: [number, number]; // start, end
  replacements?: string[]; // Multiple alternatives from LanguageTool
  ruleCategory?: string;
}

export interface GrammarResult {
  corrections: GrammarCorrection[];
  text: string;
  correctedText: string;
  summary: string;
  score: number;
  fluencyScore: number;
  clarityScore: number;
  errorPercentage: number;
}

export interface GrammarRule {
  type: 'grammar' | 'spelling' | 'punctuation' | 'style';
  pattern: RegExp;
  fix: (match: string, ...args: string[]) => string;
  explanation: string;
  needsContext?: boolean;
}
