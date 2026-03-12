import React, { useEffect, lazy, Suspense } from 'react';
import { Layout } from '@/components/Layout';

// Simple loading component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-16">
    <div className="h-8 w-8 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
  </div>
);

// Landing Page Components
import { Hero } from '@/components/ui/animated-hero';
const ModelArchitecture = lazy(() => import('@/components/index/ModelArchitecture').then(module => ({ default: module.ModelArchitecture })));
const DetectionMethodology = lazy(() => import('@/components/index/DetectionMethodology').then(module => ({ default: module.DetectionMethodology })));
const AIDetectionDemo = lazy(() => import('@/components/index/AIDetectionDemo').then(module => ({ default: module.AIDetectionDemo })));
const ToolsSection = lazy(() => import('@/components/index/ToolsSection').then(module => ({ default: module.ToolsSection })));
const StatsBanner = lazy(() => import('@/components/index/StatsBanner').then(module => ({ default: module.StatsBanner })));
const EnhancedPricingSection = lazy(() => import('@/components/index/EnhancedPricingSection').then(module => ({ default: module.EnhancedPricingSection })));
const TestimonialsSection = lazy(() => import('@/components/index/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
import { FAQSection } from '@/components/index/FAQSection';
import { AdvertisementBanner } from '@/components/index/AdvertisementBanner';

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
      <div className="space-y-0 relative w-full bg-white flex flex-col min-h-screen font-sans">

        {/* 1. Hero banner */}
        <section className="relative overflow-hidden">
          <Hero />
        </section>

        {/* 2. How the process works visually */}
        <Suspense fallback={<SectionLoader />}>
          <ModelArchitecture />
        </Suspense>

        {/* 3. Technical explanation of AI detection to build authority */}
        <Suspense fallback={<SectionLoader />}>
          <DetectionMethodology />
        </Suspense>

        {/* 4. Live demo of the core feature (AI detection) */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-2 md:p-8">
              <Suspense fallback={<SectionLoader />}>
                <AIDetectionDemo />
              </Suspense>
            </div>
          </div>
        </section>

        {/* 5. Bento grid of available tools */}
        <Suspense fallback={<SectionLoader />}>
          <ToolsSection />
        </Suspense>

        {/* 6. Social proof statistics */}
        <Suspense fallback={<SectionLoader />}>
          <StatsBanner />
        </Suspense>

        {/* 7. Value-driven pricing section */}
        <Suspense fallback={<SectionLoader />}>
          <EnhancedPricingSection />
        </Suspense>

        {/* 8. Special Offer Banner */}
        <AdvertisementBanner />

        {/* 9. User reviews */}
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>

        {/* 10. FAQs */}
        <section className="py-16">
          <FAQSection />
        </section>

      </div>
    </Layout>
  );
};

export default Index;
