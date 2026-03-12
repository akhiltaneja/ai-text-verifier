import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TextEditor } from '@/components/TextEditor';
import { Loader2, AlertCircle, SpellCheck2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GrammarResult } from '@/types/grammar-checker';
import { checkGrammar } from '@/services/grammar-checker-service';
import { GrammarResultView } from '@/components/grammar-checker/GrammarResult';
import { GrammarInfoCards } from '@/components/grammar-checker/GrammarInfoCards';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { GrammarHowToUse } from '@/components/grammar-checker/GrammarHowToUse';
import { GrammarMetricsExplainer } from '@/components/grammar-checker/GrammarMetricsExplainer';
import { GrammarFAQ } from '@/components/grammar-checker/GrammarFAQ';
import { EnhancedPricingSection } from '@/components/index/EnhancedPricingSection';

const GrammarChecker = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<GrammarResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTextSubmit = async (text: string) => {
    if (text.trim().length < 10) {
      toast({
        title: "Text too short",
        description: "Please enter at least 10 characters for grammar analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const grammarResult = await checkGrammar(text);
      setResult(grammarResult);

      toast({
        title: "Grammar Check Complete",
        description: `Found ${grammarResult.corrections.length} potential improvements to suggest.`,
      });
    } catch (err) {
      console.error("Grammar check error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";

      setError(errorMessage);

      toast({
        title: "Grammar Check Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="w-full h-full mx-auto px-2 sm:px-4 lg:px-6 py-4 flex flex-col flex-1 max-w-[1800px]">

          <div className="text-center mb-6 mt-4">
            <h1 className="text-3xl font-bold mb-2">Grammar & Style Checker</h1>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Identify grammatical issues and get suggestions to improve the quality of your writing.
            </p>
          </div>

          <div className="flex-1 w-full flex items-center justify-center -mt-2">
            <div className="w-full max-w-[1500px] mx-auto bg-white rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-200 flex flex-col lg:flex-row overflow-hidden min-h-[700px]">

              {/* LEFT PANE: Editor Area */}
              <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 relative z-10 bg-white">
                <TextEditor
                  onTextSubmit={handleTextSubmit}
                  isProcessing={isProcessing}
                  tool="grammar-checker"
                  placeholder="Paste your text here to check for grammar, spelling, and punctuation..."
                  submitButtonText="Check Grammar"
                  className="flex-grow h-full border-none shadow-none bg-transparent"
                />
              </div>

              {/* RIGHT PANE: Results Area */}
              <div className="w-full lg:w-[400px] xl:w-[480px] bg-[#fdfdfd] border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col h-auto lg:h-full overflow-y-auto custom-scrollbar relative z-0">

                {/* EMPTY STATE */}
                {!result && !isProcessing && !error && (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/50 rounded-full blur-3xl -mr-32 -mt-32"></div>

                    <div className="relative z-10 w-full max-w-[280px]">
                      <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-12 h-[3px] bg-slate-200 rounded-full"></div>
                        <SpellCheck2 className="w-8 h-8 text-slate-300 stroke-[1.5]" />
                        <div className="w-12 h-[3px] bg-slate-200 rounded-full"></div>
                      </div>

                      <h3 className="text-[17px] text-slate-700 font-medium mb-3">Add text to see suggestions</h3>
                      <p className="text-sm text-slate-500 mb-10">Paste your content to check for spelling and grammar errors automatically.</p>

                      <div className="space-y-4 text-left bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-100/50">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                          </div>
                          <span className="text-slate-600">Corrects spelling & grammar</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-violet-400"></div>
                          </div>
                          <span className="text-slate-600">Enhances sentence clarity</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PROCESSING STATE */}
                {isProcessing && (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in relative">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150" />
                    <div className="relative z-10">
                      <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 inline-block">
                          <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
                        </div>
                      </div>
                      <span className="block text-xl font-bold text-slate-800 mb-2">Analyzing Syntax</span>
                      <p className="text-sm text-slate-500 max-w-[250px] mx-auto">
                        Evaluating grammar, spelling, and sentence structures...
                      </p>
                    </div>
                  </div>
                )}

                {/* ERROR STATE */}
                {error && !isProcessing && (
                  <div className="flex-1 flex flex-col items-center justify-center p-8">
                    <Alert variant="error" className="w-full">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Grammar Check Failed</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </div>
                )}

                {/* RESULT STATE */}
                {result && !isProcessing && !error && (
                  <div className="h-full flex flex-col animate-in fade-in duration-500 bg-white/50">
                    <GrammarResultView result={result} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Existing explanation blocks pushed below the tool */}
        {/* UNIFIED SEO CONTENT */}
        <div className="container mx-auto px-4 mt-16 space-y-16 pb-16 relative z-10">
          {!result && !isProcessing && (
            <GrammarMetricsExplainer />
          )}

          <GrammarInfoCards />
          <GrammarHowToUse />
          <GrammarFAQ />
          <EnhancedPricingSection />
        </div>
      </div>
    </Layout>
  );
};

export default GrammarChecker;
