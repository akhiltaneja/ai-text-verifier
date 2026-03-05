
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CopyIcon, Key, Plus, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed?: string;
}

export const APIKeyManagement: React.FC = () => {
  // Demo data - in real app, you'd fetch this from Supabase
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Development Key',
      prefix: 'AIct_dev_Z9X8',
      createdAt: '2023-09-15',
      lastUsed: '2023-10-20',
    }
  ]);
  
  const [newKeyName, setNewKeyName] = useState('');
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const generateApiKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Name Required",
        description: "Please provide a name for your API key",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would be an API call to create a key in Supabase
    setTimeout(() => {
      // This is just for demo purposes - in a real app you'd get this from your API
      const fakeFullKey = `AIct_${Math.random().toString(36).substring(2, 8)}_${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 12)}`;
      const newKey: ApiKey = {
        id: Date.now().toString(),
        name: newKeyName,
        prefix: fakeFullKey.substring(0, 12) + '...',
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      setApiKeys([...apiKeys, newKey]);
      setNewlyCreatedKey(fakeFullKey);
      setNewKeyName('');
      setIsLoading(false);
    }, 1000);
  };
  
  const deleteApiKey = (keyId: string) => {
    // In a real app, this would be an API call to delete the key in Supabase
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
    toast({
      title: "API Key Deleted",
      description: "The API key has been successfully deleted.",
    });
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "API key has been copied to clipboard.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>API Keys</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="ml-auto">
                  <Plus className="mr-1 h-4 w-4" />
                  Create Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create API Key</DialogTitle>
                  <DialogDescription>
                    Generate a new API key to access our API services.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="key-name">Key Name</Label>
                    <Input 
                      id="key-name" 
                      placeholder="e.g. Production Key" 
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Give your key a descriptive name to help you identify it later.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={generateApiKey} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Generate Key
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Manage your API keys for programmatic access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {newlyCreatedKey && (
            <div className="bg-primary/10 p-4 rounded-md mb-4 animate-fade-in">
              <h4 className="font-medium mb-2 text-sm">Your New API Key</h4>
              <div className="flex items-center">
                <Input 
                  value={newlyCreatedKey} 
                  readOnly 
                  className="font-mono text-xs"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2" 
                  onClick={() => copyToClipboard(newlyCreatedKey)}
                >
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <AlertTriangle className="h-3 w-3 inline mr-1" />
                Save this key now. You won't be able to see it again!
              </p>
              <Button 
                variant="link" 
                className="text-xs p-0 h-auto mt-1" 
                onClick={() => setNewlyCreatedKey(null)}
              >
                Dismiss
              </Button>
            </div>
          )}
          
          {apiKeys.length === 0 ? (
            <div className="text-center py-6">
              <Key className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-2 text-sm font-medium">No API Keys</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You haven't created any API keys yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{apiKey.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {apiKey.prefix}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Created: {apiKey.createdAt}
                      {apiKey.lastUsed && ` • Last used: ${apiKey.lastUsed}`}
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete API Key</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this API key? This action cannot be undone 
                          and any applications using this key will no longer be able to access the API.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => deleteApiKey(apiKey.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-sm text-muted-foreground">
            API keys provide full access to your account through the API. Be sure 
            to keep them secure and never share them in public spaces.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
