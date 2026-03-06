
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
      return <p className="whitespace-pre-wrap text-slate-700 text-base leading-relaxed">{result.originalText}</p>;
    }

    return (
      <div className="whitespace-pre-wrap leading-relaxed text-slate-700">
        {result.sentences.map((sentence, index) => {
          const isAI = sentence.aiProbability > 55;
          const isUncertain = sentence.aiProbability >= 40 && sentence.aiProbability <= 55;

          return (
            <span
              key={index}
              className={
                isAI
                  ? 'bg-rose-100 text-rose-900 border-b-2 border-rose-300 px-0.5 rounded-sm transition-colors cursor-help'
                  : isUncertain
                    ? 'bg-amber-100 text-amber-900 border-b-2 border-amber-300 px-0.5 rounded-sm transition-colors cursor-help'
                    : 'text-slate-700'
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
    <div className="w-full text-base font-sans p-1">
      {highlightedContent}

      <div className="mt-8 pt-4 border-t border-slate-100 text-sm flex items-center gap-6">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-rose-200 border border-rose-300 rounded-sm mr-2"></span>
          <span className="text-slate-500 font-medium">Likely AI-generated</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-amber-200 border border-amber-300 rounded-sm mr-2"></span>
          <span className="text-slate-500 font-medium">Mixed or Uncertain</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-transparent border border-slate-200 rounded-sm mr-2"></span>
          <span className="text-slate-500 font-medium">Human-written</span>
        </div>
      </div>
    </div>
  );
});
