
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get hash from URL
      const hash = window.location.hash;
      const queryParams = window.location.search;
      
      if (!hash && !queryParams) {
        toast.error('Authentication failed. No authentication data found.');
        navigate('/');
        return;
      }

      try {
        console.log('Processing authentication callback...');
        
        if (hash) {
          // Process OAuth sign-in (hash fragment contains tokens)
          console.log('Processing hash fragment...');
          
          // Parse hash fragment to get tokens
          const access_token = extractParam('access_token', hash);
          const refresh_token = extractParam('refresh_token', hash);
          
          if (!access_token) {
            throw new Error('No access token found in URL');
          }
          
          // Set the session with tokens from the hash
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token: refresh_token || ''
          });
          
          if (error) throw error;
          
          if (data?.user) {
            console.log('Authentication successful:', data.user.email);
            toast.success(`Welcome, ${data.user.user_metadata?.name || data.user.email}!`);
          } else {
            throw new Error('Failed to get user data');
          }
        } else {
          // For other auth flows, just get the current session
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          
          if (!data.session) {
            toast.error('Authentication failed. No session found.');
            navigate('/');
            return;
          }
        }
        
        // Successful authentication, redirect to home
        navigate('/');
      } catch (err) {
        console.error('Auth callback error:', err);
        toast.error(`Authentication error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        navigate('/');
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  // Helper function to extract parameters from hash
  const extractParam = (param: string, hash: string): string => {
    const match = hash.match(new RegExp(`${param}=([^&]*)`));
    return match ? match[1] : '';
  };

  // Display loading indicator
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin mx-auto"></div>
        <p className="text-xl font-medium">Processing your login...</p>
        <p className="text-muted-foreground">You'll be redirected shortly.</p>
        {!isProcessing && (
          <p className="text-sm text-destructive">
            If you're not redirected automatically, <button onClick={() => navigate('/')} className="underline">click here</button>.
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
