
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/custom-alert';

// Custom PayPal SVG icon component
export const PayPal = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="24"
    height="24"
    fill="#00457C"
    {...props}
  >
    <path d="M 5.6875 5 C 5.101563 5 4.613281 5.402344 4.5 5.96875 L 2.03125 20.09375 C 1.941406 20.570313 2.308594 21 2.78125 21 L 7.09375 21 L 7.78125 17.21875 L 7.15625 20.09375 C 7.066406 20.570313 7.433594 21 7.90625 21 L 12.25 21 L 13.09375 16 L 14.09375 9.96875 C 14.179688 9.480469 13.8125 9.03125 13.3125 9.03125 L 9.75 9.03125 C 9.605469 9.03125 9.460938 9.089844 9.375 9.1875 C 9.285156 9.289063 9.257813 9.414063 9.28125 9.5625 L 9.5 11.03125 L 6.03125 11.03125 C 5.925781 11.03125 5.832031 11.054688 5.75 11.09375 C 5.664063 11.132813 5.589844 11.199219 5.53125 11.28125 C 5.476563 11.363281 5.4375 11.457031 5.4375 11.5625 C 5.4375 11.636719 5.445313 11.699219 5.46875 11.78125 L 7.46875 21.90625 C 7.519531 22.164063 7.722656 22.339844 7.96875 22.375 C 8.320313 26.179688 11.734375 29.25 16 29.25 C 20.503906 29.25 24.121094 25.90625 24.21875 21.75 L 29.21875 21.75 C 29.808594 21.75 30.296875 21.347656 30.40625 20.78125 L 32.75 7.28125 C 32.84375 6.804688 32.476563 6.375 32 6.375 L 22 6.375 C 21.640625 6.375 21.304688 6.679688 21.25 7.03125 L 20.5 12.375 L 20.8125 10.25 C 20.886719 9.71875 20.480469 9.25 19.9375 9.25 L 15 9.25 C 14.84375 9.25 14.679688 9.339844 14.59375 9.4375 C 14.515625 9.53125 14.46875 9.65625 14.5 9.78125 L 15.15625 13.65625 L 15.59375 10.71875 C 15.683594 10.242188 15.316406 9.8125 14.84375 9.8125 L 6.5 9.8125 C 6.296875 9.8125 6.089844 9.917969 6 10.09375 C 5.910156 10.269531 5.914063 10.480469 6.03125 10.65625 L 6.6875 11.8125 L 5.6875 5 z M 16 22.5 C 13.355469 22.5 11.289063 24.417969 11.28125 26.71875 C 11.277344 26.929688 11.550781 27 11.6875 26.84375 C 12.9375 25.414063 14.867188 24.5 17 24.5 C 19.140625 24.5 21.082031 25.421875 22.3125 26.84375 C 22.453125 27.011719 22.734375 26.9375 22.71875 26.71875 C 22.710938 24.417969 20.644531 22.5 18 22.5 Z" />
  </svg>
);

interface SelectedPlan {
  planId: string;
  frequency: string;
}

interface PaymentTabsProps {
  selectedPlan: SelectedPlan;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  discountPercentage?: number; // Added this prop
}

