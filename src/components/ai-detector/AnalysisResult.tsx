import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
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
  const isHighAI = result.overallScore > 60;
  const isMixed = result.overallScore >= 30 && result.overallScore <= 60;
  const isHuman = result.overallScore < 30;

  const humanScore = 100 - result.overallScore;

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">

      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900">Analysis Results</h2>
        <Button variant="outline" size="sm" onClick={downloadReport} className="flex items-center gap-2 text-slate-600 border-slate-200">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <div className={`text-6xl font-extrabold tracking-tight mb-2 ${isHighAI ? 'text-rose-600' : isMixed ? 'text-amber-500' : 'text-emerald-500'}`}>
          {Math.round(result.overallScore)}%
        </div>
        <div className="text-lg font-medium text-slate-600 flex items-center">
          {isHighAI && <ShieldAlert className="w-5 h-5 mr-2 text-rose-500" />}
          {isMixed && <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />}
          {isHuman && <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-500" />}
          Likely AI-Generated
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full h-3 flex overflow-hidden rounded-full mb-3 bg-slate-100">
        <div style={{ width: `${result.overallScore}%` }} className="bg-rose-500 h-full transition-all duration-1000 ease-out" />
        <div style={{ width: `${humanScore}%` }} className="bg-emerald-400 h-full transition-all duration-1000 ease-out" />
      </div>

      <div className="flex justify-between text-sm font-medium text-slate-500 mb-10 px-1">
        <span>{Math.round(result.overallScore)}% AI</span>
        <span>{Math.round(humanScore)}% Human</span>
      </div>

      {/* Breakdown Metrics */}
      <div className="space-y-4 flex-grow">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Heuristic Breakdown</h3>

        <Card className="p-4 border-slate-100 shadow-none bg-slate-50/50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-slate-700">Vocabulary Entropy</span>
            <span className="text-slate-500">{Math.round(result.detectionMethods.entropyAnalysis * 100)}%</span>
          </div>
          <p className="text-xs text-slate-500">Measures the randomness of word choice. AI tends to be highly predictable.</p>
        </Card>

        <Card className="p-4 border-slate-100 shadow-none bg-slate-50/50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-slate-700">Burstiness (Variance)</span>
            <span className="text-slate-500">{Math.round((result.detectionMethods.burstiness) * 100)}%</span>
          </div>
          <p className="text-xs text-slate-500">Humans write in varied sentence lengths. AI is more uniform.</p>
        </Card>

        <Card className="p-4 border-slate-100 shadow-none bg-slate-50/50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-slate-700">Predictability Score</span>
            <span className="text-slate-500">{Math.round(result.detectionMethods.formulaicPhrases * 100)}%</span>
          </div>
          <p className="text-xs text-slate-500">How "surprised" an AI model is by the text. High predictability strongly implies AI generation.</p>
        </Card>
      </div>

    </div>
  );
};
