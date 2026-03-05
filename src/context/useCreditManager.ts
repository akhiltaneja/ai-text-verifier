
import { useState, useEffect } from 'react';
import { ToolType } from './types';
import { DEFAULT_CREDITS_WITHOUT_LOGIN, DEFAULT_CREDITS_WITH_LOGIN, PARAPHRASING_CREDITS, SUMMARIZATION_CREDITS } from './constants';

export const useCreditManager = (isLoggedIn: boolean) => {
  // Define reasonable default credits - 500 for not logged in users, 750 for logged in users
  const DEFAULT_CREDITS = isLoggedIn ? 750 : 500;
  
  const [availableCredits, setAvailableCredits] = useState<Record<ToolType, number>>({
    'ai-detector': DEFAULT_CREDITS,
    'grammar-checker': DEFAULT_CREDITS,
    'paraphrasing': DEFAULT_CREDITS,
    'summarization': DEFAULT_CREDITS,
    'ai-summary': DEFAULT_CREDITS,
    'translation': DEFAULT_CREDITS
  });
  const [userIpHash, setUserIpHash] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Get a unique identifier based on IP address + browser fingerprint
  useEffect(() => {
    const getUserFingerprint = async () => {
      try {
        // Create a simple fingerprint from userAgent + screen resolution
        const fingerprint = `${navigator.userAgent}-${window.screen.width}x${window.screen.height}-${Date.now()}`;
        const ipHash = await hashString(fingerprint);
        setUserIpHash(ipHash);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting user fingerprint:", error);
        // Fallback to a random identifier if service fails
        const fallbackId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        setUserIpHash(fallbackId);
        setIsLoading(false);
      }
    };

    getUserFingerprint();
  }, []);

  // Simple hash function to create a unique identifier
  const hashString = async (str: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Get storage key based on user identifier
  const getStorageKey = () => {
    return `credits_${userIpHash || 'default'}`;
  };

  // Load credits from localStorage and check if we need to reset
  useEffect(() => {
    if (isLoading) return; // Wait until we have the user identifier
    
    const storageKey = getStorageKey();
    const savedCredits = localStorage.getItem(storageKey);
    const lastResetDate = localStorage.getItem(`lastResetDate_${userIpHash}`);
    const today = new Date().toDateString();
    
    // Reset credits if it's a new day
    if (lastResetDate !== today) {
      resetDailyCredits();
      localStorage.setItem(`lastResetDate_${userIpHash}`, today);
    } else if (savedCredits) {
      setAvailableCredits(JSON.parse(savedCredits));
    }
  }, [isLoggedIn, userIpHash, isLoading]);

  // Update localStorage when credits change
  useEffect(() => {
    if (isLoading) return; // Wait until we have the user identifier
    
    localStorage.setItem(getStorageKey(), JSON.stringify(availableCredits));
  }, [availableCredits, userIpHash, isLoading]);

  // Reset daily credits based on login status
  const resetDailyCredits = () => {
    const baseCredits = isLoggedIn ? 750 : 500;
    setAvailableCredits({
      'ai-detector': baseCredits,
      'grammar-checker': baseCredits,
      'paraphrasing': baseCredits,
      'summarization': baseCredits,
      'ai-summary': baseCredits,
      'translation': baseCredits
    });
  };

  // Use credits for a specific tool
  const useCredits = (tool: ToolType, amount: number): boolean => {
    if (availableCredits[tool] >= amount) {
      setAvailableCredits((prev) => ({
        ...prev,
        [tool]: prev[tool] - amount,
      }));
      return true;
    }
    return false;
  };

  return {
    availableCredits,
    useCredits,
    resetDailyCredits,
    isLoading
  };
};
