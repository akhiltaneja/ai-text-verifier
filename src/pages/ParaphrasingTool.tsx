
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TextEditor } from '@/components/TextEditor';
import { Loader2 } from 'lucide-react';
import { CreditDisplay } from '@/components/CreditDisplay';
import { useToast } from '@/hooks/use-toast';
import { ParaphrasingResult } from '@/types/paraphrasing';
import { processParaphrasing } from '@/services/paraphrasing-service';
import { ParaphrasingResultView } from '@/components/paraphrasing/ParaphrasingResult';
import { ParaphrasingInfoCards } from '@/components/paraphrasing/ParaphrasingInfoCards';

const ParaphrasingTool = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ParaphrasingResult | null>(null);
  const { toast } = useToast();

  const handleTextSubmit = async (text: string) => {
    if (text.trim().length < 10) {
      toast({
        title: "Text too short",
        description: "Please enter at least 10 characters to paraphrase.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Process the text using our paraphrasing service
      const paraphrasingResult = processParaphrasing(text);
      
      // Set the result
      setResult(paraphrasingResult);
      
      toast({
        title: "Paraphrasing Complete",
        description: "Your text has been successfully paraphrased.",
      });
    } catch (error) {
      console.error("Paraphrasing error:", error);
      toast({
        title: "Paraphrasing Failed",
        description: "There was an error paraphrasing your text. Please try again.",
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
          <h1 className="text-3xl font-bold mb-2">Paraphrasing Tool</h1>
          <p className="text-muted-foreground mb-6">
            Transform your text into a clear, concise, and readable format. Free to use with 2000 daily credits.
          </p>

          <div className="mb-6">
            <CreditDisplay tool="paraphrasing" />
          </div>

          <TextEditor 
            onTextSubmit={handleTextSubmit}
            isProcessing={isProcessing}
            tool="paraphrasing"
            placeholder="Paste your text here to paraphrase and summarize..."
          />
        </div>

        {isProcessing && (
          <div className="flex justify-center items-center py-12 animate-fade-in">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <span className="ml-3 text-lg">Paraphrasing content...</span>
          </div>
        )}

        {result && !isProcessing && (
          <ParaphrasingResultView result={result} />
        )}

        <ParaphrasingInfoCards />
      </div>
    </Layout>
  );
};

export default ParaphrasingTool;
