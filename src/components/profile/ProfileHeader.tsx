
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/context/useSupabaseAuth';
import { User } from '@/context/types';

interface ProfileHeaderProps {
  user: User | null;
  setUser: ((user: User | null) => void) | undefined;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, setUser }) => {
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [selectedAvatarStyle, setSelectedAvatarStyle] = useState('');
  const { toast } = useToast();

  const getAvatarUrl = (style?: string) => {
    if (!user?.id) return null;
    
    const avatarStyle = style || user?.avatar_style || getAvatarStyleForUser(user.id);
    return `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${user.id}`;
  };
  
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

  const handleAvatarStyleChange = async (style: string) => {
    if (!setUser || !user) return;
    
    try {
      setSelectedAvatarStyle(style);
      setShowAvatarDialog(false);
      
      const { error } = await supabase.auth.updateUser({
        data: { avatar_style: style }
      });
      
      if (error) throw new Error(error.message);
      
      setUser({
        ...user,
        avatar_style: style
      });
      
      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update your avatar",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and subscription details.
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center">
          <div className="cursor-pointer group" onClick={() => setShowAvatarDialog(true)}>
            <Avatar className="h-16 w-16 border-2 border-primary/20 group-hover:border-primary transition-colors">
              <AvatarImage src={getAvatarUrl(user?.avatar_style || selectedAvatarStyle)} alt={user?.name || 'User'} />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="mt-1 text-xs text-center text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity">
              Change
            </div>
          </div>
          <div className="ml-4">
            <div className="font-medium">{user?.name || 'User'}</div>
            <div className="text-sm text-muted-foreground">{user?.email || ''}</div>
          </div>
        </div>
      </div>

      <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Choose Profile Picture</DialogTitle>
            <DialogDescription>
              Select an avatar style for your profile picture
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-3 gap-4 py-4">
            {['adventurer', 'avataaars', 'bottts', 'fun-emoji', 'thumbs', 'lorelei'].map((style) => (
              <div 
                key={style} 
                className={`
                  cursor-pointer p-2 rounded-lg border-2 transition-all 
                  ${(user?.avatar_style || selectedAvatarStyle || getAvatarStyleForUser(user?.id || '')) === style 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-primary/50'}
                `}
                onClick={() => handleAvatarStyleChange(style)}
              >
                <Avatar className="h-20 w-20 mx-auto">
                  <AvatarImage src={`https://api.dicebear.com/7.x/${style}/svg?seed=${user?.id || ''}`} alt={style} />
                </Avatar>
                <p className="text-xs text-center mt-2 truncate">{style}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setShowAvatarDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAvatarDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
