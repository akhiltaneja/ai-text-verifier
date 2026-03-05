
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CreditCard, Package, ArrowRight, Check, Infinity, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PRICING_TIERS } from '@/components/index/EnhancedPricingSection';

export const SubscriptionDetails: React.FC = () => {
  // Mocked subscription data - replace with actual data in production
  const subscriptionData = {
    status: 'active',
    plan: 'free',
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    periodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };

  // Get pricing data from our main pricing tiers
  const freePlan = PRICING_TIERS.find(tier => tier.id === 'free');
  const premiumPlan = PRICING_TIERS.find(tier => tier.id === 'premium');
  const unlimitedPlan = PRICING_TIERS.find(tier => tier.id === 'unlimited');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Current Subscription
          </CardTitle>
          <CardDescription>
            Your current plan details and usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">
                {subscriptionData.plan === 'free' ? 'Free Plan' : 'Premium Plan'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {subscriptionData.status === 'active' ? 'Active' : 'Inactive'}
              </p>
            </div>
            <Badge variant={subscriptionData.status === 'active' ? 'default' : 'outline'}>
              {subscriptionData.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          
          {subscriptionData.status === 'active' && (
            <div className="rounded-lg border p-4 bg-muted/20">
              <p className="text-sm mb-2">
                {subscriptionData.plan === 'free' 
                  ? 'Your free plan renews automatically with limited credits.'
                  : 'Your subscription renews automatically on:'}
              </p>
              {subscriptionData.plan !== 'free' && (
                <p className="font-semibold">
                  {formatDate(subscriptionData.renewalDate)}
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="default" asChild>
            <Link to="/pricing">
              Upgrade Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Premium Plan</CardTitle>
            <CardDescription>Recommended for regular use</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">${premiumPlan?.price.monthly}<span className="text-muted-foreground text-sm font-normal"> / month</span></div>
            
            <ul className="space-y-2">
              {premiumPlan?.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/pricing">
                <Zap className="mr-2 h-4 w-4" />
                Upgrade
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Unlimited Plan</CardTitle>
            <CardDescription>For power users & teams</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">${unlimitedPlan?.price.monthly}<span className="text-muted-foreground text-sm font-normal"> / month</span></div>
            
            <ul className="space-y-2">
              <li className="flex items-start">
                <Infinity className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Unlimited usage of all tools</span>
              </li>
              {unlimitedPlan?.features.slice(1, 4).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full" asChild>
              <Link to="/pricing">
                <Package className="mr-2 h-4 w-4" />
                Go Unlimited
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
