import React, { useMemo } from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, Info } from 'lucide-react';
import { AnalysisResult, VerdictInfo } from '@/types/ai-detector';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VerdictHeaderProps {
  result: AnalysisResult;
  verdict: VerdictInfo;
}

export const VerdictHeader = React.memo<VerdictHeaderProps>(({ result, verdict }) => {
  const humanPercentage = useMemo(() => 100 - result.overallScore, [result.overallScore]);

  const icon = useMemo(() => {
    if (result.overallScore > 70) {
      return <AlertTriangle className="w-7 h-7 text-destructive" />;
    } else if (result.overallScore > 30) {
      return <HelpCircle className="w-7 h-7 text-warning" />;
    } else {
      return <CheckCircle className="w-7 h-7 text-success" />;
    }
  }, [result.overallScore]);

  const formatVerdictText = () => {
    if (result.overallScore < 5) {
      return (
        <>
          <span className="block">Very likely human-written</span>
          <span className="block text-sm font-normal mt-1">(0% AI, 100% Human)</span>
        </>
      );
    }
    return verdict.text;
  };

  return (
    <div className="text-center mb-6">
      <div className="flex justify-center items-center gap-2 mb-3">
        {icon}
        <h3 className={`text-3xl font-bold ${verdict.className}`}>
          {formatVerdictText()}
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p className="text-xs">Uses 6 detection algorithms: entropy analysis, vocabulary diversity, sentence structure, burstiness, formulaic phrase detection, and readability consistency.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <p className="text-sm text-muted-foreground max-w-lg mx-auto">
        {result.overallScore > 80
          ? "This content has a very high probability of being AI-generated."
          : result.overallScore > 70
            ? "This content is likely to be AI-generated."
            : result.overallScore > 50
              ? "This content has characteristics commonly found in AI-generated text."
              : result.overallScore > 30
                ? "This content has mixed characteristics of both AI and human writing."
                : result.overallScore > 20
                  ? "This content is likely written by a human."
                  : "This content is very likely written by a human."
        }
      </p>
    </div>
  );
});
