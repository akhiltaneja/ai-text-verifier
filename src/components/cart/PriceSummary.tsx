
import React from 'react';
import { PLAN_OPTIONS, calculateMonthlyPrice } from './PlanOptions';

interface PriceSummaryProps {
  selectedPlanId: string;
  appliedDiscount?: number; // As percentage
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({ 
  selectedPlanId, 
  appliedDiscount = 0 
}) => {
  // Find the selected plan by ID, defaulting to Premium plan if not found
  const selectedPlan = PLAN_OPTIONS.find(plan => plan.id === selectedPlanId) || PLAN_OPTIONS[1];
  
  // Calculate price after discount - ensure price is treated as a number
  const originalPrice = typeof selectedPlan.price === 'number' ? selectedPlan.price : parseFloat(String(selectedPlan.price));
  const discountedPrice = originalPrice * (1 - appliedDiscount / 100);
  const finalPrice = appliedDiscount > 0 ? discountedPrice : originalPrice;
  
  return (
    <div className="flex flex-col mb-3 bg-background/50 p-3 rounded-md border border-muted">
      <div className="flex items-center">
        <div className="text-xl font-bold">${finalPrice.toFixed(2)} USD</div>
        <div className="ml-2 flex flex-col">
          <div className="text-xs text-muted-foreground">
            Billed {selectedPlan.frequency === 'yearly' ? 'yearly' : 'monthly'} • {calculateMonthlyPrice(selectedPlan)} per month
          </div>
          {selectedPlan.savings && (
            <div className="text-xs text-primary font-medium">
              Save {selectedPlan.savings}
            </div>
          )}
        </div>
        {selectedPlan.popular && (
          <div className="ml-auto bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-medium">
            Best Value
          </div>
        )}
      </div>
      
      {appliedDiscount > 0 && (
        <div className="mt-2 flex items-center">
          <span className="text-sm line-through text-muted-foreground">${originalPrice.toFixed(2)}</span>
          <span className="ml-2 text-sm text-green-600 font-medium">
            {appliedDiscount}% discount applied
          </span>
        </div>
      )}
    </div>
  );
};
