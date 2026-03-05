
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { VerdictDisplay } from './VerdictDisplay';
import { AnalysisResult as AnalysisResultType, VerdictInfo } from '@/types/ai-detector';

interface AnalysisResultProps {
  result: AnalysisResultType;
  downloadReport: () => void;
  verdict: VerdictInfo;
}

export const AnalysisResultDisplay: React.FC<AnalysisResultProps> = ({ 
  result, 
  downloadReport,
  verdict
}) => {
  return (
    <div className="max-w-3xl mx-auto mt-12 animate-fade-in">
      <Card className="overflow-hidden mb-8 border">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold mb-2">AI Detection Result</h2>
              <p className="text-muted-foreground text-sm">Analysis complete</p>
            </div>
            <Button variant="outline" size="sm" onClick={downloadReport} className="flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              <span>Download PDF Report</span>
            </Button>
          </div>
          
          <VerdictDisplay result={result} verdict={verdict} />
        </div>
      </Card>
    </div>
  );
};
