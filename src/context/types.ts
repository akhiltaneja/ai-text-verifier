
export type ToolType = "ai-detector" | "grammar-checker" | "paraphrasing" | "summarization" | "ai-summary" | "translation";

export interface CreditsState {
  availableCredits: {
    [key in ToolType]: number;
  };
  premiumUser: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  provider?: string;
  avatar_style?: string;
  avatar_url?: string;
}

export interface CreditContextType {
  availableCredits: Record<ToolType, number>;
  useCredits: (tool: ToolType, amount: number) => boolean;
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  resetDailyCredits: () => void;
  refreshCredits: () => void;
  isLoading: boolean; // Tells frontend UI if Supabase quotas are still fetching
  credits?: number; // Total combined credits
  dailyLimit: number; // dynamically fetched limit per tool
  subscriptionPlan: string; // The active plan (free, premium, unlimited)
  setUser?: (user: User) => void; // Function to update user
}
