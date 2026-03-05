
import React from 'react';
import { AnalysisResult, VerdictInfo } from '@/types/ai-detector';
import { VerdictHeader } from './components/VerdictHeader';
import { AIScoreAnalysis } from './components/AIScoreAnalysis';
import { TextHighlighter } from './components/TextHighlighter';
import { AnalysisSummary } from './components/AnalysisSummary';
import { SentenceAnalysis } from './SentenceAnalysis';

interface VerdictDisplayProps {
  result: AnalysisResult;
  verdict: VerdictInfo;
}

export const VerdictDisplay: React.FC<VerdictDisplayProps> = ({
  result,
  verdict
}) => {
  return (
    <div>
      <VerdictHeader result={result} verdict={verdict} />

      {/* AI Score Analysis with detection method breakdown */}
      <AIScoreAnalysis result={result} />

      {/* Text Analysis with AI content highlighting */}
      <TextHighlighter result={result} />

      {/* Per-sentence analysis */}
      {result.sentences.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border mb-6 shadow-sm">
          <SentenceAnalysis result={result} />
        </div>
      )}

      {/* Improved Version */}
      {result.improvedVersion && result.overallScore > 30 && (
        <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-lg border border-green-200 dark:border-green-800 mb-6 shadow-sm">
          <div className="flex items-center mb-3">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-medium text-lg text-green-800 dark:text-green-300">Suggested Improved Version</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Below is a rewritten version with AI-typical phrasing replaced by more natural alternatives:
          </p>
          <div className="bg-white dark:bg-gray-900 p-4 rounded border text-base leading-relaxed whitespace-pre-line">
            {result.improvedVersion}
          </div>
        </div>
      )}

      {/* Analysis Summary */}
      <AnalysisSummary score={result.overallScore} />
    </div>
  );
};
