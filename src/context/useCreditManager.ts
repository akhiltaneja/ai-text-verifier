
import { useState, useEffect, useCallback, useRef } from 'react';
import { ToolType } from './types';
import { DAILY_LIMIT_ANONYMOUS, DAILY_LIMIT_LOGGED_IN, ALL_TOOLS } from './constants';
import { supabase } from '@/integrations/supabase/client';

/**
 * Robust Credit Manager
 * 
 * LOGGED-IN USERS: Credits stored in Supabase `daily_usage` table.
 *   - Server-side enforcement via `check-credits` edge function
 *   - Cannot be bypassed by clearing localStorage, changing browsers, etc.
 *   - 750 words/day per tool, resets at midnight UTC
 * 
 * ANONYMOUS USERS: Credits stored in localStorage with stable fingerprint.
 *   - Uses userAgent + screen size + language (NO Date.now())
 *   - 500 words/day per tool, resets at midnight UTC
 *   - Best effort — can be bypassed by clearing storage (acceptable tradeoff)
 */

// Get UTC date string YYYY-MM-DD
function getUTCDateString(): string {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
}

// Stable browser fingerprint (no Date.now!)
async function getStableFingerprint(): Promise<string> {
  const raw = [
    navigator.userAgent,
    `${window.screen.width}x${window.screen.height}`,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.hardwareConcurrency?.toString() || '0',
  ].join('|');

  const encoder = new TextEncoder();
  const data = encoder.encode(raw);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Build default credits object
function buildDefaultCredits(limit: number): Record<ToolType, number> {
  return {
    'ai-detector': limit,
    'grammar-checker': limit,
    'paraphrasing': limit,
    'summarization': limit,
    'ai-summary': limit,
    'translation': limit,
  };
}

export const useCreditManager = (isLoggedIn: boolean) => {
  const defaultDailyLimit = isLoggedIn ? DAILY_LIMIT_LOGGED_IN : DAILY_LIMIT_ANONYMOUS;

  const [availableCredits, setAvailableCredits] = useState<Record<ToolType, number>>(
    buildDefaultCredits(defaultDailyLimit)
  );
  const [dailyLimit, setDailyLimit] = useState(defaultDailyLimit);
  const [subscriptionPlan, setSubscriptionPlan] = useState('free');
  const [isLoading, setIsLoading] = useState(true);
  const fingerprintRef = useRef<string>('');
  const midnightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Initialize fingerprint (anonymous users only) ───────────
  useEffect(() => {
    const init = async () => {
      if (!isLoggedIn) {
        fingerprintRef.current = await getStableFingerprint();
      }
      setIsLoading(false);
    };
    init();
  }, [isLoggedIn]);

  // ─── Load credits on mount / login state change ─────────────
  useEffect(() => {
    if (isLoading) return;

    if (isLoggedIn) {
      loadServerCredits();
    } else {
      loadLocalCredits();
    }
  }, [isLoggedIn, isLoading]);

  // ─── Set up midnight UTC auto-reset ─────────────────────────
  useEffect(() => {
    scheduleMidnightReset();
    return () => {
      if (midnightTimerRef.current) clearTimeout(midnightTimerRef.current);
    };
  }, [isLoggedIn]);

  function scheduleMidnightReset() {
    if (midnightTimerRef.current) clearTimeout(midnightTimerRef.current);

    const now = new Date();
    const tomorrow = new Date(Date.UTC(
      now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 5
    ));
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    midnightTimerRef.current = setTimeout(() => {
      console.log('Midnight UTC — resetting daily credits');
      resetDailyCredits();
      scheduleMidnightReset(); // Reschedule for next midnight
    }, msUntilMidnight);
  }

  // ─── SERVER-SIDE: Load credits from Supabase ────────────────
  async function loadServerCredits() {
    try {
      const { data, error } = await supabase.functions.invoke('check-credits', {
        body: { action: 'check' }
      });

      if (error) {
        console.error('Failed to load server credits:', error);
        // Fallback: show full credits but server will still enforce
        setAvailableCredits(buildDefaultCredits(DAILY_LIMIT_LOGGED_IN));
        return;
      }

      if (data?.dailyLimit) setDailyLimit(data.dailyLimit);
      if (data?.plan) setSubscriptionPlan(data.plan);

      if (data?.remaining) {
        setAvailableCredits(data.remaining as Record<ToolType, number>);
      }
    } catch (err) {
      console.error('Server credit check failed:', err);
      setAvailableCredits(buildDefaultCredits(DAILY_LIMIT_LOGGED_IN));
    }
  }

  // ─── LOCAL: Load credits from localStorage (anonymous) ──────
  function loadLocalCredits() {
    const fp = fingerprintRef.current || 'anon';
    const storageKey = `credits_v2_${fp}`;
    const dateKey = `credits_date_v2_${fp}`;

    const savedDate = localStorage.getItem(dateKey);
    const todayUTC = getUTCDateString();

    // Reset if new day (UTC)
    if (savedDate !== todayUTC) {
      const freshCredits = buildDefaultCredits(DAILY_LIMIT_ANONYMOUS);
      setAvailableCredits(freshCredits);
      localStorage.setItem(storageKey, JSON.stringify(freshCredits));
      localStorage.setItem(dateKey, todayUTC);
      return;
    }

    // Load saved credits
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validate structure
        const valid = ALL_TOOLS.every(tool => typeof parsed[tool] === 'number');
        if (valid) {
          setAvailableCredits(parsed);
          return;
        }
      } catch {
        // Invalid JSON, reset
      }
    }

    // Fallback: fresh credits
    const freshCredits = buildDefaultCredits(DAILY_LIMIT_ANONYMOUS);
    setAvailableCredits(freshCredits);
    localStorage.setItem(storageKey, JSON.stringify(freshCredits));
    localStorage.setItem(dateKey, todayUTC);
  }

  // ─── Save to localStorage (anonymous only) ──────────────────
  function saveLocalCredits(credits: Record<ToolType, number>) {
    const fp = fingerprintRef.current || 'anon';
    const storageKey = `credits_v2_${fp}`;
    const dateKey = `credits_date_v2_${fp}`;
    localStorage.setItem(storageKey, JSON.stringify(credits));
    localStorage.setItem(dateKey, getUTCDateString());
  }

  // ─── Reset daily credits ───────────────────────────────────
  const resetDailyCredits = useCallback(() => {
    const limit = isLoggedIn ? dailyLimit : DAILY_LIMIT_ANONYMOUS;
    const fresh = buildDefaultCredits(limit);
    setAvailableCredits(fresh);

    if (!isLoggedIn) {
      saveLocalCredits(fresh);
    }
    // Server-side: no action needed — Supabase will return today's (empty) usage
  }, [isLoggedIn, dailyLimit]);

  // ─── Use credits ───────────────────────────────────────────
  const useCredits = useCallback((tool: ToolType, amount: number): boolean => {
    // Check locally first (instant feedback)
    if (availableCredits[tool] < amount) {
      return false;
    }

    if (isLoggedIn) {
      // Optimistic update — deduct locally from ALL tools so the pool is unified
      setAvailableCredits(prev => {
        const nextAmount = Math.max(0, Object.values(prev)[0] - amount);
        return {
          'ai-detector': nextAmount,
          'grammar-checker': nextAmount,
          'paraphrasing': nextAmount,
          'summarization': nextAmount,
          'ai-summary': nextAmount,
          'translation': nextAmount,
        } as Record<ToolType, number>;
      });

      // Fire server deduction (async, non-blocking for UX)
      supabase.functions.invoke('check-credits', {
        body: { action: 'use', tool, wordCount: amount }
      }).then(({ data, error }) => {
        if (error || !data?.success) {
          console.error('Server credit deduction failed:', error || data?.error);
          // If server rejected, re-sync credits
          if (data?.remaining !== undefined) {
            setAvailableCredits(prev => ({ ...prev, [tool]: data.remaining }));
          } else {
            // Re-fetch all credits
            loadServerCredits();
          }
        } else {
          if (data?.dailyLimit) setDailyLimit(data.dailyLimit);
          if (data?.plan) setSubscriptionPlan(data.plan);
          if (data?.remaining !== undefined) {
            // Sync with server's authoritative remaining count across all tools
            const unifiedRemaining = {
              'ai-detector': data.remaining as number,
              'grammar-checker': data.remaining as number,
              'paraphrasing': data.remaining as number,
              'summarization': data.remaining as number,
              'ai-summary': data.remaining as number,
              'translation': data.remaining as number,
            };
            setAvailableCredits(unifiedRemaining);
          }
        }
      }).catch(err => {
        console.error('Credit deduction error:', err);
        loadServerCredits(); // Re-sync
      });

      return true;
    } else {
      // Anonymous: deduct locally from ALL tools
      const nextAmount = Math.max(0, availableCredits[tool] - amount);
      const unifiedRemaining = {
        'ai-detector': nextAmount,
        'grammar-checker': nextAmount,
        'paraphrasing': nextAmount,
        'summarization': nextAmount,
        'ai-summary': nextAmount,
        'translation': nextAmount,
      } as Record<ToolType, number>;

      setAvailableCredits(unifiedRemaining);
      saveLocalCredits(unifiedRemaining);
      return true;
    }
  }, [isLoggedIn, availableCredits]);

  // ─── Refresh from server (called after login) ──────────────
  const refreshCredits = useCallback(() => {
    if (isLoggedIn) {
      loadServerCredits();
    } else {
      loadLocalCredits();
    }
  }, [isLoggedIn]);

  return {
    availableCredits,
    useCredits,
    resetDailyCredits,
    refreshCredits,
    isLoading,
    dailyLimit,
    subscriptionPlan,
  };
};
