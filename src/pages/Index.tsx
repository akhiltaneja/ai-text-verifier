
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/ui/animated-hero';
import { lazy, Suspense } from 'react';
import { FAQSection } from '@/components/index/FAQSection';
import { AdvertisementBanner } from '@/components/index/AdvertisementBanner';

// Lazy load components that are further down the page
const StatisticsSection = lazy(() => import('@/components/index/StatisticsSection').then(module => ({ default: module.StatisticsSection })));
const TestimonialsSection = lazy(() => import('@/components/index/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const ToolsSection = lazy(() => import('@/components/index/ToolsSection').then(module => ({ default: module.ToolsSection })));
const EnhancedPricingSection = lazy(() => import('@/components/index/EnhancedPricingSection').then(module => ({ default: module.EnhancedPricingSection })));
const AIDetectionDemo = lazy(() => import('@/components/index/AIDetectionDemo').then(module => ({ default: module.AIDetectionDemo })));

// Simple loading component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-16">
    <div className="h-8 w-8 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
  </div>
);

const Index = () => {
  // Ensure page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set document title and meta tags
    document.title = "AI Content Tools - AI Detector, Grammar Checker & Translation";
    
    // Create or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Professional tools for content analysis: AI detection, grammar checking, summarization and translation services for writers, educators and businesses.');
    
    // Create or update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'AI detector, Grammar checker, AI content tools, text summarizer, translation tool');
  }, []);
  
  return (
    <Layout>
      <div className="space-y-0 relative w-full bg-white">
        {/* Hero Section - removed extra padding */}
        <section className="relative overflow-hidden">
          <Hero />
        </section>
        
        {/* Tools Section as second section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <ToolsSection />
            </Suspense>
          </div>
        </section>
        
        {/* AI Detection Demo */}
        <section className="py-16 relative">
          <Suspense fallback={<SectionLoader />}>
            <AIDetectionDemo />
          </Suspense>
        </section>
        
        {/* Statistics */}
        <section className="relative bg-gradient-to-b from-white to-primary/5">
          <div className="relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <StatisticsSection />
            </Suspense>
          </div>
        </section>
        
        {/* Pricing */}
        <section className="py-16">
          <Suspense fallback={<SectionLoader />}>
            <EnhancedPricingSection />
          </Suspense>
        </section>
        
        {/* Testimonials */}
        <section className="bg-gradient-to-b from-white to-primary/5 py-16 relative">
          <div className="container mx-auto px-4 relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <TestimonialsSection />
            </Suspense>
          </div>
        </section>
        
        {/* Advertisement Banner - Added above FAQ section */}
        <section className="py-12 bg-white">
          <AdvertisementBanner />
        </section>
        
        {/* FAQ - Now directly imported instead of lazy loaded */}
        <section className="py-16">
          <FAQSection />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
