
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Download, FileText, CheckCircle, AlertTriangle, Sparkles, Book, HelpCircle } from 'lucide-react';
import { GrammarResult as GrammarResultType } from '@/types/grammar-checker';
import { downloadGrammarReport } from '@/services/grammar-checker/report-generator';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

interface GrammarResultProps {
  result: GrammarResultType;
}

export const GrammarResultView: React.FC<GrammarResultProps> = ({ result }) => {
  const { toast } = useToast();

  const handleDownload = () => {
    downloadGrammarReport(result);
    toast({
      title: "Report Downloaded",
      description: "Your grammar check report has been downloaded."
    });
  };

  // Function to highlight errors in the original text
  const highlightErrors = (text: string, corrections: GrammarResultType['corrections']) => {
    if (!corrections.length) return <pre className="whitespace-pre-wrap font-sans">{text}</pre>;

    // Sort corrections by position in descending order to avoid index shifting
    const sortedCorrections = [...corrections].sort((a, b) =>
      b.position[0] - a.position[0]
    );

    // Create a sorted corrections array for ascending order processing
    const ascendingCorrections = [...corrections].sort((a, b) =>
      a.position[0] - b.position[0]
    );

    // Process each correction and wrap the error word in a span
    const fragments: React.ReactNode[] = [];
    let lastIndex = 0;

    for (let i = 0; i < ascendingCorrections.length; i++) {
      const correction = ascendingCorrections[i];
      const [start, end] = correction.position;

      if (start >= 0 && end <= text.length && start >= lastIndex) {
        // Add text before the error
        if (start > lastIndex) {
          fragments.push(
            <span key={`text-${i}-before`}>{text.substring(lastIndex, start)}</span>
          );
        }

        // Add the highlighted error
        fragments.push(
          <span
            key={`error-${i}`}
            className="text-destructive font-medium"
            title={correction.explanation}
          >
            {text.substring(start, end)}
          </span>
        );

        lastIndex = end;
      }
    }

    // Add remaining text after the last error
    if (lastIndex < text.length) {
      fragments.push(
        <span key="text-end">{text.substring(lastIndex)}</span>
      );
    }

    return <pre className="whitespace-pre-wrap font-sans">{fragments}</pre>;
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">

      {/* Sticky Header */}
      <div className="p-6 border-b border-slate-100 bg-white/50 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Grammar Result</h2>
          <p className="text-muted-foreground text-xs">{result.corrections.length} issues found</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleDownload} className="h-8 shadow-sm">
          <Download className="w-3.5 h-3.5 mr-1.5" />
          Export
        </Button>
      </div>

      <div className="p-6 flex-1 text-[15px] leading-relaxed text-slate-700 space-y-6">

        {/* Scores Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium">Writing Score</span>
              <span className="text-sm font-bold">{result.score}/100</span>
            </div>
            <Progress
              value={result.score}
              className="h-3"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium">Fluency Score</span>
              <span className="text-sm font-bold">{result.fluencyScore}/100</span>
            </div>
            <Progress
              value={result.fluencyScore}
              className={`h-3 ${result.fluencyScore > 70 ? 'bg-green-100' : 'bg-yellow-100'}`}
              indicatorClassName={result.fluencyScore > 70 ? 'bg-green-600' : 'bg-yellow-600'}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium">Clarity Score</span>
              <span className="text-sm font-bold">{result.clarityScore}/100</span>
            </div>
            <Progress
              value={result.clarityScore}
              className={`h-3 ${result.clarityScore > 70 ? 'bg-green-100' : 'bg-yellow-100'}`}
              indicatorClassName={result.clarityScore > 70 ? 'bg-green-600' : 'bg-yellow-600'}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium">Error Percentage</span>
              <span className="text-sm font-bold">{result.errorPercentage}%</span>
            </div>
            <Progress
              value={result.errorPercentage}
              className="h-3 bg-red-100"
              indicatorClassName="bg-red-600"
            />
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-100 text-sm">
          <div className="flex items-center mb-2 text-slate-900">
            <FileText className="w-4 h-4 mr-2 text-primary" />
            <h3 className="font-semibold">Analysis Summary</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">{result.summary}</p>
        </div>

        {/* Original Text with Highlights */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-slate-900">Original Text</h3>
          <div className="bg-slate-50 rounded-xl p-4 text-sm leading-relaxed border border-slate-100 overflow-x-auto">
            {highlightErrors(result.text, result.corrections)}
          </div>
        </div>

        {/* Suggestions List */}
        <SuggestionsList corrections={result.corrections} />

        {/* Corrected Text Output */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-slate-900">Suggested Text</h3>
          <div className="bg-emerald-50/50 text-emerald-900 rounded-xl p-4 text-sm leading-relaxed border border-emerald-100 overflow-x-auto">
            <pre className="whitespace-pre-wrap font-sans">{result.correctedText}</pre>
          </div>
        </div>

      </div>
    </div>
  );
};

interface CorrectionsListProps {
  corrections: GrammarResultType['corrections'];
}

const SuggestionsList: React.FC<CorrectionsListProps> = ({ corrections }) => {
  return (
    <div className="pt-2">
      <h3 className="text-sm font-semibold mb-3 text-slate-900 flex items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
        Suggestions ({corrections.length})
      </h3>
      <div className="space-y-3">
        {corrections.map((correction, index) => (
          <div key={index} className="bg-slate-50 border border-slate-100 rounded-xl p-4 transition-colors hover:bg-slate-100/50">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-sm text-slate-800">Suggestion {index + 1}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium tracking-wide uppercase ${correction.type === 'grammar'
                  ? 'bg-rose-100 text-rose-700'
                  : correction.type === 'spelling'
                    ? 'bg-amber-100 text-amber-700'
                    : correction.type === 'punctuation'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-200 text-slate-700'
                }`}>
                {correction.type}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3 text-[13px] bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm">
              <div className="line-through text-rose-500 font-medium truncate flex-1 text-right">{correction.original}</div>
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-slate-400 text-[10px]">→</span>
              </div>
              <div className="font-semibold text-emerald-600 truncate flex-1">{correction.corrected}</div>
            </div>

            <p className="text-[13px] text-slate-500 leading-relaxed bg-white/50 p-2 rounded text-center">{correction.explanation}</p>
          </div>
        ))}

        {corrections.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <CheckCircle className="h-10 w-10 text-emerald-500 mb-3" />
            <p className="text-base font-semibold text-emerald-900">No suggestions needed!</p>
            <p className="text-sm text-emerald-700/80 max-w-[250px]">Your text looks perfect and doesn't require any grammar fixes.</p>
          </div>
        )}
      </div>
    </div>
  );
};


