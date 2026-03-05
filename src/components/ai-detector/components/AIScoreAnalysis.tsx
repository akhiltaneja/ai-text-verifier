
import React, { useMemo } from 'react';
import { Progress } from '@/components/ui/progress';
import { Bot, User, Braces, BarChart3, TextCursorInput, Activity, BookOpen, ScanSearch } from 'lucide-react';
import { AnalysisResult } from '@/types/ai-detector';

interface AIScoreAnalysisProps {
  result: AnalysisResult;
}

export const AIScoreAnalysis = React.memo<AIScoreAnalysisProps>(({ result }) => {
  const humanPercentage = useMemo(() => 100 - result.overallScore, [result.overallScore]);

  const methods = result.detectionMethods;

  const methodItems = [
    { label: 'Entropy Analysis', score: methods.entropyAnalysis, icon: BarChart3 },
    { label: 'Vocabulary Diversity', score: methods.vocabularyDiversity, icon: BookOpen },
    { label: 'Sentence Structure', score: methods.sentenceStructure, icon: TextCursorInput },
    { label: 'Burstiness', score: methods.burstiness, icon: Activity },
    { label: 'Formulaic Phrases', score: methods.formulaicPhrases, icon: ScanSearch },
    { label: 'Readability Consistency', score: methods.readabilityConsistency, icon: Braces },
  ];

  return (
    <div className="bg-primary/5 dark:bg-primary/10 p-5 rounded-lg border mb-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Bot className="w-5 h-5 mr-2 text-primary" />
        <h4 className="font-medium text-lg">AI Text Verifier Analysis</h4>
      </div>

      <div className="space-y-5">
        {/* AI Content Probability */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Bot className="w-4 h-4 mr-1.5 text-destructive" />
              <span className="text-sm font-medium">AI Content Probability</span>
            </div>
            <span className="text-sm font-bold">{Math.round(result.overallScore)}%</span>
          </div>
          <Progress
            value={result.overallScore}
            className="h-3 rounded-full"
            indicatorClassName={`${result.overallScore > 0 ? 'bg-destructive' : 'bg-gray-200'} rounded-full`}
          />
        </div>

        {/* Human Content Probability */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1.5 text-success" />
              <span className="text-sm font-medium">Human Content Probability</span>
            </div>
            <span className="text-sm font-bold">{Math.round(humanPercentage)}%</span>
          </div>
          <Progress
            value={humanPercentage}
            className="h-3 rounded-full"
            indicatorClassName="bg-success rounded-full"
          />
        </div>

        {/* Detection Methods Breakdown */}
        <div className="pt-3 border-t">
          <h5 className="text-sm font-semibold mb-3 text-muted-foreground">Detection Methods Breakdown</h5>
          <div className="grid grid-cols-2 gap-3">
            {methodItems.map(({ label, score, icon: Icon }) => (
              <div key={label} className="bg-muted/30 dark:bg-muted/20 p-3 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${score > 70 ? 'bg-red-500' : score > 40 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-semibold w-8 text-right">{Math.round(score)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Word counts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 dark:bg-muted/20 p-4 rounded-lg text-center shadow-sm">
            <div className="text-lg font-semibold text-primary mb-1">
              {result.sentences.filter(s => !s.isHuman).length}
            </div>
            <div className="text-xs text-muted-foreground">AI-Flagged Sentences</div>
          </div>
          <div className="bg-muted/30 dark:bg-muted/20 p-4 rounded-lg text-center shadow-sm">
            <div className="text-lg font-semibold mb-1 text-foreground">
              {result.sentences.length}
            </div>
            <div className="text-xs text-muted-foreground">Total Sentences</div>
          </div>
        </div>
      </div>
    </div>
  );
});
