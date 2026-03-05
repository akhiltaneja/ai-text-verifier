
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
    <div className="py-0">
      <PricingSection
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that best fits your needs with no hidden fees"
        frequencies={PAYMENT_FREQUENCIES}
        tiers={PRICING_TIERS}
      />
    </div>
  );
};
