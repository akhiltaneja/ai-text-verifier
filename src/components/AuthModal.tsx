
import React, { useState, useId } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCredits } from '@/context/CreditContext';
import { Loader2, Mail, Lock, Chrome, AlertTriangle, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Alert, AlertContent, AlertTitle, AlertDescription } from '@/components/ui/custom-alert';
import { InfoCircledIcon } from '@radix-ui/react-icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose,
  defaultTab = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset-password'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const id = useId();
  
  const { login, signup } = useCredits();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setVerificationSent(false);
    
    if (mode === 'reset-password') {
      if (!email) {
        setErrorMessage('Please provide your email address');
        setIsLoading(false);
        return;
      }
      
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth-callback?reset=true`,
        });
        
        if (error) {
          setErrorMessage(`Failed to send reset email: ${error.message}`);
        } else {
          setResetEmailSent(true);
          toast.success('Password reset instructions sent to your email');
        }
      } catch (error) {
        console.error('Reset password error:', error);
        setErrorMessage('Failed to send reset email. Please try again later.');
      } finally {
        setIsLoading(false);
      }
      return;
    }
    
    if (!email || !password) {
      setErrorMessage('Please provide both email and password');
      setIsLoading(false);
      return;
    }
    
    try {
      console.log(`Attempting to ${mode === 'login' ? 'login' : 'signup'} with email: ${email}`);
      
      if (mode === 'login') {
        // Try to login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) {
          console.error('Login error:', error);
          
          // Check if the error is due to invalid credentials
          if (error.message.includes('Invalid login credentials')) {
            // Check if the user exists but password is wrong
            const { data: userExistsData, error: userExistsError } = await supabase.auth.signUp({
              email,
              password: 'temporaryCheckPassword123!' // Use a random password just to check if user exists
            });
            
            if (userExistsError && userExistsError.message.includes('User already registered')) {
              // User exists, so it's a wrong password
              setErrorMessage('Incorrect password. Would you like to reset your password?');
            } else {
              // User doesn't exist
              setErrorMessage('No account found with this email. Would you like to sign up instead?');
            }
          } else {
            setErrorMessage(`Login failed: ${error.message}`);
          }
          setIsLoading(false);
          return;
        }
        
        if (data?.user) {
          // Login successful
          onClose();
          resetForm();
          toast.success('Logged in successfully');
        } else {
          setErrorMessage('Login failed. Please try again.');
        }
      } else {
        // Sign up mode
        // First check if the email is already registered through a signup attempt
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });
        
        // If error contains "User already registered", the email exists
        if (error && error.message.includes('User already registered')) {
          // Try to sign in with provided credentials
          const { data: existingUser, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          
          if (existingUser?.user) {
            // User exists and password is correct, so just log them in
            onClose();
            resetForm();
            toast.success('Logged in successfully');
            return;
          } else {
            // User exists but password is wrong
            setErrorMessage('An account with this email already exists. The password you entered is incorrect. Would you like to reset your password?');
            setIsLoading(false);
            return;
          }
        } else if (data?.user) {
          // New signup was successful
          setVerificationSent(true);
          toast.success('Account created! Please check your email to verify.');
          return;
        } else if (error) {
          // Some other signup error occurred
          console.error('Signup error:', error);
          setErrorMessage(`Signup failed: ${error.message}`);
          return;
        }
        
        // If we get here without returning, attempt normal signup flow
        const signupSuccess = await signup(email, "", password);
        
        if (signupSuccess) {
          setVerificationSent(true);
          toast.success('Account created! Please check your email to verify.');
        } else {
          setErrorMessage('Signup failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrorMessage(`An unexpected error occurred. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrorMessage(null);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth-callback`
        }
      });
      
      if (error) {
        console.error('Google auth error:', error);
        setErrorMessage(`Google sign-in failed: ${error.message}`);
        toast.error(`Google sign-in failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Google auth error:', error);
      setErrorMessage('Failed to initialize Google sign-in');
      toast.error('Failed to initialize Google sign-in');
    } finally {
      setGoogleLoading(false);
    }
  };
  
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrorMessage(null);
    setVerificationSent(false);
    setResetEmailSent(false);
  };
  
  const toggleMode = (newMode: 'login' | 'signup' | 'reset-password') => {
    setMode(newMode);
    resetForm();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-none">
        <div className="grid md:grid-cols-5 h-full">
          {/* Left side - Accent color and branding - Made narrower */}
          <div className="hidden md:flex md:col-span-1 bg-gradient-to-br from-primary to-primary/70 flex-col justify-center items-center text-white p-6">
            <div className="space-y-4 text-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="stroke-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <circle cx="16" cy="16" r="12" fill="none" strokeWidth="2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">AI Content Tools</h3>
              <p className="text-sm text-white/80">
                Access our powerful AI tools for content detection, summarization, and more.
              </p>
            </div>
          </div>
          
          {/* Right side - Form - Made wider */}
          <div className="p-6 md:col-span-4 md:p-8">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold text-center">
                {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create account' : 'Reset password'}
              </DialogTitle>
              {mode === 'reset-password' && (
                <DialogDescription className="text-center text-muted-foreground">
                  Enter your email and we'll send you instructions to reset your password
                </DialogDescription>
              )}
            </DialogHeader>
            
            {errorMessage && (
              <Alert variant={errorMessage.includes('Would you like') ? "warning" : "error"} className="mb-4">
                <div className="flex gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <div className="flex-1">
                    <p className="text-sm">{errorMessage}</p>
                    
                    {errorMessage.includes('sign up instead') && (
                      <Button 
                        onClick={() => toggleMode('signup')} 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 text-xs"
                      >
                        Go to Sign Up <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                    
                    {errorMessage.includes('reset your password') && (
                      <Button 
                        onClick={() => toggleMode('reset-password')} 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 text-xs"
                      >
                        Reset Password <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </Alert>
            )}
            
            {verificationSent ? (
              <div className="space-y-4 pt-2">
                <Alert variant="info" layout="complex">
                  <AlertContent>
                    <AlertTitle className="flex items-center gap-2">
                      <InfoCircledIcon className="h-4 w-4" />
                      <span>Verification Email Sent!</span>
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                      Please check your email to verify your account. If you don't see it, check your spam folder.
                    </AlertDescription>
                  </AlertContent>
                </Alert>
                <Button 
                  onClick={() => toggleMode('login')} 
                  className="w-full"
                  variant="outline"
                >
                  Back to Login
                </Button>
              </div>
            ) : resetEmailSent ? (
              <div className="space-y-4 pt-2">
                <Alert variant="info" layout="complex">
                  <AlertContent>
                    <AlertTitle className="flex items-center gap-2">
                      <InfoCircledIcon className="h-4 w-4" />
                      <span>Password Reset Email Sent!</span>
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                      Please check your email for instructions to reset your password. If you don't see it, check your spam folder.
                    </AlertDescription>
                  </AlertContent>
                </Alert>
                <Button 
                  onClick={() => toggleMode('login')} 
                  className="w-full"
                  variant="outline"
                >
                  Back to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor={`${id}-email`} className="text-sm font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id={`${id}-email`} 
                        className="pl-10"
                        placeholder="you@example.com" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                      />
                    </div>
                  </div>
                  
                  {mode !== 'reset-password' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${id}-password`} className="text-sm font-medium">Password</Label>
                        {mode === 'login' && (
                          <Button 
                            type="button" 
                            variant="link" 
                            className="p-0 h-auto text-xs text-muted-foreground"
                            onClick={() => toggleMode('reset-password')}
                          >
                            Forgot password?
                          </Button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id={`${id}-password`} 
                          className="pl-10"
                          placeholder="••••••••" 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} 
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full"
                  size="lg"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Reset Instructions'}
                </Button>
                
                {mode !== 'reset-password' && (
                  <>
                    <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                      <span className="text-xs text-muted-foreground">Or</span>
                    </div>
                    
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={handleGoogleSignIn}
                      disabled={googleLoading}
                      className="w-full"
                      size="lg"
                    >
                      {googleLoading ? 
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
                        <Chrome className="mr-2 h-4 w-4" />
                      }
                      {mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
                    </Button>
                  </>
                )}
                
                <div className="mt-6 text-center">
                  {mode === 'login' ? (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <span className="text-sm text-muted-foreground">Don't have an account?</span>
                      <Button 
                        type="button"
                        onClick={() => toggleMode('signup')}
                        variant="link"
                        className="text-primary p-0 h-auto font-medium"
                      >
                        Create an account
                      </Button>
                    </div>
                  ) : mode === 'signup' ? (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <span className="text-sm text-muted-foreground">Already have an account?</span>
                      <Button 
                        type="button"
                        onClick={() => toggleMode('login')}
                        variant="link"
                        className="text-primary p-0 h-auto font-medium"
                      >
                        Sign in
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <span className="text-sm text-muted-foreground">Remember your password?</span>
                      <Button 
                        type="button"
                        onClick={() => toggleMode('login')}
                        variant="link"
                        className="text-primary p-0 h-auto font-medium"
                      >
                        Back to login
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
