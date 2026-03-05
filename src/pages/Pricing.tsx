
import React from 'react';
import { Layout } from '@/components/Layout';
import { EnhancedPricingSection } from '@/components/index/EnhancedPricingSection';

const Pricing = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <EnhancedPricingSection />
        
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto text-left grid gap-6">
            <div>
              <h3 className="font-semibold mb-2">What happens when I reach my daily word limit?</h3>
              <p className="text-muted-foreground">Free users have a daily limit of 500 words per tool. Premium users get 5,000 words per tool daily, and Unlimited users have no restrictions.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does the subscription work?</h3>
              <p className="text-muted-foreground">Our Premium plan is billed at $4/month or $33.60/year (save 30%). The Unlimited plan is $25/month or $210/year (save 30%). You can cancel at any time.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">Yes, if you're not satisfied with our Premium plan, contact our support team within 7 days of purchase for a full refund.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan later?</h3>
              <p className="text-muted-foreground">Yes, you can change your subscription plan at any time. When upgrading, we'll prorate your existing subscription. When downgrading, changes take effect at the end of your current billing period.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
