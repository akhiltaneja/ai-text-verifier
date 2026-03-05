
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/context/types';
import { supabase } from '@/context/useSupabaseAuth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCredits } from '@/context/CreditContext';

interface ProfileFormProps {
  user: User | null;
  onUpdateAvatar?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onUpdateAvatar }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setUser } = useCredits();
  
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

  // Function to generate the avatar URL
  const getAvatarUrl = () => {
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
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={onUpdateAvatar}
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
  );
};
