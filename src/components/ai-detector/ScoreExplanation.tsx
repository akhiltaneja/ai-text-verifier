
import React from 'react';
import { ChevronRight } from 'lucide-react';

export const ScoreExplanation: React.FC = () => {
  const scoreRanges = [
    {
      range: "90-100%",
      description: "Very likely AI-generated content",
      color: "bg-red-500",
      width: "w-full",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
      barBg: "bg-gray-100"
    },
    {
      range: "70-89%",
      description: "High probability of AI involvement",
      color: "bg-orange-500",
      width: "w-4/5",
      textColor: "text-orange-700",
      bgColor: "bg-orange-50",
      barBg: "bg-gray-100"
    },
    {
      range: "40-69%",
      description: "Mixed indicators, may contain AI-generated portions",
      color: "bg-yellow-500",
      width: "w-3/5",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-50",
      barBg: "bg-gray-100"
    },
    {
      range: "0-39%",
      description: "Likely human-written content",
      color: "bg-green-500",
      width: "w-2/5",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
      barBg: "bg-gray-100"
    }
  ];

  return (
    <div className="mt-10 p-6 bg-muted/30 rounded-lg border">
      <h3 className="text-lg font-medium mb-3">Understanding AI Detection Scores</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Our AI detection scores are calculated using a sophisticated algorithm that evaluates multiple aspects of the text. Here's how to interpret the results:
      </p>
      <div className="space-y-3">
        {scoreRanges.map((score, index) => (
          <div key={index} className={`p-3 rounded-md ${score.bgColor} border border-${score.color}/20`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-sm font-bold px-3 py-1 rounded-lg ${score.textColor} bg-${score.color}/10`}>{score.range}</span>
              <span className="text-sm text-muted-foreground">{score.description}</span>
            </div>
            <div className={`w-full h-3 ${score.barBg} rounded-full overflow-hidden`}>
              <div className={`h-full ${score.color} ${score.width} rounded-full`}></div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        Note: While our detector is highly accurate, it's important to review results in context. Some human-written content may share characteristics with AI-generated text.
      </p>
    </div>
  );
};
