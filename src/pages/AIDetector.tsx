import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { TextEditor } from '@/components/TextEditor';
import { CreditDisplay } from '@/components/CreditDisplay';
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

          {/* Header Row - ultra compact */}
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">AI Content Detector</h1>
              <div className="hidden sm:flex h-5 w-px bg-slate-300"></div>
              <p className="hidden sm:block text-xs text-slate-500 font-medium">Clear, precise verification</p>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
              <CreditDisplay tool="ai-detector" />
            </div>
          </div>

          {error && (
            <div className="p-3 mb-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm font-medium">
              {error}
            </div>
          )}

          {/* SaaS Workspace Split-Pane Layout */}
          <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">

            {/* LEFT PANE: Text Editor */}
            <div className={`transition-all duration-500 ease-in-out h-auto lg:h-full flex flex-col ${result || isProcessing ? 'lg:w-[55%] xl:w-[60%]' : 'lg:w-full max-w-5xl mx-auto'}`}>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full min-h-[500px] lg:min-h-0 flex flex-col flex-1">
                <TextEditor
                  onTextSubmit={handleTextSubmit}
                  isProcessing={isProcessing}
                  tool="ai-detector"
                  placeholder="Paste your text here to analyze for AI-generated content..."
                  className="flex-grow rounded-2xl border-none shadow-none"
                />
              </div>
            </div>

            {/* RIGHT PANE: Loading State */}
            {isProcessing && (
              <div className="w-full lg:w-[45%] xl:w-[40%] flex justify-center items-center h-full min-h-[500px] lg:min-h-0 animate-fade-in bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  </div>
                  <span className="text-xl font-semibold text-slate-800">Analyzing Content</span>
                  <p className="text-sm text-slate-500 mt-2 text-center max-w-[250px]">
                    Running real-time heuristic checks for burstiness and entropy variance...
                  </p>
                </div>
              </div>
            )}

            {/* RIGHT PANE: Results Dashboard */}
            {result && !isProcessing && (
              <div ref={resultSectionRef} className="w-full h-auto lg:h-full lg:w-[45%] xl:w-[40%] animate-in slide-in-from-right-8 duration-500 overflow-y-auto custom-scrollbar pr-1 pb-4">
                <AnalysisResultDisplay
                  result={result}
                  downloadReport={downloadReport}
                  verdict={getVerdict(result.overallScore)}
                />
              </div>
            )}

          </div>

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
