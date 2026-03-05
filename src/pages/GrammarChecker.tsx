import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TextEditor } from '@/components/TextEditor';
import { CreditDisplay } from '@/components/CreditDisplay';
import { Loader2, AlertCircle } from 'lucide-react';
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-2">Grammar & Style Checker</h1>
          <p className="text-muted-foreground mb-6">
            Identify grammatical issues and get suggestions to improve the quality of your writing.
          </p>
          
          <div className="mb-6">
            <CreditDisplay tool="grammar-checker" />
          </div>

          <div className="mb-6">
            <TextEditor 
              onTextSubmit={handleTextSubmit} 
              isProcessing={isProcessing} 
              tool="grammar-checker" 
              placeholder="Paste your text here to check for grammar, spelling, and punctuation..."
            />
          </div>
        </div>

        {!result && !isProcessing && (
          <GrammarMetricsExplainer />
        )}

        {isProcessing && (
          <div className="flex justify-center items-center py-12 animate-fade-in">
            <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
            <span className="ml-3 text-lg">Checking grammar...</span>
          </div>
        )}

        {error && !isProcessing && (
          <div className="max-w-3xl mx-auto mt-8">
            <Alert variant="error">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Grammar Check Failed</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {result && !isProcessing && !error && (
          <GrammarResultView result={result} />
        )}

        {!result && !isProcessing && !error && (
          <>
            <GrammarFAQ />
            <GrammarHowToUse />
            <GrammarInfoCards />
            <EnhancedPricingSection />
          </>
        )}
      </div>
    </Layout>
  );
};

export default GrammarChecker;