export const PaymentTabs: React.FC<PaymentTabsProps> = ({ 
  selectedPlan, 
  loading, 
  setLoading,
  discountPercentage = 0 // Default to 0 if not provided
}) => {
  const [selectedTab, setSelectedTab] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearError = () => {
    if (errorMessage) setErrorMessage(null);
  };

  const handlePayPalCheckout = async () => {
    try {
      clearError();
      setLoading(true);
      const toastId = toast.loading("Preparing PayPal checkout...");
      
      // Create checkout session with PayPal
      const currentUrl = window.location.origin;
      console.log("Current origin URL:", currentUrl);
      console.log("Selected plan details:", selectedPlan);
      console.log("Discount percentage:", discountPercentage);
      
      // Log the request details before making the call
      const requestBody = {
        planId: selectedPlan.planId,
        successUrl: `${currentUrl}/payment-success`,
        cancelUrl: `${currentUrl}/cart`,
        frequency: selectedPlan.frequency,
        discountPercentage: discountPercentage // Pass the discount to the backend
      };
      console.log("Sending request to PayPal function:", requestBody);
      
      const { data, error } = await supabase.functions.invoke('create-paypal-checkout', {
        body: requestBody
      });

      // Enhanced error logging
      console.log("PayPal checkout response:", { data, error });
      toast.dismiss(toastId);
      
      if (error) {
        console.error("PayPal checkout error from function invoke:", error);
        setErrorMessage(`Failed to start checkout process: ${error.message || 'Please try again later.'}`);
        toast.error(`Failed to start checkout process: ${error.message || 'Please try again later.'}`);
        return;
      }

      if (!data) {
        console.error("No data returned from PayPal checkout function");
        setErrorMessage('No response from payment processor. Please try again later.');
        toast.error('No response from payment processor. Please try again later.');
        return;
      }

      if (data.error) {
        console.error("PayPal checkout error from response data:", data.error, data.details);
        const errorDetails = data.details ? `: ${data.details}` : '';
        setErrorMessage(`Payment error: ${data.error}${errorDetails}`);
        toast.error(`Payment error: ${data.error}${errorDetails}`);
        return;
      }

      // Redirect to PayPal checkout
      if (data?.url) {
        console.log("Redirecting to PayPal URL:", data.url);
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned:', data);
        setErrorMessage('There was an issue with our payment processor. Please try again later.');
        toast.error('There was an issue with our payment processor. Please try again later.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setErrorMessage(`Failed to start checkout process: ${error instanceof Error ? error.message : 'Please try again.'}`);
      toast.error(`Failed to start checkout process: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    toast.info('All payment processing is handled securely by PayPal. Your card details are never stored on our servers.');
    handlePayPalCheckout();
  };

  return (
    <Tabs defaultValue="card" className="w-full" onValueChange={(value) => {
      setSelectedTab(value);
      clearError();
    }}>
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="card" className="flex items-center justify-center">
          <CreditCard className="h-4 w-4 mr-2" />
          Credit/Debit Card
        </TabsTrigger>
        <TabsTrigger value="paypal" className="flex items-center justify-center">
          <PayPal className="mr-2" />
          PayPal
        </TabsTrigger>
      </TabsList>
      
      {errorMessage && (
        <Alert variant="error" className="mb-4" icon={<AlertTriangle className="h-4 w-4" />}>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <TabsContent value="card">
        <form onSubmit={handleCardSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="card-number">Card number</Label>
            <div className="relative">
              <Input 
                id="card-number" 
                placeholder="1234 5678 9012 3456" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required 
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-muted-foreground">
                  <path d="M3 5H21C21.5523 5 22 5.44772 22 6V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V6C2 5.44772 2.44772 5 3 5ZM3 7V9H21V7H3ZM3 12V17H21V12H3Z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="expiry">MM/YY</Label>
              <Input 
                id="expiry" 
                placeholder="MM/YY" 
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cvv">CVV</Label>
              <Input 
                id="cvv" 
                placeholder="123" 
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required 
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="postal-code">Postal code</Label>
            <Input 
              id="postal-code" 
              placeholder="90210" 
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required 
            />
          </div>
          
          <div className="text-xs text-muted-foreground mb-2 bg-primary/5 p-2 rounded-md flex items-start space-x-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 mr-1 text-primary flex-shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>All payment processing is handled securely by PayPal. Your card details are never stored on our servers and are securely processed by PayPal. No sensitive information is ever exposed.</span>
          </div>
          
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            Check out securely
          </Button>
        </form>
      </TabsContent>
      
      <TabsContent value="paypal">
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            You'll be redirected to PayPal to complete your purchase securely.
          </p>
          <Button 
            onClick={handlePayPalCheckout} 
            className="w-full bg-[#0070ba] hover:bg-[#003087]" 
            size="lg"
            disabled={loading}
          >
            <PayPal className="mr-2" />
            Check out with PayPal
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};
