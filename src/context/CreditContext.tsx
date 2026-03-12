
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSupabaseAuth } from './useSupabaseAuth';
import { useCreditManager } from './useCreditManager';
import { CreditContextType, User, ToolType } from './types';

// Initialize with default/empty values
const CreditContext = createContext<CreditContextType>({
  availableCredits: {
    'ai-detector': 0,
    'grammar-checker': 0,
    'paraphrasing': 0,
    'summarization': 0,
    'ai-summary': 0,
    'translation': 0
  },
  useCredits: () => false,
  isLoggedIn: false,
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: async () => false,
  resetDailyCredits: () => { },
  refreshCredits: () => { },
  isLoading: true,
  credits: 0,
  dailyLimit: 500,
  subscriptionPlan: 'free',
  setUser: () => { }
});

export const CreditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [initialCheckDone, setInitialCheckDone] = useState<boolean>(false);
  const [totalCredits, setTotalCredits] = useState<number>(0);

  const {
    login: supabaseLogin,
    signup: supabaseSignup,
    logout: supabaseLogout,
    extractUserFromSession,
    supabase
  } = useSupabaseAuth();

  const {
    availableCredits,
    useCredits: useCreditsManager,
    resetDailyCredits,
    refreshCredits,
    isLoading,
    dailyLimit,
    subscriptionPlan,
  } = useCreditManager(isLoggedIn);

  // Since all tools now share a unified global limit, total credits is just the remaining amount.
  useEffect(() => {
    const unifiedRemaining = Object.values(availableCredits)[0] ?? 0;
    setTotalCredits(unifiedRemaining);
  }, [availableCredits]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          const userData = extractUserFromSession(session);
          if (userData) {
            setUser(userData);
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setInitialCheckDone(true);
      }
    };

    checkAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const userData = extractUserFromSession(session);
          if (userData) {
            setUser(userData);
            setIsLoggedIn(true);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Refresh credits when login state changes or when initial check is done
  useEffect(() => {
    if (initialCheckDone) {
      refreshCredits();
    }
  }, [isLoggedIn, initialCheckDone]);

  const login = async (email: string, password: string): Promise<boolean> => {
    const success = await supabaseLogin(email, password);
    return success;
  };

  const signup = async (email: string, name: string, password: string): Promise<boolean> => {
    const success = await supabaseSignup(email, name, password);
    return success;
  };

  const logout = async () => {
    const success = await supabaseLogout();
    if (success) {
      setUser(null);
      setIsLoggedIn(false);
      resetDailyCredits();
    }
    return success;
  };

  const useCredits = (tool: ToolType, amount: number): boolean => {
    return useCreditsManager(tool, amount);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const contextValue: CreditContextType = {
    availableCredits,
    useCredits,
    isLoggedIn,
    user,
    login,
    signup,
    logout,
    resetDailyCredits,
    refreshCredits,
    isLoading,
    credits: totalCredits,
    dailyLimit,
    subscriptionPlan,
    setUser: updateUser
  };

  // Don't render children until initial auth check is complete
  if (!initialCheckDone) {
    return null;
  }

  return (
    <CreditContext.Provider value={contextValue}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCredits = (): CreditContextType => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
};

// Use 'export type' to avoid TS1205 error with isolatedModules
export type { ToolType };
