
import { supabase } from '@/integrations/supabase/client';
import { User } from './types';
import { useToast } from '@/hooks/use-toast';

export { supabase };

export const useSupabaseAuth = () => {
  const { toast } = useToast();

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (!email || !password) {
        toast({
          title: "Login Failed",
          description: "Please provide both email and password",
          variant: "destructive",
        });
        return false;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      if (data.user) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Unexpected login error:", error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (email: string, name: string, password: string): Promise<boolean> => {
    try {
      if (!email || !name || !password) {
        toast({
          title: "Signup Failed",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return false;
      }

      if (password.length < 6) {
        toast({
          title: "Signup Failed",
          description: "Password must be at least 6 characters",
          variant: "destructive",
        });
        return false;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      if (data.user) {
        toast({
          title: "Account Created",
          description: "Welcome to AI Content Tools!",
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Unexpected signup error:", error);
      toast({
        title: "Signup Failed",
        description: "An error occurred during signup",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast({
          title: "Logout Failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });

      return true;
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "An error occurred during logout",
        variant: "destructive",
      });
      return false;
    }
  };

  const extractUserFromSession = (session: any): User | null => {
    if (!session?.user) return null;

    const userData = session.user;
    const userName = userData.user_metadata?.name || userData.email?.split('@')[0] || 'User';

    return {
      id: userData.id,
      email: userData.email || '',
      name: userName,
      provider: userData.app_metadata?.provider || 'email',
      avatar_url: userData.user_metadata?.avatar_url,
    };
  };

  return {
    login,
    signup,
    logout,
    extractUserFromSession,
    supabase
  };
};
