
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { SummaryInfoCards } from '@/components/ai-summary/SummaryInfoCards';
import { HowToUseSection } from '@/components/ai-summary/HowToUseSection';
import { SummaryFAQ } from '@/components/ai-summary/SummaryFAQ';
import { EnhancedPricingSection } from '@/components/index/EnhancedPricingSection';
import { SummarizationToolComponent } from '@/components/ai-summary/SummarizationToolComponent';
import { CreditDisplay } from '@/components/CreditDisplay';

const AISummaryTool = () => {
  // Ensure page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/30 opacity-80"></div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">AI Summary Tool</h1>
            <p className="text-muted-foreground mb-6">
              Summarize long articles, documents, and text into concise summaries with our AI-powered tool.
            </p>

            <div className="mb-6">
              <CreditDisplay tool="ai-summary" />
            </div>

            <SummarizationToolComponent />
          </div>
        </div>

        <div className="relative z-10 mt-16">
          <SummaryInfoCards />
        </div>

        <div className="relative z-10 mt-16">
          <HowToUseSection />
        </div>

        <div className="relative z-10 mt-16">
          <SummaryFAQ />
        </div>

        <div className="relative z-10 mt-16">
          <EnhancedPricingSection />
        </div>
      </div>
    </Layout>
  );
};

export default AISummaryTool;
