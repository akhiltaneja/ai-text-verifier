
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, FileBarChart, List, Clock } from 'lucide-react';
import { SummarizationResult as SummarizationResultType } from '@/types/summarization';

interface SummarizationResultProps {
  result: SummarizationResultType;
  downloadSummary: () => void;
}

export const SummarizationResultView: React.FC<SummarizationResultProps> = ({ 
  result, 
  downloadSummary
}) => {
  // Calculate compression rate
  const compressionRate = ((result.wordCount.original - result.wordCount.summary) / result.wordCount.original * 100).toFixed(1);
  
  return (
    <div className="max-w-3xl mx-auto mt-12 animate-fade-in">
      <Card className="overflow-hidden mb-8 border">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Summary Results</h2>
              <p className="text-muted-foreground text-sm">Summarization complete</p>
            </div>
            <Button variant="outline" size="sm" onClick={downloadSummary} className="flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </Button>
          </div>
          
          {/* Statistics section */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-muted/30 dark:bg-muted/20 p-3 rounded-lg text-center">
              <div className="flex justify-center text-primary mb-1">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-lg font-semibold mb-1">{result.wordCount.original}</div>
              <div className="text-xs text-muted-foreground">Original Words</div>
            </div>
            <div className="bg-muted/30 dark:bg-muted/20 p-3 rounded-lg text-center">
              <div className="flex justify-center text-primary mb-1">
                <FileBarChart className="w-5 h-5" />
              </div>
              <div className="text-lg font-semibold mb-1">{result.wordCount.summary}</div>
              <div className="text-xs text-muted-foreground">Summary Words</div>
            </div>
            <div className="bg-muted/30 dark:bg-muted/20 p-3 rounded-lg text-center">
              <div className="flex justify-center text-primary mb-1">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-lg font-semibold mb-1">{compressionRate}%</div>
              <div className="text-xs text-muted-foreground">Compression Rate</div>
            </div>
          </div>
          
          {/* Summary section */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border mb-6">
            <div className="flex items-center mb-3">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              <h3 className="font-medium text-lg">Summary</h3>
            </div>
            <div className="bg-muted/20 dark:bg-muted/10 p-4 rounded text-foreground">
              {result.summary}
            </div>
          </div>
          
          {/* Key points section */}
          {result.keyPoints && result.keyPoints.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border mb-6">
              <div className="flex items-center mb-3">
                <List className="w-5 h-5 mr-2 text-primary" />
                <h3 className="font-medium text-lg">Key Points</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                {result.keyPoints.map((point, index) => (
                  <li key={index} className="text-foreground">{point}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Original text section */}
          <div className="bg-muted/50 dark:bg-muted/20 p-5 rounded-lg border">
            <div className="flex items-center mb-3">
              <FileText className="w-5 h-5 mr-2 text-muted-foreground" />
              <h3 className="font-medium text-lg">Original Text</h3>
            </div>
            <div className="text-base text-foreground max-h-60 overflow-y-auto bg-muted/20 dark:bg-muted/10 p-4 rounded">
              {result.originalText}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
