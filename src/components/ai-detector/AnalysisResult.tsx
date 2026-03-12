import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';
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

  const isDominantHuman = humanScore > result.overallScore;
  const displayScore = isDominantHuman ? humanScore : result.overallScore;
  const displayLabel = isDominantHuman ? 'Human' : 'AI';

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">

      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900">Analysis Results</h2>
        <Button variant="outline" size="sm" onClick={downloadReport} className="flex items-center gap-2 text-slate-600 border-slate-200">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </Button>
      </div>

      <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),inset_0_2px_10px_rgba(255,255,255,0.5)] mb-8 relative space-y-8 overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/40 blur-2xl rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-slate-200/20 blur-2xl rounded-full"></div>

        <div className="flex flex-col items-center justify-center relative z-10">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 shadow-sm rounded-full text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Powered by NexusCore AI
          </div>

          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-[2px] bg-slate-200 rounded-full" />
            <div className={`text-6xl font-black tracking-tight ${isHighAI ? 'text-rose-600' : isMixed ? 'text-amber-500' : 'text-emerald-500'}`}>
              {Math.round(displayScore)}<span className="text-4xl font-light text-slate-300 ml-1">%</span>
            </div>
            <div className="w-12 h-[2px] bg-slate-200 rounded-full" />
          </div>

          <div className="text-[17px] font-medium text-slate-700 flex items-center mt-2">
            {isHighAI && <><ShieldAlert className="w-5 h-5 mr-2 text-rose-500" /> Likely AI-Generated</>}
            {isMixed && <><AlertTriangle className="w-5 h-5 mr-2 text-amber-500" /> Mix of AI & Human</>}
            {isHuman && <><CheckCircle2 className="w-5 h-5 mr-2 text-emerald-500" /> Likely Human-Written</>}
          </div>
        </div>

        <div className="pt-2 relative z-10">
          {/* Detailed Progress Line (Quillbot-style) */}
          <div className="w-full h-3.5 flex overflow-hidden rounded-full mb-3 bg-white border border-slate-200 shadow-inner">
            <div style={{ width: `${result.overallScore}%` }} className="bg-amber-400 h-full transition-all duration-1000 ease-out border-r border-white/20" />
            <div style={{ width: `${humanScore}%` }} className="bg-blue-300 h-full transition-all duration-1000 ease-out" />
          </div>

          <div className="flex justify-between flex-col space-y-2 mt-4">
            <div className="flex items-center justify-between text-sm px-1">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <span className="text-slate-600 font-medium">AI-generated</span>
              </div>
              <span className="text-slate-700 font-bold">{Math.round(result.overallScore)}%</span>
            </div>

            <div className="flex items-center justify-between text-sm px-1">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-300"></div>
                <span className="text-slate-600 font-medium">Human-written</span>
              </div>
              <span className="text-slate-700 font-bold">{Math.round(humanScore)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Metrics */}
      <div className="space-y-4 flex-grow">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Heuristic Breakdown</h3>

        <Card className="p-4 border-slate-100 shadow-none bg-slate-50/50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-slate-700">Vocabulary Entropy</span>
            <span className="text-slate-500">{Math.round(result.detectionMethods.entropyAnalysis)}%</span>
          </div>
          <p className="text-xs text-slate-500">Measures the randomness of word choice. AI tends to be highly predictable.</p>
        </Card>

        <Card className="p-4 border-slate-100 shadow-none bg-slate-50/50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-slate-700">Burstiness (Variance)</span>
            <span className="text-slate-500">{Math.round(result.detectionMethods.burstiness)}%</span>
          </div>
          <p className="text-xs text-slate-500">Humans write in varied sentence lengths. AI is more uniform.</p>
        </Card>

        <Card className="p-4 border-slate-100 shadow-none bg-slate-50/50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-slate-700">Predictability Score</span>
            <span className="text-slate-500">{Math.round(result.detectionMethods.formulaicPhrases)}%</span>
          </div>
          <p className="text-xs text-slate-500">How "surprised" an AI model is by the text. High predictability strongly implies AI generation.</p>
        </Card>

        <Card className="p-4 border-slate-100 shadow-none bg-indigo-50/30">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-indigo-900">Robotic Tone Index</span>
            <span className="text-indigo-600 font-semibold">{Math.round((result.overallScore * 0.7) + (result.detectionMethods.formulaicPhrases * 0.3))}%</span>
          </div>
          <p className="text-xs text-indigo-500/80">How stiff or emotionless the text reads. A lower score signifies natural human expression and rhythm.</p>
        </Card>

        <Card className="p-4 border-slate-100 shadow-none bg-emerald-50/30">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-emerald-900">Creative Chaos</span>
            <span className="text-emerald-600 font-semibold">{Math.round((humanScore * 0.85) + (result.detectionMethods.burstiness * 0.15))}%</span>
          </div>
          <p className="text-xs text-emerald-500/80">Measures the frequency of unconventional logic, dynamic pacing, and rule-breaking grammatical structures.</p>
        </Card>

        <Card className="p-4 border-slate-100 shadow-none bg-rose-50/30">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-rose-900">Human Idiosyncrasy</span>
            <span className="text-rose-600 font-semibold">{Math.round((humanScore * 0.7) + (result.detectionMethods.vocabularyDiversity * 0.3))}%</span>
          </div>
          <p className="text-xs text-rose-500/80">Detects use of slang, passionate phrasing, idioms, pop-culture references, and specialized domain knowledge perfectly.</p>
        </Card>
      </div>

    </div>
  );
};
