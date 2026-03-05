
import React from 'react';
import { AnalysisResult } from '@/types/ai-detector';
import { cn } from '@/lib/utils';

interface SentenceAnalysisProps {
  result: AnalysisResult;
}

export const SentenceAnalysis: React.FC<SentenceAnalysisProps> = ({ result }) => {
  // Group sentences by confidence level
  const highAIProbability = result.sentences.filter(s => s.aiProbability > 70);
  const highHumanProbability = result.sentences.filter(s => s.aiProbability < 30);
  const uncertainProbability = result.sentences.filter(s => s.aiProbability >= 30 && s.aiProbability <= 70);

  return (
    <div className="p-6">
      <h3 className="font-medium mb-4">Sentence-by-Sentence Analysis</h3>
      
      {highAIProbability.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold mb-3 text-destructive">
            Likely AI-Generated ({highAIProbability.length} {highAIProbability.length === 1 ? 'sentence' : 'sentences'})
          </h4>
          <div className="space-y-4">
            {highAIProbability.map((sentence, index) => (
              <SentenceItem 
                key={`ai-${index}`} 
                sentence={sentence} 
                index={result.sentences.indexOf(sentence)}
              />
            ))}
          </div>
        </div>
      )}
      
      {uncertainProbability.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold mb-3 text-warning">
            Uncertain Origin ({uncertainProbability.length} {uncertainProbability.length === 1 ? 'sentence' : 'sentences'})
          </h4>
          <div className="space-y-4">
            {uncertainProbability.map((sentence, index) => (
              <SentenceItem 
                key={`uncertain-${index}`} 
                sentence={sentence} 
                index={result.sentences.indexOf(sentence)}
              />
            ))}
          </div>
        </div>
      )}
      
      {highHumanProbability.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold mb-3 text-success">
            Likely Human-Written ({highHumanProbability.length} {highHumanProbability.length === 1 ? 'sentence' : 'sentences'})
          </h4>
          <div className="space-y-4">
            {highHumanProbability.map((sentence, index) => (
              <SentenceItem 
                key={`human-${index}`} 
                sentence={sentence} 
                index={result.sentences.indexOf(sentence)}
              />
            ))}
          </div>
        </div>
      )}
      
      {result.sentences.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          No sentences to analyze.
        </div>
      )}
    </div>
  );
};

interface SentenceItemProps {
  sentence: {
    text: string;
    aiProbability: number;
    isHuman: boolean;
  };
  index: number;
}

const SentenceItem: React.FC<SentenceItemProps> = ({ sentence, index }) => {
  // Determine highlight class based on AI probability
  const highlightClass = sentence.aiProbability > 70 
    ? 'result-highlight-ai' 
    : sentence.aiProbability < 30 
      ? 'result-highlight-human' 
      : 'bg-warning/10 text-warning border-b border-dashed border-warning/40';
  
  return (
    <div className="text-sm">
      <div className="flex justify-between mb-1">
        <span className="font-medium">Sentence {index + 1}</span>
        <span className={cn(
          sentence.aiProbability > 70 ? "text-destructive" : 
          sentence.aiProbability < 30 ? "text-success" : 
          "text-warning"
        )}>
          {Math.round(sentence.aiProbability)}% AI Probability
        </span>
      </div>
      <p className={`p-3 rounded ${highlightClass}`}>
        {sentence.text}
      </p>
    </div>
  );
};
