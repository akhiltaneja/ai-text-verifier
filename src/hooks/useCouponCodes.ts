
import { useState, useEffect } from 'react';

interface CouponData {
  code: string;
  discount: number;
  valid: boolean;
  expiresAt?: string;
}

interface CouponValidationResult {
  valid: boolean;
  discount: number;
  message: string;
}

export const useCouponCodes = () => {
  // In a real app, these would be fetched from a database
  const [availableCoupons, setAvailableCoupons] = useState<CouponData[]>([
    {
      code: 'WELCOME10',
      discount: 10,
      valid: true
    },
    {
      code: 'SUMMER20',
      discount: 20,
      valid: true,
      expiresAt: '2025-08-31'
    },
    {
      code: 'TESTCODE',
      discount: 5,
      valid: true
    }
  ]);

  const validateCoupon = (code: string): CouponValidationResult => {
    // Case insensitive search
    const coupon = availableCoupons.find(
      c => c.code.toLowerCase() === code.toLowerCase()
    );
    
    if (!coupon) {
      return {
        valid: false,
        discount: 0,
        message: 'Invalid coupon code'
      };
    }
    
    if (!coupon.valid) {
      return {
        valid: false,
        discount: 0,
        message: 'This coupon code is no longer valid'
      };
    }
    
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return {
        valid: false,
        discount: 0,
        message: 'This coupon code has expired'
      };
    }
    
    return {
      valid: true,
      discount: coupon.discount,
      message: `${coupon.discount}% discount applied`
    };
  };

  const addCoupon = (couponData: CouponData) => {
    setAvailableCoupons(prev => [...prev, couponData]);
  };

  const removeCoupon = (code: string) => {
    setAvailableCoupons(prev => prev.filter(coupon => coupon.code !== code));
  };

  const updateCoupon = (code: string, updates: Partial<CouponData>) => {
    setAvailableCoupons(prev => 
      prev.map(coupon => 
        coupon.code === code ? { ...coupon, ...updates } : coupon
      )
    );
  };
  
  return {
    availableCoupons,
    validateCoupon,
    addCoupon,
    removeCoupon, 
    updateCoupon
  };
};
