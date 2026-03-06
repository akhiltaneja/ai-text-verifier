
import React from 'react';
import { PricingSection } from "@/components/ui/pricing-section";

export const PAYMENT_FREQUENCIES = ["monthly", "yearly"]

export const PRICING_TIERS = [
  {
    id: "free",
    name: "Free",
    price: {
      monthly: "Free",
      yearly: "Free",
    },
    description: "Perfect for casual users",
    features: [
      "AI Detector (500 words daily)",
      "Grammar Checker (500 words daily)",
      "Paraphrase (500 words daily)",
      "Generate Content Summaries",
      "Basic Translation Support"
    ],
    cta: "Get Started",
  },
  {
    id: "premium",
    name: "Premium",
    price: {
      monthly: 4,
      yearly: 29, // Adjusted price
    },
    originalPrice: {
      yearly: 48 // Original yearly price (4 * 12)
    },
    description: "For content professionals",
    features: [
      "AI Detector (5,000 words/month)",
      "Grammar Checker (5,000 words/month)",
      "Advanced Translation Features",
      "Paraphrase Enhanced Text",
      "Priority Support",
      "Ad-Free Experience",
    ],
    cta: "Upgrade Now",
    popular: true,
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: {
      monthly: 25,
      yearly: 129, // Adjusted price
    },
    originalPrice: {
      yearly: 300 // Original yearly price (25 * 12)
    },
    description: "For power users & teams",
    features: [
      "Unlimited AI Detection",
      "Unlimited Grammar Checking",
      "Unlimited Translation",
      "Advanced Style Analysis",
      "Team Collaboration Tools",
      "Premium Support"
    ],
    cta: "Get Unlimited",
    highlighted: true,
  }
]

export const EnhancedPricingSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -ml-[500px] w-[1000px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-sm font-medium mb-4 border border-emerald-200">
            Special Launch Pricing
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
            Enterprise Grade. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">Startup Price.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-500">
            Stop paying $30/month for single tools. Get our complete, highly-accurate AI detection and content analysis suite for a fraction of the cost.
          </p>
        </div>
        <PricingSection
          title=""
          subtitle=""
          frequencies={PAYMENT_FREQUENCIES}
          tiers={PRICING_TIERS}
        />
      </div>
    </section>
  );
};
