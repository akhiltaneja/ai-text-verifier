
import React, { useMemo } from 'react';
import { FileText, Percent } from 'lucide-react';
import { getExpandedSummaryPoints } from '../utils/analysisUtils';

interface AnalysisSummaryProps {
  score: number;
}

export const AnalysisSummary = React.memo<AnalysisSummaryProps>(({ score }) => {
  const summaryPoints = useMemo(() => getExpandedSummaryPoints(score), [score]);
  return (
    <div className="bg-muted/50 dark:bg-muted/20 p-5 rounded-lg border mb-4 shadow-sm">
      <div className="flex items-center mb-4">
        <FileText className="w-5 h-5 mr-2 text-muted-foreground" />
        <h3 className="font-medium text-lg">Analysis Summary</h3>
      </div>
      <div className="space-y-3">
        {summaryPoints.map((point, index) => (
          <div key={index} className="flex">
            <Percent className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
            <p className="text-base text-foreground">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
