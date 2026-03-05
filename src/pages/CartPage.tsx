
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, X } from 'lucide-react';
import { PlanOptions, PLAN_OPTIONS } from '@/components/cart/PlanOptions';
import { PaymentTabs } from '@/components/cart/PaymentTabs';
import { PriceSummary } from '@/components/cart/PriceSummary';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useCouponCodes } from '@/hooks/useCouponCodes';

interface CartPageProps {}

const CartPage: React.FC<CartPageProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponError, setCouponError] = useState('');
  
  // Get initial plan selection from location state
  const initialPlan = location.state?.planDetails || PLAN_OPTIONS[1]; // Default to premium yearly
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlan.id || 'premium-yearly');
  
  // Get the selected plan details based on the selectedPlanId
  const selectedPlan = PLAN_OPTIONS.find(plan => plan.id === selectedPlanId) || PLAN_OPTIONS[1];

  // Mock coupon code validation
  const { validateCoupon } = useCouponCodes();
  
  const handleGoBack = () => {
    navigate('/pricing');
  };
  
  const handleApplyCoupon = () => {
    if (!couponCode) return;
    
    const validationResult = validateCoupon(couponCode);
    
    if (validationResult.valid) {
      setAppliedCoupon(couponCode);
      setDiscountPercentage(validationResult.discount);
      setCouponError('');
    } else {
      setAppliedCoupon(null);
      setDiscountPercentage(0);
      setCouponError(validationResult.message);
    }
  };
  
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercentage(0);
    setCouponError('');
    setCouponCode('');
  };
  
  useEffect(() => {
    // If initially navigated without a plan, set a default one
    if (!location.state?.planDetails) {
      setSelectedPlanId('premium-yearly');
    }
  }, [location.state]);

  return (
    <Layout>
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
          {/* Left side - Plan details - More compact */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="flex items-center mb-2">
              <button 
                onClick={handleGoBack}
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to plans
              </button>
            </div>
            
            <h1 className="text-2xl font-bold mb-3">Select your plan</h1>
            
            <PlanOptions
              selectedPlanId={selectedPlanId}
              setSelectedPlanId={setSelectedPlanId}
            />
          </div>
          
          {/* Right side - Payment options */}
          <div className="w-full lg:w-1/2">
            <Card className="border-muted sticky top-4">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Checkout</CardTitle>
                <CardDescription>
                  Complete your purchase
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <PriceSummary selectedPlanId={selectedPlanId} appliedDiscount={discountPercentage} />
                
                <div className="mb-4">
                  {!showDiscountInput && !appliedCoupon && (
                    <button 
                      onClick={() => setShowDiscountInput(true)} 
                      className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 mr-2">
                        <path d="M4 4H20V16H4V4ZM2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V4ZM12 19H16V22H8V19H12Z" />
                      </svg>
                      <span className="font-medium">Add discount code</span>
                    </button>
                  )}
                  
                  {showDiscountInput && !appliedCoupon && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className={cn(
                            "flex-1",
                            couponError && "border-red-500"
                          )}
                        />
                        <Button 
                          onClick={handleApplyCoupon} 
                          variant="outline" 
                          size="sm"
                        >
                          Apply
                        </Button>
                      </div>
                      
                      {couponError && (
                        <div className="text-red-500 text-xs flex items-center">
                          <X className="h-3 w-3 mr-1" />
                          {couponError}
                        </div>
                      )}
                      
                      <div className="text-xs text-muted-foreground">
                        Try code "WELCOME10" for 10% off
                      </div>
                    </div>
                  )}
                  
                  {appliedCoupon && (
                    <div className="flex justify-between items-center border p-2 rounded-md bg-muted/10">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <div>
                          <div className="text-sm font-medium">{appliedCoupon}</div>
                          <div className="text-xs text-muted-foreground">
                            {discountPercentage}% discount applied
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-muted-foreground"
                        onClick={handleRemoveCoupon}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
                
                <PaymentTabs 
                  selectedPlan={{
                    planId: selectedPlan.planId,
                    frequency: selectedPlan.frequency
                  }}
                  loading={loading}
                  setLoading={setLoading}
                  discountPercentage={discountPercentage}
                />
              </CardContent>
              
              <CardFooter className="text-xs text-muted-foreground border-t p-3">
                <p>
                  Your subscription will automatically renew every {selectedPlan.frequency === 'yearly' ? '12' : '1'} months. You will be charged ${selectedPlan.price} USD on each renewal until you cancel your subscription.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
