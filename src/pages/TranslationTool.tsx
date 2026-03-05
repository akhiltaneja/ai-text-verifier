
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { TranslationToolComponent } from '@/components/translation/TranslationToolComponent';
import { TranslationInfoCards } from '@/components/translation/TranslationInfoCards';
import { CreditDisplay } from '@/components/CreditDisplay';
import { TranslationFAQ } from '@/components/translation/TranslationFAQ';
import { EnhancedPricingSection } from '@/components/index/EnhancedPricingSection';

const TranslationTool = () => {
  useEffect(() => {
    // Ensure page starts at the top when loaded
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">AI Translator Tool</h1>
          <p className="text-muted-foreground mb-6">
            Translate text between multiple languages with our advanced AI translation engine.
          </p>
          
          <div className="mb-6">
            <CreditDisplay tool="translation" />
          </div>
          
          <TranslationToolComponent />
        </div>

        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Translation Features</h2>
          <TranslationInfoCards />
        </div>

        <div className="mt-16 max-w-6xl mx-auto">
          <TranslationFAQ />
        </div>
        
        <div className="mt-16 max-w-6xl mx-auto">
          <EnhancedPricingSection />
        </div>
      </div>
    </Layout>
  );
};

export default TranslationTool;
