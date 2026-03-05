
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
  credits?: number; // Total combined credits
  setUser?: (user: User) => void; // Function to update user
}
