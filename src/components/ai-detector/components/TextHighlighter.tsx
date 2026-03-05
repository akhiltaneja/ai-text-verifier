
import React, { useMemo } from 'react';
import { FileText } from 'lucide-react';
import { AnalysisResult } from '@/types/ai-detector';

interface TextHighlighterProps {
  result: AnalysisResult;
}

export const TextHighlighter = React.memo<TextHighlighterProps>(({ result }) => {
  const humanPercentage = useMemo(() => 100 - result.overallScore, [result.overallScore]);

  // Build highlighted content from sentence-level analysis
  const highlightedContent = useMemo(() => {
    if (!result.sentences || result.sentences.length === 0) {
      return <p className="whitespace-pre-line text-foreground text-base">{result.originalText}</p>;
    }

    return (
      <div className="whitespace-pre-line">
        {result.sentences.map((sentence, index) => {
          const isAI = sentence.aiProbability > 55;
          const isUncertain = sentence.aiProbability >= 40 && sentence.aiProbability <= 55;

          return (
            <span
              key={index}
              className={
                isAI
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-0.5 rounded text-base'
                  : isUncertain
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-0.5 rounded text-base'
                    : 'text-foreground text-base'
              }
              title={`${Math.round(sentence.aiProbability)}% AI probability`}
            >
              {sentence.text}{' '}
            </span>
          );
        })}
      </div>
    );
  }, [result.sentences, result.originalText]);

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileText className="w-5 h-5 mr-2 text-muted-foreground" />
          <h4 className="font-medium text-lg">Text Analysis</h4>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="text-sm font-medium">{Math.round(result.overallScore)}% AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm font-medium">{Math.round(humanPercentage)}% Human</span>
          </div>
        </div>
      </div>

      {/* Progress bars */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 rounded-full"
            style={{ width: `${result.overallScore}%` }}
          ></div>
        </div>
        <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${humanPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="text-base text-foreground dark:text-gray-200 bg-muted/20 dark:bg-muted/10 p-5 rounded max-h-[500px] overflow-y-auto shadow-inner">
        {highlightedContent}
      </div>
      <div className="mt-4 pt-3 border-t text-sm flex items-center gap-4">
        <div className="flex items-center">
          <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-2 py-0.5 rounded mr-2">Highlighted</span>
          <span className="text-muted-foreground">= Likely AI-generated</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded mr-2">Yellow</span>
          <span className="text-muted-foreground">= Uncertain</span>
        </div>
      </div>
    </div>
  );
});
