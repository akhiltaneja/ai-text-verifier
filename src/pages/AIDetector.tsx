import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { TextEditor } from '@/components/TextEditor';
import { CreditDisplay } from '@/components/CreditDisplay';
import { Loader2, Crown } from 'lucide-react';
import { AnalysisResultDisplay } from '@/components/ai-detector/AnalysisResult';
import { FeatureCards } from '@/components/ai-detector/FeatureCards';
import { ScoreExplanation } from '@/components/ai-detector/ScoreExplanation';
import { analyzeText, getVerdict, generateReportPDF } from '@/services/ai-detector-service';
import { AnalysisResult } from '@/types/ai-detector';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { useCredits } from '@/context/CreditContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HowToUseSection } from '@/components/ai-detector/HowToUseSection';
import { AIDetectorFAQ } from '@/components/ai-detector/AIDetectorFAQ';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { AdvancedFeatures } from '@/components/ai-detector/AdvancedFeatures';
import { EnhancedPricingSection } from '@/components/index/EnhancedPricingSection';

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
  
  // Add effect to scroll to results when they become available
  useEffect(() => {
    if (result && !isProcessing && resultSectionRef.current) {
      // Smooth scroll to the results section
      resultSectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }, [result, isProcessing]);

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
      <div className="relative min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-white to-blue-50/30 opacity-80"></div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/90">AI Content Detector</h1>
            <p className="text-muted-foreground mb-6">
              Analyze your text to determine if it was written by AI models like ChatGPT, Gemini, or Claude.
            </p>
            
            <div className="mb-6">
              <CreditDisplay tool="ai-detector" />
            </div>

            {error && (
              <div className="p-4 mb-6 bg-destructive/10 border border-destructive rounded-md text-destructive">
                {error}
              </div>
            )}

            <TextEditor 
              onTextSubmit={handleTextSubmit} 
              isProcessing={isProcessing} 
              tool="ai-detector" 
              placeholder="Paste your text here to analyze for AI-generated content..."
            />
          </div>

          {isProcessing && (
            <div className="flex justify-center items-center py-12 animate-fade-in">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <span className="ml-3 text-lg">Analyzing content...</span>
            </div>
          )}

          {result && !isProcessing && (
            <div ref={resultSectionRef}>
              <AnalysisResultDisplay 
                result={result} 
                downloadReport={downloadReport} 
                verdict={getVerdict(result.overallScore)}
              />
            </div>
          )}
        </div>

        <AdvancedFeatures />

        <div className="max-w-4xl mx-auto mt-16 mb-12 animate-fade-in px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/90">How Our AI Content Detector Works</h2>
          <FeatureCards />
        </div>
        
        <div className="bg-gradient-to-b from-white to-purple-50/30 py-16 relative z-10">
          <div className="container mx-auto px-4">
            <HowToUseSection />
          </div>
        </div>
        
        <div className="mt-4 max-w-3xl mx-auto px-4 relative z-10">
          <ScoreExplanation />
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <AIDetectorFAQ />
        </div>

        <EnhancedPricingSection />

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
