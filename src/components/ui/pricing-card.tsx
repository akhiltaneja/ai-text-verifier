
import * as React from "react"
import { Check, HelpCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export interface PricingTier {
  id: string
  name: string
  description: string
  price: Record<string, string | number>
  originalPrice?: Record<string, string | number>
  features: string[]
  cta: string
  popular?: boolean
  highlighted?: boolean
}

interface PricingCardProps {
  tier: PricingTier
  paymentFrequency: string
  showDiscount?: boolean
}

export function PricingCard({ tier, paymentFrequency, showDiscount = false }: PricingCardProps) {
  const navigate = useNavigate();
  
  // Convert price to string including currency
  const price = tier.price[paymentFrequency]
  const priceLabel = typeof price === 'number' ? `$${price}` : price
  
  // Calculate original price for yearly plans
  const originalPrice = tier.originalPrice?.[paymentFrequency]
  const originalPriceLabel = originalPrice ? `$${originalPrice}` : null
  
  // Calculate discount percentage if both prices exist
  const discountPercentage = originalPrice && typeof price === 'number' && typeof originalPrice === 'number'
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 30 // Default to 30% if calculation not possible
    
  // Calculate total amount for annual billing
  const calculateTotalAmount = () => {
    if (paymentFrequency === 'yearly' && typeof price === 'number') {
      return price;
    } else if (paymentFrequency === 'monthly' && typeof price === 'number') {
      return price * 12;
    }
    return 0;
  };

  const handlePricingButtonClick = () => {
    if (tier.id === 'free') {
      // For free plan, redirect to signup
      window.location.href = '/auth-callback';
      return;
    }
    
    // For paid plans, redirect to cart page
    navigate('/cart', {
      state: {
        planDetails: {
          planId: tier.id,
          name: tier.name,
          frequency: paymentFrequency,
          price: typeof price === 'number' ? price : 0,
          features: tier.features
        }
      }
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-xl border bg-card p-6",
        tier.popular && "border-primary shadow-md",
        tier.highlighted && "border border-transparent bg-gradient-to-b from-primary/20 to-background shadow-lg shadow-primary/10"
      )}
    >
      {tier.popular && (
        <div className="mb-4 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Most Popular
        </div>
      )}
      <h3 className="text-lg font-bold">{tier.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
      <div className="mt-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{priceLabel}</span>
          {typeof price === 'number' && (
            <span className="text-muted-foreground">
              /{paymentFrequency === "monthly" ? "month" : "year"}
            </span>
          )}
        </div>
        
        {showDiscount && originalPriceLabel && (
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through">
              {originalPriceLabel}/year
            </span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
              Save {discountPercentage}%
            </span>
          </div>
        )}
        
        {paymentFrequency === "yearly" && typeof price === 'number' && (
          <div className="mt-1 text-sm text-green-700">
            Total: ${calculateTotalAmount()} billed annually
          </div>
        )}
      </div>
      <div className="mt-6 space-y-2 flex-grow">
        {tier.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary mt-0.5" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <InteractiveHoverButton
          className="w-full h-11 text-sm" 
          text={tier.cta}
          onClick={handlePricingButtonClick}
        />
      </div>
    </div>
  )
}
