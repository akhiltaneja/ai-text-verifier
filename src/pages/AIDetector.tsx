import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { TextEditor } from '@/components/TextEditor';
import { Loader2, ArrowLeft } from 'lucide-react';
import { AnalysisResultDisplay } from '@/components/ai-detector/AnalysisResult';
import { TextHighlighter } from '@/components/ai-detector/components/TextHighlighter';
import { analyzeText, getVerdict, generateReportPDF } from '@/services/ai-detector-service';
import { AnalysisResult } from '@/types/ai-detector';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { useCredits } from '@/context/CreditContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { DetectorInfoCards } from '@/components/ai-detector/DetectorInfoCards';
import { DetectorHowToUse } from '@/components/ai-detector/DetectorHowToUse';
import { DetectorFAQ } from '@/components/ai-detector/DetectorFAQ';
import { EnhancedPricingSection } from '@/components/index/EnhancedPricingSection';
import { supabase } from '@/integrations/supabase/client';

const AIDetector = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const { toast: uiToast } = useToast();
  const { availableCredits, isLoggedIn } = useCredits();
  const resultSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      console.log("AIDetector page loaded");
      setIsPageLoaded(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Error initializing AIDetector page:", err);
      setError("Failed to initialize the AI Detector. Please refresh the page.");
    }
  }, []);

  const handleTextSubmit = async (text: string) => {
    if (!text || text.trim().length < 10) {
      toast.error("Text too short for analysis");
      return;
    }

    const wordCount = text.trim().split(/\s+/).length;

    if (availableCredits['ai-detector'] < wordCount) {
      if (!isLoggedIn) {
        setShowSignUpDialog(true);
        setTimeout(() => {
          setShowSignUpDialog(false);
        }, 4000);
      } else {
        setShowUpgradeDialog(true);
        setTimeout(() => {
          setShowUpgradeDialog(false);
        }, 4000);
      }
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      console.log("Submitting text for analysis:", text.substring(0, 50) + "...");

      const analysisResult = await analyzeText(text);
      console.log("Analysis complete:", analysisResult);

      setResult(analysisResult);
      setIsProcessing(false);

      // Async history logging (non-blocking)
      if (isLoggedIn) {
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (user) {
            // Log raw usage metric
            supabase.from('usage_logs').insert({
              user_id: user.id,
              tool_name: 'ai-detector',
              word_count: wordCount
            }).then(({ error }) => { if (error) console.error("Usage log error:", error); });

            // Log full text analysis history for 30-day retention
            supabase.from('analysis_history').insert({
              user_id: user.id,
              tool_name: 'ai-detector',
              analyzed_text: text,
              word_count: wordCount,
              result_summary: analysisResult as any
            }).then(({ error }) => { if (error) console.error("History log error:", error); });
          }
        });
      }

      uiToast({
        title: "Analysis Complete",
        description: "Your text has been analyzed successfully.",
      });
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Failed to analyze text. Please try again later.");
      setIsProcessing(false);

      uiToast({
        title: "Analysis Failed",
        description: "There was a problem analyzing your text. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadReport = () => {
    if (!result) return;

    generateReportPDF(result);

    uiToast({
      title: "Report Downloaded",
      description: "Your analysis report has been downloaded as PDF.",
    });
  };

  const resetDetector = () => {
    setResult(null);
    setError(null);
  };

  if (!isPageLoaded && error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-slate-50 min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="w-full h-full mx-auto px-2 sm:px-4 lg:px-6 py-4 flex flex-col flex-1 max-w-[1800px]">

          {/* Minimalist Top Header */}
          <div className="mb-3 mt-2 lg:mt-4">
            <h1 className="text-xl md:text-2xl font-semibold text-slate-800 px-2 lg:px-4">AI Content Detector</h1>
          </div>

          {/* The Single Massive Quillbot-Style Card Container */}
          <div className="max-w-[1500px] w-full mx-auto flex-1 bg-white rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-200 flex flex-col lg:flex-row overflow-hidden min-h-[550px]">

            {/* LEFT PANE: Editor Area */}
            <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 relative z-10">
              <TextEditor
                onTextSubmit={handleTextSubmit}
                isProcessing={isProcessing}
                tool="ai-detector"
                placeholder="To analyze text, add at least 40 words."
                className="flex-grow h-full border-none shadow-none bg-transparent"
              />
            </div>

            {/* RIGHT PANE: Results Area */}
            <div className="w-full lg:w-[400px] xl:w-[480px] bg-slate-50 border-t-2 lg:border-t-0 lg:border-l-2 border-slate-200 flex flex-col h-auto lg:h-full overflow-y-auto custom-scrollbar relative z-0">
              {/* Empty State / Loading State / Results State */}

              {!result && !isProcessing && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in relative overflow-hidden">
                  {/* Decorative background blurs mimicking Quillbot's aesthetic */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/50 rounded-full blur-3xl -mr-32 -mt-32"></div>

                  <div className="relative z-10 w-full max-w-[280px]">
                    <div className="flex items-center justify-center gap-4 mb-8">
                      <div className="w-12 h-[3px] bg-slate-200 rounded-full"></div>
                      <span className="text-4xl font-light text-slate-400">%</span>
                      <div className="w-12 h-[3px] bg-slate-200 rounded-full"></div>
                    </div>

                    <h3 className="text-[17px] text-slate-700 font-medium mb-12">Add text to begin analysis</h3>

                    {/* Mock empty result bars */}
                    <div className="space-y-5 text-left bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-100/50">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                          <span className="text-slate-600 font-medium">AI-generated</span>
                        </div>
                        <span className="text-slate-400 font-medium">--%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-300"></div>
                          <span className="text-slate-600 font-medium">Human & AI-refined</span>
                        </div>
                        <span className="text-slate-400 font-medium">--%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-slate-300"></div>
                          <span className="text-slate-600 font-medium">Human-written</span>
                        </div>
                        <span className="text-slate-400 font-medium">--%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isProcessing && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in relative">
                  <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150" />
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 inline-block">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                      </div>
                    </div>
                    <span className="block text-xl font-bold text-slate-800 mb-2">Analyzing Content</span>
                    <p className="text-sm text-slate-500 max-w-[250px] mx-auto">
                      Scanning for patterns, burstiness, and vocabulary entropy...
                    </p>
                  </div>
                </div>
              )}

              {result && !isProcessing && (
                <div ref={resultSectionRef} className="h-full animate-in fade-in duration-500">
                  <AnalysisResultDisplay
                    result={result}
                    downloadReport={downloadReport}
                    verdict={getVerdict(result.overallScore)}
                  />
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Full Hero Heading on Scroll */}
        <div className="container mx-auto px-4 mt-12 mb-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            AI Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Detector</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Check if your text was written by a human or generated by advanced AI models like ChatGPT, Claude, and Gemini down to the sentence level.
          </p>
        </div>

        {/* UNIFIED SEO CONTENT */}
        <div className="container mx-auto px-4 space-y-16 pb-16 relative z-10">
          <DetectorInfoCards />
          <DetectorHowToUse />
          <DetectorFAQ />
          <EnhancedPricingSection />
        </div>

        {/* Upgrade Modals */}
        <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Not Enough Credits</DialogTitle>
              <DialogDescription>
                You've run out of credits for AI detection. Upgrade to continue analyzing text.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
                Cancel
              </Button>
              <Link to="/pricing">
                <InteractiveHoverButton text="Upgrade Now" />
              </Link>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showSignUpDialog} onOpenChange={setShowSignUpDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Get More Credits</DialogTitle>
              <DialogDescription>
                You've used all your free credits. <Link to="/login" className="text-primary hover:underline">Sign up</Link> to get 250 additional credits per day!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={() => setShowSignUpDialog(false)}>
                Cancel
              </Button>
              <Link to="/login">
                <InteractiveHoverButton text="Sign Up" />
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AIDetector;
