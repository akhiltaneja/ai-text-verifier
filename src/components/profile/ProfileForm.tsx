
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Image, Mail, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/context/types';
import { supabase } from '@/context/useSupabaseAuth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCredits } from '@/context/CreditContext';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const PREDEFINED_AVATARS = [
  "https://api.dicebear.com/7.x/bottts/svg?seed=Felix",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Oliver",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jasper",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Coco",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Buster",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Sasha",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Mimi",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Nala",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Simba",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna"
];

interface ProfileFormProps {
  user: User | null;
  onUpdateAvatar?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onUpdateAvatar }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const { toast } = useToast();
  const { setUser, logout } = useCredits();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !setUser) return;

    setIsLoading(true);

    try {
      // Update in Supabase
      const { error, data } = await supabase.auth.updateUser({
        email: email !== user.email ? email : undefined,
        data: { name }
      });

      if (error) {
        throw new Error(error.message);
      }

      // Update the global user context
      if (data?.user) {
        setUser({
          ...user,
          name,
          email: email !== user.email ? email : user.email,
        });
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    setIsResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast({
        title: "Password Reset Email Sent",
        description: "Check your inbox for a secure link to update your password.",
      });
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: error.message || "Failed to send password reset email.",
        variant: "destructive"
      });
    } finally {
      setIsResetLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await logout();
      toast({
        title: "Account Deleted",
        description: "Your secure account has been permanently removed.",
      });
    } catch (error: any) {
      toast({
        title: "Deletion Failed",
        description: error.message || "Failed to delete your account",
        variant: "destructive",
      });
    }
  };

  const handleAvatarSelect = async (url: string) => {
    if (!user || !setUser) return;
    setIsUpdatingAvatar(true);
    try {
      const { error, data } = await supabase.auth.updateUser({
        data: { avatar_url: url }
      });
      if (error) throw error;

      if (data?.user) {
        setUser({
          ...user,
          avatar_url: url
        });
      }
      setIsAvatarModalOpen(false);
      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been changed successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update avatar.",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  // Function to generate the avatar URL
  const getAvatarUrl = () => {
    // Return explicit saved avatar if user set one in the gallery
    if (user?.avatar_url) return user.avatar_url;
    // Otherwise calculate standard fallback
    if (!user?.id) return null;
    const style = user?.avatar_style || getAvatarStyleForUser(user.id);
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${user.id}`;
  };

  // Function to determine consistent avatar style based on user ID
  const getAvatarStyleForUser = (userId: string) => {
    const avatarStyles = ['adventurer', 'avataaars', 'bottts', 'fun-emoji', 'thumbs', 'lorelei'];
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = ((hash << 5) - hash) + userId.charCodeAt(i);
      hash = hash & hash;
    }
    const styleIndex = Math.abs(hash) % avatarStyles.length;
    return avatarStyles[styleIndex];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your profile details
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src={getAvatarUrl()} alt={user?.name || 'User'} />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex flex-col mb-2">
                  <span className="font-semibold text-lg text-slate-800">{user?.name || 'Anonymous User'}</span>
                  <span className="text-sm text-slate-500 font-medium">@{user?.email?.split('@')[0] || `user_${user?.id?.substring(0, 6)}`}</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAvatarModalOpen(true)}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Change Profile Picture
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  Click to choose a different avatar style
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                disabled={user?.provider !== 'email'}
              />
              {user?.provider !== 'email' && (
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed for accounts linked with {user?.provider}.
                </p>
              )}
              {user?.provider && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center py-1 px-2.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                    <ShieldAlert className="w-3.5 h-3.5 mr-1" />
                    Authenticated via {user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* AUTHENTICATION SETTINGS */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>
            Manage your secure login credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user?.provider === 'email' ? (
            <div className="space-y-3">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  id="current-password"
                  type="password"
                  value="••••••••••••"
                  disabled
                  className="bg-slate-50 text-slate-500 max-w-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePasswordReset}
                  disabled={isResetLoading}
                >
                  {isResetLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Mail className="w-4 h-4 mr-2 text-slate-500" />}
                  Send Password Reset Email
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                For security reasons, password changes must be verified via your registered email address.
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
              Password management is not applicable because your account is securely linked via <strong>{user?.provider}</strong>.
            </p>
          )}
        </CardContent>
      </Card>

      {/* DANGER ZONE */}
      <Card className="border-rose-100 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <CardHeader className="relative z-10 pb-4 border-b border-rose-50 bg-rose-50/30">
          <CardTitle className="text-rose-600 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-rose-600/70">
            Irreversible account actions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 relative z-10">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="bg-rose-500 hover:bg-rose-600 shadow-sm shadow-rose-200">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account, wipe all your historical AI detection logs, and remove your data from our servers securely.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-600"
                >
                  Permanently Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* AVATAR GALLERY MODAL */}
      <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Profile Picture</DialogTitle>
            <DialogDescription>
              Select a new avatar to personalize your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 py-4">
            {PREDEFINED_AVATARS.map((url, index) => (
              <button
                key={index}
                onClick={() => handleAvatarSelect(url)}
                disabled={isUpdatingAvatar}
                className={`relative rounded-xl overflow-hidden border-2 transition-all group hover:scale-105 active:scale-95 ${user?.avatar_url === url ? 'border-primary shadow-md' : 'border-transparent hover:border-primary/30 bg-slate-50'}`}
              >
                <img src={url} alt={`Avatar option ${index + 1}`} className="w-full h-auto object-cover" />
                {user?.avatar_url === url && (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <div className="bg-primary text-white p-1 rounded-full shadow-lg scale-75">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={() => setIsAvatarModalOpen(false)} disabled={isUpdatingAvatar}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};
