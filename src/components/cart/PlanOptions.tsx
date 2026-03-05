
import React from 'react';
import { Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Plan data
export const PLAN_OPTIONS = [
  {
    id: 'premium-monthly',
    name: 'Premium Monthly',
    price: 4,
    frequency: 'monthly',
    planId: 'premium',
    features: [
      "AI Detector (5,000 words/month)",
      "Grammar Checker (5,000 words/month)",
      "Advanced Translation Features",
      "Paraphrase Enhanced Text",
      "Priority Support",
      "Ad-Free Experience"
    ]
  },
  {
    id: 'premium-yearly',
    name: 'Premium Yearly',
    price: 29,
    frequency: 'yearly',
    planId: 'premium',
    features: [
      "AI Detector (5,000 words/month)",
      "Grammar Checker (5,000 words/month)",
      "Advanced Translation Features",
      "Paraphrase Enhanced Text",
      "Priority Support",
      "Ad-Free Experience"
    ],
    popular: true,
    savings: '58%'
  },
  {
    id: 'unlimited-monthly',
    name: 'Unlimited Monthly',
    price: 25,
    frequency: 'monthly',
    planId: 'unlimited',
    features: [
      "Unlimited AI Detection",
      "Unlimited Grammar Checking",
      "Unlimited Translation",
      "Advanced Style Analysis",
      "Team Collaboration Tools",
      "Premium Support"
    ]
  },
  {
    id: 'unlimited-yearly',
    name: 'Unlimited Yearly',
    price: 129,
    frequency: 'yearly',
    planId: 'unlimited',
    features: [
      "Unlimited AI Detection",
      "Unlimited Grammar Checking",
      "Unlimited Translation",
      "Advanced Style Analysis",
      "Team Collaboration Tools",
      "Premium Support"
    ],
    savings: '52%'
  }
];

export const calculateMonthlyPrice = (plan: typeof PLAN_OPTIONS[0]) => {
  if (plan.frequency === 'yearly') {
    return `$${(plan.price / 12).toFixed(2)}`;
  }
  return `$${plan.price}`;
};

interface PlanOptionsProps {
  selectedPlanId: string;
  setSelectedPlanId: (planId: string) => void;
}

export const PlanOptions: React.FC<PlanOptionsProps> = ({ 
  selectedPlanId, 
  setSelectedPlanId 
}) => {
  return (
    <>
      <RadioGroup 
        value={selectedPlanId} 
        onValueChange={setSelectedPlanId}
        className="grid gap-3"
      >
        {PLAN_OPTIONS.map((plan) => (
          <div key={plan.id} className="relative">
            <div className={`border rounded-lg transition-all ${selectedPlanId === plan.id ? 'border-primary ring-2 ring-primary/20' : 'border-muted'}`}>
              <div className="flex items-start p-3">
                <RadioGroupItem 
                  value={plan.id} 
                  id={plan.id} 
                  className="mt-1"
                />
                <div className="ml-3 flex-grow">
                  <div className="flex items-center">
                    <Label 
                      htmlFor={plan.id} 
                      className="font-medium text-base cursor-pointer"
                    >
                      {plan.name}
                    </Label>
                    {plan.popular && (
                      <div className="ml-auto bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                        Best Value
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-1 flex items-baseline">
                    <span className="text-xl font-bold">${plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/{plan.frequency === 'yearly' ? 'year' : 'month'}</span>
                    
                    {plan.frequency === 'yearly' && (
                      <span className="ml-2 text-sm text-primary font-medium">
                        Save {plan.savings}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-1 text-xs text-muted-foreground">
                    {plan.frequency === 'yearly' 
                      ? `${calculateMonthlyPrice(plan)} per month, billed annually`
                      : 'Billed monthly'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
      
      {/* Free plan info - made more compact */}
      <div className="mt-3 border rounded-lg p-3 bg-background/50 border-muted">
        <h3 className="text-base font-medium mb-1">Free Plan</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Basic features with limitations (500 words/day per tool)
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Check className="h-3 w-3 mr-1 text-muted-foreground" />
          <span>No credit card required</span>
        </div>
      </div>
    </>
  );
};
