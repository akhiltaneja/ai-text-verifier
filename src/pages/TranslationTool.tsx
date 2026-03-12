
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { TranslationToolComponent } from '@/components/translation/TranslationToolComponent';
import { TranslationInfoCards } from '@/components/translation/TranslationInfoCards';
import { TranslationHowToUse } from '@/components/translation/TranslationHowToUse';
import { TranslationFAQ } from '@/components/translation/TranslationFAQ';
import { EnhancedPricingSection } from '@/components/index/EnhancedPricingSection';

const TranslationTool = () => {
  useEffect(() => {
    // Ensure page starts at the top when loaded
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="bg-slate-50 min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="w-full h-full mx-auto px-2 sm:px-4 lg:px-6 py-4 flex flex-col flex-1 max-w-[1800px]">
          <div className="text-center mb-6 mt-4">
            <h1 className="text-3xl font-bold mb-2">AI Translator Tool</h1>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Translate text between multiple languages with our advanced AI translation engine.
            </p>
          </div>

          <div className="flex-1 w-full flex items-center justify-center -mt-2">
            <TranslationToolComponent />
          </div>
        </div>

        {/* UNIFIED SEO CONTENT */}
        <div className="container mx-auto px-4 mt-16 space-y-16 pb-16 relative z-10">
          <TranslationInfoCards />
          <TranslationHowToUse />
          <TranslationFAQ />
          <EnhancedPricingSection />
        </div>
      </div>
    </Layout>
  );
};

export default TranslationTool;
