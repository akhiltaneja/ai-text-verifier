
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Bot, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PremiumSection: React.FC = () => {
  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      description: "For casual users",
      features: [
        "AI Detector (500 words daily)",
        "Check & Fix Grammar (500 words daily)",
        "Paraphrase (500 words daily)",
        "Generate Content Summaries",
        "Basic Translation Support"
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: 4,
      description: "For serious content creators",
      features: [
        "AI Detector (Unlimited words)",
        "Premium Grammar Checker (Unlimited)",
        "Paraphrase Unlimited Text",
        "Advanced Translation Features",
        "Priority Support",
        "Completely Ad-Free Experience",
      ],
      cta: "Upgrade Now",
      popular: true,
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 gradient-text">Upgrade Your Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unlock premium features to enhance your content creation workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden border h-full ${plan.popular ? 'border-primary shadow-lg' : 'shadow-sm'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground py-1 px-4 rounded-bl-lg text-xs font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`${plan.popular ? 'bg-primary/5' : ''} p-1 h-full`}>
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    {plan.popular ? (
                      <Crown className="h-6 w-6 text-primary mr-2" />
                    ) : (
                      <Bot className="h-6 w-6 text-primary mr-2" />
                    )}
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                  </div>
                  
                  <div className="text-4xl font-bold mb-2">
                    ${plan.price}
                    {plan.price > 0 && (
                      <span className="text-muted-foreground text-sm font-normal">/month</span>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                  
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.id === 'premium' ? (
                    <Link to="/pricing" className="mt-auto">
                      <Button className="w-full">
                        <Zap className="mr-2 h-4 w-4" />
                        {plan.cta}
                      </Button>
                    </Link>
                  ) : (
                    <Link to={plan.id === 'free' ? '/ai-detector' : '/pricing'} className="mt-auto">
                      <Button className="w-full" variant={plan.id === 'free' ? 'outline' : 'default'}>
                        <Bot className="mr-2 h-4 w-4" />
                        {plan.cta}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="link" asChild className="inline-flex items-center text-primary hover:underline gap-1">
            <Link to="/pricing">
              View all plan details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
